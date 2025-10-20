"use client";
import { useEffect, useState } from "react";
import { LoadingSection2 } from "./LoadingSection2";
import { MovieScroll } from "../_component/MovieScrollComponent";

const apiLink =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export const MovieScrollSection = () => {
  const [nowPlayingMoviesData, setNowPlayingMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderMovieTrailer, setSliderMovieTrailer] = useState(null);
  const [activeTrailerId, setActiveTrailerId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    const filtered = jsonData.results.slice(11, 19);
    setNowPlayingMoviesData(filtered);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const trailerDisplay = async (id) => {
    const trailerPlay = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    );
    const trailerData = await trailerPlay.json();
    const youtubeTrailer = trailerData.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    if (youtubeTrailer) {
      setSliderMovieTrailer(youtubeTrailer.key);
      setActiveTrailerId(id);
    } else {
      setSliderMovieTrailer(null);
      setActiveTrailerId(null);
    }
  };

  const handleNext = () => {
    if (currentIndex < nowPlayingMoviesData.length - 1) {
      setSliderMovieTrailer(null);
      setActiveTrailerId(null);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSliderMovieTrailer(null);
      setActiveTrailerId(null);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) return <LoadingSection2 />;

  if (!loading && nowPlayingMoviesData.length === 0) {
    return (
      <div className="flex justify-center text-red-600 text-lg pt-6">
        SOMETHING WENT WRONG...
      </div>
    );
  }

  const currentMovie = nowPlayingMoviesData[currentIndex];

  return (
    <div className="w-full flex flex-col items-center pt-6 ">
      <div className="w-full max-w-[1440px] h-[600px] flex items-center justify-start relative">
        <MovieScroll
          image={`https://image.tmdb.org/t/p/w1280${currentMovie.backdrop_path}`}
          title={currentMovie.title}
          explanation={currentMovie.overview}
          onNextClick={handleNext}
          onPrevClick={handlePrevious}
          onTrailerClick={trailerDisplay}
          movieId={currentMovie.id}
          isTrailerActive={activeTrailerId === currentMovie.id}
        />

        {activeTrailerId === currentMovie.id && sliderMovieTrailer && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/90 z-50 flex items-center justify-center max-sm:w-[375px] ">
            <div className="w-full max-w-[1280px]  top-[80px] left-[200px] aspect-video relative px-4 sm:px-0 max-sm:top-[20px] max-sm:left-0">
              <iframe
                src={`https://www.youtube.com/embed/${sliderMovieTrailer}?autoplay=1`}
                title="YouTube trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-[997px] h-[561px] rounded-md shadow-lg max-sm:w-[355px] max-sm:h-[212px]"
              ></iframe>

              <button
                onClick={() => {
                  setActiveTrailerId(null);
                  setSliderMovieTrailer(null);
                }}
                className="absolute top-15 left-0 bg-red-600 hover:bg-red-700 text-white rounded p-2 text-sm font-bold z-50 max-sm:top-2 max-sm:left-0 max-sm:w-[30px] max-sm:h-[30px]"
                aria-label="Close Trailer"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
