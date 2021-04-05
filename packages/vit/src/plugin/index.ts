import { viteMockServe } from 'vite-plugin-mock';
import type { MockMethod } from 'vite-plugin-mock';

import vitAppPlugin from './vit-app';
import { PluginConfig } from './types';

export default function vitApp(config: PluginConfig) {
  return [
    config.mock
      ? viteMockServe({
          mockPath: 'mock',
          logger: !!config.debug,
        })
      : null,
    vitAppPlugin(config),
  ];
}

export type { MockMethod };
