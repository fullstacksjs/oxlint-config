import { defineConfig } from "oxlint"

import config from "./src/index.ts"

export default defineConfig({
  extends: [config],
})
