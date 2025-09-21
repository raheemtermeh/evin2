import {
  IoSearchOutline,
  IoNotificationsOutline,
  IoMenu,
} from "react-icons/io5";
import avatar from "../../assets/mmdi.jpg";

interface Props {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: Props) => {
  return (
    <header className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm flex justify-between items-center m-4 lg:m-0 lg:mt-4 lg:mx-6">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 dark:text-gray-300"
        >
          <IoMenu size={28} />
        </button>

        {/* Search Bar */}
        <div className="relative hidden md:block w-full max-w-xs">
          <input
            type="text"
            placeholder="جستجو..."
            className="bg-gray-100 dark:bg-gray-700 rounded-lg py-2 pr-10 pl-4 w-full focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <IoSearchOutline className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* User Info & Actions */}
      <div className="flex items-center gap-x-4">
        <label
          htmlFor="dark-mode-toggle"
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            {/* منطق این بخش به Redux منتقل شد، پس این اینپوت صرفا نمایشی است */}
            <div className="block bg-gray-200 dark:bg-gray-700 w-14 h-8 rounded-full"></div>
            <div className="dot absolute left-1 top-1 bg-white dark:bg-gray-900 w-6 h-6 rounded-full transition-transform dark:translate-x-full"></div>
          </div>
        </label>

        <button className="relative text-gray-600 dark:text-gray-300">
          <IoNotificationsOutline size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-red text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <img
          src={avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
