import { useState } from 'react'
import MapBox from '@/components/atomic/organisms/MapBox/MapBox'

export default function MapPage() {
  const [markers] = useState([
    {
      id: '1',
      latitude: 21.0285,
      longitude: 105.8542,
      title: 'Hà Nội',
    },
    {
      id: '2',
      latitude: 10.7769,
      longitude: 106.7009,
      title: 'TP. Hồ Chí Minh',
    },
    {
      id: '3',
      latitude: 18.789,
      longitude: 105.7244,
      title: 'Đà Nẵng',
    },
  ])

  return (
    <div className="flex flex-col flex-1">
      <MapBox latitude={16.5} longitude={106} zoom={5} markers={markers} />
    </div>
  )
}
