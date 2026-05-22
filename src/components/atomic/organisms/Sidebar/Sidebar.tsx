import { Form, KanbanSquare, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [isExpandSidebar, setIsExpandSidebar] = useState(false)

  const links = [
    {
      path: 'https://jackethee.jp.larksuite.com/',
      label: 'Tài liệu',
      icon: <Form size={20} />,
    },
    {
      path: 'https://jackethee.atlassian.net/',
      label: 'Quản lý task',
      icon: <KanbanSquare size={20} />, // Bạn có thể đổi icon tùy ý
    },
  ]
  return (
    <div
      className={`h-full bg-[#1e1e1ee5] text-white flex flex-col transition-all duration-300 ease-in-out ${
        isExpandSidebar ? 'w-75' : 'w-14'
      }`}
    >
      <div
        className={`px-4 py-4 border-b border-[#2b2b2be5] flex ${isExpandSidebar ? 'justify-between' : 'justify-center'}`}
      >
        <button
          type="button"
          onClick={() => setIsExpandSidebar(!isExpandSidebar)}
          className="p-2 hover:bg-[#2b2b2be5] rounded-md cursor-pointer block"
        >
          <Menu size={20} />
        </button>

        {isExpandSidebar && (
          <button
            type="button"
            onClick={() => setIsExpandSidebar(!isExpandSidebar)}
            className="p-2 hover:bg-[#2b2b2be5] rounded-md cursor-pointer block"
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
              className="py-2 px-4 flex gap-2 rounded-md items-center hover:bg-[#2b2b2be5] text-white transition-colors duration-200"
            >
              {link.icon}
              <span className="whitespace-nowrap">{link.label}</span>
            </Link>
          ))}
      </div>
    </div>
  )
}
