import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/components/atomic/templates/RootLayout'

const HomePage = lazy(() => import('@/pages/Home/HomePage'))
const MapPage = lazy(() => import('@/pages/Map/MapPage'))
const StudioPage = lazy(() => import('@/pages/Studio/StudioPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'map', element: <MapPage /> },
      { path: 'studio', element: <StudioPage /> },
    ],
  },
])
