import { useEffect, useRef } from 'react'
import Map, {
  NavigationControl,
  FullscreenControl,
  Marker,
} from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css'

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
  }>
}

export default function MapBox({
  latitude = 21.0285,
  longitude = 105.8542,
  zoom = 10,
  onMapLoad,
  markers = [],
}: MapBoxProps) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current && onMapLoad) {
      onMapLoad(mapRef.current)
    }
  }, [onMapLoad])

  return (
    <div className="w-full h-full overflow-hidden shadow-lg">
      <Map
        ref={mapRef}
        initialViewState={{
          latitude,
          longitude,
          zoom,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      >
        <NavigationControl position="top-left" />
        <FullscreenControl position="top-left" />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            latitude={marker.latitude}
            longitude={marker.longitude}
            color="hsl(259, 100%, 50%)"
            title={marker.title}
          />
        ))}
      </Map>
    </div>
  )
}
