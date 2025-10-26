// eslint.config.mjs
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import checkFile from "eslint-plugin-check-file";
import tseslint from "typescript-eslint";

const eslintConfig = [
  // Base JS and TS recommended rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },

    plugins: {
      "@next/next": next,
      "check-file": checkFile,
    },

    rules: {
      ...next.configs["core-web-vitals"].rules, // ✅ use Next.js flat rules directly
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{ts,tsx}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
      "check-file/folder-naming-convention": [
        "error",
        { "src/**": "NEXT_JS_APP_ROUTER_CASE" },
      ],
    },
  },

  prettier, // must come last to disable conflicting stylistic rules
];

export default eslintConfig;
