import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import appRequest from "@/lib/appRequests";
import useAppStore from "@/stores/useAppStore";
import WindowMenu from "@/view/components/WindowMenu";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";

const UpdateUserPage = () => {
  const navigate = useNavigate();
  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;
  const show = useAppStore.getState().messageModalStore.actions.show;
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [roleID, setRoleID] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const { roles, update_id_pengguna, updateUser } = useAppStore(
    useShallow((state) => ({
      update_id_pengguna: state.userManagementPageStore.updatePenggunaID,
      roles: state.masterDataStore.roles,
      updateUser: state.userManagementPageStore.actions.updateUser,
    }))
  );

  const { mutate } = useMutation({
    mutationFn: async () => {
      setLoading(true);

      return await updateUser({
        id_pengguna: update_id_pengguna!,
        nama_lengkap: nameRef.current!.value,
        username: usernameRef.current!.value,
        password: passwordRef.current!.value,
        role_id: +roleID,
        status: status == "1",
      });
    },
    onSuccess(success) {
      if (!success) show("Gagal update user");

      navigate("/management-user");

      show("Berhasil update user");
    },
    onSettled: () => setLoading(false),
  });

  useEffect(() => {
    (async () => {
      setLoading(true);

      const user = await appRequest.getUserData(update_id_pengguna!);

      nameRef.current!.value = user.nama;
      usernameRef.current!.value = user.username;
      passwordRef.current!.value = "";
      setRoleID(user.id_role.toString());
      setStatus(user.status_aktif);

      setLoading(false);
    })();
  }, [setLoading, update_id_pengguna]);

  const saveHandler = () => {
    const errors: string[] = [];

    if (!nameRef.current?.value.trim()) {
      errors.push("Name tidak boleh kosong");
    }
    if (!usernameRef.current?.value.trim()) {
      errors.push("Username tidak boleh kosong");
    }
    if (!passwordRef.current?.value.trim()) {
      errors.push("Password tidak boleh kosong");
    }
    if (!roleID.trim()) {
      errors.push("Role tidak boleh kosong");
    }
    if (!status.trim()) {
      errors.push("Status tidak boleh kosong");
    }

    if (errors.length > 0) {
      show(errors.join("\n"));
      return;
    }

    return mutate();
  };

  return (
    <WindowMenu title1="Mangement User" title2="Update User">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Nama Lengkap</Label>
          <Input
            ref={nameRef}
            className="max-w-[400px] rounded-sm p-2 h-10 border-2 border-[#D9D9D9] focus-visible:ring-gray-400"
          />
        </div>
        <div className="flex flex-row items-center">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Username</Label>
          <Input
            ref={usernameRef}
            className="max-w-[400px] rounded-sm p-2 h-10 border-2 border-[#D9D9D9] focus-visible:ring-gray-400"
          />
        </div>
        <div className="flex flex-row items-center">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Password</Label>
          <Input
            ref={passwordRef}
            className="max-w-[400px] rounded-sm p-2 h-10 border-2 border-[#D9D9D9] focus-visible:ring-gray-400"
          />
        </div>
        <div className="flex flex-row items-center">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Role</Label>
          <Select value={roleID} onValueChange={setRoleID}>
            <SelectTrigger className="h-10 w-[400px] px-2 text-center shrink-0 text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectValue placeholder="Pilih Role . . ." />
            </SelectTrigger>
            <SelectContent className="text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectGroup>
                {roles.map((data) => (
                  <SelectItem key={data.id_role} value={data.id_role.toString()}>
                    {data.nama_role}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row items-center">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-10 w-[400px] px-2 text-center shrink-0 text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectValue placeholder="Pilih Status . . ." />
            </SelectTrigger>
            <SelectContent className="text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectGroup>
                <SelectItem value="1">Aktif</SelectItem>
                <SelectItem value="0">Tidak Aktif</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row gap-3 mt-3">
          <Button
            className="w-[80px] h-auto py-2 px-3 bg-[#CF1F1F] hover:bg-[#D10F0F] active:bg-[#9E0F0F]"
            onClick={() => navigate("/management-user")}
          >
            CANCEL
          </Button>
          <Button className="w-[80px] h-auto py-2 px-3 bg-[#1FA0CF]" onClick={saveHandler}>
            UPDATE
          </Button>
        </div>
      </div>
    </WindowMenu>
  );
};

export default UpdateUserPage;
