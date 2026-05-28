import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function OfflineNotice() {
  const [isOffline, setIsOffline] = useState(false)
  const hasShownToast = useRef(false)

  useEffect(() => {
    const updateStatus = () => {
      const nextOffline = !navigator.onLine
      setIsOffline(nextOffline)

      if (nextOffline && !hasShownToast.current) {
        hasShownToast.current = true
        toast('Offline mode enabled')
      }
    }

    updateStatus()
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)

    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
    }
  }, [])

  if (!isOffline) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 px-4">
      <div className="flex items-center gap-2 rounded-full border border-main-border bg-main-bg/90 px-4 py-2 text-body-2 text-main-text">
        <span className="h-2 w-2 rounded-full bg-main-text" />
        <span>Bạn đang offline. Giao diện đã được lưu trong bộ nhớ đệm</span>
      </div>
    </div>
  )
}
