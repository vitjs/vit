import type React from 'react';

declare namespace LoadableExport {
  interface ILoadable {
    <P = Record<string, never>>(opts: any): React.ComponentClass<P>;
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    Map<P = Record<string, never>>(opts: any): React.ComponentType<P>;

    preloadAll: () => Promise<any>;
  }
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
declare const LoadableExport: LoadableExport.ILoadable;

export = LoadableExport;
