"use client";

import React, { useEffect, useState } from "react";
import { DarkRating, RatingBlack } from "../icons/icons";

export const MovieDetailGg = (props) => {
  const {
    image,
    title,
    overview,
    release_date,
    runtime,
    trailerUrl,
    backdrop,
    genre,
  } = props;

  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className="px-4 max-w-[1100px] mx-auto">
      <div className="pt-10 flex flex-col sm:flex-row justify-between gap-10 sm:gap-[205px]">
        <div>
          <h3 className="font-bold text-[24px] sm:text-[36px] leading-tight">
            {title}
          </h3>
          <h3 className="font-normal text-[14px] sm:text-[18px] ">
            {release_date} · PG · {runtime} mins
          </h3>
        </div>
        <div className="items-start sm:items-end">
          <h1 className="text-[12px] font-medium mb-1">Rating</h1>
          <div>{darkMode ? <DarkRating /> : <RatingBlack />}</div>
          <span className="text-[12px] font-normal">37k</span>
        </div>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
        <img
          src={image}
          alt={`${title} poster`}
          className="w-full max-w-[290px] h-[428px] object-cover rounded-md hover:brightness-50 transition"
        />

        {trailerUrl ? (
          <div className="w-full max-w-[760px] h-[220px] sm:h-[428px] rounded-xl overflow-hidden ">
            <iframe
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full "
            ></iframe>
          </div>
        ) : (
          <img
            src={backdrop}
            alt={`${title} backdrop`}
            className="w-full max-w-[760px] h-[220px] sm:h-[428px] object-cover rounded-md"
          />
        )}
      </div>

      <div className="flex justify-center pt-10">
        <p className="font-normal text-[14px] sm:text-[16px] leading-relaxed text-center max-w-[1080px] ">
          {overview}
        </p>
      </div>

      <div className="pt-4 flex justify-center gap-2 flex-wrap max-w-[600px] mx-auto">
        {genre && typeof genre === "string" ? (
          genre.split(" · ").map((name, idx) => (
            <span
              key={idx}
              className="inline-block rounded-[8px] px-3 text-sm font-semibold border border-gray-500 hover:bg-gray-500 cursor-pointer"
              style={{
                height: "20px",
                lineHeight: "20px",
                minWidth: "50px",
                textAlign: "center",
              }}
            >
              {name}
            </span>
          ))
        ) : (
          <span
            className="inline-block text-gray-600 rounded-[8px] px-3 text-sm font-semibold border border-gray-400 hover:bg-gray-500 cursor-pointer"
            style={{
              height: "20px",
              lineHeight: "20px",
              minWidth: "50px",
              textAlign: "center",
            }}
          >
            Unknown
          </span>
        )}
      </div>
    </div>
  );
};
