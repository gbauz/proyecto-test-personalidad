import { Routes, Route } from 'react-router-dom'
import Home from '@pages/Home'
// import UserPage from '@features/user/pages/UserPage'
import NotFound from '@pages/NotFound' // Te doy este componente también ahora

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/users" element={<UserPage />} /> */}
      
      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
