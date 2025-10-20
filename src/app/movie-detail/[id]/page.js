"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { MovieDetailGg } from "@/app/_component/MovieDetailComponent";
import { MovieDetailPartTwo } from "@/app/_component/MovieDetailComponent2";
import { MovieCard } from "@/app/_component/MovieSlideComponent";
import { FooterSection } from "@/app/_features/FooterSection";
import { LoadingDetail } from "@/app/_features/LoadingSectionDetail";
import { NavbarSection } from "@/app/_features/NavbarSection";
import { NextIcon2 } from "@/app/icons/icons";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function MovieDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [darkMode, setDarkMode] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [creditsData, setCreditsData] = useState(null);
  const [videosData, setVideosData] = useState(null);
  const [moreLikeThisMovies, setMoreLikeThisMovies] = useState([]);
  const [loadingMoreLikeThis, setLoadingMoreLikeThis] = useState(false);
  const [genresList, setGenresList] = useState([]);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const isDark = savedMode === "true";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("darkMode", newMode.toString());
  };

  useEffect(() => {
    setMovieData(null);
    setCreditsData(null);
    setVideosData(null);
  }, [id]);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const [movieRes, creditsRes, videosRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
            options
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
            options
          ),
        ]);

        if (!movieRes.ok || !creditsRes.ok || !videosRes.ok) {
          throw new Error("Failed to fetch movie data");
        }

        const movieJson = await movieRes.json();
        const creditsJson = await creditsRes.json();
        const videosJson = await videosRes.json();

        setMovieData(movieJson);
        setCreditsData(creditsJson);
        setVideosData(videosJson);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          options
        );
        if (!res.ok) throw new Error("Failed to fetch genres");
        const data = await res.json();
        setGenresList(data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenresList([]);
      }
    }

    fetchGenres();
  }, []);

  useEffect(() => {
    if (!movieData || !movieData.genres?.length) return;

    async function fetchMoreLikeThis() {
      setLoadingMoreLikeThis(true);
      try {
        const genreIds = movieData.genres.map((g) => g.id).join(",");
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreIds}&language=en-US&page=1`,
          options
        );

        const data = await res.json();
        const filtered = data.results?.filter((m) => m.id !== movieData.id);
        setMoreLikeThisMovies(filtered?.slice(0, 5) || []);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
        setMoreLikeThisMovies([]);
      } finally {
        setLoadingMoreLikeThis(false);
      }
    }

    fetchMoreLikeThis();
  }, [movieData]);

  const getGenreNames = (movieGenres) => {
    if (!movieGenres || movieGenres.length === 0) return "Unknown";

    const names = movieGenres
      .map((genre) => {
        if (typeof genre === "object" && genre.name) return genre.name;
        const found = genresList.find((g) => g.id === genre);
        return found ? found.name : null;
      })
      .filter(Boolean);

    return names.length > 0 ? names.join(" · ") : "Unknown";
  };

  if (!id) return <div>Invalid Movie ID</div>;
  if (!movieData || !creditsData || !videosData) return <LoadingDetail />;

  const writers = creditsData.crew
    .filter((member) => member.job === "Writer")
    .slice(0, 2)
    .map((w) => w.name);

  const stars = creditsData.cast.slice(0, 2).map((c) => c.name);
  const director = creditsData.crew.find((member) => member.job === "Director");

  const trailer = videosData.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : null;

  return (
    <div className={darkMode ? "dark" : ""}>
      <NavbarSection darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <MovieDetailGg
        movie={movieData}
        title={movieData.title}
        image={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
        overview={movieData.overview}
        release_date={movieData.release_date}
        runtime={movieData.runtime}
        trailerUrl={trailerUrl}
        backdrop={`https://image.tmdb.org/t/p/w780${movieData.backdrop_path}`}
        genre={getGenreNames(movieData.genres)}
      />

      <div className="flex justify-center px-4 sm:px-6 lg:px-12">
        <MovieDetailPartTwo
          director={director ? director.name : "Unknown"}
          writers={writers.length > 0 ? writers.join(" · ") : "Unknown"}
          stars={stars.length > 0 ? stars.join(" · ") : "Unknown"}
        />
      </div>

      <div className="pt-8 flex flex-col items-center gap-6">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 gap-4 sm:gap-6 px-4 sm:px-6 max-w-[1277px]">
          <div>
            <h1 className="font-semibold text-[18px] sm:text-[24px]">
              More Like This
            </h1>
          </div>
          <div>
            <Link
              href={`/similar/${id}`}
              className="flex items-center gap-1 text-sm cursor-pointer hover:underline"
            >
              <span>See More</span>
              <NextIcon2 />
            </Link>
          </div>
        </div>

        {loadingMoreLikeThis ? (
          <p className="text-center px-4">Loading similar movies...</p>
        ) : moreLikeThisMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 overflow-y-hidden sm:flex sm:gap-4 justify-items-start sm:overflow-x-auto max-w-[1277px] max-sm:w-[375px]">
            {moreLikeThisMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                title={movie.title}
                rating={movie.vote_average}
                movieId={movie.id}
              />
            ))}
          </div>
        ) : (
          <p className="px-4">No similar movies found.</p>
        )}
      </div>

      <FooterSection />
    </div>
  );
}
