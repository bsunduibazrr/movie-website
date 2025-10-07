"use client";

import { useRouter } from "next/navigation";
import { RatingIcon2 } from "../icons/icons";

export const GenreMovieCard = ({ image, title, movieId, movie }) => {
  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/movie-detail/${movieId}`);
  };

  return (
    <div
      className="cursor-pointer w-full max-w-[190px] mx-auto"
      onClick={handleMovieClick}
    >
      <img
        className="w-full h-[244px] rounded-t-[8px] hover:brightness-50 transition-opacity object-cover max-sm:w-[157px]  max-sm:grid-cols-2 max-sm:grid-rows-2"
        src={image}
        alt={title}
      />
      <div className=" rounded-b-[8px] w-full h-[97px] max-sm:w-[157px]">
        <div className="pt-[8px] pl-[8px]">
          <RatingIcon2 />
          <h3 className="font-normal text-[16px] truncate">{title}</h3>
        </div>
      </div>
    </div>
  );
};
