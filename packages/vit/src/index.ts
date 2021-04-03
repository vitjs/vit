import { resolve } from 'path';
import type { Plugin } from 'vite';
import { Service } from '@vitjs/core';
import chokidar, { FSWatcher } from 'chokidar';

import { exportStatic } from './preset';
import { generateRoutes, generateVit } from './generateFiles';
import { autoImportsAheadFiles, autoImportFiles } from './generateFiles/vit';
import { PluginConfig } from './types';

export default function pluginFactory(config: PluginConfig): Plugin {
  const { routes, dynamicImport } = config;

  let base = '/';
  let service: Service;
  let watchers: FSWatcher[] = [];

  return {
    name: 'vit-app',
    config: () => ({
      resolve: {
        alias: [
          {
            find: /@vit-app$/,
            replacement: resolve(process.cwd(), './src/.vit/vit'),
          },
        ],
      },
    }),
    closeBundle: () => {
      // 不关闭会导致编译完成时命令不会自动退出
      watchers.forEach((item) => item.close());

      exportStatic({
        service,
        config,
      });
    },
    configResolved: (resolvedConfig) => {
      base = resolvedConfig.base;
      service = new Service({
        debug: config.debug,
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

      // ref:
      // https://github.com/paulmillr/chokidar/issues/639
      [...autoImportsAheadFiles, ...autoImportFiles]
        .map((item) => resolve(service.paths.absSrcPath!, item))
        .forEach((item) => {
          const watcher = chokidar.watch(item);
          watcher
            .on('add', () => {
              generateVit({
                ...config,
                base,
                service,
              });
            })
            .on('unlink', () => {
              generateVit({
                ...config,
                base,
                service,
              });
            });
          watchers.push(watcher);
        });
    },
  };
}
