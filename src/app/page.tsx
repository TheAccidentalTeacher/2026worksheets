'use client';

import { useState, useMemo } from 'react';
import { subjects, getAllGrades, buildTopicString, type TopicItem } from '@/lib/data/curriculum-topics';

// Branding configuration state
interface BrandingState {
  // Header options
  schoolName: string;
  className: string;
  teacherName: string;
  showNameField: boolean;
  showDateField: boolean;
  showScoreField: boolean;
  showPeriodField: boolean;
  logoUrl: string;
  // Footer options
  copyrightText: string;
  schoolWebsite: string;
  showPageNumbers: boolean;
}

const defaultBranding: BrandingState = {
  schoolName: '',
  className: '',
  teacherName: '',
  showNameField: true,
  showDateField: true,
  showScoreField: false,
  showPeriodField: false,
  logoUrl: '',
  copyrightText: '',
  schoolWebsite: '',
  showPageNumbers: true,
};

export default function Home() {
  // Curriculum selection state
  const [gradeLevel, setGradeLevel] = useState('3');
  const [subjectId, setSubjectId] = useState('science');
  const [selectedTopicId, setSelectedTopicId] = useState('plant-parts');
  const [customTopic, setCustomTopic] = useState('');
  const [useCustomTopic, setUseCustomTopic] = useState(false);
  
  const [worksheetType, setWorksheetType] = useState('vocabulary-cards');
  
  // Get filtered topics based on grade and subject
  const filteredTopics = useMemo(() => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return [];
    return subject.topics.filter(topic => topic.grades.includes(gradeLevel));
  }, [gradeLevel, subjectId]);
  
  // Get the current topic object
  const currentTopic = useMemo(() => {
    return filteredTopics.find(t => t.id === selectedTopicId);
  }, [filteredTopics, selectedTopicId]);
  
  // Build the final topic string for the API
  const topic = useMemo(() => {
    if (useCustomTopic && customTopic.trim()) {
      return customTopic.trim();
    }
    if (currentTopic) {
      return buildTopicString(currentTopic, gradeLevel);
    }
    return 'General Topic';
  }, [useCustomTopic, customTopic, currentTopic, gradeLevel]);
  
  // Reset topic selection when grade or subject changes
  const handleGradeChange = (newGrade: string) => {
    setGradeLevel(newGrade);
    // Find a valid topic for the new grade
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      const validTopics = subject.topics.filter(t => t.grades.includes(newGrade));
      if (validTopics.length > 0 && !validTopics.find(t => t.id === selectedTopicId)) {
        setSelectedTopicId(validTopics[0].id);
      }
    }
  };
  
  const handleSubjectChange = (newSubject: string) => {
    setSubjectId(newSubject);
    // Select first topic in new subject for current grade
    const subject = subjects.find(s => s.id === newSubject);
    if (subject) {
      const validTopics = subject.topics.filter(t => t.grades.includes(gradeLevel));
      if (validTopics.length > 0) {
        setSelectedTopicId(validTopics[0].id);
      }
    }
  };
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  // Branding state
  const [showBrandingOptions, setShowBrandingOptions] = useState(false);
  const [branding, setBranding] = useState<BrandingState>(defaultBranding);

  // Build branding config for API calls
  const buildBrandingConfig = () => ({
    headerConfig: {
      schoolName: branding.schoolName || undefined,
      className: branding.className || undefined,
      teacherName: branding.teacherName || undefined,
      showNameField: branding.showNameField,
      showDateField: branding.showDateField,
      showScoreField: branding.showScoreField,
      showPeriodField: branding.showPeriodField,
      logoUrl: branding.logoUrl || undefined,
    },
    footerConfig: {
      copyrightText: branding.copyrightText || undefined,
      schoolWebsite: branding.schoolWebsite || undefined,
      showPageNumbers: branding.showPageNumbers,
    },
  });

  const handleGenerateContent = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setPdfUrl(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          gradeLevel,
          worksheetType,
          includeAssets: false, // Faster for testing
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setResult(JSON.stringify(data.worksheet, null, 2));
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async (download: boolean = false) => {
    setLoading(true);
    setError(null);
    setResult(null);
    
    // Revoke previous URL to prevent memory leaks
    if (pdfUrl) {
      window.URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }

    try {
      const response = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          gradeLevel,
          worksheetType,
          branding: buildBrandingConfig(),
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        if (download) {
          // Download the PDF
          const a = document.createElement('a');
          a.href = url;
          a.download = `${topic.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-worksheet.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          setResult('PDF downloaded successfully!');
        } else {
          // Preview the PDF
          setPdfUrl(url);
        }
      } else {
        const data = await response.json();
        setError(data.error || 'PDF generation failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPreview = () => {
    if (pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `${topic.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-worksheet.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🎓 Worksheet Generator
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create a Worksheet</h2>
          
          <div className="space-y-4">
            {/* Grade Level Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Level
                </label>
                <select
                  value={gradeLevel}
                  onChange={(e) => handleGradeChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {getAllGrades().map(grade => (
                    <option key={grade.value} value={grade.value}>{grade.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  value={subjectId}
                  onChange={(e) => handleSubjectChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.icon} {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Topic Selection */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Topic
                </label>
                <button
                  type="button"
                  onClick={() => setUseCustomTopic(!useCustomTopic)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  {useCustomTopic ? '← Back to topic list' : 'Enter custom topic'}
                </button>
              </div>
              
              {useCustomTopic ? (
                <input
                  type="text"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any topic, e.g., 'Ancient Egyptian pyramids'"
                />
              ) : (
                <select
                  value={selectedTopicId}
                  onChange={(e) => setSelectedTopicId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))
                  ) : (
                    <option value="">No topics available for this grade</option>
                  )}
                </select>
              )}
              
              {/* Topic Preview */}
              {!useCustomTopic && currentTopic && (
                <p className="mt-1 text-xs text-gray-500">
                  Keywords: {currentTopic.keywords}
                </p>
              )}
            </div>

            {/* Worksheet Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Worksheet Type
              </label>
              <select
                value={worksheetType}
                onChange={(e) => setWorksheetType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="vocabulary-cards">📝 Vocabulary Cards</option>
                <option value="multiple-choice">✅ Multiple Choice Quiz</option>
                <option value="fill-in-blank">✏️ Fill in the Blank</option>
                <option value="matching">🔗 Matching</option>
                <option value="labeled-diagram">🏷️ Labeled Diagram</option>
                <option value="comparison-grid">📊 Comparison Chart</option>
              </select>
            </div>

            {/* Branding/Customization Section */}
            <div className="border border-gray-200 rounded-md">
              <button
                type="button"
                onClick={() => setShowBrandingOptions(!showBrandingOptions)}
                className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span className="font-medium text-gray-700">
                  🎨 Customize Header & Footer
                </span>
                <span className="text-gray-400">
                  {showBrandingOptions ? '▲' : '▼'}
                </span>
              </button>
              
              {showBrandingOptions && (
                <div className="px-4 pb-4 space-y-4 border-t border-gray-100">
                  {/* Header Options */}
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Header Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">School Name</label>
                        <input
                          type="text"
                          value={branding.schoolName}
                          onChange={(e) => setBranding({ ...branding, schoolName: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Lincoln Elementary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Class Name</label>
                        <input
                          type="text"
                          value={branding.className}
                          onChange={(e) => setBranding({ ...branding, className: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="3rd Grade Science"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Teacher Name</label>
                        <input
                          type="text"
                          value={branding.teacherName}
                          onChange={(e) => setBranding({ ...branding, teacherName: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Mrs. Johnson"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Logo URL (optional)</label>
                        <input
                          type="url"
                          value={branding.logoUrl}
                          onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    
                    {/* Student Fields Toggle */}
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">Student Fields:</p>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-1 text-sm">
                          <input
                            type="checkbox"
                            checked={branding.showNameField}
                            onChange={(e) => setBranding({ ...branding, showNameField: e.target.checked })}
                            className="rounded"
                          />
                          Name
                        </label>
                        <label className="flex items-center gap-1 text-sm">
                          <input
                            type="checkbox"
                            checked={branding.showDateField}
                            onChange={(e) => setBranding({ ...branding, showDateField: e.target.checked })}
                            className="rounded"
                          />
                          Date
                        </label>
                        <label className="flex items-center gap-1 text-sm">
                          <input
                            type="checkbox"
                            checked={branding.showScoreField}
                            onChange={(e) => setBranding({ ...branding, showScoreField: e.target.checked })}
                            className="rounded"
                          />
                          Score
                        </label>
                        <label className="flex items-center gap-1 text-sm">
                          <input
                            type="checkbox"
                            checked={branding.showPeriodField}
                            onChange={(e) => setBranding({ ...branding, showPeriodField: e.target.checked })}
                            className="rounded"
                          />
                          Period
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Footer Options */}
                  <div className="pt-3 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Footer Information</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Copyright Text</label>
                        <input
                          type="text"
                          value={branding.copyrightText}
                          onChange={(e) => setBranding({ ...branding, copyrightText: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="© 2025 My School"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">School Website</label>
                        <input
                          type="url"
                          value={branding.schoolWebsite}
                          onChange={(e) => setBranding({ ...branding, schoolWebsite: e.target.value })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="www.myschool.edu"
                        />
                      </div>
                    </div>
                    <label className="flex items-center gap-2 mt-3 text-sm">
                      <input
                        type="checkbox"
                        checked={branding.showPageNumbers}
                        onChange={(e) => setBranding({ ...branding, showPageNumbers: e.target.checked })}
                        className="rounded"
                      />
                      Show page numbers
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleGenerateContent}
                disabled={loading}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Preview JSON'}
              </button>
              <button
                onClick={() => handleGeneratePDF(false)}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : '👁️ Preview PDF'}
              </button>
              <button
                onClick={() => handleGeneratePDF(true)}
                disabled={loading}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : '📥 Download PDF'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {pdfUrl && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">PDF Preview</h3>
              <button
                onClick={handleDownloadPreview}
                className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700 text-sm"
              >
                📥 Download This PDF
              </button>
            </div>
            <iframe
              src={pdfUrl}
              className="w-full h-[800px] border border-gray-200 rounded"
              title="PDF Preview"
            />
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Result</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm max-h-96">
              {result}
            </pre>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>📚 {subjects.length} subjects • {subjects.reduce((acc, s) => acc + s.topics.length, 0)}+ topics • K-8 curriculum aligned</p>
          <p className="mt-1">
            Templates: Vocabulary Cards • Multiple Choice • Fill-in-Blank • Matching • Labeled Diagram • Comparison Chart
          </p>
        </div>
      </div>
    </div>
  );
}
