// ref: https://github.com/umijs/umi/blob/master/packages/utils/src/winPath/winPath.ts

export default function (path: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);
  if (isExtendedLengthPath) {
    return path;
  }

  return path.replace(/\\/g, '/');
}
