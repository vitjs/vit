export const defaultImportAheadModules = [];
export const defaultImportModules = [
  'global.ts',
  'global.tsx',
  'global.css',
  'global.less',
  'global.scss',
  'global.sass',
];

export function getImportAheadModules(custom: string[] = []) {
  return [...defaultImportAheadModules, ...custom];
}
export function getImportModules(custom: string[] = []) {
  return [...defaultImportModules, ...custom];
}
