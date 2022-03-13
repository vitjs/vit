import * as allIcons from '@ant-design/icons';
import React from 'react';

import type { IRoute } from '@vitjs/core';

// 如果不引入 React,只引入 @ant-design/icons 时会报错
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
React.version;

function toHump(name: string) {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

type IconMap = Record<string, string>;

export function resolveIcons(data: IRoute[], parentIcons?: IconMap): IconMap {
  if (!Array.isArray(data)) {
    return {};
  }
  let icons: IconMap = parentIcons || {};
  (data || []).forEach((item = { path: '/' }) => {
    if (item.icon) {
      const { icon } = item;
      const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
      if ((allIcons as any)[icon] && !icons[icon]) {
        icons[icon] = icon;
      }
      if ((allIcons as any)[`${v4IconName}Outlined`] && !icons[icon]) {
        icons[icon] = `${v4IconName}Outlined`;
      }
    }
    if (item.routes) {
      icons = resolveIcons(item.routes, icons);
    }
  });

  return icons;
}
