import { readFileSync } from 'fs';
import { resolve } from 'path';

import glob from 'globby';
import get from 'lodash/get';
import Mustache from 'mustache';

import { getImportAheadModules, getImportModules } from './import';

import type { PluginConfig } from '../types';
import type { Service } from '@vitjs/core';
import type { ResolvedConfig } from 'vite';

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
  extends Pick<ResolvedConfig, 'command'>,
    Pick<PluginConfig, 'mock' | 'globalImport'> {
  service: Service;
}

export default function generateVit(options: GenerateVitOptions) {
  const { service, command, mock, globalImport } = options;
  const customImportAheadModules = get(globalImport, 'aheadModules', []);
  const customImportModules = get(globalImport, 'modules', []);
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
      importsAhead: service.dumpGlobalImports(getImportAheadModules(customImportAheadModules)),
      imports: service.dumpGlobalImports(getImportModules(customImportModules)),
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
