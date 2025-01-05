import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DocumentModel from "@/models/DocumentModel";
import useAppStore from "@/stores/useAppStore";
import { useRef, useState } from "react";
import { TbEye } from "react-icons/tb";
import { useShallow } from "zustand/react/shallow";

const ViewButton = ({ dokumen_id }: { dokumen_id: number }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [doc, setDoc] = useState<DocumentModel>();

  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;

  const { getDocument } = useAppStore(
    useShallow((state) => ({
      getDocument: state.documentPageStore.actions.getDocument,
    }))
  );

  const downloadHandler = async () => {
    setLoading(true);
    const dataDocument = await getDocument(dokumen_id);

    const obj = document!.createElement("object");
    obj.style.width = "100%";
    obj.style.height = "100%";
    obj.type = "application/pdf";
    obj.data = "data:application/pdf;base64," + dataDocument.lokasi_file;

    divRef.current?.appendChild(obj);

    setDoc(dataDocument);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={downloadHandler} className="p-1.5 h-auto bg-[#1FCF2E] hover:bg-[#17B92A] active:bg-[#149F23]">
          <TbEye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[75%] gap-2">
        <DialogHeader className="py-2">
          <DialogTitle className="flex flex-col items-center gap-3 text-center">
            <span className="text-xl font-semibold select-none">{doc?.nama_file}</span>
          </DialogTitle>
        </DialogHeader>
        <div ref={divRef} className="h-[80vh] flex flex-col gap-4 overflow-hidden rounded text-gray-900">
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewButton;
