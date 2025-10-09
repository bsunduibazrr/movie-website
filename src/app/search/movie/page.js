"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SeeAllSearched } from "@/app/_component/seeAllSearchedComponent";
import { NavbarSection } from "@/app/_features/NavbarSection";
import { FooterSection } from "@/app/_features/FooterSection";
import { LoadingSection } from "@/app/_features/LoadingSection";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function SearchMoviePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [genres, setGenres] = useState([]);

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const language = searchParams.get("language") || "en-US";
  const pageFromParams = parseInt(searchParams.get("page") || "1", 10);

  const router = useRouter();
  const genreId = searchParams.get("genreId") || "";
  const genreName = searchParams.get("genreName") || "Unknown Genre";

  useEffect(() => {
    if (!query) {
      router.push("/");
      return;
    }
    setPage(pageFromParams);
    fetchMovies(pageFromParams);
  }, [query, language, pageFromParams]);

  const fetchMovies = (pageNum) => {
    setLoading(true);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&language=${language}&page=${pageNum}`;

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
        setTotalResults(data.total_results || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  const getData = async () => {
    if (!genreId) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genreId}&page=${page}`,
        options
      );
      const jsonData = await response.json();
      setMovies(jsonData.results || []);
      setTotalPages(jsonData.total_pages || 1);
      setTotalResults(jsonData.total_results || 0);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      const next = page + 1;
      router.push(
        `/search/movie?query=${encodeURIComponent(
          query
        )}&language=${language}&page=${next}`
      );
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      const prev = page - 1;
      router.push(
        `/search/movie?query=${encodeURIComponent(
          query
        )}&language=${language}&page=${prev}`
      );
    }
  };

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

  useEffect(() => {
    getData();
  }, [genreId, page]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const onGenreClick = (genre) => {
    setPage(1);
    router.push(
      `/genre/${genre.id}?genreId=${genre.id}&genreName=${encodeURIComponent(
        genre.name
      )}`
    );
  };

  return (
    <div>
      <NavbarSection />
      <div className="pt-16 px-4 sm:px-6 lg:px-20 max-w-screen-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
          Search results
        </h1>

        <div className="pt-4 sm:pt-6">
          <h2 className="text-lg sm:text-xl font-semibold">
            {totalResults} results for{" "}
            <span className="text-blue-600">&quot;{query}&quot;</span>
          </h2>
        </div>

        {loading ? (
          <LoadingSection />
        ) : movies.length > 0 ? (
          <>
            <div className="flex flex-col lg:flex-row gap-10 pt-8">
              <div className="w-full">
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    sm:grid-cols-3
                    md:grid-cols-4
                    lg:grid-cols-5
                    mb-6
                  "
                  style={{ rowGap: "1rem", columnGap: "1rem" }}
                >
                  {movies.slice(0, 20).map((movie) => (
                    <SeeAllSearched
                      key={movie.id}
                      movieId={movie.id}
                      title={movie.title}
                      image={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                          : "/placeholder.jpg"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="hidden lg:block w-px bg-gray-200"></div>

              <div className="lg:max-w-sm">
                <h2 className="text-xl font-semibold mb-1">Search by genre</h2>
                <p className="text-sm text-gray-600 mb-4">
                  See lists of movies by genre
                </p>
                <div className="flex flex-wrap gap-3">
                  {genres.map((genre) => (
                    <div
                      key={genre.id}
                      onClick={() => onGenreClick(genre)}
                      className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-1 text-sm font-medium cursor-pointer hover:bg-gray-500 transition-all"
                    >
                      {genre.name} ▶︎
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end items-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={page <= 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous ◀︎
              </button>
              <span>
                Page {page} / {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next ▶︎
              </button>
            </div>
          </>
        ) : (
          <p className="mt-6 text-gray-500">
            No results found for <strong>&quot;{query}&quot;</strong>
          </p>
        )}
      </div>
      <FooterSection />
    </div>
  );
}
