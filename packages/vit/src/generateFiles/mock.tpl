import Mock from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';

export function loadUrl(url: string) {
  return `${window.routerBase === '/' ? '' : window.routerBase}${url}`.replace(/\/\//g, '/');
}

function __setupMock__(timeout = 0) {
  timeout &&
    Mock.setup({
      timeout,
    });
}

export default function mock(mockModules: MockMethod[]) {
  for (const { url, method, response, timeout } of mockModules) {
    __setupMock__(timeout);
    Mock.mock(new RegExp(loadUrl(url)), method || 'get', response);
  }
}
