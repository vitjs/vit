import { readFileSync } from 'fs';
import { resolve } from 'path';

import { winPath } from '@vitjs/utils';
import glob from 'globby';
import get from 'lodash/get';
import Mustache from 'mustache';
import semver from 'semver';

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
    Pick<PluginConfig, 'mock' | 'globalImport' | 'reactStrictMode' | 'debug'> {
  service: Service;
}

export default function generateVit(options: GenerateVitOptions) {
  const { service, command, mock, globalImport, reactStrictMode = true, debug } = options;
  const customImportAheadModules = get(globalImport, 'aheadModules', []);
  const customImportModules = get(globalImport, 'modules', []);
  const defaultTpl = './vit.tpl';

  const getVitTpl = () => {
    const customApp = service.getCustomApp();
    if (customApp) {
      const appContent = readFileSync(winPath(resolve(service.paths.absSrcPath!, customApp)), 'utf-8');
      if (appContent.trim()) {
        return readFileSync(resolve(__dirname, './vit-custom.tpl'), 'utf-8');
      }
    }
    return readFileSync(resolve(__dirname, defaultTpl), 'utf-8');
  };

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

  const tpl = getVitTpl();

  const coerceVersion = semver.coerce(service.getReactVersion())?.version;
  const isReact18 = coerceVersion ? semver.satisfies(coerceVersion, '^18.0.0') : false;

  if (debug) {
    console.log('[vit-app] react version:', coerceVersion);
    console.log('[vit-app] is react 18:', isReact18);
  }

  service.writeTmpFile({
    path: 'vit.tsx',
    content: Mustache.render(tpl, {
      react18: isReact18,
      reactStrictMode,
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
