import Header from './Header';
import SideBar from './SideBar';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
