import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mobxVmVitePlugin } from "mobx-view-model-vite-plugin";
import path from "path";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [mobxVmVitePlugin({ devtools: true, autoDisplayName: true, hmr: true }), tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
