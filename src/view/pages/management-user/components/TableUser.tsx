import { Button } from "@/components/ui/button";
import UserModel from "@/models/UserModel";
import useAppStore from "@/stores/useAppStore";
import SimpleDataTable, { BodyColumn, HeadColumn } from "@/view/components/SimpleDataTable";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import DeleteButton from "./DeleteButton";

type TableUserProps = {
  users: UserModel[];
};

const TableUser = (props: TableUserProps) => {
  const navigate = useNavigate();
  const headColumns: HeadColumn[] = [
    {
      title: "No",
    },
    {
      title: "Username",
    },
    {
      title: "Nama",
    },
    {
      title: "Role",
    },
    {
      title: "Status",
    },
    {
      title: "Date Created",
    },
    {
      title: "Aksi",
    },
  ];

  const bodyColumns: BodyColumn<UserModel>[] = [
    {
      builder: ({ rowIndex, lastRowIndex }) => {
        return <div>{lastRowIndex + rowIndex + 1}</div>;
      },
    },
    {
      field: "username",
    },
    {
      field: "nama",
    },
    {
      field: "nama_role",
    },
    {
      builder: (data) => {
        return (
          <div className="flex flex-row gap-3 justify-center py-1">
            {data.rowData.status_aktif == "1" ? "Aktif" : "Tidak Aktif"}
          </div>
        );
      },
    },
    {
      field: "tgl_registrasi",
    },
    {
      builder: (data) => {
        return (
          <div className="flex flex-row gap-3 justify-center py-1">
            <Button className="p-1.5 h-auto bg-[#1FA0CF]" onClick={() => updateUserHandler(data.rowData.id_pengguna)}>
              <FaEdit />
            </Button>
            <DeleteButton user={data.rowData} />
          </div>
        );
      },
    },
  ];

  const updateUserHandler = (id: number) => {
    useAppStore.getState().userManagementPageStore.actions.setUpdatePenggunaID(id);
    navigate("/update-user");
  };

  return (
    <SimpleDataTable<UserModel>
      dataRows={props.users}
      headColumns={headColumns}
      bodyColumns={bodyColumns}
      defaultHeadColumnBuilder={(title) => {
        return <div>{title}</div>;
      }}
      defaultBodyColumnBuilder={({ data }) => {
        return <div>{data as string}</div>;
      }}
      searchByColumns={["username", "nama"]}
      tableDivClassName="overflow-auto"
      tableClassName="border-2 border-collapse border-[#D9D9D9]"
      theadClassName="sticky top-[-1px]"
      theadTrClassName="text-sm tracking-wider text-white bg-[#1FA0CF]"
      theadTrThClassName="border-2 border-collapse border-[#D9D9D9] font-normal p-2"
      tbodyTrClassName="transition-all hover:bg-[#188CB6]/10"
      tbodyTrTdClassName=" border-2 border-collapse border-[#D9D9D9] p-1 text-center"
    />
  );
};

export default TableUser;
