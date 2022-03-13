import { viteMockServe } from 'vite-plugin-mock';

import vitAppCore from './vitApp';

import type { PluginConfig } from './types';
import type { MockMethod } from 'vite-plugin-mock';


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
