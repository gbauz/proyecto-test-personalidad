import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4 text-primary">404</h1>
      <p className="text-lg mb-6">Ups... La página que buscás no existe.</p>
      <Link to="/" className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Volver al inicio
      </Link>
    </div>
  )
}

export default NotFound
