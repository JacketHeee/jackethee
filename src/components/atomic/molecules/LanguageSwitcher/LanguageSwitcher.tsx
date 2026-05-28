import { useMemo } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, type SupportedLanguage } from '@/i18n'

export default function LanguageSwitcher() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const { lng } = useParams()

  const currentLng = supportedLanguages.includes(lng as SupportedLanguage)
    ? (lng as SupportedLanguage)
    : 'en'

  const basePath = useMemo(() => {
    const segments = location.pathname.split('/')
    if (segments.length > 1 && segments[1] === currentLng) {
      return `/${segments.slice(2).join('/')}`
    }
    return location.pathname
  }, [location.pathname, currentLng])

  const handleSwitch = (nextLng: SupportedLanguage) => {
    if (nextLng === currentLng) {
      return
    }

    i18n.changeLanguage(nextLng)
    navigate(`/${nextLng}${basePath === '/' ? '' : basePath}`, {
      replace: true,
    })
  }

  return (
    <div className="flex items-center gap-2">
      {supportedLanguages.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => handleSwitch(language)}
          className={`px-2 py-1 rounded-md border text-body-2-semibold transition-colors ${
            language === currentLng
              ? 'border-main-text bg-main-text text-main-bg'
              : 'border-main-border text-main-text hover:bg-main-text/10'
          }`}
        >
          {t(`language.${language}`)}
        </button>
      ))}
    </div>
  )
}
