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
    <div className="flex z-30 gap-2 justify-center px-4 absolute top-2 left-0 right-0">
      <div className="flex gap-2">
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
    </div>
  )
}
