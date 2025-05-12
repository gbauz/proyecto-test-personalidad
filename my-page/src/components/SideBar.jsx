import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, Users } from "lucide-react";
import { useEffect, useState } from "react";

const SideBar = ({ isOpen }) => {
  const [rol, setRol] = useState("");
  const location = useLocation();

  useEffect(() => {
    const rolName = localStorage.getItem("rolName");
    setRol(rolName);
  }, []);

  const navItemClass = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium ${
      location.pathname === path
        ? "bg-orange-100 text-orange-700"
        : "hover:bg-orange-50 hover:text-orange-600 text-gray-700"
    }`;

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 text-gray-800 shadow-lg transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:static lg:translate-x-0`}
    >
      <div className="flex flex-col items-center py-6 border-b border-gray-100">
        <img
          src="https://i.ibb.co/WpcSs5vm/imagen-2025-05-11-012001084.png"
          alt="Humanalyze Logo"
          className="w-32 h-auto object-contain mb-2"
        />
        <span className="text-sm text-gray-500 tracking-wide">Empowering People</span>
      </div>

      <nav className="mt-6 px-4">
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/dashboard" className={navItemClass("/dashboard")}>
              <Home className="w-5 h-5" />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/report" className={navItemClass("/report")}>
              <BarChart2 className="w-5 h-5" />
              <span>Reportes</span>
            </Link>
          </li>
          {rol !== "Postulante" && (
            <li>
              <Link to="/register" className={navItemClass("/register")}>
                <Users className="w-5 h-5" />
                <span>Usuarios</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-0 w-full px-6 text-xs text-center text-gray-400">
        © 2025 Humanalyze
      </div>
    </aside>
  );
};

export default SideBar;
