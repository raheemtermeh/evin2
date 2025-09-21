import { useState, useRef, ChangeEvent, KeyboardEvent, FormEvent } from "react";

interface Props {
  phoneNumber: string;
  onSubmit: (otp: string) => void;
  onEditPhone: () => void; // <-- پراپ جدید برای دکمه ویرایش
}

const OTP_LENGTH = 6;

const VerifyOtpForm = ({ phoneNumber, onSubmit, onEditPhone }: Props) => {
  // <-- پراپ جدید رو اینجا دریافت کن
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === OTP_LENGTH) {
      onSubmit(otpCode);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
      <h2 className="text-2xl font-extrabold mb-4">کد تایید</h2>

      {/* START: بلوک تغییر یافته */}
      <div className="mb-6">
        <p className="text-gray-500">کد ارسال شده به شماره زیر را وارد کنید:</p>

        <div
          className="flex items-center justify-center gap-2 mt-2 font-semibold"
          dir="ltr"
        >
          <span>{phoneNumber}</span>
        </div>
        <button
          onClick={onEditPhone}
          className="text-sm text-[#717171] hover:underline"
        >
          ویرایش شماره موبایل
        </button>
      </div>
      {/* END: بلوک تغییر یافته */}

      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}
        </div>

        <p className="text-gray-400 text-sm mt-4">
          ارسال مجدد کد تا ۰۱:۵۴ دیگر
        </p>

        <button
          type="submit"
          className="w-full bg-primary-red text-white font-bold p-3 rounded-lg mt-6 hover:bg-red-700 transition-colors"
        >
          تایید
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
