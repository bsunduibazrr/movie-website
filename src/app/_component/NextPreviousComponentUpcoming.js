"use client";
import { useState, useEffect } from "react";
import { RatingBlack, RatingIcon } from "../icons/icons";
import Link from "next/link";

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
};

export const NextPreviousComponentUpcoming = () => {
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMoviesByPage = async (pageNum) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageNum}`,
        { headers: API_HEADERS }
      );
      if (!res.ok) throw new Error("Failed to fetch movies");
      const data = await res.json();
      setDisplayedMovies(data.results || []);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    fetchMoviesByPage(page);
  }, [page]);

  const handlePageClick = (num) => setPage(num);
  const handlePrevious = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-5 gap-4 mb-6 max-sm:grid max-sm:grid-cols-2">
        {displayedMovies.map((movie) => (
          <div
            key={movie.id}
            className="w-full max-w-[230px] sm:max-w-[230px] max-sm:max-w-[158px]"
          >
            {movie.poster_path ? (
              <Link href={`/movie-detail/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[340px] max-sm:h-[250px] rounded-t-[8px] shadow-md object-cover hover:brightness-50 transition-all max-xs:grid grid-cols-2 "
                />
              </Link>
            ) : (
              <div className="w-full h-[340px] max-sm:h-[250px] bg-gray-300 items-center  rounded-t-[8px]">
                <span className="text-sm">No Image</span>
              </div>
            )}
            <button className="w-full h-[135px] max-sm:h-[100px] rounded-b-[8px] px-2 py-2 bg-[#f4f4f5] dark:bg-[#27272A]">
              <RatingIcon />
              <p className="mt-2 text-[16px] max-sm:text-[14px] font-normal ">
                {movie.title}
              </p>
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center sm:justify-end gap-2 pt-8 pr-4 sm:pr-9 flex-wrap">
        <button
          className="w-[90px] h-[36px] text-sm sm:text-base cursor-pointer border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          ◀︎ Previous
        </button>

        {getPageNumbers().map((num, index) =>
          num === "..." ? (
            <span
              key={`dots-${index}`}
              className="w-[36px] h-[36px] flex items-center justify-center text-sm"
            >
              ...
            </span>
          ) : (
            <button
              key={num}
              className={`w-[36px] h-[36px] text-sm rounded border ${
                page === num ? "bg-gray-400 font-bold text-white" : ""
              }`}
              onClick={() => handlePageClick(num)}
            >
              {num}
            </button>
          )
        )}

        <button
          className="w-[80px] h-[36px] text-sm sm:text-base cursor-pointer border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next ▶︎
        </button>
      </div>
    </div>
  );
};
