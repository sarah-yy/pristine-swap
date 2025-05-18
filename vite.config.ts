import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import vitePluginSvgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    vitePluginSvgr({
      include: "**/*.svg",
      // https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  envDir: "./envs",
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore specific warnings
        if (warning.code === "PURE_COMMENT_HAS_SIDE_EFFECTS") return;
        if (warning.message.includes("/*#__PURE__*/")) return;
        // Use default warning behavior for other warnings
        warn(warning);
      },
      output: {
        manualChunks: {
          "react-vendor": [
            "react",
            "react-dom",
          ],
          "@reduxjs/toolkit": ["@reduxjs/toolkit"],
          "redux-saga": ["redux-saga"],
          "viem": ["viem"],
          "@tanstack/react-query": ["@tanstack/react-query"],
          "@rainbow-me/rainbowkit": ["@rainbow-me/rainbowkit"],
        },
      },
    },
  },
});