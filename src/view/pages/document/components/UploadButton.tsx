import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DocumentModel from "@/models/DocumentModel";
import useAppStore from "@/stores/useAppStore";
import { useRef, useState } from "react";
import { useShallow } from "zustand/react/shallow";

type UploadButtonProps = {
  document: DocumentModel;
};

const UploadButton = ({ document }: UploadButtonProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;
  const fileRef = useRef<HTMLInputElement>(null);
  const show = useAppStore.getState().messageModalStore.actions.show;

  const { adminUploadDocument } = useAppStore(
    useShallow((state) => ({
      adminUploadDocument: state.documentPageStore.actions.adminUploadDocument,
    }))
  );

  const saveHandler = () => {
    const file = fileRef.current!.files![0];

    if (!file) {
      show("File tidak boleh kosong");
      return;
    }

    setLoading(true);

    const fileReader = new FileReader();
    fileReader.onload = async function (fileLoadedEvent) {
      const base64 = fileLoadedEvent.target!.result as string;

      await adminUploadDocument({
        id_dokumen: document.id_dokumen,
        lokasi_file: base64!.split("base64,")[1],
      });

      setLoading(false);
      setOpen(false);

      show("Berhasil upload dokumen");
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-1.5 h-auto text-[10px] tracking-widest bg-[#1FA0CF]">UPLOAD</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="py-2 border-b-2 border-gray-400">
          <DialogTitle className="text-center text-xl">Upload Dokumen</DialogTitle>
          <DialogDescription className="text-center text-base font-semibold !text-black">
            {document.judul_dokumen}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-gray-900">
          <div className="text-sm select-none text-gray-600">Silahkan unggah dokumen yang diminta!</div>
          <Input
            ref={fileRef}
            accept=".pdf"
            type="file"
            className="w-full h-[150px] rounded-sm p-2 border-2 cursor-pointer border-[#D9D9D9] focus-visible:ring-gray-400"
          />
          <div className="flex flex-row justify-center gap-3 mt-3">
            <Button
              onClick={() => setOpen(false)}
              className="w-full h-auto py-2 px-3 bg-[#CF1F1F] hover:bg-[#D10F0F] active:bg-[#9E0F0F]"
            >
              CANCEL
            </Button>
            <Button className="w-full h-auto py-2 px-3 bg-[#1FA0CF]" onClick={saveHandler}>
              SAVE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
