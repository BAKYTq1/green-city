import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://157.230.138.217:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}); 