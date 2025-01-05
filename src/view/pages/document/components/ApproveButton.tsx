import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useAppStore from "@/stores/useAppStore";
import { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { useMutation } from "react-query";
import { useShallow } from "zustand/react/shallow";

const ApproveButton = ({ dokumen_id }: { dokumen_id: number }) => {
  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;
  const show = useAppStore.getState().messageModalStore.actions.show;
  const [open, setOpen] = useState<boolean>(false);

  const { approveDocument } = useAppStore(
    useShallow((state) => ({
      approveDocument: state.documentPageStore.actions.approveDocument,
    }))
  );

  const { mutate } = useMutation({
    mutationFn: () => approveDocument(dokumen_id),
    onSuccess(success) {
      if (success) show("Berhasil approve dokumen");
      else show("Gagal approve dokumen");
      
      setOpen(false);
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
        <Button className="p-1.5 h-auto text-xs text-[10px] tracking-widest bg-[#1FA0CF]">PROSES</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-0">
        <DialogHeader className="py-2">
          <DialogTitle className="flex flex-col items-center gap-3 text-center">
            <FiCheckCircle className="text-[50px] text-[#66C74B]" />
            <span className="text-xl font-semibold select-none">Confirm Approval</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-gray-900">
          <div className="text-center select-none">Apakah Anda yakin ingin menyetujui dokumen ini?</div>
          <div className="flex flex-row justify-center gap-5">
            <Button
              className="w-full h-auto py-2 px-3 bg-[#CF1F1F] hover:bg-[#D10F0F] active:bg-[#9E0F0F]"
              onClick={() => setOpen(false)}
            >
              CANCEL
            </Button>
            <Button className="w-full h-auto py-2 px-3 bg-[#1FA0CF]" onClick={approveHandler}>
              APPROVE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveButton;
