import { Outlet, useLocation, useNavigate } from "react-router";
import Sidebar from "../components/Sidebar/Sidebar";
import Appbar from "../components/Appbar";
import useAppStore from "@/stores/useAppStore";
import cookieService from "@/lib/cookieService";
import useDeepCompareEffect from "use-deep-compare-effect";
import { useState } from "react";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [blank, setBlank] = useState<boolean>(true);

  useDeepCompareEffect(() => {
    const authenticateUser = async () => {
      if (!cookieService.get("uid")) {
        navigate("/login");
      } else if (blank) {
        setBlank(false);

        await useAppStore.getState().appStore.actions.sync();
      }
    };

    authenticateUser();
  }, [navigate, location]);

  if (blank) return <></>;

  return (
    <div className="relative flex flex-row w-full h-screen overflow-hidden bg-gray-200">
      <Sidebar />
      <div className="flex flex-col w-full bg-gray-200">
        <Appbar />
        <div className="h-full max-h-full px-7 py-5 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
