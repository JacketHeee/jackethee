import { useState } from 'react'

interface ExportPanelProps {
  isActive: boolean
  onClose: () => void
}

export default function ExportPanel({ isActive, onClose }: ExportPanelProps) {
  const [exportFormat, setExportFormat] = useState('png')
  const [quality, setQuality] = useState(100)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    // Logic sẽ được thêm
    setTimeout(() => {
      setIsExporting(false)
      onClose()
    }, 1500)
  }

  if (!isActive) return null

  return (
    <div className="absolute bottom-4 right-4 z-10 bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900 text-sm">Export Map</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Format Selector */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
          Format
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['PNG', 'JPG', 'SVG', 'GeoJSON'].map((format) => (
            <button
              key={format}
              onClick={() => setExportFormat(format.toLowerCase())}
              className={`px-3 py-2 rounded text-xs font-medium transition border ${
                exportFormat === format.toLowerCase()
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Slider */}
      {(exportFormat === 'png' || exportFormat === 'jpg') && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Quality
            </label>
            <span className="text-xs font-semibold text-indigo-600">
              {quality}%
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            step="10"
            value={quality}
            onChange={(e) => setQuality(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {/* Export Options */}
      <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-indigo-600"
          />
          <span>Include Markers</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-indigo-600"
          />
          <span>Include Controls</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-indigo-600"
          />
          <span>Include Legend</span>
        </label>
      </div>

      {/* File Size Info */}
      <p className="text-xs text-gray-500 mb-4">Estimated size: ~2.5 MB</p>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-xs font-medium hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? 'Exporting...' : 'Download'}
        </button>
      </div>
    </div>
  )
}
