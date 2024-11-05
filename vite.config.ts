import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import manifest from "./manifest.json";
// import { crx } from "@crxjs/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Access-Control-Allow-Origin": "https://placehold.co",
      "Cross-Origin-Resource-Policy": "cross-origin",
    },
  },
});
