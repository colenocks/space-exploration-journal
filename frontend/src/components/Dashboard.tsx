import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

const Dashboard = () => {
  return (
    <main className='flex h-screen py-1 bg-gray-850 p-0.5'>
      <Navigation />

      <div className='flex-grow flex flex-col'>
        <div className='top-2 w-full lg:px-40 z-10 rounded-tl-lg rounded-tr-lg bg-gray-900 px-10 pt-6'>
          <Header title='Welcome, Space Explorer' />
        </div>

        <div className='flex-grow px-10 py-6 lg:px-40 bg-gray-900 text-gray-100 overflow-y-auto rounded-bl-lg rounded-br-lg'>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
