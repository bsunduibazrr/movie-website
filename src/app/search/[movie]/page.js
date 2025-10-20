"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

function getParamsFromUrl() {
  if (typeof window === "undefined") {
    return { query: null, language: "en-US", page: 1 };
  }
  const search = window.location.search;
  const paramsObj = {};
  if (search.startsWith("?")) {
    const queryString = search.substring(1);
    const pairs = queryString.split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      if (key) {
        paramsObj[key] = decodeURIComponent(value || "");
      }
    }
  }
  return {
    query: paramsObj.query || null,
    language: paramsObj.language || "en-US",
    page: parseInt(paramsObj.page) || 1,
  };
}

export default function SearchMoviePage() {
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [genres, setGenres] = useState([]);

  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("en-US");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const { query: q, language: lang, page } = getParamsFromUrl();

    if (!q) {
      router.push("/");
      return;
    }

    setQuery(q);
    setLanguage(lang);
    setPageNum(page);

    fetchMovies(q, lang, page);
  }, [router]);

  const fetchMovies = async (searchQuery, lang, pageNumber) => {
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchQuery
      )}&language=${lang}&page=${pageNumber}`;

      const res = await fetch(url, options);
      const data = await res.json();
      setMovies(data.results || []);
      setTotalPages(data.total_pages || 1);
      setTotalResults(data.total_results || 0);
    } catch (error) {
      console.error("Fetch error:", error);
      setMovies([]);
      setTotalPages(1);
      setTotalResults(0);
    } finally {
      setLoading(false);
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
      setGenres([]);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const updateUrl = (newQuery, newLang, newPage) => {
    const url = `/search/movie?query=${encodeURIComponent(
      newQuery
    )}&language=${newLang}&page=${newPage}`;
    router.push(url);
  };

  const handleNext = () => {
    if (pageNum < totalPages) {
      const nextPage = pageNum + 1;
      updateUrl(query, language, nextPage);
    }
  };

  const handlePrev = () => {
    if (pageNum > 1) {
      const prevPage = pageNum - 1;
      updateUrl(query, language, prevPage);
    }
  };

  const onGenreClick = (genre) => {
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
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-6"
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
                disabled={pageNum <= 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous ◀︎
              </button>
              <span>
                Page {pageNum} / {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={pageNum >= totalPages}
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
