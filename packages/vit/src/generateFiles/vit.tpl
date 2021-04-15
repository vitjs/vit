{{ #importsAhead }}
{{{ importsAhead }}}
{{ /importsAhead }}
{{ #noReactJsx }}
import React from 'react';
{{ /noReactJsx }}
import ReactDOM from 'react-dom';
import { renderRoutes } from '@vitjs/runtime';
{{#COMMENT}}
// 值得注意的是，不能直接从临时文件中直接引入，即不同通过 `./history` 引入，
// 由于 `@vitjs/runtime` 中通过 `@@/exports` 指向了应用运行时生成的临时文件，
// 在 esbuild 转换时会将 `@@/exports` 中的内容打包到 `@vitjs/runtime` 中，
// 如果在此还通过 `./history` 引入会导致指向的对象不是同一个，从而导致一些异常，
// 因此，只能通过 `@vitjs/runtime` 引入应用运行时依赖。
{{/COMMENT}}
import { Router, history } from '@vitjs/runtime';

import getRoutes from './routes';
{{ #imports }}
{{{ imports }}}
{{ /imports }}

{{ #entryCodeAhead }}
{{{ entryCodeAhead }}}
{{ /entryCodeAhead }}

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      {renderRoutes({ routes: getRoutes() })}
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
