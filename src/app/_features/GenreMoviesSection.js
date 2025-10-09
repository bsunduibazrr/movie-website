"use client";

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
  const [genreId, setGenreId] = useState(null);
  const [genreName, setGenreName] = useState("");
  const [genreMovies, setGenreMovies] = useState([]);
  const [isLoadingGenreMovies, setIsLoadingGenreMovies] = useState(false);

  useEffect(() => {
    // client-side дээр ажиллах тул window байгаа эсэхийг шалгана
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("genreId");
    const name = params.get("genreName");

    if (!id) {
      setGenreId(null);
      setGenreName("");
      setGenreMovies([]);
      return;
    }

    setGenreId(id);
    setGenreName(name || "");

    // genre-н киног дуудах функц
    const fetchAllGenreMovies = async () => {
      setIsLoadingGenreMovies(true);
      let allMovies = [];
      let currentPage = 1;
      let totalPages = 1;

      try {
        do {
          const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=en-US&page=${currentPage}`,
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
  }, [window.location.search]); // window.location.search өөрчлөгдөхөд ажиллана

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
