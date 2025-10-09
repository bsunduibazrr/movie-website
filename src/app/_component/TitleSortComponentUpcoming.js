"use client";
import { useRouter } from "next/navigation";

export const TitleSortUpcoming = (props) => {
  const { title, seemore, icon, movieId } = props;
  const router = useRouter();

  const handleMovieClick = () => {
    router.push(`/upcoming`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-20 pt-6">
      <h3 className="text-[20px] sm:text-[24px] font-semibold leading-[32px]">
        {title}
      </h3>

      <div
        className="flex gap-1 items-center mt-2 sm:mt-0"
        onClick={handleMovieClick}
      >
        <button className="text-sm sm:text-base font-medium hover:underline">
          {seemore}
        </button>

        <button className="hover:underline">{icon}</button>
      </div>
    </div>
  );
};
