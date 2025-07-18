'use client'

import { useState } from 'react'

interface PDFViewerProps {
  file: string
  title: string
}

export default function PDFViewer({ file, title }: PDFViewerProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [zoom, setZoom] = useState(0.8)

  const handleLoad = () => {
    setLoading(false)
  }

  const handleError = () => {
    setLoading(false)
    setError(true)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.3))
  }

  const handleFitToWidth = () => {
    setZoom(0.8)
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center gap-4">
            {/* Zoom Controls */}
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded text-sm"
                title="Zoom Out"
              >
                −
              </button>
              <span className="text-xs text-gray-600 min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded text-sm"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={handleFitToWidth}
                className="px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded text-xs"
                title="Fit to Width"
              >
                Fit
              </button>
            </div>
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
          </div>
        </div>
      </div>

      {/* PDF Content */}
      <div className="bg-gray-50 p-8" style={{ height: '1000px' }}>
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
              <p className="text-sm mt-1">Click "Download PDF" to view the document</p>
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

        {/* Simple PDF Container */}
        <div className="w-full h-full bg-gray-50 rounded shadow-sm overflow-hidden">
          <div className="pt-6 px-6 h-full">
            <div className="w-full h-full bg-white">
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(file)}&embedded=true&view=FitH&zoom=${Math.round(zoom * 100)}`}
                className="w-full h-full border-0"
                onLoad={handleLoad}
                onError={handleError}
                title={title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 