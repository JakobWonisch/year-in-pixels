import { defineConfig } from "vite";

export default defineConfig({
    root: "src",
    server: {
        host: "0.0.0.0",   // REQUIRED for Android
        port: 5173,
        strictPort: true
    },
    clearScreen: false,
    build: {
        outDir: "../dist",      // relative to root
        emptyOutDir: true
    }
});
