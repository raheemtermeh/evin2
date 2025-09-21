import { useState, FormEvent } from "react";

interface Props {
  onSubmit: (phone: string) => void;
}

const EnterPhoneNumberForm = ({ onSubmit }: Props) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // اینجا میتونی ولیدیشن هم اضافه کنی
    if (phone.trim()) {
      onSubmit(phone);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
      <h1 className="text-2xl font-extrabold mb-2">ورود</h1>
      <h2 className="text-xl mb-4 text-gray-500">به فان زون خوش آمدید</h2>
      <p className="text-gray-500 mb-6">
        لطفا برای ورود به فان زون، شماره تلفن همراه خود را وارد کنید
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="tel" // استفاده از تایپ مناسب برای شماره تلفن
          dir="ltr" // شماره تلفن از چپ به راست نوشته می‌شود
          placeholder="0912 345 6789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-primary-red text-white font-bold p-3 rounded-lg mt-6 hover:bg-red-700 transition-colors"
        >
          ورود
        </button>
      </form>
    </div>
  );
};

export default EnterPhoneNumberForm;
