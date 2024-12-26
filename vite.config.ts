import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@styles": "/src/styles",
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@styles/_variables.scss"; 
        @import "@styles/_mixins.scss";
        `,
      },
    },
  },
});
