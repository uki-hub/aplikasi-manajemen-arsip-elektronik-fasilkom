import { Button } from "@/components/ui/button";
import WindowMenu from "../../components/WindowMenu";
import TableUser from "./components/TableUser";
import { BsPersonFillAdd } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import useAppStore from "@/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";
import { useMutation } from "react-query";

const ManagementUserPage = () => {
  const navigate = useNavigate();
  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;

  const { role } = useAppStore(
    useShallow((state) => ({
      role: state.authStore.gets.getUserRole(),
    }))
  );

  const { users, getUsers } = useAppStore(
    useShallow((state) => ({
      users: state.userManagementPageStore.users,
      getUsers: state.userManagementPageStore.actions.getUsers,
    }))
  );

  const { mutate } = useMutation({
    mutationFn: () => getUsers(),
    onSettled: () => setLoading(false),
  });

  useEffect(() => {
    if (role == "Mahasiswa") {
      navigate("/");
    } else {
      mutate();
    }
  }, [navigate, role, mutate]);

  return (
    <WindowMenu
      title1="Mangement User"
      title2="Daftar Data Pengguna"
      title1Action={
        <Link to="/add-user">
          <Button className="flex flex-row gap-2">
            <BsPersonFillAdd className=" !text-2xl" />
            <span>Tambah User</span>
          </Button>
        </Link>
      }
    >
      <TableUser users={users} />
    </WindowMenu>
  );
};

export default ManagementUserPage;
