import { Route, Routes } from 'react-router-dom';
import Login from '../Features/Auth/Login';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Puedes agregar /register, /forgot-password, etc. */}
    </Routes>
  );
};

export default PublicRoutes;
