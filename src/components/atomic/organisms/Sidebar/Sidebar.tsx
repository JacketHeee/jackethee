import { Form, KanbanSquare, Menu, Pyramid, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Sidebar() {
  const [isExpandSidebar, setIsExpandSidebar] = useState(false)
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
      icon: <KanbanSquare size={20} />, // Bạn có thể đổi icon tùy ý
    },
    {
      path: 'https://jackethee.sentry.io/',
      label: t('sidebar.sentry'),
      icon: <Pyramid size={20} />, // Bạn có thể đổi icon tùy ý
    },
  ]
  return (
    <div
      className={`h-full border-r border-main-border bg-main-bg text-main-text flex flex-col transition-[width] duration-300 ease-in-out ${
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
        {isExpandSidebar &&
          links.map((link, index) => (
            <Link
              key={index} // Cần có key khi dùng map
              target="_blank"
              rel="noopener noreferrer"
              to={link.path}
              className="py-2 px-4 flex gap-2 rounded-md items-center hover:bg-main-text/10 text-body-2 transition-colors duration-200"
            >
              {link.icon}
              <span className="whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
      </div>
    </div>
  )
}
