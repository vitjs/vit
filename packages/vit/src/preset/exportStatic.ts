import { readFileSync } from 'fs';
import { join } from 'path';
import _get from 'lodash/get';
import { Service } from '@vitjs/core';

import { PluginConfig } from '../types';

export interface ExportStaticOptions {
  config: PluginConfig;
  service: Service;
}

export default function exportStatic(options: ExportStaticOptions) {
  const { config, service } = options;
  const exportStatic = _get(config, 'exportStatic');
  const isHistoryRouter = _get(config, 'history.type', 'history') === 'history';

  if (!exportStatic || !isHistoryRouter) {
    return;
  }

  const entry = readFileSync(join(service.paths.absOutputPath!, './index.html'), 'utf-8');
  const routes = service.route.getPaths({ routes: service.route.routes }).filter((item) => item !== '/');

  routes.map((item) => {
    const routeEntryPath = join(service.paths.absOutputPath!, item, './index.html');
    if (service.debug) {
      console.log('[@vitjs/vit] extra route entry:', routeEntryPath);
    }
    service.writeFile({ path: routeEntryPath, content: entry });
  });
}
