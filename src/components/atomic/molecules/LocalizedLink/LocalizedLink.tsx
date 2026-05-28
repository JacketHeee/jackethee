import { Link, type LinkProps, useLocation, useParams } from 'react-router-dom'
import { supportedLanguages, type SupportedLanguage } from '@/i18n'

export interface LocalizedLinkProps extends LinkProps {
  to: string
}

const isExternalUrl = (value: string) =>
  value.startsWith('http://') ||
  value.startsWith('https://') ||
  value.startsWith('mailto:') ||
  value.startsWith('tel:')

const normalizePath = (value: string) =>
  value.startsWith('/') ? value : `/${value}`

export default function LocalizedLink({ to, ...rest }: LocalizedLinkProps) {
  const { pathname } = useLocation()
  const { lng } = useParams()
  const currentLng = supportedLanguages.includes(lng as SupportedLanguage)
    ? (lng as SupportedLanguage)
    : null

  if (isExternalUrl(to) || !currentLng) {
    return <Link to={to} {...rest} />
  }

  const nextPath = to === '/' ? '' : normalizePath(to)
  const mergedPath = `/${currentLng}${nextPath}`

  if (pathname === mergedPath) {
    return <Link to={pathname} {...rest} />
  }

  return <Link to={mergedPath} {...rest} />
}
