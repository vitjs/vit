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
  const { service } = options;
  const vitTpl = readFileSync(resolve(__dirname, './vit.tpl'), 'utf-8');

  service.writeTmpFile({
    path: 'vit.tsx',
    content: Mustache.render(vitTpl, {
      importsAhead: service.dumpGlobalImports(autoImportsAheadFiles),
      imports: service.dumpGlobalImports(autoImportFiles),
    }),
  });
}
