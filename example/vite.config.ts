import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

import vitApp from '../packages/vit';
import routes from './config/routes';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    vitApp({
      routes,
    }) as any,
  ],
});
