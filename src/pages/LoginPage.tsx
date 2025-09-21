import { useState } from "react";
import EnterPhoneNumberForm from "../components/auth/EnterPhoneNumberForm";
import VerifyOtpForm from "../components/auth/VerifyOtpForm";

type LoginStep = "enter-phone" | "verify-otp";

interface Props {
  onLoginSuccess: () => void;
}

const LoginPage = ({ onLoginSuccess }: Props) => {
  const [step, setStep] = useState<LoginStep>("enter-phone");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneSubmit = (phone: string) => {
    console.log("Phone number submitted:", phone);
    setPhoneNumber(phone);
    setStep("verify-otp");
  };

  const handleOtpSubmit = (otp: string) => {
    console.log(`Verifying OTP ${otp} for phone number ${phoneNumber}`);
    // اینجا فانکشن والد را فراخوانی می‌کنیم تا وضعیت لاگین را تغییر دهد
    onLoginSuccess();
  };

  const handleBackToPhoneStep = () => {
    setStep("enter-phone");
  };

  const backgroundClass =
    step === "enter-phone" ? "bg-dark-pattern" : "bg-primary-red";

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center transition-all duration-500 ${backgroundClass}`}
    >
      {step === "enter-phone" ? (
        <EnterPhoneNumberForm onSubmit={handlePhoneSubmit} />
      ) : (
        <VerifyOtpForm
          phoneNumber={phoneNumber}
          onSubmit={handleOtpSubmit}
          onEditPhone={handleBackToPhoneStep}
        />
      )}
    </div>
  );
};

export default LoginPage;
