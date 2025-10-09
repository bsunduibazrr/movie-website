"use client";
import React from "react";
import { NextIcon2, RatingIcon } from "../icons/icons";
import { useRouter } from "next/navigation";

export const SearchedMoviesCard = ({ title, image, date, movieId }) => {
  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/movie-detail/${movieId}`);
  };

  return (
    <li
      onClick={handleMovieClick}
      className="flex gap-3 sm:gap-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-all w-full max-w-[375px] sm:max-w-full max-sm:pt-[10px]"
    >
      <img
        src={image}
        alt={title}
        className="w-[60px] h-[90px] sm:w-[67px] sm:h-[100px] object-cover rounded-md hover:brightness-50 shrink-0"
      />

      <div className="flex flex-col justify-between w-full">
        <p className="font-semibold text-sm sm:text-base md:text-[20px] text-gray-900 dark:text-white line-clamp-2">
          {title}
        </p>

        <div className="mt-1 mb-2 sm:my-2">
          <RatingIcon />
        </div>

        <div className="flex justify-between items-center flex-wrap sm:flex-nowrap gap-2 text-sm max-sm:justify-start max-sm:px-0 max-sm:gap-20">
          <p className="text-gray-600 dark:text-gray-300 text-[13px] sm:text-sm font-medium">
            {date}
          </p>

          <div className="flex items-center gap-1 text-blue-600 dark:text-white font-medium">
            <span>See More</span>
            <NextIcon2 />
          </div>
        </div>
      </div>
    </li>
  );
};
