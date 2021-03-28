import { readFileSync } from 'fs';
import { join } from 'path';
import Mustache from 'mustache';
import type { UserConfig } from 'vite';
import { Service } from '@vitjs/core';

import { PluginConfig } from '../types';

export interface GenerateVitOptions extends Pick<UserConfig, 'base'>, Pick<PluginConfig, 'history'> {
  service: Service;
}

export default function generateVit(options: GenerateVitOptions) {
  const { service, history, base } = options;
  const vitTpl = readFileSync(join(__dirname, './vit.tpl'), 'utf-8');

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

  const autoImportsAheadFiles = ['concent.ts'];
  const autoImportFiles = ['global.ts', 'global.tsx', 'global.css', 'global.less', 'global.scss', 'global.sass'];

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
