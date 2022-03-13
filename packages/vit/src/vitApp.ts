import { resolve } from 'path';

import { Service } from '@vitjs/core';
import { winPath } from '@vitjs/utils';
import chokidar from 'chokidar';

import { generateHistory, generateRoutes, generateVit, generateExports } from './generateFiles';
import { autoImportsAheadFiles, autoImportFiles } from './generateFiles/vit';
import { exportStatic } from './preset';

import type { PluginConfig } from './types';
import type { FSWatcher } from 'chokidar';
import type { Plugin, ResolvedConfig } from 'vite';

export default function pluginFactory(config: PluginConfig): Plugin {
  const { routes, dynamicImport } = config;

  let base = '/';
  let service: Service;
  const watchers: FSWatcher[] = [];
  let resolvedConfig: ResolvedConfig;

  return {
    name: 'vit-app',
    config: () => ({
      resolve: {
        alias: [
          {
            find: /@@\/exports$/,
            replacement: winPath(resolve(process.cwd(), './src/.vit/exports')),
          },
          {
            find: /@vit-app$/,
            replacement: winPath(resolve(process.cwd(), './src/.vit/vit')),
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
    configResolved: (theResolvedConfig) => {
      resolvedConfig = theResolvedConfig;
      base = resolvedConfig.base;
      service = new Service({
        debug: config.debug,
        cwd: process.cwd(),
        outDir: resolvedConfig.build.outDir,
        routes: routes || [],
        dynamicImport: dynamicImport,
      });
      generateHistory({
        ...config,
        base,
        service,
      });
      generateRoutes(service);
      generateVit({
        ...config,
        base,
        service,
        command: resolvedConfig.command,
      });
      generateExports(service);

      // ref:
      // https://github.com/paulmillr/chokidar/issues/639
      [...autoImportsAheadFiles, ...autoImportFiles]
        .map((item) => winPath(resolve(service.paths.absSrcPath!, item)))
        .forEach((item) => {
          const watcher = chokidar.watch(item);
          watcher
            .on('add', () => {
              generateVit({
                ...config,
                base,
                service,
                command: resolvedConfig.command,
              });
            })
            .on('unlink', () => {
              generateVit({
                ...config,
                base,
                service,
                command: resolvedConfig.command,
              });
            });
          watchers.push(watcher);
        });
    },
  };
}
