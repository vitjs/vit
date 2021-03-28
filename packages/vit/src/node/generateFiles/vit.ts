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

  const files = ['global.ts', 'global.tsx', 'global.css', 'global.less', 'global.scss', 'global.sass'];
  const globalFiles = getGlobalFiles({ absSrcPath: paths.sourcePath, files });

  console.log('globalFiles', globalFiles);

  writeTmpFile({
    path: 'vit.tsx',
    content: Mustache.render(vitTpl, {
      Router: getRouter(),
      base: options.base,
      imports: `${globalFiles.map((file) => `import '../${relative(paths.sourcePath, file)}';`).join('\n')}`,
    }),
  });
}
