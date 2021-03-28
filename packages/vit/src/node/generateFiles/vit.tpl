{{ #importsAhead }}
{{ importsAhead }}
{{ /importsAhead }}
import React from 'react';
import ReactDOM from 'react-dom';
import { {{ Router }} } from 'react-router-dom';

import { renderRoutes } from '@vit-runtime';
import getRoutes from './routes';
{{ #imports }}
{{{ imports }}}
{{ /imports }}

{{ #entryCodeAhead }}
{{{ entryCodeAhead }}}
{{ /entryCodeAhead }}

ReactDOM.render(
  <React.StrictMode>
    <{{ Router }}
{{ #base }}
      basename='{{{ base }}}'
{{ /base }}
    >
      {renderRoutes({ routes: getRoutes() })}
    </{{ Router }}>
  </React.StrictMode>,
  document.getElementById('root'),
);
