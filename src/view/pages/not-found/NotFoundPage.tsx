import { TbError404 } from "react-icons/tb";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-500">
      <TbError404 className="text-[128px] text-gray-400" />

      <Link to={"/"}>
        <label className="cursor-pointer text-gray-400 hover:underline hover:text-gray-300">Go Back</label>
      </Link>
    </div>
  );
};

export default NotFoundPage;
