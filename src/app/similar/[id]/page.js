"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FooterSection } from "@/app/_features/FooterSection";
import { MovieCard } from "@/app/_component/MovieSlideComponent";
import { NavbarSection } from "@/app/_features/NavbarSection";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function MoreLikeMovie() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
          options
        );
        const json = await res.json();
        setMovies(json.results || []);
        setTotalPages(json.total_pages || 1);
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) getData();
  }, [id, page]);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

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
    <div className=" min-h-screen w-full">
      <NavbarSection />

      <div className="pt-8 px-4 sm:px-6 md:px-10">
        <h1 className="text-2xl font-semibold ">More Like This</h1>
      </div>

      {loading ? (
        <div className="px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-8">
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <div
                  key={`loading-${i}`}
                  className="w-full aspect-[2/3] bg-[#f4f4f5] dark:bg-[#27272a] rounded"
                ></div>
              ))}
          </div>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 md:px-10 pt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {movies.slice(0, 10).map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  rating={movie.vote_average}
                  movieId={movie.id}
                  vote={movie.vote_average}
                />
              ))}
            </div>
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
        </>
      )}

      <FooterSection />
    </div>
  );
}
