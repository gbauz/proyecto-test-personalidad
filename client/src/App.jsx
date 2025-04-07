import MainLayout from '@layouts/MainLayout'
import AppRoutes from '@router/index' // 👈 Importás AppRoutes

const App = () => {
  return (
    <MainLayout>
      <AppRoutes /> {/* 👈 Usás AppRoutes acá */}
    </MainLayout>
  )
}

export default App
