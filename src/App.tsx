import { RouterProvider } from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { router } from './routes/routes'
import ToastProvider from '@/components/global/ToastProvider'
import OfflineNotice from '@/components/global/OfflineNotice'
import SentryFallback from '@/components/global/SentryFallback'

// Router, Context, Global State
export default function App() {
  return (
    <>
      <Sentry.ErrorBoundary
        fallback={({ resetError }: { resetError: () => void }) => (
          <SentryFallback resetError={resetError} />
        )}
      >
        <RouterProvider router={router} />
      </Sentry.ErrorBoundary>
      <ToastProvider />
      <OfflineNotice />
    </>
  )
}
