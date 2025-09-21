import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";
import DashboardLayout from "./components/layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import EventsPage from "./pages/EventsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { mode } = useSelector((state: RootState) => state.theme);
// const { mode } = useAppSelector((state) => state.theme);
  // این useEffect با هر بار تغییر تم، کلاس تگ html را عوض می‌کند
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    localStorage.setItem("theme", mode); // ذخیره تم در حافظه مرورگر
  }, [mode]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="font-shabnam">
        {isLoggedIn ? (
          <DashboardLayout onLogout={handleLogout}>
            <EventsPage />
          </DashboardLayout>
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </>
  );
}

export default App;
