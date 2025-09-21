import { NavLink } from "react-router-dom"; // <-- ایمپورت NavLink
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleTheme } from "../../features/theme/themeSlice";
// ... بقیه import ها مثل قبل ...
import {
  IoHomeOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { BsReceipt } from "react-icons/bs";
import avatar from "../../assets/mmdi.jpg";

interface Props {
  onLogout: () => void;
  isOpen: boolean;
}

const Sidebar = ({ onLogout, isOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.theme);

  const handleToggleTheme = () => dispatch(toggleTheme());

  const menuItems = [
    { title: "رویداد ها", icon: <IoHomeOutline size={22} />, path: "/" },
    { title: "سفارشات", icon: <BsReceipt size={22} />, path: "/orders" },
    // ... بقیه آیتم‌ها با path مخصوص خودشان
  ];

  return (
    <aside
      className={`
        bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
        w-72 p-4 flex flex-col shadow-lg flex-shrink-0
        fixed top-0 right-0 h-screen z-30 transition-transform duration-300 ease-in-out
        lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:rounded-3xl lg:ml-4 lg:translate-x-0
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex flex-col items-center justify-center my-6">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <button
          onClick={handleToggleTheme}
          className="mt-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700"
          aria-label="Toggle theme"
        >
          {mode === "light" ? (
            <IoMoonOutline size={20} />
          ) : (
            <IoSunnyOutline size={20} />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-none">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.path}
                end // برای اینکه لینک اصلی "/" با بقیه لینک‌ها فعال نشود
                className={({ isActive }) =>
                  `flex items-center gap-x-4 p-3 rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary-red text-white shadow-md"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                {item.icon}
                <span className="font-semibold">{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* دکمه خروج جداگانه برای دسترسی بهتر */}
      <div className="mt-4">
        <div
          onClick={onLogout}
          className="flex items-center gap-x-4 p-3 rounded-xl transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <IoLogOutOutline size={22} />
          <span className="font-semibold">خروج</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
