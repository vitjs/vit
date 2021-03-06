import { EOL } from 'os';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join, dirname, relative } from 'path';
import mkdirp from 'mkdirp';

import Route, { RouteOptions } from '../Route';
import { isTSFile, getGlobalFiles } from './utils';

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

  writeFile({ path, content }: { path: string; content: string }) {
    mkdirp.sync(dirname(path));
    if (!existsSync(path) || readFileSync(path, 'utf-8') !== content) {
      writeFileSync(path, content, 'utf-8');
    }
  }

  writeTmpFile({ path, content, skipTSCheck = true }: { path: string; content: string; skipTSCheck?: boolean }) {
    const absPath = join(this.paths.absTmpPath!, path);
    if (isTSFile(path) && skipTSCheck) {
      // write @ts-nocheck into first line
      content = `// @ts-nocheck${EOL}${content}`;
    }

    this.writeFile({
      path: absPath,
      content,
    });
  }

  dumpGlobalImports(files: string[]) {
    return `${getGlobalFiles({ absSrcPath: this.paths.absSrcPath!, files })
      .map((file) => `import '../${relative(this.paths.absSrcPath!, file)}';`)
      .join('\n')}`;
  }
}
