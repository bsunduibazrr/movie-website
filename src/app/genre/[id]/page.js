"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [{ genreId, genreName }, setParams] = useState(() => getQueryParams());
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);

  // Load query params on mount and on URL change (popstate)
  useEffect(() => {
    const onPopState = () => {
      setParams(getQueryParams());
      setPage(1); // Reset page on URL change
    };

    window.addEventListener("popstate", onPopState);

    // initial load
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
    // Push new URL without reload
    const newUrl = `/genre/${genre.id}?genreId=${
      genre.id
    }&genreName=${encodeURIComponent(genre.name)}`;
    window.history.pushState({}, "", newUrl);
    setParams({ genreId: genre.id, genreName: genre.name });
  };

  return (
    <>
      <NavbarSection />

      <div className="px-4 sm:px-6 lg:px-10 py-8 max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex flex-col pt-8 md:pt-32 w-full md:w-[387px]">
            <h1 className="text-3xl md:text-4xl font-semibold pt-12 md:pt-0">
              Search Filter
            </h1>
            <div className="pt-8">
              <h2 className="text-2xl font-semibold mb-1">Genres</h2>
              <p className="text-base font-normal">
                See lists of movies by genre
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-5">
              {genres.map((genre) => (
                <div
                  key={genre.id}
                  onClick={() => onGenreClick(genre)}
                  className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1 text-sm font-medium cursor-pointer hover:backdrop-brightness-50 transition-all dark:hover:bg-gray-500"
                >
                  {genre.name} ▶︎
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block w-px bg-[#E4E4E7] h-[1520px] self-center"></div>

          <div className="pt-12 md:pt-36 flex-1">
            <h1 className="text-2xl font-bold mb-6">
              {`${movies.length} titles in "${genreName}"`}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-6">
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
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev ◀︎
          </button>
          <span className="px-4 py-2">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Next ►
          </button>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
