import { resolve } from 'path';
import type { Plugin } from 'vite';
import { Service } from '@vitjs/core';

import { generateRoutes, generateVit } from './generateFiles';
import { PluginConfig } from './types';

export default function pluginFactory(config: PluginConfig): Plugin {
  const { routes, dynamicImport } = config;

  let base = '/';
  let service: Service;

  return {
    name: 'react-vit',
    config: () => ({
      resolve: {
        alias: [
          {
            find: /^\/@vit-app/,
            replacement: resolve(process.cwd(), './src/.vit/vit'),
          },
        ],
      },
    }),
    configResolved: (resolvedConfig) => {
      base = resolvedConfig.base;
      service = new Service({
        cwd: process.cwd(),
        outDir: resolvedConfig.build.outDir,
        routes: routes || [],
        dynamicImport: dynamicImport,
      });
      generateRoutes(service);
      generateVit({
        ...config,
        base,
        service,
      });
    },
  };
}
