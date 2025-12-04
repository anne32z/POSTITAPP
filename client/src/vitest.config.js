// vite.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,                    // allows using describe/it/expect without import
    environment: "jsdom",             // must be jsdom for document/window
    // setupFiles: ["./src/setupTests.js"], // run jest-dom matchers
    // include: ["src/Tests/**/*.test.jsx"], // include your test files
  },
});
