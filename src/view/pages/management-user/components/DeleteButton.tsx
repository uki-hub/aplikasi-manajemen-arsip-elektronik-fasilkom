import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UserModel from "@/models/UserModel";
import useAppStore from "@/stores/useAppStore";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";

const DeleteButton = ({ user }: { user: UserModel }) => {
  const navigate = useNavigate();
  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;
  const [open, setOpen] = useState<boolean>(false);

  const { deleteUser } = useAppStore(
    useShallow((state) => ({
      deleteUser: state.userManagementPageStore.actions.deleteUser,
    }))
  );

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(user.id_pengguna),
    onSuccess(data) {
      if (data) navigate("/management-user");
    },
    onSettled: () => setLoading(false),
  });

  const approveHandler = () => {
    setLoading(true);
    mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-1.5 h-auto bg-[#CF1F1F]">
          <FaRegTrashAlt />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-0">
        <DialogHeader className="py-2">
          <DialogTitle className="flex flex-col items-center gap-3 text-center">
            <FiCheckCircle className="text-[50px] text-[#66C74B]" />
            <span className="text-xl font-semibold select-none">Delete User</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-gray-900">
          <div className="text-center select-none text-gray-600">
            Apakah Anda yakin ingin menghapus user ?<span className="block font-semibold">({user.nama})</span>
          </div>
          <div className="flex flex-row justify-center gap-5">
            <Button
              className="w-full h-auto py-2 px-3 bg-[#CF1F1F] hover:bg-[#D10F0F] active:bg-[#9E0F0F]"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button className="w-full h-auto py-2 px-3 bg-[#1FA0CF]" onClick={approveHandler}>
              DELETE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;