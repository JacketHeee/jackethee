import { useState } from 'react'
import { MAP_STYLES } from './constants'

interface MapStyleButtonProps {
  currentStyle: string
  onStyleChange: (styleUrl: string) => void
}

export default function MapStyleButton({
  currentStyle,
  onStyleChange,
}: MapStyleButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getStyleThumbnail = (style: string) => {
    switch (style) {
      case MAP_STYLES.streets.url:
        return '🛣️'
      case MAP_STYLES.outdoors.url:
        return '🏞️'
      case MAP_STYLES.light.url:
        return '☀️'
      case MAP_STYLES.dark.url:
        return '🌙'
      case MAP_STYLES.satellite.url:
        return '🛰️'
      default:
        return '🗺️'
    }
  }

  const getCurrentStyleName = () => {
    return (
      Object.values(MAP_STYLES).find((s) => s.url === currentStyle)?.name ||
      'Map Style'
    )
  }

  return (
    <div className="absolute bottom-4 left-4 z-10">
      {/* Main Button */}
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md hover:border-gray-300 transition"
          title={getCurrentStyleName()}
        >
          <span className="text-xl">{getStyleThumbnail(currentStyle)}</span>
        </button>

        {/* Styles Menu */}
        {isOpen && (
          <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden w-56">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Map Styles
              </h3>
            </div>

            {/* Styles Grid */}
            <div className="grid grid-cols-2 gap-0 p-2">
              {Object.values(MAP_STYLES).map((style) => (
                <button
                  key={style.url}
                  onClick={() => {
                    onStyleChange(style.url)
                    setIsOpen(false)
                  }}
                  className={`p-3 rounded text-center text-xs font-medium transition ${
                    currentStyle === style.url
                      ? 'bg-indigo-100 border border-indigo-300 text-indigo-700'
                      : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg mb-1">
                    {getStyleThumbnail(style.url)}
                  </div>
                  <div>{style.name}</div>
                </button>
              ))}
            </div>

            {/* Arrow Pointer */}
            <div className="absolute bottom-0 right-4 w-2 h-2 bg-white border-r border-b border-gray-200 rotate-45 transform translate-y-full" />
          </div>
        )}
      </div>
    </div>
  )
}
