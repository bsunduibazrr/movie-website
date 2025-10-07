import { useState, useEffect } from "react";
import { DarkRating, RatingBlack } from "../icons/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MOVIES_PER_PAGE = 20;

const API_HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
};

export const NextPreviousComponentPopular = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const fetchAllMovies = async () => {
    try {
      const firstResponse = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
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
            `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`,
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

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-5 max-sm:grid-cols-2 gap-4 mb-6">
        {displayedMovies.map((movie) => (
          <div key={movie.id}>
            {movie.poster_path ? (
              <Link href={`/movie-detail/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[340px] rounded-t-[8px] shadow-md object-cover hover:brightness-50"
                />
              </Link>
            ) : (
              <div className="w-full h-[340px] bg-gray-300 flex items-center justify-center rounded-t-[8px]">
                <span>No Image</span>
              </div>
            )}
            <button className="w-full h-[135px]  rounded-b-[8px] px-2 py-2 text-left">
              {darkMode ? <DarkRating /> : <RatingBlack />}
              <p className="mt-2 text-[18px] font-normal line-clamp-2">
                {movie.title}
              </p>
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center sm:justify-end gap-2 pt-6 sm:pt-8 w-full">
        <button
          className="w-full sm:w-[114px] h-[40px] px-2  border rounded text-sm sm:text-base"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          ◀︎ Previous
        </button>

        {getPageNumbers().map((num, index) =>
          num === "..." ? (
            <span
              key={`dots-${index}`}
              className="w-[40px] h-[40px] flex items-center justify-center"
            >
              ...
            </span>
          ) : (
            <button
              key={num}
              className={`w-[40px] h-[40px] rounded text-sm ${
                page === num ? "bg-gray-400 font-bold" : "bg-gray-100"
              }`}
              onClick={() => handlePageClick(num)}
            >
              {num}
            </button>
          )
        )}

        <button
          className="w-full sm:w-[88px] h-[40px] px-2 border rounded text-sm sm:text-base"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next ▶︎
        </button>
      </div>
    </div>
  );
};
