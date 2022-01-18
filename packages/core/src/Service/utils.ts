import { existsSync } from 'fs';
import { join } from 'path';

type IGetGlobalFiles = (options: { absSrcPath: string; files: string[]; checkExists?: boolean }) => string[];

/**
 * get global file like (global.js, global.css)
 * @param absSrcPath
 * @param files default load global files
 */
export const getGlobalFiles: IGetGlobalFiles = ({ absSrcPath, files }) => {
  return files.map((file) => join(absSrcPath || '', file)).filter((file) => existsSync(file));
};

export const isDynamicRoute = (path: string): boolean =>
  !!path?.split('/')?.some?.((snippet) => snippet.startsWith(':'));

/**
 * judge whether ts or tsx file exclude d.ts
 * @param path
 */
export const isTSFile = (path: string): boolean => {
  return typeof path === 'string' && !/\.d\.ts$/.test(path) && /\.(ts|tsx)$/.test(path);
};
