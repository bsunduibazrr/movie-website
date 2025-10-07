"use client";
import React from "react";
import { LastRating, NextIcon2 } from "../icons/icons";
import { useRouter } from "next/navigation";

export const SearchedMoviesCard = ({
  title,
  image,
  date,
  movieId,
  onClick,
  movie,
}) => {
  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/movie-detail/${movieId}`);
  };

  return (
    <li
      onClick={handleMovieClick}
      className="flex items-start sm:items-center gap-3 sm:gap-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded transition-all w-full max-sm:w-[330px]"
    >
      <img
        src={image}
        alt={title}
        className="w-[60px] h-[90px] sm:w-[67px] sm:h-[100px] object-cover rounded-md hover:brightness-50 shrink-0"
      />

      <div className="flex flex-col justify-between w-full">
        <p className="font-semibold text-base sm:text-[20px] text-gray-900 dark:text-white line-clamp-2">
          {title}
        </p>

        <div className="mt-1 mb-2 sm:my-2">
          <LastRating />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {date}
          </p>
          <div className="flex items-center gap-[3px] text-sm font-medium text-blue-600 dark:text-white">
            <span>See More</span>
            <NextIcon2 />
          </div>
        </div>
      </div>
    </li>
  );
};
