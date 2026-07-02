import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    exports: true,
  },
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
