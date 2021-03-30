// @ts-nocheck
import React from 'react';
import SmileOutlined from '@ant-design/icons/SmileOutlined'
import Component0 from '/home/zpr1g/Workspaces/github/vitjs/vit/example/src/layouts/BasicLayout';
import Component1 from '/home/zpr1g/Workspaces/github/vitjs/vit/example/src/pages/Welcome';


export default function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": Component0,
    "routes": [
      {
        "path": "/",
        "redirect": "/welcome",
        "exact": true
      },
      {
        "path": "/welcome",
        "icon": React.createElement(SmileOutlined),
        "name": "欢迎页",
        "component": Component1
      }
    ]
  }
];
  return routes;
}
