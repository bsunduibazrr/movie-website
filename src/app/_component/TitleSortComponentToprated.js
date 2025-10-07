import Link from "next/link";
import { NextIcon2 } from "../icons/icons";

export const TitleSortToprated = (props) => {
  const { title, seemore, icon } = props;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-20 pt-6">
      <h3 className="text-[20px] sm:text-[24px] font-semibold leading-[32px]">
        {title}
      </h3>

      <div className="flex gap-1 items-center mt-2 sm:mt-0">
        <Link href="/toprated">
          <button className="text-sm sm:text-base font-medium hover:underline">
            {seemore}
          </button>
        </Link>
        <button className="hover:underline">{icon}</button>
      </div>
    </div>
  );
};
