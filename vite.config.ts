import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["three", "gsap"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap"],
        },
      },
    },
  },
  server: {
    port: 5173,
  },
})
