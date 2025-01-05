import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/useAppStore";
import { RiDownload2Fill } from "react-icons/ri";
import { useShallow } from "zustand/react/shallow";

const DownloadButton = ({ dokumen_id }: { dokumen_id: number }) => {

  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;

  const { getDocument } = useAppStore(
    useShallow((state) => ({
      getDocument: state.documentPageStore.actions.getDocument,
    }))
  );

  const downloadHandler = async () => {
    setLoading(true);
    const dataDocument = await getDocument(dokumen_id);

    const link = document.createElement("a");
    link.innerHTML = "Download PDF file";
    link.download = "file.pdf";
    link.href = "data:application/octet-stream;base64," + dataDocument.lokasi_file;
    link.click();

    setLoading(false);
  };

  return (
    <Button className="p-1.5 h-auto bg-[#EFB737] hover:bg-[#D8A329] active:bg-[#C88A1C]" onClick={downloadHandler}>
      <RiDownload2Fill />
    </Button>
  );
};

export default DownloadButton;
