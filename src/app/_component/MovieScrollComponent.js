import {
  NextIcon,
  PreviousIcon,
  RatingIcon,
  TrailerIcon,
} from "../icons/icons";

export const MovieScroll = ({
  image,
  title,
  explanation,
  onNextClick,
  onPrevClick,
  onTrailerClick,
  movieId,
}) => {
  return (
    <div className="relative flex-shrink-0 w-[1440px] h-[600px] snap-start transition-transform duration-500 cursor-pointer max-sm:w-[375px] max-sm:justify-start">
      <img
        src={image}
        alt="Background"
        className="absolute w-full h-full object-cover -z-10 cursor-pointer max-sm:w-full max-sm:object-cover sm:object-cover"
      />

      <div
        onClick={onPrevClick}
        className="absolute left-0 bottom-1/2 translate-y-1/2 cursor-pointer p-3  bg-opacity-70 hover:bg-opacity-100 rounded-r-md z-20 max-sm:p-2"
        aria-label="Previous"
      >
        <PreviousIcon />
      </div>

      <div className="flex items-center  justify-between h-full px-10 bg-black/30">
        <div className="max-w-[330px] pl-[30px]">
          <p className="text-white text-sm font-normal">Now Playing:</p>
          <p className="text-white text-4xl font-bold">{title}</p>
          <RatingIcon />
          <p className="text-white text-xs font-normal mt-2">{explanation}</p>
          <button
            className="cursor-pointer pt-[16px]"
            onClick={() => onTrailerClick(movieId)}
          >
            <TrailerIcon />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div
            onClick={onNextClick}
            className="cursor-pointer"
            aria-label="Next"
          >
            <NextIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
