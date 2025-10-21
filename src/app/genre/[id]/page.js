"use client";

import { useEffect, useState } from "react";
import { GenreMovieCard } from "@/app/_component/GenreMovieCardComponent";
import { NavbarSection } from "@/app/_features/NavbarSection";
import { FooterSection } from "@/app/_features/FooterSection";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

function getQueryParams() {
  if (typeof window === "undefined") return { genreId: null, genreName: "" };
  const params = new URLSearchParams(window.location.search);
  return {
    genreId: params.get("genreId"),
    genreName: params.get("genreName") || "Unknown Genre",
  };
}

export default function GenreMoviesPage() {
  const [{ genreId, genreName }, setParams] = useState(() => getQueryParams());
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

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
    const onPopState = () => {
      setParams(getQueryParams());
      setPage(1);
    };

    window.addEventListener("popstate", onPopState);

    setParams(getQueryParams());

    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!genreId) return;

    const getData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&page=${page}`,
          options
        );
        const jsonData = await response.json();
        setMovies(jsonData.results || []);
        setTotalPages(jsonData.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getData();
  }, [genreId, page]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
          options
        );
        const data = await response.json();
        if (data.genres) {
          setGenres(data.genres);
        }
      } catch (error) {
        console.error("Genre fetch error:", error);
      }
    };

    fetchGenres();
  }, []);

  const onGenreClick = (genre) => {
    setPage(1);

    const newUrl = `/genre/${genre.id}?genreId=${
      genre.id
    }&genreName=${encodeURIComponent(genre.name)}`;
    window.history.pushState({}, "", newUrl);
    setParams({ genreId: genre.id, genreName: genre.name });
  };

  return (
    <>
      <NavbarSection />

      <main className="px-4 sm:px-6 lg:px-10 py-8 max-w-screen-xl mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row gap-12 pt-[52px]">
          {/* Sidebar */}
          <aside className="w-full md:w-[360px]  top-24 self-start">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6">
              Search Filter
            </h1>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Genres</h2>
              <p className="text-base font-normal mb-4">
                Browse movies by genre
              </p>
              <div className="flex flex-wrap gap-3">
                {genres.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => onGenreClick(genre)}
                    className={`flex items-center gap-1 border rounded-md px-4 py-2 text-sm font-medium transition
                      ${
                        genreId == genre.id
                          ? "bg-gray-800 text-white border-gray-800"
                          : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    aria-pressed={genreId == genre.id}
                  >
                    {genre.name} <span className="text-xs">▶︎</span>
                  </button>
                ))}
              </div>
            </section>
          </aside>
          <div className="h-[1852px] w-[2px] bg-[#f4f4f5] max-sm:hidden"></div>

          {/* Main content */}
          <section className="flex-1">
            <h1 className="text-2xl font-bold mb-6">
              {movies.length} titles in{" "}
              <span className="italic">&quot;{genreName}&quot;</span>
            </h1>

            <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-10 max-w-full">
              {movies.slice(0, 20).map((movie) => (
                <GenreMovieCard
                  key={movie.id}
                  movieId={movie.id}
                  movie={movie}
                  title={movie.title}
                  image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                />
              ))}
            </div>

            {/* Pagination */}
            <nav
              aria-label="Pagination"
              className="flex flex-wrap justify-center sm:justify-end gap-2"
            >
              <button
                className="w-[90px] h-[36px] text-sm sm:text-base cursor-pointer border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={handlePrevious}
                disabled={page === 1}
              >
                ◀︎ Previous
              </button>

              {getPageNumbers().map((num, index) =>
                num === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="w-[36px] h-[36px] flex items-center justify-center text-sm select-none"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={num}
                    className={`w-[36px] h-[36px] text-sm rounded border transition-colors ${
                      page === num
                        ? "bg-gray-700 text-white font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => handlePageClick(num)}
                    aria-current={page === num ? "page" : undefined}
                  >
                    {num}
                  </button>
                )
              )}

              <button
                className="w-[90px] h-[36px] text-sm sm:text-base cursor-pointer border rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={handleNext}
                disabled={page === totalPages}
              >
                Next ▶︎
              </button>
            </nav>
          </section>
        </div>
      </main>

      <FooterSection />
    </>
  );
}
