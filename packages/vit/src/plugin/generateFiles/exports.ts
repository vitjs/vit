import { Service } from '@vitjs/core';

export default function generateExports(service: Service) {
  service.writeTmpFile({
    path: 'exports.ts',
    content: "export { default as history } from './history'",
  });
}
