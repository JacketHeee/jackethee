import { useState } from 'react'
import { X } from 'lucide-react'

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
    <div className="absolute bottom-4 right-4 z-10 bg-map-surface rounded-lg shadow-sm border border-map-border p-4 w-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-map-text text-sm">Export Map</h3>
        <button
          onClick={onClose}
          className="text-map-text-muted hover:text-map-text transition"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Format Selector */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-map-text-muted mb-2 uppercase tracking-wide">
          Format
        </label>
        <div className="grid grid-cols-2 gap-2">
          {['PNG', 'JPG', 'SVG', 'GeoJSON'].map((format) => (
            <button
              key={format}
              onClick={() => setExportFormat(format.toLowerCase())}
              className={`px-3 py-2 rounded text-xs font-medium transition border ${
                exportFormat === format.toLowerCase()
                  ? 'bg-map-accent-surface text-map-accent-text border-map-accent-border'
                  : 'bg-map-surface-muted text-map-text border-map-border hover:opacity-80'
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
            <label className="text-xs font-semibold text-map-text-muted uppercase tracking-wide">
              Quality
            </label>
            <span className="text-xs font-semibold text-map-primary">
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
            className="w-full h-2 bg-map-surface-muted rounded-lg appearance-none cursor-pointer accent-map-primary"
          />
        </div>
      )}

      {/* Export Options */}
      <div className="space-y-2 mb-4 pb-4 border-b border-map-border">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-map-text">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-map-border cursor-pointer accent-map-primary"
          />
          <span>Include Markers</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs text-map-text">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-map-border cursor-pointer accent-map-primary"
          />
          <span>Include Controls</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs text-map-text">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-map-border cursor-pointer accent-map-primary"
          />
          <span>Include Legend</span>
        </label>
      </div>

      {/* File Size Info */}
      <p className="text-xs text-map-text-muted mb-4">
        Estimated size: ~2.5 MB
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 bg-map-surface-muted text-map-text px-3 py-2 rounded text-xs font-medium hover:opacity-80 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 bg-map-primary text-map-on-primary px-3 py-2 rounded text-xs font-medium hover:bg-map-primary-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? 'Exporting...' : 'Download'}
        </button>
      </div>
    </div>
  )
}
