"use client";

import { useRouter } from "next/navigation";
import { RatingIcon } from "../icons/icons";

export const MovieCard = ({ image, title, movieId }) => {
  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/movie-detail/${movieId}`);
  };

  return (
    <div className="flex items-center max-sm:w-[375px] max-sm:pl-[10px]">
      <div
        className="flex justify-center sm:justify-start"
        onClick={handleMovieClick}
      >
        <div className="cursor-pointer w-[150px] sm:w-[180px] md:w-[200px] lg:w-[230px]">
          <img
            className="w-full h-[225px] sm:h-[260px] md:h-[300px] lg:h-[340px] rounded-t-[8px] object-cover hover:brightness-50 transition-opacity duration-300"
            src={image}
            alt={title}
          />
          <div className="rounded-b-[8px] w-full h-[130px] px-2 pt-2">
            <div className="flex items-center gap-1 mb-1">
              <RatingIcon />
            </div>
            <h3 className="font-medium text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]  pb-[8px] line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
