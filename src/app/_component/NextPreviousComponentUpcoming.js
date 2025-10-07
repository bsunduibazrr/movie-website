import { useState, useEffect } from "react";
import { RatingBlack } from "../icons/icons";
import Link from "next/link";

const MOVIES_PER_PAGE = 20;

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
};

export const NextPreviousComponentUpcoming = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllMovies = async () => {
    try {
      const firstResponse = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
        { headers: API_HEADERS }
      );

      if (!firstResponse.ok) {
        throw new Error("Failed to fetch first page");
      }

      const firstData = await firstResponse.json();
      let allResults = firstData.results || [];
      const totalApiPages = firstData.total_pages;

      const totalToFetch = Math.min(totalApiPages, 73);

      const fetchPromises = [];
      for (let i = 2; i <= totalToFetch; i++) {
        fetchPromises.push(
          fetch(
            `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${i}`,
            { headers: API_HEADERS }
          ).then(async (res) => {
            if (!res.ok) throw new Error(`Failed to fetch page ${i}`);
            return res.json();
          })
        );
      }

      const results = await Promise.all(fetchPromises);
      results.forEach((res) => {
        allResults = [...allResults, ...(res.results || [])];
      });

      setAllMovies(allResults);
      setTotalPages(Math.ceil(allResults.length / MOVIES_PER_PAGE));
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  useEffect(() => {
    const startIndex = (page - 1) * MOVIES_PER_PAGE;
    const endIndex = startIndex + MOVIES_PER_PAGE;
    setDisplayedMovies(allMovies.slice(startIndex, endIndex));
  }, [allMovies, page]);

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
      <div className="grid grid-cols-5 gap-4 mb-6">
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
                  className="w-full h-[340px] max-sm:h-[250px] rounded-t-[8px] shadow-md object-cover hover:brightness-50 transition-all max-xs:grid grid-cols-2 max-sm:w-[375px]"
                />
              </Link>
            ) : (
              <div className="w-full h-[340px] max-sm:h-[250px] bg-gray-300 items-center  rounded-t-[8px]">
                <span className="text-sm">No Image</span>
              </div>
            )}
            <button className="w-full h-[135px] max-sm:h-[100px] rounded-b-[8px] px-2 py-2">
              <RatingBlack />
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
