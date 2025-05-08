import { Link } from "react-router-dom";
import { Home, BarChart2, Users } from "lucide-react"; // o cualquier librería de íconos
import { useEffect, useState } from "react";


const SideBar = () => {
  const [rol, setRol] = useState("")

  useEffect(() => {
    const rolName = localStorage.getItem("rolName");
    setRol(rolName);
  }, []);



  return (
    <aside
      id="drawer-navigation"
      className="fixed top-0 left-0 z-40 w-64 h-screen p-6 bg-white border-r border-gray-200 text-gray-800 transition-transform -translate-x-full lg:translate-x-0"
      tabIndex="-1"
      aria-labelledby="drawer-navigation-label"
    >
      <h1 className="text-2xl font-extrabold text-orange-600 mb-10">Humanalyze</h1>

      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Home size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/report"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <BarChart2 size={20} />
              Report
            </Link>
          </li>
          {rol != "Postulante" && (
            <li>
            <Link
              to="/register"
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Users size={20} />
              User Management
            </Link>
          </li>
          )}
          
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
