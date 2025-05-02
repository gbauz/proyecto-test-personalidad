import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Dashboard from '../Features/Dashboard/Dashboard';
import Settings from '../Features/Settings/Settings';
import Register from '../Features/Auth/Register';



const PrivateRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
      >
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='register' element={< Register />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );

};

export default PrivateRoutes;
