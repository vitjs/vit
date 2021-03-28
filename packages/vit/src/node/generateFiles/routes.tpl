{{ #dynamic }}
import { dynamic } from '@vit-runtime';
{{ /dynamic }}

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
