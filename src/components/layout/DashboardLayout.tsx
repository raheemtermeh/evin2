import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
  onLogout: () => void;
}

const DashboardLayout = ({ children, onLogout }: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      dir="rtl"
      className="bg-gray-100 dark:bg-gray-900 min-h-screen relative lg:flex"
    >
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <Sidebar onLogout={onLogout} isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        {" "}
        {/* min-w-0 برای جلوگیری از سرریز شدن محتوا */}
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
