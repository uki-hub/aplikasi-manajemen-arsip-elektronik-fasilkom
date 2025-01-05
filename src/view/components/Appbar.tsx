import useAppStore from "@/stores/useAppStore";
import { FaUser } from "react-icons/fa";
import { useShallow } from "zustand/react/shallow";

const Appbar = () => {
  const { nama, role } = useAppStore(
    useShallow((state) => ({
      nama: state.authStore.user?.nama,
      role: state.authStore.gets.getUserRole(),
    }))
  );

  return (
    <div className="flex flex-row justify-end items-center gap-3 px-6 py-4 h-16 w-full shadow-md bg-white">
      <div className="flex flex-col items-end select-none">
        <span className="text-lg font-bold">{nama}</span>
        <span className="text-sm text-gray-600">{role}</span>
      </div>
      <div className="p-2.5 rounded-full outline-gray-600 bg-gray-400">
        <FaUser className="text-2xl text-white" />
      </div>
    </div>
  );
};

export default Appbar;
