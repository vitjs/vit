// ref: https://github.com/sxei/mockjs-fetch/blob/master/index.js

import Mock from 'mockjs';

import { loadUrl } from './mock';

const fetchBackup = '__fetchBackup__';

function qs(url: string) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}',
  );
}

function loadBody(fetchBody: RequestInit['body']) {
  try {
    return JSON.parse(fetchBody as any);
  } catch (error) {
    console.log('loadBody error', error);
    return fetchBody;
  }
}

function loadInit(init: RequestInit) {
  const result = { ...init };
  if (!init?.method) {
    result.method = 'GET';
  }
  if (init?.body) {
    result.body = loadBody(init.body);
  }
  return result;
}

function mockResponse(
  url: string,
  options: Record<string, any>,
  mockedItem: { rurl: string | RegExp; rtype: string; template: any },
) {
  let timeout = Mock.XHR._settings.timeout || '200-400';
  if (typeof timeout === 'string') {
    const temp = timeout.split('-').map((item) => parseInt(item));
    timeout = temp[0] + Math.round(Math.random() * (temp[1] - temp[0]));
  }

  return new Promise((resolve) => {
    const resp =
      typeof mockedItem.template === 'function'
        ? // 保持与 mock 定义一致的入参
          mockedItem.template.call(this, {
            query: qs(url),
            body: options?.body,
            headers: options?.headers,
          })
        : Mock.mock(mockedItem.template);

    setTimeout(() => {
      const response = {
        status: 200,
        text() {
          return Promise.resolve(JSON.stringify(resp));
        },
        json() {
          return Promise.resolve(resp);
        },
        // blob、formData 等方法仅是为了让 fetch 后不报错，没有具体实现
        blob() {
          return Promise.resolve(resp);
        },
        formData() {
          return Promise.resolve(resp);
        },
        arrayBuffer() {
          return Promise.resolve(resp);
        },
      };

      resolve({
        ...response,
        clone() {
          return response;
        },
      });
    }, timeout);
  });
}

export default function mockFetch() {
  if (!Mock || !Mock.mock) {
    throw new Error('Mock.js is required.');
  }

  if (window[fetchBackup]) {
    return;
  }

  window[fetchBackup] = window.fetch;
  window.fetch = function (input: RequestInfo, init: RequestInit) {
    const processedUrl = loadUrl(input);
    const processedInit = loadInit(init);
    const method = processedInit.method;
    console.log(`${method} ${processedUrl}`, 'init: ', processedInit);

    const mocked: Record<string, any> = Mock._mocked;

    const targetMockedKey = Object.keys(mocked).find((mockedKey) => {
      const mockedItem = mocked[mockedKey];
      const urlMatch =
        (typeof mockedItem.rurl === 'string' && mockedItem.rurl.indexOf(processedUrl) >= 0) ||
        (mockedItem.rurl instanceof RegExp && mockedItem.rurl.test(processedUrl));
      const methodMatch =
        !mockedItem.rtype || mockedItem.rtype.toLowerCase() === processedInit.method.toLowerCase();
      return urlMatch && methodMatch;
    });

    if (targetMockedKey) {
      return mockResponse(processedUrl, processedInit, mocked[targetMockedKey]);
    }

    return window[fetchBackup](input, init);
  };
}
