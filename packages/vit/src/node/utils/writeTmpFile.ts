import { EOL } from 'os';
import * as path from 'path';
import mkdirp from 'mkdirp';
import { existsSync, readFileSync, writeFileSync } from 'fs';

import { paths } from '../constants';
import { isTSFile } from './utils';

export default function writeTmpFile({
  path: writePath,
  content,
  skipTSCheck = true,
}: {
  path: string;
  content: string;
  skipTSCheck?: boolean;
}) {
  const absPath = path.join(paths.absTmpPath, writePath);
  mkdirp.sync(path.dirname(absPath));
  if (isTSFile(writePath) && skipTSCheck) {
    // write @ts-nocheck into first line
    content = `// @ts-nocheck${EOL}${content}`;
  }
  if (!existsSync(absPath) || readFileSync(absPath, 'utf-8') !== content) {
    writeFileSync(absPath, content, 'utf-8');
  }
}
