"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function GenreMovies() {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("genreId");
  const genreName = searchParams.get("genreName");

  const [genreMovies, setGenreMovies] = useState([]);
  const [isLoadingGenreMovies, setIsLoadingGenreMovies] = useState(false);

  useEffect(() => {
    if (!genreId) return;

    const fetchAllGenreMovies = async () => {
      setIsLoadingGenreMovies(true);
      let allMovies = [];
      let currentPage = 1;
      let totalPages = 1;

      try {
        do {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${currentPage}`,
            options
          );
          const data = await res.json();

          if (data.results) {
            allMovies = [...allMovies, ...data.results];
          }
          totalPages = data.total_pages || 1;
          currentPage++;
        } while (currentPage <= totalPages && currentPage <= 5);

        setGenreMovies(allMovies);
      } catch (error) {
        console.error("Genre movies fetch error:", error);
        setGenreMovies([]);
      } finally {
        setIsLoadingGenreMovies(false);
      }
    };

    fetchAllGenreMovies();
  }, [genreId]);

  if (!genreId) {
    return <p className="p-6">Please select a genre.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">{genreName} Movies</h1>

      {isLoadingGenreMovies ? (
        <p>Loading movies...</p>
      ) : genreMovies.length > 0 ? (
        <ul className="space-y-2 max-h-[600px] overflow-auto">
          {genreMovies.map((movie) => (
            <li key={movie.id} className="hover:underline cursor-pointer">
              🎬 {movie.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies found for this genre.</p>
      )}
    </div>
  );
}
