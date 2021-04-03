import { resolve } from 'path';
import _cloneDeep from 'lodash/cloneDeep';
import _uniq from 'lodash/uniq';

import Service from '../Service';

export interface IRoute {
  component?: string;
  exact?: boolean;
  path?: string;
  routes?: IRoute[];
  wrappers?: string[];
  title?: string;
  [key: string]: any;
}

export interface RouteOptions {
  service: Service;
  routes: IRoute[];
  dynamicImport?: {
    loading?: string;
  };
}

export default class Route {
  service: RouteOptions['service'];
  routes: RouteOptions['routes'] = [];
  dynamicImport: RouteOptions['dynamicImport'];

  constructor(options: RouteOptions) {
    this.service = options.service;
    this.routes = options.routes;
    this.dynamicImport = options.dynamicImport;
  }

  /**
   * 解析路由组件配置，得到组件绝对路径和组件别名的映射
   */
  resolveRoutes() {
    const result: { [path: string]: string } = {};

    let componentCursor = 0;
    let wrapperCursor = 0;
    const resolveRoute = (route: IRoute) => {
      if (route.component && !result[route.component]) {
        route.component = resolve(this.service.paths.absSrcPath!, route.component);
        result[route.component] = `Component${componentCursor}`;
        componentCursor += 1;
      }
      if (route.wrappers) {
        route.wrappers.forEach((item) => {
          let wrapper = resolve(this.service.paths.absSrcPath!, item);
          if (!result[wrapper]) {
            result[wrapper] = `Wrapper${wrapperCursor}`;
            wrapperCursor += 1;
          }
        });
      }

      if (route.routes) {
        loopRoutes(route.routes);
      }
    };

    const loopRoutes = (routes: IRoute[]) => {
      routes.forEach(resolveRoute);
    };

    loopRoutes(this.routes);

    return result;
  }

  /**
   * 输出路由配置，可做额外修改
   *
   * @param options
   * @returns
   */
  dumpRoutes(options?: { extraReplace?: (route: IRoute) => void; postDump?: (content: string) => string }) {
    const { extraReplace, postDump } = options || {};
    const clonedRoutes = _cloneDeep(this.routes!);

    let modules: { [path: string]: string } = {};
    if (!this.dynamicImport) {
      modules = this.resolveRoutes();
    }

    const replaceComponent = (route: IRoute) => {
      if (route.component) {
        route.component = resolve(this.service.paths.absSrcPath!, route.component);
        if (this.dynamicImport) {
          let loading = '';
          if (this.dynamicImport.loading) {
            loading = `, loading: LoadingComponent`;
          }
          route.component = `dynamic({ loader: () => import('${route.component}')${loading}})`;
        } else {
          route.component = modules[route.component];
        }
      }
    };

    const replaceWrappers = (route: IRoute) => {
      if (route.wrappers) {
        route.wrappers = route.wrappers.map((item) => {
          let wrapper = resolve(this.service.paths.absSrcPath!, item);
          if (this.dynamicImport) {
            let loading = '';
            if (this.dynamicImport.loading) {
              loading = `, loading: LoadingComponent`;
            }
            return `dynamic({ loader: () => import('${wrapper}')${loading}})`;
          } else {
            return modules[wrapper];
          }
        });
      }
    };

    function loopRoute(route: IRoute) {
      replaceComponent(route);
      replaceWrappers(route);
      extraReplace?.(route);

      if (route.routes) {
        loopRoutes(route.routes);
      }
    }

    function loopRoutes(routes: IRoute[]) {
      routes.forEach(loopRoute);
    }

    loopRoutes(clonedRoutes);

    const result = JSON.stringify(clonedRoutes, null, 2)
      .replace(/\"component\": (\"(.+?)\")/g, (global, m1, m2) => {
        return `"component": ${m2.replace(/\^/g, '"')}`;
      })
      .replace(/\"wrappers\": (\"(.+?)\")/g, (global, m1, m2) => {
        return `"wrappers": ${m2.replace(/\^/g, '"')}`;
      })
      .replace(/\\r\\n/g, '\r\n')
      .replace(/\\n/g, '\r\n');

    return postDump?.(result) || result;
  }

  patchRoutes(setRoutes: IRoute[] | ((routes: IRoute[]) => IRoute[])) {
    if (typeof setRoutes === 'function') {
      this.routes = setRoutes(this.routes);
    } else {
      this.routes = setRoutes;
    }
  }

  getPaths({ routes }: { routes: IRoute[] }): string[] {
    return _uniq(
      routes.reduce((memo: string[], route) => {
        if (route.path) memo.push(route.path);
        if (route.routes) memo = memo.concat(this.getPaths({ routes: route.routes }));
        return memo;
      }, [])
    );
  }
}
