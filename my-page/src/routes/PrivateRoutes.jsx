import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Dashboard from '../Features/Dashboard/Dashboard';
import Settings from '../Features/Settings/Settings';

// Simulación de auth (debes reemplazar por tu lógica real)
const isAuthenticated = true;

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
