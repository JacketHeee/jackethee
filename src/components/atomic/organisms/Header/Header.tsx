import { useTranslation } from 'react-i18next'
import LocalizedLink from '../../molecules/LocalizedLink/LocalizedLink'
import LanguageSwitcher from '../../molecules/LanguageSwitcher/LanguageSwitcher'
import { ThemeToggle } from '../../molecules/ThemeToggle/ThemeToggle'

export default function Header() {
  const { t } = useTranslation()
  const routes = [
    {
      path: '/',
      label: t('nav.home'),
    },
    {
      path: '/map',
      label: t('nav.map'),
    },
    {
      path: '/studio',
      label: t('nav.studio'),
    },
  ]

  return (
    <div className="dark flex z-30 gap-2 justify-between px-4 absolute top-2 left-0 right-0">
      <div />
      <div className="flex gap-2 border-main-border">
        {routes.map((route) => (
          <LocalizedLink
            key={route.path}
            to={route.path}
            className="px-2 py-1 flex rounded-md border border-main-border bg-main-bg text-main-text text-body-2-semibold"
          >
            {route.label}
          </LocalizedLink>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle showLabel={false} />
      </div>
    </div>
  )
}
