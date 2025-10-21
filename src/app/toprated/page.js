"use client";
import { useEffect, useState } from "react";
import { FooterSection } from "../_features/FooterSection";
import { NavbarSection } from "../_features/NavbarSection";
import { LoadingSection } from "../_features/LoadingSection";
import { TitleSortToprated } from "../_component/TitleSortComponentToprated";
import { NextPreviousComponentToprated } from "../_component/NextPreviousComponentToprated";

const API_BASE = "https://api.themoviedb.org/3/movie/top_rated";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function Home() {
  const [topratedMoviesData, setTopratedMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      `${API_BASE}?language=en-US&page=${page}`,
      options
    );
    const jsonData = await response.json();
    setTopratedMoviesData(jsonData.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) return <LoadingSection />;
  if (!loading && typeof topratedMoviesData === "undefined") {
    return (
      <div className="flex pt-[35px] justify-center text-[29px] font-bold text-[red]">
        Something went wrong...
      </div>
    );
  }

  return (
    <div className="w-[1440px] m-auto mx-auto px-4 max-sm:w-[375px]">
      <NavbarSection />

      <div className="pt-[52px]">
        <TitleSortToprated title={"Top Rated"} />
      </div>

      <NextPreviousComponentToprated />
      <FooterSection />
    </div>
  );
}
