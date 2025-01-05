import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import configService from "./lib/configService";

const initApp = async () => {
  await configService.init();

  createRoot(document.getElementById("root")!).render(<App />);
};

initApp();

// bg-[#1FA0CF] default
// bg-[#188CB6] hover
// bg-[#29ABE0] active
// border-[#D9D9D9]
