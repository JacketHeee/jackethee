import { lazy } from 'react'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import RootLayout from '@/components/atomic/templates/RootLayout'
import LocaleLayout from '@/components/atomic/templates/LocaleLayout'

const HomePage = lazy(() => import('@/pages/Home/HomePage'))
const MapPage = lazy(() => import('@/pages/Map/MapPage'))
const StudioPage = lazy(() => import('@/pages/Studio/StudioPage'))
const ErrorBoundaryPage = lazy(() => import('@/pages/Error/ErrorBoundaryPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFoundPage'))

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouterV7(createBrowserRouter)

export const router = sentryCreateBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/en" replace />,
  },
  {
    path: '/:lng',
    element: <LocaleLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'map', element: <MapPage /> },
          { path: 'studio', element: <StudioPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
