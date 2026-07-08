import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// User/org GitHub Pages (pazimor.github.io) serves from the domain root,
// so the base path is "/". For a project page it would be "/repo-name/".
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
