import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const __dirname = dirname(fileURLToPath(import.meta.url));
// eslint-disable-next-line no-undef
const isDev = process.env.NODE_ENV === 'development';

const targets = ['last 2 versions', '> 0.2%', 'not dead', 'Firefox ESR'];

export default defineConfig({
  context: __dirname,
  entry: {
    main: './src/app/index.tsx',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src')
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
      template: './src/app/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      // Опционально: настройки
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
    }),,
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
