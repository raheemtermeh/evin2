import OrderItemCard from "../components/orders/OrderItemCard";

const OrdersPage = () => {
  const ordersData = [
    {
      id: 1,
      title: "مافیا",
      category: "mafia +10",
      date: "28 اردیبهشت 1403 ساعت 22",
      capacity: 30,
      remaining: 5,
    },
    {
      id: 2,
      title: "منچ",
      category: "ludo +10",
      date: "11 بهمن 1403 ساعت 18",
      capacity: 4,
      remaining: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          رزروهای من
        </h1>
        <div className="relative">
          <select className="appearance-none w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:border-primary-red">
            <option>سفارشات جاری</option>
            <option>سفارشات پیشین</option>
            <option>کنسلی‌ها</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {ordersData.map((order) => (
          <OrderItemCard key={order.id} {...order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
