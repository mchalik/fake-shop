import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Игнорируемые файлы
  {
    ignores: ["dist/", "node_modules/", "build/"],
  },

  // Базовые настройки JS
  js.configs.recommended,

  // Настройки TypeScript (распаковка массива)
  ...tseslint.configs.recommended,

  // Настройки для React и файлов проекта
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact,
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
      // Вручную добавляем рекомендуемые правила React, чтобы избежать ошибок пресетов
      ...pluginReact.configs.recommended.rules,
      
      // Ваши правила
      "indent": ["error", 2],
      "semi": ["error", "always"],
      "react/react-in-jsx-scope": "off", // Отключаем обязательный импорт React
      "react/prop-types": "off"          // Отключаем проверку propTypes (если используем TS)
    },
  },
];