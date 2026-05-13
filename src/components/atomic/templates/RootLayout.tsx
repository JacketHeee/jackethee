import { PageLoader } from '@/components/global/PageLoader'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../organisms/Header/Header'

export default function RootLayout() {
  return (
    <div className="flex flex-col fixed inset-0 ">
      <Header />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </div>
  )
}
