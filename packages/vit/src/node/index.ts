import * as path from 'path';
import type { Plugin } from 'vite';

import { generateRoutes } from './generateFiles';
import { PluginConfig } from './types';

export default function pluginFactory(config: PluginConfig): Plugin {
  return {
    name: 'vite-plugin-react-vit',
    config: () => ({
      resolve: {
        alias: {
          '/@vit-app': path.join(__dirname, '..'),
        },
      },
    }),
    options: () => {
      generateRoutes(config);
      return null;
    },
  };
}
