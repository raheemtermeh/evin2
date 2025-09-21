import { useAppDispatch, useAppSelector } from "../../app/hooks"; // Import the new hooks
import { toggleTheme } from "../../features/theme/themeSlice";
import {
  IoHomeOutline,
  IoNotificationsOutline,
  IoPieChartOutline,
  IoPersonOutline,
  IoHeadsetOutline,
  IoShieldCheckmarkOutline,
  IoInformationCircleOutline,
  IoLogOutOutline,
  IoSunnyOutline,
  IoMoonOutline,
} from "react-icons/io5";
import {
  BsReceipt,
  BsExclamationCircle,
  BsQuestionCircle,
} from "react-icons/bs";
import avatar from "../../assets/mmdi.jpg";

interface Props {
  onLogout: () => void;
  isOpen: boolean;
}

const Sidebar = ({ onLogout, isOpen }: Props) => {
  const dispatch = useAppDispatch(); // Use the new hook
  const { mode } = useAppSelector((state) => state.theme); // Use the new hook

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const menuItems = [
    {
      title: "رویداد ها",
      icon: <IoHomeOutline size={22} />,
      href: "#",
      active: true,
    },
    { title: "سفارشات", icon: <BsReceipt size={22} />, href: "#" },
    { title: "اعلانات", icon: <IoNotificationsOutline size={22} />, href: "#" },
    { title: "گزارش مالی", icon: <IoPieChartOutline size={22} />, href: "#" },
    { title: "پروفایل", icon: <IoPersonOutline size={22} />, href: "#" },
    { title: "گزارش مشکل", icon: <BsExclamationCircle size={22} />, href: "#" },
    {
      title: "تماس با پشتیبانی",
      icon: <IoHeadsetOutline size={22} />,
      href: "#",
    },
    { title: "سوالات متداول", icon: <BsQuestionCircle size={22} />, href: "#" },
    {
      title: "قوانین و حریم خصوصی",
      icon: <IoShieldCheckmarkOutline size={22} />,
      href: "#",
    },
    {
      title: "درباره ما",
      icon: <IoInformationCircleOutline size={22} />,
      href: "#",
    },
    {
      title: "خروج",
      icon: <IoLogOutOutline size={22} />,
      href: "#",
      isLogout: true,
    },
  ];

  return (
    <aside
      className={`
        bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 w-72 h-screen-minus-2rem my-4 rounded-3xl shadow-lg flex flex-col p-4
        fixed top-0 right-0 z-30 transition-transform duration-300 ease-in-out
        lg:static lg:mr-4 lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
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
          className="mt-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label="Toggle theme"
        >
          {mode === "light" ? (
            <IoMoonOutline size={20} />
          ) : (
            <IoSunnyOutline size={20} />
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <div
                onClick={item.isLogout ? onLogout : undefined}
                className={`flex items-center gap-x-4 p-3 rounded-xl transition-colors cursor-pointer
                  ${
                    item.active
                      ? "bg-primary-red text-white shadow-md"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
              >
                {item.icon}
                <span className="font-semibold">{item.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
