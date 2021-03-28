import { resolve } from 'path';
import _cloneDeep from 'lodash/cloneDeep';

import { paths } from '../constants';
import { Route } from '../types';

export default function resolveRoutes(routes: Route[]) {
  const result: { [path: string]: string } = {};

  let componentCursor = 0;
  let wrapperCursor = 0;
  patchRoutes(routes);

  function patchRoutes(routes: Route[]) {
    routes.forEach(patchRoute);
  }

  function patchRoute(route: Route) {
    if (route.component && !result[route.component]) {
      route.component = resolve(paths.sourcePath, route.component);
      result[route.component] = `Component${componentCursor}`;
      componentCursor += 1;
    }
    if (route.wrappers) {
      route.wrappers.forEach((item) => {
        let wrapper = resolve(paths.sourcePath, item);
        if (!result[wrapper]) {
          result[wrapper] = `Wrapper${wrapperCursor}`;
          wrapperCursor += 1;
        }
      });
    }

    if (route.routes) {
      patchRoutes(route.routes);
    }
  }

  return result;
}
