import { readFileSync } from 'fs';
import { resolve } from 'path';

import glob from 'globby';
import get from 'lodash/get';
import Mustache from 'mustache';

import type { PluginConfig } from '../types';
import type { Service } from '@vitjs/core';
import type { ResolvedConfig } from 'vite';

export const autoImportsAheadFiles = ['concent.ts'];
export const autoImportFiles = ['global.ts', 'global.tsx', 'global.css', 'global.less', 'global.scss', 'global.sass'];

function getMockData(service: Service) {
  const mockList = glob.sync(`${service.paths.cwd}/mock/**/*.ts`);
  const imports = mockList.map((item, index) => {
    return `import mock${index} from '${item}'`;
  });
  return [
    `${imports.join('\n')}`,
    `export default [${mockList.map((_, index) => `...mock${index}`).join(', ')}];`,
  ].join('\n\n');
}

export interface GenerateVitOptions
  extends Pick<ResolvedConfig, 'base' | 'command'>,
    Pick<PluginConfig, 'history' | 'mock'> {
  service: Service;
}

export default function generateVit(options: GenerateVitOptions) {
  const { service, command, mock } = options;
  const vitTpl = readFileSync(resolve(__dirname, './vit.tpl'), 'utf-8');

  const productionEnabled = command === 'build' && get(mock, 'productionEnabled') === true;

  if (productionEnabled) {
    const mockFetchTs = readFileSync(resolve(__dirname, './mockFetch.tpl'), 'utf-8');
    const mockTs = readFileSync(resolve(__dirname, './mock.tpl'), 'utf-8');
    service.writeTmpFile({
      path: 'mockModules.ts',
      content: getMockData(service),
    });
    service.writeTmpFile({
      path: 'mockFetch.ts',
      content: mockFetchTs,
    });
    service.writeTmpFile({
      path: 'mock.ts',
      content: mockTs,
    });
  }

  service.writeTmpFile({
    path: 'vit.tsx',
    content: Mustache.render(vitTpl, {
      importsAhead: service.dumpGlobalImports(autoImportsAheadFiles),
      imports: service.dumpGlobalImports(autoImportFiles),
      entryCodeAhead: productionEnabled
        ? [
            "import mockModules from './mockModules.ts';",
            "import mockFetch from './mockFetch';",
            "import mock from './mock';",
            '\nmockFetch();',
            'mock(mockModules);',
          ].join('\n')
        : null,
    }),
  });
}
