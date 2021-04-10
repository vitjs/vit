// ref: https://github.com/sxei/mockjs-fetch/blob/master/index.js

import Mock from 'mockjs';

import { loadUrl } from './mock';

function qs(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') +
      '"}'
  );
}

export default function mockFetch() {
  if (!Mock || !Mock.mock) {
    throw new Error('Mock.js is required.');
  }

  const tempFetchName = '__mockFetchRawFetch__';
  // 防止重复引入
  if (window[tempFetchName]) {
    return;
  }
  window[tempFetchName] = window.fetch;
  window.fetch = function (url, options) {
    const processedUrl = loadUrl(url);

    options = options || { method: 'GET' };
    const method = options.method;
    if (Mock.XHR._settings.debug) {
      console.log(`${method} ${processedUrl}`, 'options: ', options);
    }
    for (const key in Mock._mocked) {
      const item = Mock._mocked[key];
      const urlMatch =
        (typeof item.rurl === 'string' && item.rurl.indexOf(processedUrl) >= 0) ||
        (item.rurl instanceof RegExp && item.rurl.test(processedUrl));
      const methodMatch = !item.rtype || item.rtype.toLowerCase() === method.toLowerCase();
      if (urlMatch && methodMatch) {
        let timeout = Mock.XHR._settings.timeout || '200-400';
        if (typeof timeout === 'string') {
          const temp = timeout.split('-').map((item) => parseInt(item));
          timeout = temp[0] + Math.round(Math.random() * (temp[1] - temp[0]));
        }

        return new Promise((resolve) => {
          const resp =
            typeof item.template === 'function'
              ? // 保持与 mock 定义一致的入参
                item.template.call(this, {
                  query: qs(url),
                  body: options?.body,
                  headers: options?.headers,
                })
              : Mock.mock(item.template);

          setTimeout(() => {
            const response = {
              status: 200,
              text() {
                return Promise.resolve(JSON.stringify(resp));
              },
              json() {
                return Promise.resolve(resp);
              },
              // blob、formData等一系列方法仅仅是为了让fetch不报错，并没有具体实现它
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
            if (Mock.XHR._settings.debug) {
              console.log('resp: ', resp);
            }
          }, timeout);
        });
      }
    }
    return window[tempFetchName](processedUrl, options);
  };
}
