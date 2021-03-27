import { Route, PluginConfig } from '../types';

export default function loadRoutes(config: PluginConfig) {
  patchRoutes(config.routes!);

  function patchRoutes(routes: Route[]) {
    routes.forEach(patchRoute);
  }

  function patchRoute(route: Route) {
    replaceComponent(route);
    replaceWrappers(route);

    if (route.routes) {
      patchRoutes(route.routes);
    }
  }

  function replaceComponent(route: Route) {
    console.log('config.dynamicImport', config.dynamicImport);
    if (route.component) {
      if (config.dynamicImport) {
        let loading = '';
        if (config.dynamicImport.loading) {
          loading = `, loading: LoadingComponent`;
        }
        route.component = `dynamic({ loader: () => import('${route.component}')${loading}})`;
      } else {
        route.component = `require('${route.component}').default`;
      }
    }
  }

  function replaceWrappers(route: Route) {
    if (route.wrappers) {
      route.wrappers = route.wrappers.map((item) => {
        if (config.dynamicImport) {
          let loading = '';
          if (config.dynamicImport.loading) {
            loading = `, loading: LoadingComponent`;
          }
          return `dynamic({ loader: () => import('${item}')${loading}})`;
        } else {
          return `require('${item}').default`;
        }
      });
    }
  }

  return JSON.stringify(config.routes, null, 2)
    .replace(/\"component\": (\"(.+?)\")/g, (global, m1, m2) => {
      return `"component": ${m2.replace(/\^/g, '"')}`;
    })
    .replace(/\"wrappers\": (\"(.+?)\")/g, (global, m1, m2) => {
      return `"wrappers": ${m2.replace(/\^/g, '"')}`;
    })
    .replace(/\\r\\n/g, '\r\n')
    .replace(/\\n/g, '\r\n');
}
