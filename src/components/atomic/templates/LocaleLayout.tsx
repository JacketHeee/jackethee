import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import i18n, { supportedLanguages, type SupportedLanguage } from '@/i18n'

export default function LocaleLayout() {
  const { lng } = useParams()
  const location = useLocation()
  const isValidLanguage = supportedLanguages.includes(lng as SupportedLanguage)

  useEffect(() => {
    if (isValidLanguage && lng && i18n.language !== lng) {
      i18n.changeLanguage(lng)
    }
  }, [isValidLanguage, lng])

  if (!isValidLanguage) {
    const nextPath = `/en${location.pathname === '/' ? '' : location.pathname}`
    return <Navigate to={nextPath} replace />
  }

  return <Outlet />
}
