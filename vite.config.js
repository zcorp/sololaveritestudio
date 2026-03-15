// ─────────────────────────────────────────────────────────────────────────────
// vite.config.js
// ─────────────────────────────────────────────────────────────────────────────

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // si domaine custom (sololaveritestudio.com)
  // OU
  //base: "/nom-du-repo/", // si URL GitHub Pages standard (user.github.io/nom-du-repo)
  server: {
    port: 3000,
    host: true,           // required for Docker (0.0.0.0 binding)
    watch: {
      usePolling: true,   // required for hot reload inside Docker on some systems
    },
  },
  build: {
    outDir: "dist",
    // Code-split the EpisodesPage so it only loads when the user navigates to /episodes
    rollupOptions: {
      output: {
        manualChunks: {
          episodes: ["./src/pages/EpisodesPage.jsx"],
        },
      },
    },
  },
});
