import { readFileSync } from 'fs';
import { join, relative } from 'path';
import Mustache from 'mustache';
import type { UserConfig } from 'vite';

import { paths } from '../constants';
import { writeTmpFile } from '../utils';
import { getGlobalFiles } from '../utils/utils';
import type { PluginConfig } from '../types';

export interface GenerateVitOptions extends PluginConfig, Pick<UserConfig, 'base'> {}

export default function generateVit(options: GenerateVitOptions) {
  const vitTpl = readFileSync(join(__dirname, './vit.tpl'), 'utf-8');

  const getRouter = () => {
    const type = options.history?.type;
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
  const importsAheadFiles = getGlobalFiles({ absSrcPath: paths.sourcePath, files: autoImportsAheadFiles });

  const autoImportFiles = ['global.ts', 'global.tsx', 'global.css', 'global.less', 'global.scss', 'global.sass'];
  const importFiles = getGlobalFiles({ absSrcPath: paths.sourcePath, files: autoImportFiles });

  writeTmpFile({
    path: 'vit.tsx',
    content: Mustache.render(vitTpl, {
      Router: getRouter(),
      base: options.base,
      importsAhead: `${importsAheadFiles.map((file) => `import '../${relative(paths.sourcePath, file)}';`).join('\n')}`,
      imports: `${importFiles.map((file) => `import '../${relative(paths.sourcePath, file)}';`).join('\n')}`,
    }),
  });
}
