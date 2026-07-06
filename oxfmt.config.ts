import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    arrowParens: "always",
    bracketSpacing: true,
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "css",
    bracketSameLine: false,
    jsxSingleQuote: false,
    printWidth: 140,
    proseWrap: "always",
    quoteProps: "consistent",
    semi: true,
    singleQuote: true,
    tabWidth: 2,
    trailingComma: "all",
    useTabs: false,
  },
});
