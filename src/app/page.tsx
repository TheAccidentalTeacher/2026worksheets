'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('Parts of a Flower');
  const [gradeLevel, setGradeLevel] = useState('3');
  const [worksheetType, setWorksheetType] = useState('vocabulary-cards');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateContent = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

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

  const handleGeneratePDF = async () => {
    setLoading(true);
    setError(null);

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
        // Download the PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${topic.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-worksheet.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        setResult('PDF downloaded successfully!');
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
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
                  <option value="vocabulary-cards">Vocabulary Cards</option>
                  <option value="labeled-diagram" disabled>Labeled Diagram (coming soon)</option>
                  <option value="multiple-choice" disabled>Multiple Choice (coming soon)</option>
                  <option value="fill-in-blank" disabled>Fill in the Blank (coming soon)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleGenerateContent}
                disabled={loading}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Preview Content (JSON)'}
              </button>
              <button
                onClick={handleGeneratePDF}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : '📄 Generate PDF'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Result</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
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
