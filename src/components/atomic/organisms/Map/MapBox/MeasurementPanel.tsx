import { useState } from 'react'
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
    <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-72">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900 text-sm">Measurement</h3>
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

      {/* Unit Selector */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
          Unit
        </label>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value={MEASUREMENT_UNITS.KM}>Kilometers</option>
          <option value={MEASUREMENT_UNITS.MILES}>Miles</option>
          <option value={MEASUREMENT_UNITS.METERS}>Meters</option>
          <option value={MEASUREMENT_UNITS.FEET}>Feet</option>
        </select>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 rounded p-2 mb-4 text-xs text-gray-600 border border-gray-200">
        <p className="leading-relaxed">
          Click two points to measure distance, or three+ points for area.
        </p>
      </div>

      {/* Measurements List */}
      <div className="max-h-40 overflow-y-auto mb-4">
        {measurements.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-3">
            No measurements yet
          </p>
        ) : (
          <div className="space-y-2">
            {measurements.map((measurement) => (
              <div
                key={measurement.id}
                className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-200"
              >
                <span className="text-xs text-gray-600">
                  {measurement.type === 'distance' ? 'Distance' : 'Area'}
                </span>
                <span className="font-semibold text-indigo-600 text-xs">
                  {measurement.value.toFixed(2)} {measurement.unit}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-xs font-medium hover:bg-gray-200 transition">
          Clear
        </button>
        <button className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-indigo-700 transition">
          Save
        </button>
      </div>
    </div>
  )
}
