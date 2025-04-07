import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 shadow-soft">
      <nav className="flex flex-col space-y-2">
        <Link to="/" className="text-primary hover:underline">Home</Link>
        <Link to="/users" className="text-primary hover:underline">Usuarios</Link>
      </nav>
    </aside>
  )
}

export default Sidebar
