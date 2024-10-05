import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

const Dashboard = () => {
  return (
    <div className='flex h-screen py-2 bg-gray-850 p-1'>
      <Navigation />
      <div className='flex-grow lg:px-40 px-10 py-6 rounded-lg bg-gray-900 text-gray-100'>
        <Header title={"Welcome, Space Explorer"} />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
