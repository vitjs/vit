import { resolve } from 'path';
import _cloneDeep from 'lodash/cloneDeep';

import { paths } from '../constants';
import resolveRoutes from './resolveRoutes';
import { Route, PluginConfig } from '../types';

export default function loadRoutes(config: PluginConfig) {
  const clonedRoutes = _cloneDeep(config.routes!);

  let modules: { [path: string]: string } = {};
  if (!config.dynamicImport) {
    modules = resolveRoutes(config.routes || []);
  }

  patchRoutes(clonedRoutes);

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
    if (route.component) {
      route.component = resolve(paths.sourcePath, route.component);
      if (config.dynamicImport) {
        let loading = '';
        if (config.dynamicImport.loading) {
          loading = `, loading: LoadingComponent`;
        }
        route.component = `dynamic({ loader: () => import('${route.component}')${loading}})`;
      } else {
        route.component = modules[route.component];
      }
    }
  }

  function replaceWrappers(route: Route) {
    if (route.wrappers) {
      route.wrappers = route.wrappers.map((item) => {
        let wrapper = resolve(paths.sourcePath, item);
        if (config.dynamicImport) {
          let loading = '';
          if (config.dynamicImport.loading) {
            loading = `, loading: LoadingComponent`;
          }
          return `dynamic({ loader: () => import('${wrapper}')${loading}})`;
        } else {
          return modules[wrapper];
        }
      });
    }
  }

  return JSON.stringify(clonedRoutes, null, 2)
    .replace(/\"component\": (\"(.+?)\")/g, (global, m1, m2) => {
      return `"component": ${m2.replace(/\^/g, '"')}`;
    })
    .replace(/\"wrappers\": (\"(.+?)\")/g, (global, m1, m2) => {
      return `"wrappers": ${m2.replace(/\^/g, '"')}`;
    })
    .replace(/\\r\\n/g, '\r\n')
    .replace(/\\n/g, '\r\n');
}
