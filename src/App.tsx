import { useState, useEffect } from "react";
import { useAppSelector } from "./app/hooks"; // <-- ایمپورت هوک جدید
import DashboardLayout from "./components/layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { mode } = useAppSelector((state) => state.theme); // <-- استفاده از هوک جدید
  const [activePage, setActivePage] = useState<Page>("orders"); // <-- صفحه فعال را روی orders تنظیم کن

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  const navigateTo = (page: Page) => {
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case "events":
        return <EventsPage />;
      case "orders":
        return <OrdersPage />;
      default:
        return <EventsPage />;
    }
  };






  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <>
      {isLoggedIn ? (
        <DashboardLayout onLogout={handleLogout}>
          {renderPage()}
        </DashboardLayout>
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;
