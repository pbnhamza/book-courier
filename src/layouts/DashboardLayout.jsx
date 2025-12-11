import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import DashboardSidebar from '../components/DashboardSidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="flex flex-col lg:flex-row  ml-9 ">
        <DashboardSidebar />
        <main className="flex-grow p-8 bg-base-200 ">
          <Outlet />
        </main>
      </div> 
    </div>
  );
};

export default DashboardLayout;
