import { useState, useRef, useEffect } from "react";
import type { ChangeEvent, KeyboardEvent, FormEvent } from "react";

interface Props {
  phoneNumber: string;
  token: string; 
  onSubmit: () => void;
  onEditPhone: () => void;
}

const OTP_LENGTH = 5;
const RESEND_TIMEOUT = 120;

const VerifyOtpForm = ({
  phoneNumber,
  token,
  onSubmit,
  onEditPhone,
}: Props) => {
  const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== OTP_LENGTH) return;

    setIsSubmitting(true);
    if (!token) {
      alert("توکن ورود معتبر نیست. لطفاً دوباره تلاش کنید.");
      setIsSubmitting(false);
      return;
    }
    const body = { token, code: otpValue, action: "verify" };

    try {
      console.log("Sending body:", body);

      const res = await fetch(
        "https://fz-backoffice.linooxel.com/api/user/check-sms-login-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server error ${res.status}: ${text}`);
      }

      const data = await res.json();
      console.log("Login success:", data);

      if (data?.data?.accessToken && data?.data?.refreshToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
      }

      onSubmit();
    } catch (err) {
      console.error("Login failed:", err);
      alert("کد تایید معتبر نیست یا خطا در سرور رخ داد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    setTimeLeft(RESEND_TIMEOUT);
    setCanResend(false);
    setOtp(new Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();

    try {
      const res = await fetch(
        "https://fz-backoffice.linooxel.com/api/user/check-sms-login-user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, action: "send_again" }),
        }
      );
      const data = await res.json();
      console.log("Resend OTP:", data);
    } catch (err) {
      console.error("Failed to resend OTP:", err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
      <h2 className="text-2xl font-extrabold mb-4">کد تایید</h2>
      <div className="mb-6">
        <p className="text-gray-500">کد ارسال شده به شماره زیر را وارد کنید:</p>
        <div
          className="flex items-center justify-center gap-2 mt-2 font-semibold"
          dir="ltr"
        >
          <span>{phoneNumber}</span>
        </div>
        <button
          type="button"
          onClick={onEditPhone}
          className="text-sm text-[#717171] hover:underline"
        >
          ویرایش شماره موبایل
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2" dir="ltr">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => void (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg"
            />
          ))}
        </div>
        <div className="mt-4">
          {canResend ? (
            <button
              type="button"
              onClick={handleResendCode}
              className="text-primary-red hover:underline"
            >
              ارسال مجدد کد
            </button>
          ) : (
            <p className="text-gray-400 text-sm">
              ارسال مجدد کد تا {timeLeft} ثانیه دیگر
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={otp.join("").length !== OTP_LENGTH || isSubmitting}
          className="w-full bg-primary-red text-white font-bold p-3 rounded-lg mt-6"
        >
          {isSubmitting ? "در حال ارسال..." : "تایید"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpForm;
