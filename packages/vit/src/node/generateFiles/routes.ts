import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import Mustache from 'mustache';

import { writeTmpFile, loadRoutes } from '../utils';
import type { PluginConfig } from '../types';

export default function generateRoutes(options: PluginConfig) {
  const routesTpl = readFileSync(join(__dirname, './routes.tpl'), 'utf-8');
  const routes = loadRoutes(options);

  writeTmpFile({
    path: 'routes.ts',
    content: Mustache.render(routesTpl, {
      routes,
      dynamic: !!options.dynamicImport,
      loadingComponent:
        options.dynamicImport &&
        options.dynamicImport.loading &&
        resolve(process.cwd(), './src/', options.dynamicImport.loading),
    }),
  });
}
