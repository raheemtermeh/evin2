import { useState } from "react";
import { Outlet } from "react-router-dom"; // <-- ایمپورت Outlet
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  onLogout: () => void;
}

const DashboardLayout = ({ onLogout }: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      dir="rtl"
      className="bg-gray-100 dark:bg-gray-900 min-h-screen relative lg:flex"
    >
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <Sidebar onLogout={onLogout} isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet /> {/* <-- صفحات فرزند در اینجا رندر می‌شوند */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
