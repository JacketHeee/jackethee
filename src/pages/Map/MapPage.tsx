import { useMemo } from 'react'
import MapBox from '@/components/atomic/organisms/Map/MapBox/MapBox'
import { useTranslation } from 'react-i18next'

export default function MapPage() {
  const { t } = useTranslation()
  const markers = useMemo(
    () => [
      {
        id: '1',
        latitude: 21.0285,
        longitude: 105.8542,
        title: t('map.markers.hanoi.title'),
        description: t('map.markers.hanoi.description'),
      },
      {
        id: '2',
        latitude: 10.7769,
        longitude: 106.7009,
        title: t('map.markers.hcm.title'),
        description: t('map.markers.hcm.description'),
      },
      {
        id: '3',
        latitude: 18.789,
        longitude: 105.7244,
        title: t('map.markers.danang.title'),
        description: t('map.markers.danang.description'),
      },
    ],
    [t],
  )

  return (
    <div className="flex flex-col flex-1">
      <MapBox latitude={16.5} longitude={106} zoom={5} markers={markers} />
    </div>
  )
}
