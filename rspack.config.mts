import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isDev = process.env.NODE_ENV === 'development';

const targets = ['last 2 versions', '> 0.2%', 'not dead', 'Firefox ESR'];

const getAliases = (folders: string[]) => {
  const result: Record<string, string> = {};

  for (const index in folders) {
    const folder = folders[index];
    const indexFolder = Number(index) + 1;

    result[`@/${folder}`] = path.resolve(__dirname, 'src', `${indexFolder}_${folder}`);
  }

  return result;
};

export default defineConfig({
  context: __dirname,
  entry: {
    main: './src/index.tsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    alias: {
      // '@': path.resolve(__dirname, 'src'),
      ...getAliases(['app', 'pages', 'widgets', 'features', 'entities', 'shared'])
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            /** @type {import('@rspack/core').SwcLoaderOptions} */
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        type: 'css/module',
        generator: {
          localIdentName: '[local]_[hash:base64:5]',
        },
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        type: 'css',
        use: [
          {
            loader: 'postcss-loader',
          }
        ],
      },
    ],
    parser: {
      'css/auto': {
        namedExports: false,
      },
    }
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './src/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      logger: {
        log: () => {}, // игнорируем обычные сообщения ("Type-checking in progress")

        error: (message) => { console.error(message); }, // выводим только ошибки
      },
      typescript: {
        memoryLimit: 4096, // Лимит памяти для TS сервера (в МБ)
        configOverwrite: {
          compilerOptions: {
            // Можно переопределить настройки TS только для проверки типов
            // Например, включить строгий режим только здесь
            // strict: true
          }
        }
      },
    }),
    isDev ? new ReactRefreshRspackPlugin() : null,
  ],
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
