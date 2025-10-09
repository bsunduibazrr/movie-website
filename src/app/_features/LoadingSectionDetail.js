"use client";
import { useEffect, useState } from "react";
import { NavbarSection } from "./NavbarSection";
import { FooterSection } from "./FooterSection";

export function LoadingDetail() {
  const [showLoadingText, setShowLoadingText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingText(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 sm:px-10">
      <NavbarSection />

      <div className="flex flex-col sm:flex-row justify-between pt-12 gap-4">
        <div className="flex flex-col gap-1">
          <div className="w-[180px] sm:w-[211px] h-10 bg-[#F4F4F5] rounded-[8px]"></div>
          <div className="w-[200px] sm:w-[237px] h-7 bg-[#F4F4F5] rounded-[8px]"></div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-semibold">Rating</h1>
          <div className="w-[70px] sm:w-[83px] h-5 bg-[#F4F4F5] rounded-[8px]"></div>
          <div className="w-[70px] sm:w-[83px] h-5 bg-[#F4F4F5] rounded-[8px]"></div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center pt-8">
        <div className="w-full sm:w-[290px] h-[428px] bg-[#F4F4F5] rounded-[8px]"></div>
        <div className="w-full sm:w-[760px] h-[428px] bg-[#F4F4F5] rounded-[8px]"></div>
      </div>

      <div className="flex flex-col gap-1 pt-4">
        <div className="w-full sm:w-[1080px] h-[22px] bg-[#F4F4F5] rounded-[8px]"></div>
        <div className="w-4/5 sm:w-[700px] h-[22px] bg-[#F4F4F5] rounded-[8px]"></div>
      </div>

      <div className="flex flex-wrap gap-4 pt-8">
        <div className="w-[100px] h-[28px] bg-[#F4F4F5] rounded-[8px]"></div>
        <div className="w-[130px] h-[28px] bg-[#F4F4F5] rounded-[8px]"></div>
      </div>

      <div className="flex flex-col gap-6 pt-8">
        <div className="h-[9px] bg-[#f4f4f5] rounded-[8px] w-full"></div>
        <div className="h-[9px] bg-[#f4f4f5] rounded-[8px] w-full"></div>
        <div className="h-[9px] bg-[#f4f4f5] rounded-[8px] w-full"></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
        <div className="w-[250px] h-[32px] rounded-[8px] bg-[#f4f4f5]"></div>
        <div className="w-[165px] h-[36px] rounded-[8px] bg-[#f4f4f5]"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-8">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-[160px] sm:w-[190px] h-[340px] sm:h-[372px] rounded-[8px] bg-[#f4f4f5]"
            ></div>
          ))}
      </div>

      <FooterSection />
    </div>
  );
}
