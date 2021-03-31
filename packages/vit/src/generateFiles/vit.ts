import { readFileSync } from 'fs';
import { resolve } from 'path';
import Mustache from 'mustache';
import type { UserConfig } from 'vite';
import { Service } from '@vitjs/core';

import { PluginConfig } from '../types';

export const autoImportsAheadFiles = ['concent.ts'];
export const autoImportFiles = ['global.ts', 'global.tsx', 'global.css', 'global.less', 'global.scss', 'global.sass'];

export interface GenerateVitOptions extends Pick<UserConfig, 'base'>, Pick<PluginConfig, 'history'> {
  service: Service;
}

export default function generateVit(options: GenerateVitOptions) {
  const { service, history, base } = options;
  const vitTpl = readFileSync(resolve(__dirname, './vit.tpl'), 'utf-8');

  const getRouter = () => {
    const type = history?.type;
    switch (type) {
      case 'hash':
        return 'HashRouter';
      case 'memory':
        return 'MemoryRouter';
      default:
        return 'BrowserRouter';
    }
  };

  service.writeTmpFile({
    path: 'vit.tsx',
    content: Mustache.render(vitTpl, {
      Router: getRouter(),
      base,
      importsAhead: service.dumpGlobalImports(autoImportsAheadFiles),
      imports: service.dumpGlobalImports(autoImportFiles),
    }),
  });
}
