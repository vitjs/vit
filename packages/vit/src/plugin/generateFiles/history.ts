import { readFileSync } from 'fs';
import { resolve } from 'path';
import Mustache from 'mustache';
import type { UserConfig } from 'vite';
import { Service } from '@vitjs/core';
import _upperFirst from 'lodash/upperFirst';

import { PluginConfig } from '../types';

export interface GenerateHistoryOptions extends Pick<UserConfig, 'base'>, Pick<PluginConfig, 'history'> {
  service: Service;
}

export default function generateHistory(options: GenerateHistoryOptions) {
  const { service, history, base } = options;
  const { type = 'browser', options: historyOptions = {} } = history || {};
  const historyTpl = readFileSync(resolve(__dirname, './history.tpl'), 'utf-8');

  service.writeTmpFile({
    path: 'history.ts',
    content: Mustache.render(historyTpl, {
      creator: `create${_upperFirst(type)}History`,
      options: JSON.stringify(
        {
          ...historyOptions,
          ...(type === 'browser' || type === 'hash' ? { basename: base || '/' } : {}),
        },
        null,
        2
      ),
    }),
  });
}
