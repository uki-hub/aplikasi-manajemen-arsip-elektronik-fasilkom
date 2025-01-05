import { FaUserCheck, FaUserMinus, FaUsers } from "react-icons/fa6";
import BaseCard from "./components/BaseCard";
import { SiGoogledocs } from "react-icons/si";
import useAppStore from "@/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

const DashboardPage = () => {
  const { role, data, synced } = useAppStore(
    useShallow((state) => ({
      role: state.authStore.gets.getUserRole(),
      data: state.dashboardPageStore.dashboardPageData,
      synced: state.appStore.synced,
    }))
  );

  useEffect(() => {
    if (synced) useAppStore.getState().dashboardPageStore.actions.getDashboard();
  }, [synced]);

  if (!data) return <div className="select-none text-xl text-gray-400">Loading . . .</div>;

  if (role == "Admin") {
    return (
      <div className="flex-wrap flex flex-row w-full gap-5">
        <BaseCard title="TOTAL USERS" value={data.total_user} icon={<FaUsers />} />
        <BaseCard title="ACTIVE USERS" value={data.user_aktif} icon={<FaUserCheck />} />
        <BaseCard title="INACTIVE USERS" value={data.user_tidak_aktif} icon={<FaUserMinus />} />
        <BaseCard title="TOTAL DOCUMENTS" value={data.user_dokumen} icon={<SiGoogledocs />} />
      </div>
    );
  }

  if (role == "Mahasiswa") {
    return (
      <div className="flex-wrap flex flex-row w-full gap-5">
        <BaseCard title="APPROVAL PENDING" value={data.approval_pending} icon={<FaUsers />} />
      </div>
    );
  }

  if (role == "Dosen") {
    return (
      <div className="flex-wrap flex flex-row w-full gap-5">
        <BaseCard title="APPROVAL PENDING" value={data.approval_pending} icon={<FaUsers />} />
        <BaseCard title="TOTAL DOCUMENTS" value={data.total_dokumen} icon={<SiGoogledocs />} />
      </div>
    );
  }
};

export default DashboardPage;
