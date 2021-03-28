import { readFileSync } from 'fs';
import { resolve, join } from 'path';
import Mustache from 'mustache';

import { writeTmpFile, loadRoutes, resolveRoutes } from '../utils';
import type { PluginConfig } from '../types';

export default function generateRoutes(options: PluginConfig) {
  const routesTpl = readFileSync(join(__dirname, './routes.tpl'), 'utf-8');

  let moduleMap: { [path: string]: string } = {};
  if (!options.dynamicImport) {
    moduleMap = resolveRoutes(options.routes || []);
  }
  const routes = loadRoutes(options);

  const modules = Object.keys(moduleMap).map((modulePath) => {
    return {
      name: moduleMap[modulePath],
      path: modulePath,
    };
  });

  writeTmpFile({
    path: 'routes.ts',
    content: Mustache.render(routesTpl, {
      routes,
      dynamic: !!options.dynamicImport,
      modules,
      loadingComponent:
        options.dynamicImport &&
        options.dynamicImport.loading &&
        resolve(process.cwd(), './src/', options.dynamicImport.loading),
    }),
  });
}
