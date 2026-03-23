import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import stylistic from '@stylistic/eslint-plugin';
import { defineConfig, type Config } from 'eslint/config';

const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

const ALWAYS = 'always';
const NEVER = 'never';

const importOrderRule: Config['rules'] = {
  'import/order': [ERROR, {
    'groups': [
      'builtin',
      'external',
      'internal',
      'parent',
      'sibling',
      'index',
      'object',
      'type'
    ],
    'pathGroups': [
      {
        'pattern': 'react',
        'group': 'external',
        'position': 'before'
      },
      {
        'pattern': '@mui/**',
        'group': 'external',
        'position': 'before'
      },
      {
        'pattern': '@/**',
        'group': 'internal',
        'position': 'before'
      },
      {
        'pattern': './*.css',
        'group': 'type',
        'position': 'after'
      }
    ],
    'pathGroupsExcludedImportTypes': ['react'],
    'newlines-between': ALWAYS
  }]
};

const stylisticRules: Config['rules'] = {
  '@stylistic/no-trailing-spaces': ERROR,
  '@stylistic/no-multiple-empty-lines': [ERROR, {
    'max': 1,
    'maxBOF': 0
  }],
  '@stylistic/quotes': [ERROR, 'single'],
  '@stylistic/object-curly-spacing': [ERROR, ALWAYS, {
    'arraysInObjects': true,
    'objectsInObjects': true
  }],
  '@stylistic/no-multi-spaces': ERROR
};

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/', 'node_modules/', 'build/']
  },
  {
    files: [
      '**/*.{js,jsx,ts,tsx}',
      'eslint.config.mts',
      'rspack.config.mts'
    ],
    plugins: {
      react: pluginReact,
      import: importPlugin,
      '@stylistic': stylistic
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...importOrderRule,
      ...stylisticRules,

      '@typescript-eslint/consistent-type-imports': [ERROR, {
        fixStyle: 'inline-type-imports'
      }],
      'prefer-template': ERROR,
      'indent': [ERROR, 2],
      'semi': [ERROR, ALWAYS],
      'react/react-in-jsx-scope': OFF,
      'no-duplicate-imports': [ERROR, {
        'allowSeparateTypeImports': true
      }],
      'no-console': WARN,
      'comma-dangle': [ERROR, NEVER]
    }
  }
]);