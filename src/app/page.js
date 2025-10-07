import { FooterSection } from "./_features/FooterSection";
import { MovieScrollSection } from "./_features/MovieScrollSection";
import { UpcomingMovieSection } from "./_features/UpcomingMovieSection";
import { NavbarSection } from "./_features/NavbarSection";
import "./globals.css";
import { PopularMovieSection } from "./_features/PopularMovieSection";
import { TopratedMovieSection } from "./_features/TopratedMovieSection";

export default function Home() {
  return (
    <div className="w-[1440px] m-auto max-sm:w-[375px]">
      <NavbarSection />
      <MovieScrollSection />
      <UpcomingMovieSection />
      <PopularMovieSection />
      <TopratedMovieSection />
      <FooterSection />
    </div>
  );
}
