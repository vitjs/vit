import { readFileSync } from 'fs';
import { resolve } from 'path';

import type { Service } from '@vitjs/core';

export default function generateExports(service: Service) {
  service.writeTmpFile({
    path: 'exports.ts',
    content: readFileSync(resolve(__dirname, './exports.tpl'), 'utf-8'),
  });
}
