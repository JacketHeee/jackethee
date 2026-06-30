import { useState } from 'react'
import { X } from 'lucide-react'
import { MEASUREMENT_UNITS } from './constants'

interface MeasurementPanelProps {
  isActive: boolean
  onClose: () => void
}

export default function MeasurementPanel({
  isActive,
  onClose,
}: MeasurementPanelProps) {
  const [unit, setUnit] = useState(MEASUREMENT_UNITS.KM)
  const [measurements] = useState<
    Array<{
      id: string
      type: 'distance' | 'area'
      value: number
      unit: string
    }>
  >([])

  if (!isActive) return null

  return (
    <div className="absolute bottom-4 left-4 z-10 bg-map-surface rounded-lg shadow-sm border border-map-border p-4 w-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-map-text text-sm">Measurement</h3>
        <button
          onClick={onClose}
          className="text-map-text-muted hover:text-map-text transition"
          aria-label="Đóng"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Unit Selector */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-map-text-muted mb-2 uppercase tracking-wide">
          Unit
        </label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full px-3 py-2 bg-map-surface text-map-text border border-map-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-map-primary focus:border-transparent"
        >
          <option value={MEASUREMENT_UNITS.KM}>Kilometers</option>
          <option value={MEASUREMENT_UNITS.MILES}>Miles</option>
          <option value={MEASUREMENT_UNITS.METERS}>Meters</option>
          <option value={MEASUREMENT_UNITS.FEET}>Feet</option>
        </select>
      </div>

      {/* Instructions */}
      <div className="bg-map-surface-muted rounded p-2 mb-4 text-xs text-map-text-muted border border-map-border">
        <p className="leading-relaxed">
          Click two points to measure distance, or three+ points for area.
        </p>
      </div>

      {/* Measurements List */}
      <div className="max-h-40 overflow-y-auto mb-4">
        {measurements.length === 0 ? (
          <p className="text-xs text-map-text-muted text-center py-3">
            No measurements yet
          </p>
        ) : (
          <div className="space-y-2">
            {measurements.map((measurement) => (
              <div
                key={measurement.id}
                className="flex justify-between items-center p-2 bg-map-surface-muted rounded border border-map-border"
              >
                <span className="text-xs text-map-text-muted">
                  {measurement.type === 'distance' ? 'Distance' : 'Area'}
                </span>
                <span className="font-semibold text-map-primary text-xs">
                  {measurement.value.toFixed(2)} {measurement.unit}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 bg-map-surface-muted text-map-text px-3 py-2 rounded text-xs font-medium hover:opacity-80 transition">
          Clear
        </button>
        <button className="flex-1 bg-map-primary text-map-on-primary px-3 py-2 rounded text-xs font-medium hover:bg-map-primary-hover transition">
          Save
        </button>
      </div>
    </div>
  )
}
