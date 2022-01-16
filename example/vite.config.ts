import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

import vitApp from '@vitjs/vit';
import routes from './config/routes';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vit-example/',
  plugins: [
    react(),
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
