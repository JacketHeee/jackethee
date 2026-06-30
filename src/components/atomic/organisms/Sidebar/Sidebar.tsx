import {
  Form,
  KanbanSquare,
  Menu,
  Pyramid,
  Search,
  Snail,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Sidebar() {
  // Trạng thái mở rộng cho desktop rail
  const [isExpandSidebar, setIsExpandSidebar] = useState(false)
  // Trạng thái mở drawer cho mobile
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { t } = useTranslation()

  const links = [
    {
      path: 'https://jackethee.jp.larksuite.com/',
      label: t('sidebar.docs'),
      icon: <Form size={20} />,
    },
    {
      path: 'https://jackethee.atlassian.net/',
      label: t('sidebar.tasks'),
      icon: <KanbanSquare size={20} />,
    },
    {
      path: 'https://jackethee.sentry.io/',
      label: t('sidebar.sentry'),
      icon: <Pyramid size={20} />,
    },
    {
      path: 'https://webflow.com/',
      label: t('sidebar.weblow'),
      icon: <Snail size={20} />,
    },
  ]

  // Khóa cuộn body khi drawer mở trên mobile
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  const renderLinks = (onClick?: () => void) =>
    links.map((link, index) => (
      <Link
        key={index}
        target="_blank"
        rel="noopener noreferrer"
        to={link.path}
        onClick={onClick}
        className="py-2 px-4 flex gap-2 rounded-md items-center hover:bg-main-text/10 text-body-2 transition-colors duration-200"
      >
        {link.icon}
        <span className="whitespace-nowrap">{link.label}</span>
      </Link>
    ))

  return (
    <>
      {/* ============ MOBILE: nút mở drawer (chỉ hiện khi drawer đóng) ============ */}
      <button
        type="button"
        aria-label={t('sidebar.docs')}
        onClick={() => setIsDrawerOpen(true)}
        className="sm:hidden fixed top-2 left-2 z-40 p-2 rounded-md border border-main-border bg-main-bg text-main-text shadow-md hover:bg-main-text/10"
      >
        <Menu size={14} />
      </button>

      {/* ============ MOBILE: backdrop ============ */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`sm:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ============ MOBILE: drawer trượt từ trái ============ */}
      <div
        className={`sm:hidden fixed inset-y-0 left-0 z-50 w-[min(18.75rem,80vw)] border-r border-main-border bg-main-bg text-main-text flex flex-col transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 py-4 border-b border-main-border flex justify-between items-center">
          <button
            type="button"
            className="p-2 hover:bg-main-text/10 rounded-md cursor-pointer block"
          >
            <Search size={20} />
          </button>
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 hover:bg-main-text/10 rounded-md cursor-pointer block"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-4 py-2 flex flex-col">
          {renderLinks(() => setIsDrawerOpen(false))}
        </div>
      </div>

      {/* ============ DESKTOP/TABLET: rail tĩnh có thể mở rộng ============ */}
      <div
        className={`hidden sm:flex h-full border-r border-main-border bg-main-bg text-main-text flex-col transition-[width] duration-300 ease-in-out shrink-0 ${
          isExpandSidebar ? 'w-75' : 'w-14'
        }`}
      >
        <div
          className={`px-4 py-4 border-b border-main-border flex ${isExpandSidebar ? 'justify-between' : 'justify-center'}`}
        >
          <button
            type="button"
            onClick={() => setIsExpandSidebar(!isExpandSidebar)}
            className="p-2 hover:bg-main-text/10 rounded-md cursor-pointer block"
          >
            <Menu size={20} />
          </button>

          {isExpandSidebar && (
            <button
              type="button"
              onClick={() => setIsExpandSidebar(!isExpandSidebar)}
              className="p-2 hover:bg-main-text/10 rounded-md cursor-pointer block"
            >
              <Search size={20} />
            </button>
          )}
        </div>
        <div className="px-4 py-2 flex flex-col">
          {isExpandSidebar && renderLinks()}
        </div>
      </div>
    </>
  )
}
