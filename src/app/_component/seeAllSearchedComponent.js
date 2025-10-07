"use client";

import { useRouter } from "next/navigation";
import { RatingIcon2 } from "../icons/icons";

export const SeeAllSearched = ({ image, title, movieId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/similar/${movieId}`);
  };

  return (
    <div className="flex gap-[48px]">
      <div className="cursor-pointer " onClick={handleClick}>
        <img
          className="w-[165px] h-[244px] rounded-t-[8px] hover:brightness-50 transition-opacity object-cover"
          src={image}
          alt={title}
        />
        <div className="rounded-b-[8px] w-[165px] h-[97px]  ">
          <div className="pt-[8px] pl-[8px]">
            <RatingIcon2 />
            <h3 className="font-normal text-[16px] line-clamp-2">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
