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
    <div className="dark flex z-30 gap-2 items-center justify-between px-2 sm:px-4 absolute top-2 left-0 right-0">
      {/* Spacer giữ chỗ cho nút mở drawer trên mobile */}
      <div className="w-10 shrink-0 sm:w-0" />
      <div className="flex flex-wrap gap-1.5 sm:gap-2 border-main-border">
        {routes.map((route) => (
          <LocalizedLink
            key={route.path}
            to={route.path}
            className="px-2 py-1 flex rounded-md border border-main-border bg-main-bg text-main-text text-body-2-semibold whitespace-nowrap"
          >
            {route.label}
          </LocalizedLink>
        ))}
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <LanguageSwitcher />
        <ThemeToggle showLabel={false} />
      </div>
    </div>
  )
}
