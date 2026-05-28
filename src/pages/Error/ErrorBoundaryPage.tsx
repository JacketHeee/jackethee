import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LocalizedLink from '@/components/atomic/molecules/LocalizedLink/LocalizedLink'

export default function ErrorBoundaryPage() {
  const { t } = useTranslation()
  const error = useRouteError()
  const errorMessage = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : t('home.errorDemo')

  return (
    <div className="dark min-h-screen w-full bg-main-bg text-main-text flex items-center justify-center px-6">
      <div className="max-w-xl text-center flex flex-col gap-4">
        <h1 className="text-h2">{t('errorPage.title')}</h1>
        <p className="text-body-1 text-main-text/70">
          {t('errorPage.message', { errorMessage })}
        </p>
        <div className="flex items-center justify-center gap-3">
          <LocalizedLink
            to="/"
            className="px-4 py-2 rounded-md border border-main-border text-body-2-semibold"
          >
            {t('errorPage.goHome')}
          </LocalizedLink>
          <LocalizedLink
            to="/map"
            className="px-4 py-2 rounded-md border border-main-border text-body-2-semibold"
          >
            {t('errorPage.openMap')}
          </LocalizedLink>
        </div>
      </div>
    </div>
  )
}
