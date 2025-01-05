import useAppStore from "@/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";

const Loading = () => {
  const isLoading = useAppStore(useShallow((state) => state.loadingStore.isLoading));

  console.log("render", isLoading);

  return (
    isLoading && (
      <div className="absolute top-0 left-0 w-full h-screen z-[9999]">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      </div>
    )
  );
};

export default Loading;
