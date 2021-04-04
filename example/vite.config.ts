import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';

import vitApp from '../packages/vit/plugin';
import routes from './config/routes';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths(), vitApp({ debug: true, routes, exportStatic: {} })],
  // resolve: {
  //   alias: [
  //     {
  //       find: /^@vitjs\/vit$/,
  //       replacement: resolve(process.cwd(), '../packages/vit/src/runtime'),
  //     },
  //   ],
  // },
});
