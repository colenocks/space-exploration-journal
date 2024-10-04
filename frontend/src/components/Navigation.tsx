import { Link, useLocation } from "react-router-dom";
import { FiHome, FiFileText } from "react-icons/fi";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className='bg-gray-900 mx-1 rounded-lg text-gray-100 h-full w-60 p-5 shadow-xl'>
      <h2 className='text-2xl mb-6 text-left font-bold'>Dashboard</h2>
      <ul className='space-y-3'>
        <li className=''>
          <Link
            to='/'
            className={`flex items-center transition-colors duration-300 ${isActive("/") ? "text-cyan-600" : "text-gray-100 hover:text-cyan-400"}`}>
            <FiHome size={20} />
            <span className={`ml-3 mt-0.5 transition-opacity duration-300`}>Home</span>
          </Link>
        </li>
        <li className=''>
          <Link
            to='/page1'
            className={`flex items-center transition-colors duration-300 ${
              isActive("/page1") ? "text-cyan-600" : "text-gray-100 hover:text-cyan-400"
            }`}>
            <FiFileText size={20} />
            <span className={`ml-3 mt-0.5 transition-opacity duration-300`}>Page 1</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
