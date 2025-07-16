'use client'

import { useState } from 'react'

interface PDFViewerProps {
  file: string
  title: string
}

export default function PDFViewer({ file, title }: PDFViewerProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setLoading(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-4">
            {/* Download Button */}
            <a
              href={file}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700"
            >
              Download PDF
            </a>
            {/* Open in new tab button */}
            <a
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50"
            >
              Open in New Tab
            </a>
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="relative" style={{ height: '800px' }}>
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-600 mt-2">Loading PDF...</span>
            <span className="text-xs text-gray-500 mt-1">{file}</span>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <div className="text-red-600 text-center">
              <p className="font-medium">Unable to display PDF</p>
              <p className="text-sm mt-1">Click "Open in New Tab" to view the document</p>
              <a
                href={file}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block px-4 py-2 bg-primary-600 text-white text-sm rounded hover:bg-primary-700"
              >
                Open PDF
              </a>
            </div>
          </div>
        )}

        {/* PDF Iframe */}
        <iframe
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(file)}&embedded=true`}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          onError={handleError}
          title={title}
        />
      </div>
    </div>
  )
} 