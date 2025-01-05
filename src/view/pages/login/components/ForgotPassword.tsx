import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/useAppStore";
import InputBorder from "@/view/components/InputBorder";
import { useEffect } from "react";
import { MdEmail } from "react-icons/md";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const menuToggle = useAppStore(useShallow((state) => state.loginPageStore.actions.menuToggle));
  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;

  const { mutate } = useMutation({
    mutationFn: () => useAppStore.getState().loginPageStore.actions.forgotPassword("123"),
    onSuccess() {
      //pop up
    },
    onSettled: () => setLoading(false),
  });

  const sendHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    mutate();
  };

  useEffect(() => {
    (async () => {
      if (useAppStore.getState().authStore.gets.isAuthenticated()) navigate("/");
    })();
  }, [navigate]);

  return (
    <form className="flex flex-col gap-10 items-center rounded-lg w-[50%] px-4" onSubmit={sendHandler}>
      <h1 className="text-3xl text-center font-semibold text-white">LUPA PASSWORD</h1>

      <InputBorder
        type="text"
        placeholder="Email"
        containerclassname="border-b-white text-white"
        inputclassname="placeholder-white/35"
        righticon={<MdEmail className="text-2xl" />}
      />

      <Button type="submit" className="w-full py-4 rounded-full font-bold text-black bg-white">
        SEND
      </Button>

      <div
        className="text-center cursor-pointer text-white hover:text-white/80 active:text-blue-300"
        onClick={() => {
          menuToggle("login");
        }}
      >
        Login
      </div>
    </form>
  );
};

export default ForgotPassword;
