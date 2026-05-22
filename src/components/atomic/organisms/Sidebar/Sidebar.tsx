import { Form, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [isExpandSidebar, setIsExpandSidebar] = useState(false)
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
        {isExpandSidebar && (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={'https://jackethee.jp.larksuite.com/'}
            className="py-2 px-4 flex gap-2 rounded-md items-center hover:bg-[#2b2b2be5]  text-white"
          >
            <Form size={20} />
            Tài liệu
          </Link>
        )}
      </div>
    </div>
  )
}
