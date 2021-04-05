import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';

import vitApp from '../packages/vit/src/plugin';
import routes from './config/routes';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vit-example/',
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    vitApp({ debug: true, routes, exportStatic: {}, mock: { productionEnabled: true } }),
  ],
});
