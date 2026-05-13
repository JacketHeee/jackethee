import { Link } from 'react-router-dom'

export default function Header() {
  const routes = [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/map',
      label: 'Map',
    },
    {
      path: '/studio',
      label: '3D Studio',
    },
  ]
  return (
    <div className="flex gap-2 fixed top-4 left-0 right-0 z-50 justify-center">
      {routes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          className="px-2 py-1 rounded-md bg-[#1e1e1ee5] text-white"
        >
          {route.label}
        </Link>
      ))}
    </div>
  )
}
