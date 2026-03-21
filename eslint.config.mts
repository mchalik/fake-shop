import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import importPlugin from 'eslint-plugin-import';
import stylistic from '@stylistic/eslint-plugin'

const importOrderRule = {
  "import/order": ["error", {
    "groups": [
      "builtin",
      "external",
      "internal", 
      "parent",
      "sibling",
      "index",
      "object",
      "type"
    ],
    "pathGroups": [
      {
        "pattern": "@/**",
        "group": "internal",
        "position": "before"
      },
      {
        "pattern": "./*.css",
        "group": "type",
        "position": "after"
      }
    ],
    "newlines-between": "always"
  }],
}

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["dist/", "node_modules/", "build/"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact,
      import: importPlugin,
      '@stylistic': stylistic
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...importOrderRule,
      "prefer-template": "error",
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/template-curly-spacing": ["error", "always"],
      "@stylistic/no-multi-spaces": "error",
      "indent": ["error", 2],
      "semi": ["error", "always"],
      "react/react-in-jsx-scope": "off",
      "no-duplicate-imports": ["error", {
        "allowSeparateTypeImports": true
      }],
      "no-console": "warn",

      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-multiple-empty-lines": ["error", { 
        "max": 1,
        "maxBOF": 0
      }],

    },
  },
];