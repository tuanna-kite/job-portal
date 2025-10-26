// eslint.config.mjs
import path from "node:path";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import unusedImports from "eslint-plugin-unused-imports";
import eslintConfigPrettier from "eslint-config-prettier";

const projectTsconfig = path.resolve("tsconfig.json");

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // Ignore build artifacts
  {
    ignores: [
      "**/node_modules",
      "**/.next",
      "**/dist",
      "**/build",
      "**/.turbo",
      "**/coverage",
    ],
  },

  // Base parser options for TS/JS files
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: projectTsconfig,
        tsconfigRootDir: process.cwd(),
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: projectTsconfig,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "unused-imports": unusedImports,
      "@next/next": nextPlugin,
    },
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": "off", // dùng unused-imports thay thế
      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports" },
      ],

      // Unused imports/vars
      "no-console": ["error", { allow: ["warn", "error"] }],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Import hygiene
      "import/no-duplicates": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-cycle": "warn",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // React / Hooks
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "warn",

      // A11y
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",

      // Tailwind
      "tailwindcss/no-custom-classname": "off", // tuỳ team

      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Next.js core web vitals rules
  // nextPlugin.configs["core-web-vitals"],

  // Prettier compatibility (turn off formatting-conflict rules)
  eslintConfigPrettier,
];
