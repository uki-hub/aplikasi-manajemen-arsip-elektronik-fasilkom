import WindowMenu from "@/view/components/WindowMenu";
import TableDocument from "./components/TableDocument";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import useAppStore from "@/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";
import { useMutation } from "react-query";
import { useEffect } from "react";

const DocumentPage = () => {
  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;
  const { role } = useAppStore(
    useShallow((state) => ({
      role: state.authStore.gets.getUserRole(),
    }))
  );
  const { documents, getDocuments } = useAppStore(
    useShallow((state) => ({
      documents: state.documentPageStore.documents,
      getDocuments: state.documentPageStore.actions.getDocuments,
    }))
  );

  const { mutate } = useMutation({
    mutationFn: () => getDocuments(),
    onSettled: () => setLoading(false),
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <WindowMenu
      title1="Data Dokumen"
      title2="Daftar Dokumen"
      title1Action={
        role == "Mahasiswa" ? (
          <Link to="/add-doc">
            <Button className="flex flex-row gap-2">
              <BsFileEarmarkPlusFill className=" !text-2xl" />
              <span>Tambah Dokumen</span>
            </Button>
          </Link>
        ) : (
          <></>
        )
      }
    >
      <TableDocument documents={documents} />
    </WindowMenu>
  );
};

export default DocumentPage;
