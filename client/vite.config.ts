import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import react from "@vitejs/plugin-react";

const httpsConfig = {
  cert: "C:/ssl/certificate_data/__zyae_net.crt",
  key: "C:/ssl/certificate_data/__zyae_net.key",
};

export default defineConfig({
  plugins: [react()],
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
