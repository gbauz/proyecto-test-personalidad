import Header from '@components/Header'
import Sidebar from '@components/Sidebar'
import Footer from '@components/Footer'

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral text-darkText">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout
