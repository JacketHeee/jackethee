import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'

// Router, Context, Global State
export default function App() {
  return <RouterProvider router={router} />
}
