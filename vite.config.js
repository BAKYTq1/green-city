import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://89.169.45.167",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}); 