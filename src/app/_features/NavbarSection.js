"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DarkGenre,
  DarkSearch,
  DownIcon,
  FirstIcon,
  NightIcon,
  ResponsiveGenre,
  ResponsiveLightGenre,
  SearchIcon,
  SearchInput,
} from "../icons/icons";
import { SearchedMoviesCard } from "../_component/SearchedMoviesComponent";

const DayIcon = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 40 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <g filter="url(#filter0_d_22539_11582)">
      {" "}
      <path
        d="M2 11.5C2 5.97715 6.47715 1.5 12 1.5H28C33.5228 1.5 38 5.97715 38 11.5V27.5C38 33.0228 33.5228 37.5 28 37.5H12C6.47715 37.5 2 33.0228 2 27.5V11.5Z"
        fill="#18181B"
        shapeRendering="crispEdges"
      />{" "}
      <path
        d="M12 2H28C33.2467 2 37.5 6.2533 37.5 11.5V27.5C37.5 32.7467 33.2467 37 28 37H12C6.7533 37 2.5 32.7467 2.5 27.5V11.5C2.5 6.2533 6.7533 2 12 2Z"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        shapeRendering="crispEdges"
      />{" "}
      <circle
        cx="20"
        cy="20.5"
        r="6"
        fill="rgba(255,255,255,0.15)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
      />{" "}
      <line
        x1="20"
        y1="12"
        x2="20"
        y2="7"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />{" "}
      <line
        x1="20"
        y1="29"
        x2="20"
        y2="34"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />{" "}
      <line
        x1="12"
        y1="20.5"
        x2="7"
        y2="20.5"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />{" "}
      <line
        x1="28"
        y1="20.5"
        x2="33"
        y2="20.5"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />{" "}
      <line
        x1="14.93"
        y1="14.43"
        x2="11.07"
        y2="10.57"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />{" "}
      <line
        x1="25.07"
        y1="26.57"
        x2="28.93"
        y2="30.43"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />{" "}
      <line
        x1="14.93"
        y1="26.57"
        x2="11.07"
        y2="30.43"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />{" "}
      <line
        x1="25.07"
        y1="14.43"
        x2="28.93"
        y2="10.57"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1"
        strokeLinecap="round"
      />{" "}
    </g>{" "}
    <defs>
      {" "}
      <filter
        id="filter0_d_22539_11582"
        x="0"
        y="0.5"
        width="40"
        height="40"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        {" "}
        <feFlood floodOpacity="0" result="BackgroundImageFix" />{" "}
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />{" "}
        <feOffset dy="1" /> <feGaussianBlur stdDeviation="1" />{" "}
        <feComposite in2="hardAlpha" operator="out" />{" "}
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
        />{" "}
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_22539_11582"
        />{" "}
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_22539_11582"
          result="shape"
        />{" "}
      </filter>{" "}
    </defs>{" "}
  </svg>
);

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const NavbarSection = () => {
  const [showGenres, setShowGenres] = useState(false);
  const [genres, setGenres] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const router = useRouter();
  const searchTimeoutRef = useRef(null);

  const toggleGenres = () => setShowGenres((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMobileSearch = () => setShowMobileSearch((prev) => !prev);

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

  useEffect(() => {
    if (showGenres && genres.length === 0) {
      fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
        options
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.genres) setGenres(data.genres);
        })
        .catch((err) => console.error("Genre fetch error:", err));
    }
  }, [showGenres, genres.length]);

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (searchValue.trim() === "") {
      setMovies([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchTimeoutRef.current = setTimeout(() => {
      const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchValue
      )}&language=en-US&page=1`;

      fetch(apiUrl, options)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Movie fetch error:", err);
          setIsLoading(false);
        });
    }, 300);

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchValue]);

  const onGenreClick = (genre) => {
    setShowGenres(false);
    router.push(
      `/genre/${genre.id}?genreId=${genre.id}&genreName=${encodeURIComponent(
        genre.name
      )}`
    );
  };

  const onMovieClick = (movie) => {
    router.push(`/movie-detail/${movie.id}`);
    setSearchValue("");
    setMovies([]);
  };

  const onSearchAllClick = () => {
    router.push(
      `/search/movie?query=${encodeURIComponent(
        searchValue
      )}&language=en-US&page=1`
    );
  };

  return (
    <div className="relative w-full flex flex-col items-center pt-3 z-50 max-sm:w-[375px]">
      <div className="w-full flex justify-around max-sm:justify-between items-center px-2">
        <div
          className="max-sm:w-[92px] h-[20px] pt-[10px] cursor-pointer"
          onClick={() => router.push("/")}
        >
          <FirstIcon />
        </div>

        <div className="flex gap-3 max-sm:hidden">
          <div onClick={toggleGenres} className="cursor-pointer">
            {darkMode ? <DarkGenre /> : <DownIcon />}
          </div>

          <div className="flex items-center border rounded-lg pl-3 w-[379px] h-[36px]">
            <SearchInput />
            <input
              type="search"
              className="flex-1 h-full bg-transparent focus:outline-none pl-2"
              placeholder="Search movies..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div
            className="sm:hidden cursor-pointer"
            onClick={toggleMobileSearch}
          >
            {darkMode ? <DarkSearch /> : <SearchIcon />}
          </div>

          {showMobileSearch && (
            <div className="sm:hidden cursor-pointer" onClick={toggleGenres}>
              {darkMode ? <ResponsiveGenre /> : <ResponsiveLightGenre />}
            </div>
          )}

          <div
            onClick={toggleDarkMode}
            className="cursor-pointer max-sm:w-[36px] h-[36px] flex items-center justify-center"
          >
            {darkMode ? <DayIcon /> : <NightIcon />}
          </div>
        </div>
      </div>

      {showMobileSearch && (
        <div className="w-full px-4 sm:hidden mt-2">
          <div className="flex items-center border rounded-lg pl-3 h-[36px] w-full">
            <SearchInput />
            <input
              type="search"
              className="flex-1 h-full bg-transparent focus:outline-none pl-2"
              placeholder="Search movies..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
      )}

      {searchValue.trim() !== "" && (
        <div className="absolute top-[64px] mt-2 w-[577px] max-h-[600px] overflow-y-auto bg-white dark:bg-black border shadow-md rounded-md p-4 z-50 max-sm:w-[370px] max-sm:top-[100px]">
          {isLoading ? (
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Searching...
            </p>
          ) : movies.length > 0 ? (
            <>
              <ul className="space-y-2">
                {movies.slice(0, 8).map((movie) => (
                  <SearchedMoviesCard
                    key={movie.id}
                    movie={movie}
                    movieId={movie.id}
                    title={movie.title}
                    image={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : "/placeholder.jpg"
                    }
                    date={movie.release_date}
                    onClick={() => onMovieClick(movie)}
                    vote={movie.vote_average}
                  />
                ))}
              </ul>
              <p
                className="font-medium text-[14px] mt-3 cursor-pointer dark:text-white"
                onClick={onSearchAllClick}
              >
                Search all results for <strong>{searchValue}</strong>
              </p>
            </>
          ) : (
            <p className="font-medium text-[14px] text-center py-8 dark:text-white">
              No Results Found
            </p>
          )}
        </div>
      )}

      {showGenres && (
        <div
          className="absolute top-full bg-white dark:bg-black left-[500px] w-[577px] h-[383px] rounded-lg shadow-md border-t mt-2 py-4 px-8 overflow-auto z-10
          max-sm:left-0 max-sm:w-full max-sm:px-4 max-sm:h-auto max-sm:top-[60px]"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold dark:text-white">Genres</h1>
            <button
              onClick={() => setShowGenres(false)}
              className="text-3xl font-bold hover:text-red-500 cursor-pointer dark:text-white"
            >
              ×
            </button>
          </div>
          <p className="text-lg font-normal dark:text-gray-300">
            See lists of movies by genre
          </p>
          <div className="w-[100px]] h-[2px] dark:bg-[#f4f4f5] my-3"></div>
          <div className="flex flex-wrap gap-4 pt-2">
            {genres.map((genre) => (
              <div
                key={genre.id}
                onClick={() => onGenreClick(genre)}
                className="flex items-center gap-4 justify-center border border-gray-300 dark:border-gray-600 rounded-md text-sm text-black dark:text-white font-medium cursor-pointer hover:bg-red-400 dark:hover:bg-gray-500"
                style={{ width: 127, height: 20 }}
              >
                {genre.name} ▶︎
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
