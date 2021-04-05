import type { MockMethod } from '../../../packages/vit/src/plugin';
import { version } from '../../../packages/vit/package.json';

export default [
  {
    url: '/api/version',
    method: 'get',
    timeout: 240,
    response: () => {
      return {
        code: 0,
        data: `v${version}`,
      };
    },
  },
] as MockMethod[];
