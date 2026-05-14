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
      <div className="p-4 max-w-xs">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{title}</h3>
        {description && (
          <p className="text-xs text-gray-600 mb-3 leading-relaxed">
            {description}
          </p>
        )}
        <div className="flex gap-2 text-xs">
          <button className="flex-1 bg-indigo-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-indigo-700 transition">
            Edit
          </button>
          <button className="flex-1 bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-gray-300 transition">
            Delete
          </button>
        </div>
      </div>
    </Popup>
  )
}
