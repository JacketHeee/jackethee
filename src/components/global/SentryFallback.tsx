export interface SentryFallbackProps {
  resetError: () => void
}

export default function SentryFallback({ resetError }: SentryFallbackProps) {
  const handleReload = () => {
    resetError()
    window.location.reload()
  }

  return (
    <div className="min-h-screen w-full bg-main-bg text-main-text flex items-center justify-center px-6">
      <div className="max-w-xl text-center flex flex-col gap-4">
        <h1 className="text-h4">Rất tiếc, đã có lỗi xảy ra</h1>
        <p className="text-body-1 text-main-text/70">
          Ứng dụng gặp sự cố ngoài ý muốn. Vui lòng tải lại trang để tiếp tục.
        </p>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleReload}
            className="px-4 py-2 rounded-md border border-main-border text-body-2-semibold hover:bg-main-text/10 transition-colors"
          >
            Tải lại trang
          </button>
        </div>
      </div>
    </div>
  )
}
