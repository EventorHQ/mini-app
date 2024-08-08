import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react-swc";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mini-app/",
  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
  ],
  publicDir: "./public",
  server: {
    host: "tma.internal",
    https: {
      cert: readFileSync(resolve("tma.internal.pem")),
      key: readFileSync(resolve("tma.internal-key.pem")),
    },
  },
});
