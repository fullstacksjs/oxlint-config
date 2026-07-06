import { defineConfig } from "vite-plus";

import config from "./src/index.ts";

export default defineConfig({
  lint: {
    extends: [config],
  },
});
