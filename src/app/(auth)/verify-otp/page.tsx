"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bannerSignIn } from "@/contants/images";

const VerifyOtpPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Redirect nếu không có thông tin user
  // React.useEffect(() => {
  //   if (!user?.id || !user?.email) {
  //     router.push("/register");
  //   }
  // }, [user, router]);
  //
  // // Clear code khi có lỗi để user dễ nhập lại
  // React.useEffect(() => {
  //   if (error) {
  //     setCode(["", "", "", "", "", ""]);
  //     inputRefs.current[0]?.focus();
  //   }
  // }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit khi nhập đủ 6 số
    // if (value && index === 5 && user?.id) {
    //   const fullCode = [...newCode];
    //   fullCode[index] = value;
    //   if (fullCode.every((digit) => digit !== "")) {
    //     setTimeout(() => {
    //       verify({
    //         userId: user.id!,
    //         otpCode: fullCode.join(""),
    //       });
    //     }, 100); // Delay nhỏ để UI update
    //   }
    // }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedNumbers = pastedData.replace(/\D/g, "").slice(0, 6); // Chỉ lấy số và tối đa 6 ký tự

    if (pastedNumbers.length > 0) {
      const newCode = [...code];
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedNumbers[i] || "";
      }
      setCode(newCode);

      // Focus vào ô cuối có data hoặc ô đầu tiên empty
      const lastFilledIndex = pastedNumbers.length - 1;
      const nextEmptyIndex = newCode.findIndex((digit) => digit === "");
      const targetIndex =
        nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(lastFilledIndex, 5);
      inputRefs.current[targetIndex]?.focus();

      // Auto submit nếu paste đủ 6 số
      // if (pastedNumbers.length === 6 && user?.id) {
      //   setTimeout(() => {
      //     verify({
      //       userId: user.id!,
      //       otpCode: pastedNumbers,
      //     });
      //   }, 100);
      // }
    }
  };

  const handleVerify = () => {};

  const handleResendCode = () => {};

  return (
    <div className="mx-auto flex h-full items-center justify-center bg-white px-6 py-4">
      <div className="w-full">
        {/* Banner Image - Hidden on mobile, visible on large screens */}
        <Image
          src={bannerSignIn}
          alt="logo app"
          className="mx-auto my-4 w-44"
        />

        {/* Verify Account Form Section */}
        <div className="mx-auto w-full max-w-md">
          {/* Title and Description */}
          <div className="mb-8 text-center sm:mb-10">
            <h1 className="mb-4 text-xl font-semibold text-[#212B36] sm:mb-6 sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl">
              Xác thực tài khoản
            </h1>
            <p className="text-sm leading-relaxed text-[#637381] sm:text-base">
              Chúng tôi đã gửi mã xác nhận gồm 6 chữ số qua email. Vui lòng nhập
              mã vào ô bên dưới để xác minh email của bạn.
            </p>
          </div>

          {/* Verification Code Inputs */}
          <div className="mb-8 flex justify-center gap-2 sm:mb-10 sm:gap-3">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="h-10 w-10 rounded-lg border border-gray-200 text-center text-base font-semibold focus:border-blue-500 focus:ring-blue-500 sm:h-12 sm:w-12 sm:text-lg"
                maxLength={1}
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            className="mb-6 h-11 w-full rounded-xl bg-[#2F57EF] text-sm font-semibold text-white transition-colors hover:bg-[#254bdc] disabled:cursor-not-allowed disabled:bg-gray-400 sm:h-12 sm:text-base"
          >
            Xác thực tài khoả
          </Button>

          {/* Resend Code */}
          <div className="mb-6 text-center text-sm sm:mb-8 sm:text-base">
            <span className="text-[#637381]">Bạn không nhận được mã? </span>
            <button
              onClick={handleResendCode}
              className="cursor-pointer font-medium text-[#2F57EF] transition-colors hover:underline disabled:cursor-not-allowed disabled:text-gray-400"
            >
              Gửi lại mã{" "}
            </button>
          </div>

          {/* Back to Login */}
          <button
            onClick={() => router.push("/login")}
            className="flex w-full cursor-pointer items-center justify-center gap-2 text-sm text-[#637381] transition-colors hover:text-[#2F57EF] sm:text-base"
          >
            <span>←</span>
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
