import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { FaRocket, FaGalacticRepublic, FaHouseFlag } from "react-icons/fa6";

const Navigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className={`bg-gray-900 text-gray-100 mx-1 flex-shrink-0 h-full px-5 py-6 shadow-xl flex flex-col items-start rounded-lg transition-width duration-300 ${
        isCollapsed ? "w-16" : "w-52"
      }`}>
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className='text-gray-100 mb-4 focus:outline-none'>
        {isCollapsed ? <FiArrowRightCircle size={24} /> : <FiArrowLeftCircle size={24} />}
      </button>

      {/* Sidebar Content */}
      <h2 className={`text-2xl mb-6 text-left font-bold transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>Dashboard</h2>

      <ul className='space-y-4 w-full'>
        <li>
          <Link
            to='/'
            className={`flex items-center w-full gap-x-3 transition-colors duration-300 ${
              isActive("/") ? "text-cyan-600" : "text-gray-100 hover:text-cyan-400"
            }`}>
            <div>
              <FaHouseFlag size={20} />
            </div>
            <span className={`transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to='/plan'
            className={`flex items-center w-full gap-x-3 transition-colors duration-300 ${
              isActive("/plan") ? "text-cyan-600" : "text-gray-100 hover:text-cyan-400"
            }`}>
            <div>
              <FaRocket size={20} />
            </div>
            <span className={`transition-opacity duration-300 whitespace-nowrap ${isCollapsed ? "opacity-0" : "opacity-100"}`}>Plan Trip</span>
          </Link>
        </li>
        <li>
          <Link
            to='/planets'
            className={`flex items-center w-full gap-x-3 transition-colors duration-300 ${
              isActive("/planets") ? "text-cyan-600" : "text-gray-100 hover:text-cyan-400"
            }`}>
            <div>
              <FaGalacticRepublic size={20} />
            </div>
            <span className={`transition-opacity duration-300 whitespace-nowrap ${isCollapsed ? "opacity-0" : "opacity-100"}`}>Planet List</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
