import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import * as glob from "glob";

function obtenerHtmlFiles() {
  return Object.fromEntries(
    glob
      .sync("./**/*.html", {
        ignore: [
          "./dist/**",
          "./node_modules/**",
        ],
      })
      .map((file) => [
        file.slice(0, file.length - path.extname(file).length),
        resolve(__dirname, file),
      ])
  );
}

export default defineConfig({
  appType: "mpa",
  base: process.env.DEPLOY_BASE_URL ?? "/",
  build: {
    rollupOptions: {
      input: obtenerHtmlFiles(),
    },
  },
});