import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig(({ mode }) => ({
  base: "/mini-app/",
  plugins: [react(), tsconfigPaths()],
  publicDir: "./public",
  server:
    mode === "development"
      ? {
          host: "tma.internal",
          https: {
            cert: readFileSync(resolve("tma.internal.pem")),
            key: readFileSync(resolve("tma.internal-key.pem")),
          },
        }
      : undefined,
}));
