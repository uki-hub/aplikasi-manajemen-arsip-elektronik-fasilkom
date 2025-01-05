import spandukImage from "../../../assets/login/spanduk.png";
import esaUnggulImage from "../../../assets/esaunggul.png";
import useAppStore from "@/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const currentMenu = useAppStore(useShallow((state) => state.loginPageStore.currentMenu));
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (useAppStore.getState().authStore.gets.isAuthenticated()) navigate("/");
    })();
  }, [navigate]);

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full py-8 px-4 bg-[#1983AA]">
        {currentMenu == "login" ? <Login /> : <ForgotPassword />}
      </div>
      <div className="flex flex-col w-full h-full py-8 px-4 items-center justify-center bg-[#1FA0CF]">
        <h1 className="text-2xl font-bold text-center mb-4 mt-auto text-white ">Aplikasi Manajemen Arsip Elektronik Fasilkom</h1>
        <img src={spandukImage} className="w-72 h-56" />
        <div className="bg-white p-3 mt-auto rounded-lg ">
          <img src={esaUnggulImage} className="h-12" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
