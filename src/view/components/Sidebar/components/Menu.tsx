import { cloneElement, ReactElement } from "react";
import { useNavigate } from "react-router";

interface MenuProps {
  icon: ReactElement;
  label: string;
  routeTo: string;
  isActive: boolean;
  isVisible: boolean;
  onClick: () => void;
}

const Menu = ({ icon, label, routeTo, onClick, isVisible = false, isActive = false }: MenuProps) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    onClick();
    navigate(routeTo);
  };

  if (!isVisible) return <></>;

  return (
    <div
      onClick={clickHandler}
      className={`flex flex-row justify-start items-start gap-3 px-6 py-3 cursor-pointer transition-colors select-none text-white ${
        isActive ? "bg-[#29ABE0]" : "bg-[#1FA0CF]"
      } bg-[#1FA0CF] hover:bg-[#188CB6]`}
    >
      {cloneElement(icon, {
        className: `text-xl ${icon.props.className ?? ""}`,
      })}
      <label className="text-base font-semibold cursor-pointer text-white">{label}</label>
    </div>
  );
};

export default Menu;
