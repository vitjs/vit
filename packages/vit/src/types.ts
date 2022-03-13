import type { IRoute } from '@vitjs/core';
import type { BrowserHistoryBuildOptions, HashHistoryBuildOptions, MemoryHistoryBuildOptions } from '@vitjs/runtime';

export interface PluginConfig {
  debug?: boolean;
  routes?: IRoute[];
  /** Enable by `{}` */
  exportStatic?: Record<string, never>;
  globalImport?: {
    /**
     * Automatically import ahead of entry script when a module exists,
     * path base on `src`.
     *
     * default: []
     */
    aheadModules?: string[];
    /**
     * Automatically import after external modules when a module exists,
     * path base on `src`.
     *
     * default: ['global.ts', 'global.tsx', 'global.css', 'global.less', 'global.scss', 'global.sass']
     */
    modules?: string[];
  };
  dynamicImport?: {
    /** Loading component path, base on `src` */
    loading?: string;
  };
  history?: {
    type: 'browser' | 'hash' | 'memory';
    options?: BrowserHistoryBuildOptions | HashHistoryBuildOptions | MemoryHistoryBuildOptions;
  };
  mock?:
    | boolean
    | {
        /** Mock data usable in production mode, default `false` */
        productionEnabled?: boolean;
      };
}
