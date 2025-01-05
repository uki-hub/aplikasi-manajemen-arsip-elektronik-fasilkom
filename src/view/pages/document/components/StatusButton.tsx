const StatusButton = ({ status }: { status: string }) => {
  let statusText: string = "-";

  switch (status) {
    case "0":
      statusText = "Proses Permohonan";
      break;

    case "1":
      statusText = "Sudah Verifikasi";
      break;

    case "2":
      statusText = "Sudah di Upload";
      break;
  }

  return <div className="rounded py-1.5 px-1 h-auto text-[12px] tracking-widest select-none text-white bg-[#1FA0CF]">{statusText}</div>;
};

export default StatusButton;
