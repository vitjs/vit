import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';

import vitApp from '../packages/vite-plugin/dist';
import routes from './config/routes';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vit-example/',
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    vitApp({
      debug: true,
      routes,
      dynamicImport: { loading: './components/PageLoading' },
      exportStatic: {},
      mock: { productionEnabled: true },
    }),
  ],
});
