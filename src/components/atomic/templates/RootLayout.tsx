import { PageLoader } from '@/components/global/PageLoader'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../organisms/Header/Header'
import Sidebar from '../organisms/Sidebar/Sidebar'

export default function RootLayout() {
  return (
    <div className="fixed inset-0 flex">
      <Sidebar />
      <div className="flex flex-col flex-1 relative overflow-y-auto">
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
