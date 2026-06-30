import { useEffect } from 'react'
import SearchLocation from '@/components/atomic/molecules/Map/SearchLocation/SearchLocation'
import { useMapboxSearch } from '@/hooks/useMapboxSearch'
import type { MapboxSuggestion } from '@/types/mapbox'

interface MapControlsPanelProps {
  onSearchChange?: (query: string) => void
  onLocationSelected?: (location: {
    latitude: number
    longitude: number
    name: string
    address?: string
  }) => void
  onDrawingModeChange?: (mode: string) => void
  onMeasurementStart?: () => void
  onExport?: () => void
  currentDrawingMode?: string
}

export default function MapControlsPanel({
  onSearchChange,
  onLocationSelected,
}: Readonly<MapControlsPanelProps>) {
  const {
    query,
    setQuery,
    suggestions,
    loading,
    error,
    selectedLocation,
    selectSuggestion,
  } = useMapboxSearch()

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearchChange?.(value)
  }

  const handleSelectSuggestion = async (suggestion: MapboxSuggestion) => {
    await selectSuggestion(suggestion)
    onSearchChange?.(suggestion.name)
  }

  // When location is selected via API, notify parent
  useEffect(() => {
    if (selectedLocation?.features?.[0]) {
      const feature = selectedLocation.features[0]
      const [longitude, latitude] = feature.geometry.coordinates
      const properties = feature.properties

      onLocationSelected?.({
        latitude,
        longitude,
        name: properties.name,
        address: properties.place_formatted || properties.full_address,
      })
    }
  }, [selectedLocation, onLocationSelected])

  return (
    <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-4 sm:right-auto z-10 flex flex-col gap-2 w-auto sm:w-72 pointer-events-auto">
      {/* Search Box */}
      <SearchLocation
        searchQuery={query}
        onSearch={handleSearch}
        suggestions={suggestions}
        loading={loading}
        error={error}
        onSelectSuggestion={handleSelectSuggestion}
      />

      {/* Drawing Tools */}
      {/* <div className="relative">
        <button
          onClick={() => setShowDrawingMenu(!showDrawingMenu)}
          className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <div className="flex items-center justify-between">
            <span>Drawing Tools</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                showDrawingMenu ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </button>

        {showDrawingMenu && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden z-20">
            {[
              { mode: DRAWING_MODES.NONE, label: 'None' },
              { mode: DRAWING_MODES.POINT, label: 'Point' },
              { mode: DRAWING_MODES.LINE, label: 'Line' },
              { mode: DRAWING_MODES.POLYGON, label: 'Polygon' },
              { mode: DRAWING_MODES.CIRCLE, label: 'Circle' },
            ].map(({ mode, label }) => (
              <button
                key={mode}
                onClick={() => handleDrawingMode(mode)}
                className={`w-full text-left px-4 py-2.5 text-sm transition ${
                  currentDrawingMode === mode
                    ? 'bg-indigo-50 text-indigo-700 font-medium border-l-2 border-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div> */}

      {/* Measurement Tool */}
      {/* <button
        onClick={() => onMeasurementStart?.()}
        className="w-full bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
      >
        Measurement
      </button> */}

      {/* Export Button */}
      {/* <button
        onClick={() => onExport?.()}
        className="w-full bg-indigo-600 rounded-lg shadow-sm px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition"
      >
        Export Map
      </button> */}

      {/* Layer Controls */}
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 space-y-3">
        <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Layers
        </h3>

        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              checked={clusteringEnabled}
              onChange={(e) => setClusteringEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-indigo-600"
            />
            <span>Clustering</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-700">
            <input
              type="checkbox"
              checked={heatmapEnabled}
              onChange={(e) => setHeatmapEnabled(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-indigo-600"
            />
            <span>Heatmap</span>
          </label>
        </div>
      </div> */}
    </div>
  )
}
