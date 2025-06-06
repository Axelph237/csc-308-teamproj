import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@src": resolve(dirname(fileURLToPath(import.meta.url)), "src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_TARGET_DOMAIN,
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: env.VITE_API_TARGET_DOMAIN,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      outDir: "dist",
    },
  });
};
