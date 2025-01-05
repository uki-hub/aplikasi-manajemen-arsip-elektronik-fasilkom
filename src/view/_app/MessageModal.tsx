import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useAppStore from "@/stores/useAppStore";
import { useShallow } from "zustand/react/shallow";

const MessageModel = () => {
  const { isVisible, message, close } = useAppStore(
    useShallow((state) => ({
      isVisible: state.messageModalStore.isVisible,
      message: state.messageModalStore.message,
      close: state.messageModalStore.actions.close,
    }))
  );

  return (
    <Dialog
      open={isVisible}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="py-2 border-b-2 border-gray-400">
          <DialogTitle className="text-center text-xl text-gray-500">System</DialogTitle>
        </DialogHeader>
        <div className="text-center text-lg flex flex-col gap-2 text-gray-800">
          {message.split("\n").map((line, index) => (
            <span key={index}>{line}</span>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModel;
