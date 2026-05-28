export interface LoadingOverlayProps {
  isVisible?: boolean
  label?: string
}

export default function LoadingOverlay({
  isVisible = false,
  label = 'Loading...',
}: LoadingOverlayProps) {
  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-main-bg/80 text-main-text">
      <div className="flex flex-col items-center gap-3 rounded-md border border-main-border bg-main-bg px-6 py-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-main-border border-t-main-text" />
        <span className="text-body-2">{label}</span>
      </div>
    </div>
  )
}
