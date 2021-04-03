import { IRoute } from '@vitjs/types';

export interface PluginConfig {
  routes?: IRoute[];
  exportStatic?: {};
  dynamicImport?: {
    loading?: string;
  };
  history?: {
    type: 'browser' | 'hash' | 'memory';
    // options?: any;
  };
}
