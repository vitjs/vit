{{ #importsAhead }}
{{{ importsAhead }}}
{{ /importsAhead }}
import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes, Router } from '@vitjs/runtime';

import history from './history';
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
