'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('Parts of a Flower');
  const [gradeLevel, setGradeLevel] = useState('3');
  const [worksheetType, setWorksheetType] = useState('vocabulary-cards');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Parts of a Flower, Solar System, Butterfly Life Cycle"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade Level
                </label>
                <select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="K">Kindergarten</option>
                  <option value="1">1st Grade</option>
                  <option value="2">2nd Grade</option>
                  <option value="3">3rd Grade</option>
                  <option value="4">4th Grade</option>
                  <option value="5">5th Grade</option>
                  <option value="6">6th Grade</option>
                  <option value="7">7th Grade</option>
                  <option value="8">8th Grade</option>
                </select>
              </div>

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
                  <option value="labeled-diagram" disabled>🏷️ Labeled Diagram (coming soon)</option>
                </select>
              </div>
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
          <p>Phase 5: First Template - Vocabulary Cards ✅</p>
          <p className="mt-1">
            API Endpoints: 
            <code className="mx-1 px-1 bg-gray-100 rounded">/api/generate</code>
            <code className="mx-1 px-1 bg-gray-100 rounded">/api/pdf</code>
          </p>
        </div>
      </div>
    </div>
  );
}
