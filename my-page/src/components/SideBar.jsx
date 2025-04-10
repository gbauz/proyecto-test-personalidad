const SideBar = () => {
    return (
      <div
        id="drawer-navigation"
        className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-gray-900 text-white"
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-lg font-semibold uppercase text-gray-400 mb-4">
          Menu
        </h5>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
              Usuarios
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
              Productos
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 rounded-lg hover:bg-gray-700">
              Reportes
            </a>
          </li>
        </ul>
      </div>
    );
  };
  
  export default SideBar;
  