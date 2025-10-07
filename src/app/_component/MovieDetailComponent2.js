export const MovieDetailPartTwo = (props) => {
  const { director, writers, stars } = props;
  return (
    <div className="flex flex-col justify-center">
      <div className=" pt-[32px]">
        <div className="flex  pt-[32px]">
          <h3 className="font-bold text-[16px]">Director</h3>
          <h3 className="font-normal text-[16px] pl-[53px]">{director}</h3>
        </div>
        <div className="pt-[8px]">
          <h3 className="w-[1080px] h-[2px] bg-[#f4f4f5] max-sm:w-[375px] "></h3>
        </div>
        <div className="flex  pt-[20px]">
          <h3 className="font-bold text-[16px]">Writers</h3>
          <h3 className="font-normal text-[16px] pl-[58px]">{writers}</h3>
        </div>
        <div className="pt-[8px]">
          <h3 className="w-[1080px] h-[2px] bg-[#f4f4f5] max-sm:w-[375px]"></h3>
        </div>
        <div className="flex  pt-[20px]">
          <h3 className="font-bold text-[16px]">Stars</h3>
          <h3 className="font-normal text-[16px] pl-[73px]">{stars}</h3>
        </div>
        <div className="pt-[8px]">
          <h3 className="w-[1080px] h-[2px] bg-[#f4f4f5] max-sm:w-[375px]"></h3>
        </div>
      </div>
    </div>
  );
};
