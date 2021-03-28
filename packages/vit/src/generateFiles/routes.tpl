{{ #dynamic }}
import { dynamic } from '@vitjs/runtime';
{{ /dynamic }}
{{ #imports }}
import React from 'react';
{{{ imports }}}
{{ /imports }}
{{ #modules }}
import {{ name }} from '{{{ path }}}';
{{ /modules }}

{{ #loadingComponent }}
import LoadingComponent from '{{{ loadingComponent }}}';
{{ /loadingComponent }}

export default function getRoutes() {
  const routes = {{{ routes }}};
  return routes;
}
