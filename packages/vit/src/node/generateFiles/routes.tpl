{{ #dynamic }}
import { dynamic } from '@vite-app/runtime';
{{ /dynamic }}

{{ #loadingComponent }}
import LoadingComponent from '{{{ loadingComponent }}}';
{{ /loadingComponent }}

export default function getRoutes() {
  const routes = {{{ routes }}};
  return routes;
}
