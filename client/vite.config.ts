import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import react from "@vitejs/plugin-react";

const httpsConfig = {
  cert: "C:/nginx-1.24.0/ssl/server.crt",
  key: "C:/nginx-1.24.0/ssl/server.key",
};

export default defineConfig({
  plugins: [react()],
  base: "/music",
  server: {
    host: "zyae.net",
    port: 3000,
    https: {
      key: fs.readFileSync(httpsConfig.key),
      cert: fs.readFileSync(httpsConfig.cert),
    },
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
