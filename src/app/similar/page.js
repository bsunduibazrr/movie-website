"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NavbarSection } from "@/app/_features/NavbarSection";
import { MovieCard } from "@/app/_component/MovieSlideComponent";
import { LoadingDetail } from "@/app/_features/LoadingSectionDetail";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function MoreLikeThis() {
  const searchParams = useSearchParams();
  const genreIds = searchParams.get("genres") || "";

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      if (!genreIds) return;

      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie/${id}/similar?language=en-US&page=1`,
          options
        );
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("MoreLikeThis fetch error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [genreIds, page]);

  const handleNext = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  return (
    <div>
      <NavbarSection />
      <div className="px-6 py-6 max-w-7xl mx-auto">
        <h1 className="font-semibold text-[24px] mb-4">More Like This</h1>

        {loading ? (
          <LoadingDetail />
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  title={movie.title}
                  rating={movie.vote_average}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-6 mt-6">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`px-4 py-2 rounded border ${
                  page === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
              >
                Prev
              </button>
              <span>
                Page {page} / {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded border ${
                  page === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200"
                }`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
