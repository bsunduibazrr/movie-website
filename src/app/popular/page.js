"use client";
import { useEffect, useState } from "react";
import { FooterSection } from "../_features/FooterSection";
import { NavbarSection } from "../_features/NavbarSection";
import { LoadingSection } from "../_features/LoadingSection";
import { TitleSortPopular } from "../_component/TitleSortComponentPopular";
import { MovieCard } from "../_component/MovieSlideComponent";
import { NextPreviousComponentPopular } from "../_component/NextPreviousComponentPopular";
import { NextIcon } from "../icons/icons";
const apiLink =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function Home() {
  const [popularMoviesData, setPopularMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setPopularMoviesData(jsonData.results);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <LoadingSection />;
  }
  if (!loading && typeof popularMoviesData === "undefined") {
    return (
      <div className="flex pt-[35px] justify-center text-[29px] font-bold text-[red]">
        Something wrong...
      </div>
    );
  }

  return (
    <div>
      <div className="w-full max-w-[1440px] mx-auto px-4">
        <NavbarSection />

        <div className="pt-[52px]">
          <TitleSortPopular title={"Popular"} />
        </div>

        <NextPreviousComponentPopular />
      </div>

      <FooterSection />
    </div>
  );
}
