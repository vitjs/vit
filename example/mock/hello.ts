import type { MockMethod } from '../../packages/vite-plugin/src';

export default [
  {
    url: '/api/hello',
    method: 'get',
    timeout: 240,
    response: ({ query }) => {
      return {
        code: 0,
        data: `Hello, ${query?.name || 'master'}!`,
      };
    },
  },
  {
    url: '/api/hello',
    method: 'post',
    timeout: 240,
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        code: 0,
        data: body,
      };
    },
  },
] as MockMethod[];
