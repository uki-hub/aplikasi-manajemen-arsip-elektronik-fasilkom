import DocumentModel from "@/models/DocumentModel";
import SimpleDataTable, { BodyColumn, HeadColumn } from "@/view/components/SimpleDataTable";
import ApproveButton from "./ApproveButton";
import UploadButton from "./UploadButton";
import { ReactElement } from "react";
import useAppStore from "@/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";
import StatusButton from "./StatusButton";
import ViewButton from "./ViewButton";
import DownloadButton from "./DownloadButton";

type TableDocumentProps = {
  documents: DocumentModel[];
};
const TableDocument = (props: TableDocumentProps) => {
  const { role } = useAppStore(
    useShallow((state) => ({
      role: state.authStore.gets.getUserRole(),
    }))
  );

  let title: string;

  switch (role) {
    case "Admin":
      title = "Unggah";
      break;

    case "Mahasiswa":
      title = "Status";
      break;

    case "Dosen":
      title = "Proses";
      break;

    default:
      title = "";
      break;
  }

  const headColumns: HeadColumn[] = [
    {
      title: "No",
    },
    {
      title: "Nama Pembuat",
    },
    {
      title: "Judul Dokument",
    },
    {
      title: "Deskripsi",
    },
    {
      title: "Tanggal Pembuatan",
    },
    {
      title: title,
    },
  ];

  const bodyColumns: BodyColumn<DocumentModel>[] = [
    {
      builder: ({ rowIndex, lastRowIndex }) => {
        return <div>{lastRowIndex + rowIndex + 1}</div>;
      },
    },
    {
      field: "nama_pembuat",
    },
    {
      field: "judul_dokumen",
    },
    {
      field: "deskripsi_dokumen",
      builder: ({ data }) => {
        return <div className="line-clamp-1">{data as string}</div>;
      },
    },
    {
      field: "tanggal_dibuat",
    },
    {
      field: "status_dokumen",
      builder: (data) => {
        let button: ReactElement;

        switch (role) {
          case "Admin":
            button = <UploadButton document={data.rowData} />;
            break;

          case "Mahasiswa":
            button = <StatusButton status={data.data as string} />;
            break;

          case "Dosen":
            button = <ApproveButton dokumen_id={data.rowData.id_dokumen} />;
            break;

          default:
            button = <></>;
            break;
        }

        return <div className="px-1.5 py-1">{button}</div>;
      },
    },
  ];

  if (role != "Admin") {
    headColumns.push({
      title: "Aksi",
    });

    bodyColumns.push({
      builder: (data) => {
        return (
          <div className="flex flex-row justify-center gap-2 px-1.5 text-2xl">
            <DownloadButton dokumen_id={data.rowData.id_dokumen} />
            <ViewButton dokumen_id={data.rowData.id_dokumen} />
          </div>
        );
      },
    });
  }

  return (
    <SimpleDataTable<DocumentModel>
      dataRows={props.documents}
      headColumns={headColumns}
      bodyColumns={bodyColumns}
      defaultHeadColumnBuilder={(title) => {
        return <div>{title}</div>;
      }}
      defaultBodyColumnBuilder={({ data }) => {
        return <div>{data as string}</div>;
      }}
      searchByColumns={["judul_dokumen", "nama_pembuat"]}
      tableDivClassName="overflow-auto"
      tableClassName="border-2 border-collapse border-[#D9D9D9] "
      theadClassName="sticky top-[-1px]"
      theadTrClassName="text-sm tracking-wider text-white bg-[#1FA0CF]"
      theadTrThClassName="border-2 border-collapse border-[#D9D9D9] font-normal p-2"
      tbodyTrClassName="transition-all hover:bg-[#188CB6]/10"
      tbodyTrTdClassName=" border-2 border-collapse border-[#D9D9D9] p-1 text-center"
    />
  );
};

export default TableDocument;
