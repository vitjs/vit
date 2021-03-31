import { readFileSync } from 'fs';
import { resolve } from 'path';
import Mustache from 'mustache';
import { Service } from '@vitjs/core';

import { resolveIcons } from './utils';

export interface GenerateRoutesOptions {
  service: Service;
}

export default function generateRoutes(service: Service) {
  const routesTpl = readFileSync(resolve(__dirname, './routes.tpl'), 'utf-8');

  let moduleMap: { [path: string]: string } = {};
  if (!service.route.dynamicImport) {
    moduleMap = service.route.resolveRoutes();
  }
  const modules = Object.keys(moduleMap).map((modulePath) => {
    return {
      name: moduleMap[modulePath],
      path: modulePath,
    };
  });

  const iconsMap = resolveIcons(service.route.routes);

  service.writeTmpFile({
    path: 'routes.ts',
    content: Mustache.render(routesTpl, {
      routes: service.route.dumpRoutes({
        extraReplace: (route) => {
          if (route.icon && iconsMap[route.icon]) {
            route.icon = `React.createElement(${iconsMap[route.icon]})`;
          }
        },
        postDump: (content) =>
          content.replace(/\"icon\": (\"(.+?)\")/g, (global, m1, m2) => {
            return `"icon": ${m2.replace(/\^/g, '"')}`;
          }),
      }),
      imports: Object.values(iconsMap)
        .map((icon) => {
          return `import ${icon} from '@ant-design/icons/${icon}'`;
        })
        .join('\n'),
      dynamic: !!service.route.dynamicImport,
      modules,
      loadingComponent:
        service.route.dynamicImport &&
        service.route.dynamicImport.loading &&
        resolve(process.cwd(), './src/', service.route.dynamicImport.loading),
    }),
  });
}
