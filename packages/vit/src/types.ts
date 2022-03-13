import type { IRoute } from '@vitjs/core';
import type {
  BrowserHistoryBuildOptions,
  HashHistoryBuildOptions,
  MemoryHistoryBuildOptions,
} from '@vitjs/runtime';

export interface PluginConfig {
  debug?: boolean;
  routes?: IRoute[];
  exportStatic?: Record<string, never>;
  dynamicImport?: {
    loading?: string;
  };
  history?: {
    type: 'browser' | 'hash' | 'memory';
    options?: BrowserHistoryBuildOptions | HashHistoryBuildOptions | MemoryHistoryBuildOptions;
  };
  mock?:
    | boolean
    | {
        // 编译后是否使用 Mock 数据，默认为 false
        productionEnabled?: boolean;
      };
}
