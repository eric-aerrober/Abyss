import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import { join } from "path";

export default defineConfig({
    plugins: [
        react(),
        electron([
            {
                // Main process entry point
                entry: "server/main/index.ts",
                vite: {
                    build: {
                        outDir: "dist-electron/main",
                    },
                },
            },
            {
                // Preload scripts
                entry: "server/preload/index.ts",
                vite: {
                    build: {
                        outDir: "dist-electron/preload",
                    },
                },
            },
        ]),
        renderer(),
    ],
    resolve: {
        alias: {
            "@": join(__dirname, "src"),
        },
    },
    build: {
        outDir: "dist",
        emptyOutDir: true,
    },
});
