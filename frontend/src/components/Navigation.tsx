import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className='bg-gray-900 mx-1 rounded-lg text-gray-100 h-full p-5 shadow-xl'>
      <h2 className='text-2xl mb-6 text-center font-bold'>Dashboard</h2>
      <ul className='space-y-3'>
        <li className='text-gray-100 hover:text-cyan-400 transition-colors duration-300 hover:cursor-pointer py-0.5 px-1'>
          <Link to='/'>Home</Link>
        </li>
        <li className='text-gray-100 hover:text-cyan-400 transition-colors duration-300 hover:cursor-pointer py-0.5 px-1'>
          <Link to='/page1'>Page 1</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
