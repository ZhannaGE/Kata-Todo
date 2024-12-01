import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'], // Расширения файлов для обработки
    languageOptions: {
      globals: {
        ...globals.browser, // Используем глобальные переменные для браузера
      },
    },
    settings: {
      react: {
        version: 'detect', // Автоматическое определение версии React
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'], // Поддержка JSX runtime для React 17+
];
