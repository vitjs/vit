import { existsSync, readFileSync, writeFileSync } from 'fs';
import { EOL } from 'os';
import { resolve, join, dirname, relative } from 'path';

import { winPath } from '@vitjs/utils';
import mkdirp from 'mkdirp';

import Route from '../Route';

import { isTSFile, getGlobalFiles } from './utils';

import type { RouteOptions } from '../Route';

export interface ServiceOptions extends Omit<RouteOptions, 'paths' | 'service'> {
  debug?: boolean;
  cwd: string;
  outDir: string;
}

export default class Service {
  debug?: boolean;
  paths: {
    cwd?: string;
    absSrcPath?: string;
    absPagesPath?: string;
    absOutputPath?: string;
    absTmpPath?: string;
  } = {};
  route: Route;

  constructor(options: ServiceOptions) {
    this.debug = options.debug;
    this.initPaths(options);
    this.route = new Route({
      routes: options.routes,
      dynamicImport: options.dynamicImport,
      service: this,
    });
  }

  initPaths(options: ServiceOptions) {
    const absSrcPath = winPath(resolve(options.cwd, './src'));
    const absPagesPath = winPath(resolve(options.cwd, './src/pages'));
    const absOutputPath = winPath(resolve(options.outDir));
    const absTmpPath = winPath(resolve(options.cwd, './src/.vit'));

    this.paths = {
      cwd: options.cwd,
      absSrcPath,
      absPagesPath,
      absOutputPath,
      absTmpPath,
    };
  }

  writeFile({ path, content }: { path: string; content: string }) {
    mkdirp.sync(dirname(path));
    if (!existsSync(path) || readFileSync(path, 'utf-8') !== content) {
      writeFileSync(path, content, 'utf-8');
    }
  }

  writeTmpFile({ path, content, skipTSCheck = true }: { path: string; content: string; skipTSCheck?: boolean }) {
    const absPath = join(this.paths.absTmpPath!, path);
    let contentResult = content;
    if (isTSFile(path) && skipTSCheck) {
      // write @ts-nocheck into first line
      contentResult = `// @ts-nocheck${EOL}${contentResult}`;
    }

    this.writeFile({
      path: absPath,
      content: contentResult,
    });
  }

  dumpGlobalImports(files: string[]) {
    return `${getGlobalFiles({ absSrcPath: this.paths.absSrcPath!, files })
      .map((file) => `import '../${relative(this.paths.absSrcPath!, file)}';`)
      .join('\n')}`;
  }
}
