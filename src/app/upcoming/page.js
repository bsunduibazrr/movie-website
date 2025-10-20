"use client";
import { useEffect, useState } from "react";
import { FooterSection } from "../_features/FooterSection";
import { NavbarSection } from "../_features/NavbarSection";
import { LoadingSection } from "../_features/LoadingSection";
import { TitleSortUpcoming } from "../_component/TitleSortComponentUpcoming";
import { NextPreviousComponentUpcoming } from "../_component/NextPreviousComponentUpcoming";

const apiLink =
  "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};

export default function Home() {
  const [upcomingMoviesData, setUpcomingMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const getData = async () => {
    setLoading(true);
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();
    setUpcomingMoviesData(jsonData.results);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, [getData]);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  if (loading) {
    return <LoadingSection />;
  }
  if (!loading && typeof upcomingMoviesData === "undefined") {
    return (
      <div className="flex pt-[35px] justify-center text-[29px] font-bold text-[red]">
        Something wrong...
      </div>
    );
  }
  return (
    <div className="w-[1440px] m-auto max-sm:w-[375px]">
      <NavbarSection darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="pt-[52px] cursor-pointer">
        <TitleSortUpcoming title={"Upcoming"} />
      </div>
      <NextPreviousComponentUpcoming />

      <FooterSection />
    </div>
  );
}
