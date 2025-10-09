"use client";
import { useEffect, useState } from "react";
import { MovieCard } from "../_component/MovieSlideComponent";
import { LoadingSection } from "./LoadingSection";
import { TitleSortToprated } from "../_component/TitleSortComponentToprated";
import { NextIcon2 } from "../icons/icons";
const apiLink =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const TopratedMovieSection = () => {
  const [topratedMoviesData, setTopratedMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const data = await fetch(apiLink, options);
      const jsonData = await data.json();
      setTopratedMoviesData(jsonData.results);
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
      setTopratedMoviesData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <LoadingSection />;
  }
  if (!loading && typeof topratedMoviesData === "undefined") {
    return (
      <div className="flex pt-[35px] justify-center text-[29px] font-bold text-[red]">
        Something wrong
      </div>
    );
  }

  return (
    <div className="w-full px-0 max-sm:w-full max-sm:px-0">
      <TitleSortToprated
        title={"Top Rated"}
        seemore={"See More"}
        icon={<NextIcon2 />}
      />
      <div className="pt-[32px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-sm:gap-[4px] max-sm:px-0">
        {topratedMoviesData.slice(0, 10).map((movie) => (
          <MovieCard
            movieId={movie.id}
            key={movie.id}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
          />
        ))}
      </div>
    </div>
  );
};
