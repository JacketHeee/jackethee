import { useState } from 'react'
import {
  Map as MapIcon,
  Milestone,
  Mountain,
  Satellite,
  Sun,
  Moon,
} from 'lucide-react'
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

  const getStyleIcon = (style: string, className: string) => {
    switch (style) {
      case MAP_STYLES.streets.url:
        return <Milestone className={className} />
      case MAP_STYLES.outdoors.url:
        return <Mountain className={className} />
      case MAP_STYLES.light.url:
        return <Sun className={className} />
      case MAP_STYLES.dark.url:
        return <Moon className={className} />
      case MAP_STYLES.satellite.url:
        return <Satellite className={className} />
      default:
        return <MapIcon className={className} />
    }
  }

  const getCurrentStyleName = () => {
    return (
      Object.values(MAP_STYLES).find((s) => s.url === currentStyle)?.name ||
      'Map Style'
    )
  }

  return (
    <div className="absolute bottom-10 left-2 sm:bottom-4 sm:left-4 z-10">
      {/* Main Button */}
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 bg-map-surface rounded-lg shadow-sm border border-map-border flex items-center justify-center hover:shadow-md transition"
          title={getCurrentStyleName()}
        >
          {getStyleIcon(currentStyle, 'w-5 h-5 text-map-text')}
        </button>

        {/* Styles Menu */}
        {isOpen && (
          <div className="absolute bottom-16 left-0 bg-map-surface rounded-lg shadow-lg border border-map-border overflow-hidden w-56">
            {/* Header */}
            <div className="px-4 py-3 border-b border-map-border bg-map-surface-muted">
              <h3 className="text-xs font-semibold text-map-text-muted uppercase tracking-wide">
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
                      ? 'bg-map-accent-surface border border-map-accent-border text-map-accent-text'
                      : 'bg-map-surface-muted border border-map-border text-map-text hover:opacity-80'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    {getStyleIcon(style.url, 'w-5 h-5')}
                  </div>
                  <div>{style.name}</div>
                </button>
              ))}
            </div>

            {/* Arrow Pointer */}
            <div className="absolute bottom-0 right-4 w-2 h-2 bg-map-surface border-r border-b border-map-border rotate-45 transform translate-y-full" />
          </div>
        )}
      </div>
    </div>
  )
}
