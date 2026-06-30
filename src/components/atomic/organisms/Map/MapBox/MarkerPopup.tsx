import { Popup } from 'react-map-gl/mapbox'

interface MarkerPopupProps {
  latitude: number
  longitude: number
  title?: string
  description?: string
  onClose: () => void
}

export default function MarkerPopup({
  latitude,
  longitude,
  title,
  description,
  onClose,
}: MarkerPopupProps) {
  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      onClose={onClose}
      closeButton={true}
      closeOnClick={false}
      anchor="bottom"
      offset={[0, -10]}
    >
      <div className="p-4 max-w-xs bg-map-surface">
        <h3 className="font-semibold text-map-text text-sm mb-1">{title}</h3>
        {description && (
          <p className="text-xs text-map-text-muted mb-3 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex gap-2 text-xs">
          <button className="flex-1 bg-map-primary text-map-on-primary px-3 py-1.5 rounded text-xs font-medium hover:bg-map-primary-hover transition">
            Edit
          </button>
          <button className="flex-1 bg-map-surface-muted text-map-text px-3 py-1.5 rounded text-xs font-medium hover:opacity-80 transition">
            Delete
          </button>
        </div>
      </div>
    </Popup>
  )
}
