import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 importar
import { HiMenu } from 'react-icons/hi';

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // 👈 hook para redirección

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 👇 Función para cerrar sesión y redirigir
  const handleLogout = () => {
    // Aquí podrías limpiar tokens, contexto, etc.
    setDropdownOpen(false);
    localStorage.removeItem("persist:root")
    localStorage.removeItem("token")
    navigate('/login');
  };

  return (
    <nav className="bg-black border-b border-gray-800 shadow-md px-4">
      <div className="flex items-center justify-between p-4 w-full">

        {/* Sidebar button */}
        <button
          className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm p-2.5 focus:outline-none"
          type="button"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
        >
          <HiMenu className="w-5 h-5" />
        </button>

        {/* User profile with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-600"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="user profile"
            />
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg transform transition-all duration-200 origin-top-right ${
              isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
            }`}
          >
            <div className="px-4 py-3 border-b border-gray-200">
              <span className="block text-sm font-medium">Bonnie Green</span>
              <span className="block text-sm text-gray-500 truncate">name@flowbite.com</span>
            </div>
            <ul className="py-1">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Perfil
                </a>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Header;
