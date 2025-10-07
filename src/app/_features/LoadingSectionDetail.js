"use client";
import { useEffect, useState } from "react";
import { NavbarSection } from "./NavbarSection";
import { FooterSection } from "./FooterSection";
import GenreMovies from "./GenreMoviesSection";

export function LoadingDetail() {
  const [showLoadingText, setShowLoadingText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingText(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <NavbarSection />
      <div className="flex justify-around pt-[52px]">
        <div className="flex flex-col gap-[4px]">
          <div className="w-[211px] h-[40px] bg-[#F4F4F5] rounded-[8px]"></div>
          <div className="w-[237px] h-[28px] bg-[#F4F4F5] rounded-[8px]"></div>
        </div>
        <div className="flex flex-col gap-[8px]">
          <h1>Rating</h1>
          <div className="w-[83px] h-[20px] bg-[#F4F4F5] rounded-[8px]"></div>
          <div className="w-[83px] h-[20px] bg-[#F4F4F5] rounded-[8px]"></div>
        </div>
      </div>

      <div className="flex gap-[32px] justify-center pt-[32px] ">
        <div className="w-[290px] h-[428px] bg-[#F4F4F5] rounded-[8px]"></div>
        <div className="w-[760px] h-[428px] bg-[#F4F4F5] rounded-[8px]"></div>
      </div>

      <div className="flex gap-[4px] flex-col  pl-[180px] py-4">
        <div className="w-[1080px] h-[22px] bg-[#F4F4F5] rounded-[8px]"></div>
        <div className="w-[700px] h-[22px] bg-[#F4F4F5] rounded-[8px]"></div>
      </div>

      <div className="flex gap-[53px] pl-[180px] pt-[32px]">
        <div className="w-[64px] h-[28px] bg-[#F4F4F5] rounded-[8px]"></div>
        <div className="w-[137px] h-[28px] bg-[#F4F4F5] rounded-[8px]"></div>
      </div>

      <div className="flex pl-[180px] pt-[10px]">
        <div className="w-[1080px] h-[9px]  rounded-[8px] bg-[#f4f4f5]"></div>
      </div>

      <div className="flex gap-[53px] pl-[180px]  pt-[32px]">
        <div className="w-[64px] h-[28px] bg-[#F4F4F5] rounded-[8px]"></div>
        <div className="w-[360px] h-[28px] bg-[#F4F4F5] rounded-[8px]"></div>
      </div>

      <div className="flex pl-[180px] pt-[20px]">
        <div className="w-[1080px] h-[9px] rounded-[8px] bg-[#f4f4f5]"></div>
      </div>

      <div className="flex gap-[53px] pl-[180px] pt-[32px]">
        <div className="w-[64px] h-[28px] bg-[#F4F4F5] rounded-[8px]"></div>
        <div className="w-[360px] h-[28px] bg-[#F4F4F5] rounded-[8px]"></div>
      </div>

      <div className="flex justify-center pt-[20px]">
        <div className="w-[1080px] flex justify-center h-[9px] rounded-[8px] bg-[#f4f4f5]"></div>
      </div>
      <div className="flex justify-around pt-[32px]">
        <div className="w-[250px] h-[32px] rounded-[8px] bg-[#f4f4f5]"></div>
        <div className="w-[165px] h-[36px] rounded-[8px] bg-[#f4f4f5]"></div>
      </div>
      <div className="flex justify-center gap-[32px] pt-[32px]">
        <div className="w-[190px] h-[372px] rounded-[8px] bg-[#f4f4f5]"></div>
        <div className="w-[190px] h-[372px] rounded-[8px] bg-[#f4f4f5]"></div>
        <div className="w-[190px] h-[372px] rounded-[8px] bg-[#f4f4f5]"></div>
        <div className="w-[190px] h-[372px] rounded-[8px] bg-[#f4f4f5]"></div>
        <div className="w-[190px] h-[372px] rounded-[8px] bg-[#f4f4f5]"></div>
      </div>
      <FooterSection />
    </div>
  );
}
