import { cloneElement, PropsWithChildren, ReactElement } from "react";

interface WindowMenuProps extends PropsWithChildren {
  title1: string;
  title2: string;
  title1Action?: ReactElement;
  title2Icon?: ReactElement;
}

const WindowMenu = ({
  title1,
  title2,
  title1Action,
  title2Icon,
  children,
}: WindowMenuProps) => {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <span className="text-2xl font-semibold select-none">{title1}</span>
        {title1Action}
      </div>
      <div className="h-full flex flex-col rounded-md overflow-hidden shadow-md border-[1px] border-gray-400 bg-white">
        <div className="flex flex-row items-center gap-2 px-4 py-2.5 shadow-sm rounded-t-md border-[1px] border-gray-400 bg-gray-300">
          {title2Icon ? (
            cloneElement(title2Icon, {
              className: `text-lg text-[#1FA0CF]`,
            })
          ) : (
            <></>
          )}
          <span className="select-none font-semibold text-[#1FA0CF]">{title2}</span>
        </div>
        <div className="max-h-full py-5 px-7 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default WindowMenu;
