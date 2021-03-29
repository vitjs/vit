export interface Route {
  component?: string;
  exact?: boolean;
  path?: string;
  routes?: Route[];
  wrappers?: string[];
  title?: string;
  [key: string]: any;
}

export interface PluginConfig {
  routes?: Route[];
  exportStatic?: boolean;
  dynamicImport?: {
    loading?: string;
  };
  history?: {
    type: 'browser' | 'hash' | 'memory';
    options?: any;
  };
}
