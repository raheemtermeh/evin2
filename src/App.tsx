import { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./app/hooks";

import DashboardLayout from "./components/layout/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import PwaReloadPrompt from "./components/common/PwaReloadPrompt";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Roleprivacy from "./pages/Roleprivacy";
import About from "./pages/About";
import { debug } from "./utils/debug";

const EventsPage = lazy(() => import("./pages/EventsPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const OrderDetailsPage = lazy(() => import("./pages/OrderDetailsPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const FinancialReportPage = lazy(() => import("./pages/FinancialReportPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ReportIssuePage = lazy(() => import("./pages/ReportIssuePage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { mode } = useAppSelector((state) => state.theme);

  debug.log("App component rendered");
  debug.log("Login status:", isLoggedIn);
  debug.log("Theme mode:", mode);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    localStorage.setItem("theme", mode);
  }, [mode]);

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  debug.log("Current path:", window.location.pathname);
  return (
    <>
      <PwaReloadPrompt />

      <Suspense fallback={<LoadingSpinner />}>
        {isLoggedIn ? (
          <Routes>
            <Route
              path="/"
              element={<DashboardLayout onLogout={handleLogout} />}
            >
              <Route index element={<EventsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:orderId" element={<OrderDetailsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route
                path="financial-report"
                element={<FinancialReportPage />}
              />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="report-issue" element={<ReportIssuePage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="privacy" element={<Roleprivacy />} />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route
              path="*"
              element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
            />
          </Routes>
        )}
      </Suspense>
    </>
  );
}

export default App;
