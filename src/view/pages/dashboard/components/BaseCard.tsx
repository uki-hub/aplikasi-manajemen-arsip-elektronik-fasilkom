import { cloneElement, ReactElement } from "react";

type BaseCardProps = {
  title: string;
  value: number;
  icon: ReactElement;
};

const BaseCard = ({ title, value, icon }: BaseCardProps) => {
  return (
    <div className="relative flex flex-row justify-between w-full max-w-[270px] h-28 py-3 pl-6 px-3 rounded-lg shadow-md overflow-hidden select-none bg-white">
      <div className="absolute top-0 left-0 w-2.5 h-full bg-[#1FA0CF]"></div>
      <div className="flex flex-col gap-1 items-center justify-end">
        <span className="text-2xl font-extrabold">{value}</span>
        <span className="tracking-widest text-sm font-semibold text-[#1FA0CF]">{title}</span>
      </div>
      {cloneElement(icon, {
        className: `text-[62px] text-[#EAEAEA]`,
      })}
    </div>
  );
};

export default BaseCard;
