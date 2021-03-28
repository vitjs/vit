import { EOL } from 'os';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join, dirname, relative } from 'path';
import mkdirp from 'mkdirp';

import Route, { RouteOptions } from '../Route';
import { isTSFile, getGlobalFiles } from './utils';

export interface ServiceHooks {
  patchRoutes?: (service: Service) => void;
}

export interface ServiceOptions extends Omit<RouteOptions, 'paths' | 'service'> {
  cwd: string;
  outDir: string;
}

export default class Service {
  paths: {
    cwd?: string;
    absSrcPath?: string;
    absPagesPath?: string;
    absOutputPath?: string;
    absTmpPath?: string;
  } = {};
  route: Route;

  constructor(options: ServiceOptions) {
    this.initPaths(options);
    this.route = new Route({
      routes: options.routes,
      dynamicImport: options.dynamicImport,
      service: this,
    });
  }

  initPaths(options: ServiceOptions) {
    const absSrcPath = resolve(options.cwd, './src');
    const absPagesPath = resolve(options.cwd, './src/pages');
    const absOutputPath = resolve(options.outDir);
    const absTmpPath = resolve(options.cwd, './src/.vit');

    this.paths = {
      cwd: options.cwd,
      absSrcPath,
      absPagesPath,
      absOutputPath,
      absTmpPath,
    };
  }

  writeTmpFile({ path, content, skipTSCheck = true }: { path: string; content: string; skipTSCheck?: boolean }) {
    const absPath = join(this.paths.absTmpPath!, path);
    mkdirp.sync(dirname(absPath));
    if (isTSFile(path) && skipTSCheck) {
      // write @ts-nocheck into first line
      content = `// @ts-nocheck${EOL}${content}`;
    }
    if (!existsSync(absPath) || readFileSync(absPath, 'utf-8') !== content) {
      writeFileSync(absPath, content, 'utf-8');
    }
  }

  dumpGlobalImports(files: string[]) {
    const importsAheadFiles = getGlobalFiles({ absSrcPath: this.paths.absSrcPath!, files });
    return `${importsAheadFiles.map((file) => `import '../${relative(this.paths.absSrcPath!, file)}';`).join('\n')}`;
  }
}
