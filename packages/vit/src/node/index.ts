import * as path from 'path';
import type { Plugin } from 'vite';

import { paths } from './constants';
import { generateRoutes, generateVit } from './generateFiles';
import { PluginConfig } from './types';

export default function pluginFactory(config: PluginConfig): Plugin {
  let base = '/';

  return {
    name: 'react-vit',
    config: () => ({
      resolve: {
        alias: [
          {
            find: /^\/@vit-app/,
            replacement: path.join(paths.absTmpPath, './vit'),
          },
          {
            find: '@vit-runtime',
            replacement: path.join(__dirname, '../runtime'),
          },
        ],
      },
    }),
    configResolved: (resolvedConfig) => {
      base = resolvedConfig.base;
      generateVit({
        ...config,
        base,
      });
    },
    options: () => {
      generateRoutes(config);
      return null;
    },
  };
}
