import { Route, Routes } from 'react-router-dom';
import Login from '../Features/Auth/Login';
import Landing from '../Features/Landing/Landing';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/landing" element={<Landing />} />
      {/* Puedes agregar /register, /forgot-password, etc. */}
    </Routes>
  );
};

export default PublicRoutes;
