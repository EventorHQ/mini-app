import ReactDOM from "react-dom/client";

import { Root } from "@/app/Root";

import "./mockEnv.ts";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
