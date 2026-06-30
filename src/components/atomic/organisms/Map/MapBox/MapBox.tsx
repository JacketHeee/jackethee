import { useState, useEffect, useRef, useCallback } from 'react'
import Map, {
  NavigationControl,
  FullscreenControl,
  Marker,
  GeolocateControl,
  ScaleControl,
} from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapPin } from 'lucide-react'
import MapControlsPanel from './MapControlsPanel'
import MapStyleButton from './MapStyleButton'
import MarkerPopup from './MarkerPopup'
import MeasurementPanel from './MeasurementPanel'
import ExportPanel from './ExportPanel'
import { MAP_STYLES } from './constants'

interface MapBoxProps {
  latitude?: number
  longitude?: number
  zoom?: number
  onMapLoad?: (map: any) => void
  markers?: Array<{
    id: string
    latitude: number
    longitude: number
    title?: string
    description?: string
  }>
}

export default function MapBox({
  latitude = 21.0285,
  longitude = 105.8542,
  zoom = 10,
  onMapLoad,
  markers = [],
}: Readonly<MapBoxProps>) {
  const mapRef = useRef<any>(null)
  const isAnimatingRef = useRef(false)
  const [currentStyle, setCurrentStyle] = useState(MAP_STYLES.streets.url)
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)
  const [showMeasurement, setShowMeasurement] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [drawingMode, setDrawingMode] = useState('none')
  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom,
  })
  const [searchMarker, setSearchMarker] = useState<{
    latitude: number
    longitude: number
    name: string
    address?: string
  } | null>(null)

  useEffect(() => {
    if (mapRef.current && onMapLoad) {
      onMapLoad(mapRef.current)
    }
  }, [onMapLoad])

  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId)
    setSearchMarker(null)
  }

  const handleLocationSelected = useCallback(
    (location: {
      latitude: number
      longitude: number
      name: string
      address?: string
    }) => {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [location.longitude, location.latitude],
          zoom: 15,
          // speed: 2000, // <--- XÓA DÒNG NÀY HOẶC ĐỂ 1.5
          curve: 1.42,
          duration: 4000, // Thời gian 2 giây sẽ được ưu tiên
          essential: true,
        })
      }
      setSearchMarker(location)
      setSelectedMarker(null)
    },
    [],
  )

  const selectedMarkerData = markers.find((m) => m.id === selectedMarker)

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Map Controls Panel */}
      <MapControlsPanel
        currentDrawingMode={drawingMode}
        onSearchChange={setSearchQuery}
        onLocationSelected={handleLocationSelected}
        onDrawingModeChange={setDrawingMode}
        onMeasurementStart={() => setShowMeasurement(true)}
        onExport={() => setShowExport(true)}
      />

      {/* Map Style Button (Bottom Right) */}
      <MapStyleButton
        currentStyle={currentStyle}
        onStyleChange={setCurrentStyle}
      />

      {/* Measurement Panel */}
      <MeasurementPanel
        isActive={showMeasurement}
        onClose={() => setShowMeasurement(false)}
      />

      {/* Export Panel */}
      <ExportPanel isActive={showExport} onClose={() => setShowExport(false)} />

      {/* Main Map */}
      <Map
        ref={mapRef}
        latitude={viewState.latitude}
        longitude={viewState.longitude}
        zoom={viewState.zoom}
        onMove={(evt) => {
          if (!isAnimatingRef.current) {
            setViewState(evt.viewState)
          }
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={currentStyle}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        transitionDuration={2000}
      >
        <ScaleControl position="bottom-right" />
        <NavigationControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />

        {/* Markers */}
        {markers
          .filter(
            (marker) =>
              !searchQuery ||
              marker.title?.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((marker) => (
            <Marker
              key={marker.id}
              latitude={marker.latitude}
              longitude={marker.longitude}
              color={
                selectedMarker === marker.id
                  ? 'hsl(220, 100%, 50%)'
                  : 'hsl(259, 100%, 50%)'
              }
              onClick={() => handleMarkerClick(marker.id)}
            >
              <div className="cursor-pointer" title={marker.title}>
                <MapPin className="w-7 h-7 fill-current" />
              </div>
            </Marker>
          ))}

        {/* Search Result Marker */}
        {searchMarker && (
          <Marker
            latitude={searchMarker.latitude}
            longitude={searchMarker.longitude}
            color="hsl(220, 100%, 50%)"
            onClick={() => setSearchMarker(null)}
          >
            <div className="cursor-pointer" title={searchMarker.name}>
              <MapPin className="w-7 h-7 fill-current" />
            </div>
          </Marker>
        )}

        {/* Marker Popup - Selected Marker */}
        {selectedMarkerData && (
          <MarkerPopup
            latitude={selectedMarkerData.latitude}
            longitude={selectedMarkerData.longitude}
            title={selectedMarkerData.title}
            description={selectedMarkerData.description}
            onClose={() => setSelectedMarker(null)}
          />
        )}

        {/* Marker Popup - Search Result Marker */}
        {searchMarker && (
          <MarkerPopup
            latitude={searchMarker.latitude}
            longitude={searchMarker.longitude}
            title={searchMarker.name}
            description={searchMarker.address}
            onClose={() => setSearchMarker(null)}
          />
        )}
      </Map>

      {/* Drawing Mode Indicator */}
      {drawingMode !== 'none' && (
        <div className="absolute top-4 right-4 bg-map-primary text-map-on-primary px-3 py-2 rounded-lg shadow-sm text-xs font-medium">
          Drawing Mode: {drawingMode.toUpperCase()}
        </div>
      )}

      {/* Search Results Indicator */}
      {searchQuery && (
        <div className="absolute bottom-4 right-4 bg-map-primary text-map-on-primary px-3 py-2 rounded-lg shadow-sm text-xs font-medium">
          {
            markers.filter((m) =>
              m.title?.toLowerCase().includes(searchQuery.toLowerCase()),
            ).length
          }{' '}
          result
          {markers.filter((m) =>
            m.title?.toLowerCase().includes(searchQuery.toLowerCase()),
          ).length > 1
            ? 's'
            : ''}
        </div>
      )}
    </div>
  )
}
