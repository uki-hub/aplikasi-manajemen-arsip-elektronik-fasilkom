import { Button } from "@/components/ui/button";
import useAppStore from "@/stores/useAppStore";
import InputBorder from "@/view/components/InputBorder";
import { useRef } from "react";
import { FaLock, FaUser } from "react-icons/fa6";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/react/shallow";

const Login = () => {
  const navigate = useNavigate();
  const setLoading = useAppStore.getState().loadingStore.actions.setLoading;
  const show = useAppStore.getState().messageModalStore.actions.show;
  const menuToggle = useAppStore(useShallow((state) => state.loginPageStore.actions.menuToggle));

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutation({
    mutationFn: () => login(),
    onSuccess(data) {
      console.log(data);
      if (data) navigate("/");
      else show("Username or Password is Incorrect");
    },
    onSettled: () => setLoading(false),
  });

  const login = (): Promise<boolean> => {
    const username = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username && !password) {
      throw Error("Username and Password must be filled");
    }

    return useAppStore.getState().loginPageStore.actions.login(username!, password!);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    mutate();
  };

  return (
    <form
      method="post"
      role="form"
      className="flex flex-col gap-10 items-center rounded-lg lg:w-[50%] sm:w-[80%] px-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl text-center font-semibold text-white">LOGIN</h1>

      <InputBorder
        ref={userNameRef}
        type="text"
        placeholder="Username"
        containerclassname="text-lg border-b-white text-white"
        inputclassname="placeholder-white/35"
        righticon={<FaUser />}
      />
      <InputBorder
        ref={passwordRef}
        type="password"
        placeholder="Password"
        containerclassname="text-lg border-b-white text-white"
        inputclassname="placeholder-white/35"
        righticon={<FaLock />}
      />

      <Button type="submit" className="w-full py-4 rounded-full font-bold text-black bg-white">
        SIGN IN
      </Button>

      <div
        className="text-center cursor-pointer text-white hover:text-white/80 active:text-blue-300"
        onClick={() => menuToggle("forgotPassword")}
      >
        Lupa Password?
      </div>
    </form>
  );
};

export default Login;
