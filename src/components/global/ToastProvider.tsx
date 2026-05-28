import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        className: 'text-toast',
        style: {
          background: 'var(--bg-color)',
          color: 'var(--text-color)',
          border: '1px solid var(--border-color)',
        },
      }}
    />
  )
}
