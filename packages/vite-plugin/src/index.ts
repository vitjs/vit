import { viteMockServe } from 'vite-plugin-mock';
import type { MockMethod } from 'vite-plugin-mock';

import vitAppCore from './vitApp';
import { PluginConfig } from './types';

export default function vitApp(config: PluginConfig) {
  return [
    config.mock
      ? viteMockServe({
          mockPath: 'mock',
          logger: !!config.debug,
        })
      : null,
    vitAppCore(config),
  ];
}

export type { MockMethod };
