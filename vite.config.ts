import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: { options: { typeAware: true, typeCheck: true } },
  plugins: [
    react(),
    viteMockServe({
      mockPath: "src/mock",
      localEnabled: true,
      prodEnabled: true,
      logger: true,
      injectCode: `
        import { setupMock } from "./mock/index";
        setupMock();
      `,
    }),
  ],
  base: "/rui-poc/",
  build: {
    chunkSizeWarningLimit: 600,
  },
});
