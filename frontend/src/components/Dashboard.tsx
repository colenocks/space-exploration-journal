import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const Dashboard = () => {
  return (
    <div className='flex h-screen py-2 bg-gray-850 p-1'>
      <Navigation />
      <div className='flex-grow px-8 py-6 rounded-lg bg-gray-900 text-gray-100'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
