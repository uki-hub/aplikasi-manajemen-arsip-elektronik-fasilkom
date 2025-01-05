import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAppStore from "@/stores/useAppStore";
import WindowMenu from "@/view/components/WindowMenu";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";

const AddDocumentPage = () => {
  const navigate = useNavigate();
  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;
  const show = useAppStore.getState().messageModalStore.actions.show;

  const { kategoriArsip, users, mahasiswaUploadDocument } = useAppStore(
    useShallow((state) => ({
      kategoriArsip: state.masterDataStore.kategoriArsip,
      users: state.userManagementPageStore.users,
      mahasiswaUploadDocument: state.documentPageStore.actions.mahasiswaUploadDocument,
    }))
  );

  const [kategoriID, setKategoriID] = useState<string>("");
  const judulDocRef = useRef<HTMLInputElement>(null);
  const deskripsiDocRef = useRef<HTMLTextAreaElement>(null);
  const fileDocRef = useRef<HTMLInputElement>(null);
  const [dosenID, setDosenID] = useState<string>("");

  const saveHandler = () => {
    const errors: string[] = [];

    if (!kategoriID.trim()) {
      errors.push("Kategori tidak boleh kosong");
    }
    if (!judulDocRef.current?.value.trim()) {
      errors.push("Judul tidak boleh kosong");
    }
    if (!deskripsiDocRef.current?.value.trim()) {
      errors.push("Deskripsi tidak boleh kosong");
    }
    if (!fileDocRef.current?.value.trim()) {
      errors.push("File tidak boleh kosong");
    }
    if (!dosenID.trim()) {
      errors.push("Dosen tidak boleh kosong");
    }

    if (errors.length > 0) {
      show(errors.join("\n"));
      return;
    }

    setLoading(true);
    const file = fileDocRef.current!.files![0];

    const fileReader = new FileReader();
    fileReader.onload = async function (fileLoadedEvent) {
      const base64 = fileLoadedEvent.target!.result as string;
      await mahasiswaUploadDocument({
        id_pengguna: useAppStore.getState().authStore.gets.getPenggunaId(),
        id_kategori_arsip: +kategoriID,
        id_dosen: +dosenID,
        judul_dokumen: judulDocRef.current!.value as string,
        deskripsi: deskripsiDocRef.current!.value as string,
        lokasi_file: base64!.split("base64,")[1],
      });

      setLoading(false);

      navigate("/management-document");

      useAppStore.getState().messageModalStore.actions.show("Your data have been saved.");
    };
    fileReader.readAsDataURL(file);
  };

  const dosen = users.filter((x) => x.nama_role == "Dosen");

  return (
    <WindowMenu title1="Data Dokumen" title2="Tambah Dokumen">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Jenis Dokumen</Label>
          <Select defaultValue="" value={kategoriID} onValueChange={setKategoriID}>
            <SelectTrigger className="h-10 w-[400px] px-2 text-center shrink-0 text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectValue placeholder="Pilih Kategori Arsip ..." />
            </SelectTrigger>
            <SelectContent className="text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectGroup>
                {kategoriArsip.map((data) => (
                  <SelectItem key={data.id_kategori_arsip} value={data.id_kategori_arsip.toString()}>
                    {data.nama_kategori_arsip}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-row items-center">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Judul Dokumen</Label>
          <Input
            ref={judulDocRef}
            className="max-w-[400px] rounded-sm p-2 h-10 border-2 border-[#D9D9D9] focus-visible:ring-gray-400"
          />
        </div>
        <div className="flex flex-row items-start">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Deskripsi</Label>
          <Textarea
            ref={deskripsiDocRef}
            className="max-w-[400px] rounded-sm p-2 h-10 border-2 border-[#D9D9D9] focus-visible:ring-gray-400"
          />
        </div>
        <div className="flex flex-row items-start">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Lampiran</Label>
          <Input
            ref={fileDocRef}
            accept=".pdf"
            type="file"
            className="max-w-[400px] rounded-sm p-2 h-10 border-2 cursor-pointer border-[#D9D9D9] focus-visible:ring-gray-400"
          />
        </div>
        <div className="flex flex-row items-center">
          <Label className="shrink-0 whitespace-nowrap w-32 font-semibold text-base">Dosen Approval</Label>
          <Select defaultValue="" value={dosenID} onValueChange={setDosenID}>
            <SelectTrigger className="h-10 w-[400px] px-2 text-center shrink-0 text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectValue placeholder="Pilih Dosen Approve ..." />
            </SelectTrigger>
            <SelectContent className="text-black border-[#D9D9D9] focus-visible:ring-gray-400">
              <SelectGroup>
                {dosen.map((data) => (
                  <SelectItem key={data.id_pengguna} value={data.id_pengguna.toString()}>
                    {data.nama}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row gap-3 mt-3">
          <Button
            onClick={() => navigate("/management-document")}
            className="w-[80px] h-auto py-2 px-3 bg-[#CF1F1F] hover:bg-[#D10F0F] active:bg-[#9E0F0F]"
          >
            CANCEL
          </Button>
          <Button className="w-[80px] h-auto py-2 px-3 bg-[#1FA0CF]" onClick={saveHandler}>
            SAVE
          </Button>
        </div>
      </div>
    </WindowMenu>
  );
};

export default AddDocumentPage;
