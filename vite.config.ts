import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@functions": path.resolve(__dirname, "./src/functions"),
      "@store": path.resolve(__dirname, "./src/assets/store"),
      "@types": path.resolve(__dirname, "./src/assets/types"),
      "@styles": path.resolve(__dirname, "./src/assets/styles"),
    },
  },
  base: "/medtex-form/",
});
