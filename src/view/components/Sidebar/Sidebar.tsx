import { FaUsers } from "react-icons/fa";
import iconDashboard from "../../../assets/dashboard/icon.png";
import esaunggulImage from "../../../assets/esaunggul.png";
import Menu from "./components/Menu";
import { BsGrid1X2Fill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import useAppStore from "@/stores/useAppStore";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";

const Sidebar = () => {
  const navigate = useNavigate();
  const { menu, menuToggle, role } = useAppStore(
    useShallow((state) => ({
      menu: state.appStore.dashboardCurrentMenu,
      menuToggle: state.appStore.actions.dashboardMenuToggle,
      role: state.authStore.gets.getUserRole(),
    }))
  );

  const signOutHandler = () => {
    useAppStore.getState().authStore.actions.signOut();
    navigate("/login");
  };

  return (
    <div className="min-w-[230px] max-w-[250px] w-[17.5%] h-full pb-3 bg-[#1FA0CF]">
      <div className="h-full flex flex-col items-center">
        <div className="flex flex-col items-center w-full pt-6 pb-4 gap-2">
          <img src={iconDashboard} alt="icon" className="w-16 h-16" />
          <span className="text-2xl text-center select-none text-white">Manajemen Arsip Fasilkom</span>
        </div>
        <div className="w-[80%] h-[1px] mb-2 bg-white"></div>

        <div className="flex flex-col h-full w-full  justify-between">
          <div className="w-full flex flex-col">
            <Menu
              isActive={menu == "dashboard"}
              isVisible={true}
              icon={<BsGrid1X2Fill />}
              label="Dashboard"
              routeTo="/"
              onClick={() => menuToggle("dashboard")}
            />
            <Menu
              isActive={menu == "managementUser"}
              isVisible={role == "Admin"}
              icon={<FaUsers />}
              label="Management User"
              routeTo="/management-user"
              onClick={() => menuToggle("managementUser")}
            />
            <Menu
              isActive={menu == "managementDocument"}
              isVisible={true}
              icon={<IoDocumentText />}
              label="Document"
              routeTo="/management-document"
              onClick={() => menuToggle("managementDocument")}
            />
          </div>

          <div className="flex flex-col w-full">
            <div
              className="flex flex-row justify-start items-start gap-3 px-6 py-3 cursor-pointer transition-colors select-none text-white bg-[#1FA0CF] hover:bg-[#188CB6]"
              onClick={signOutHandler}
            >
              <TbLogout2 className="text-xl" />
              <label className="text-base font-semibold cursor-pointer text-white">{"Logout"}</label>
            </div>
            <div className="px-2.5 pt-3.5">
              <div className="flex flex-row justify-center p-3 mt-auto rounded-lg bg-white ">
                <img src={esaunggulImage} className="h-[8vh] w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
