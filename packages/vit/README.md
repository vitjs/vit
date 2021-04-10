English | [简体中文](https://github.com/vitjs/vit/blob/master/README.zh-CN.md)

# @vitjs/vit

[![GitHub stars](https://img.shields.io/github/stars/vitjs/vit)](https://github.com/vitjs/vit/stargazers) 
[![npm package](https://img.shields.io/npm/v/@vitjs/vit.svg)](https://www.npmjs.com/package/@vitjs/vit) 
[![npm download total](https://img.shields.io/npm/dt/@vitjs/vit.svg)](https://www.npmjs.com/package/@vitjs/vit) 
[![npm download weekly](https://img.shields.io/npm/dw/@vitjs/vit.svg)](https://www.npmjs.com/package/@vitjs/vit) 

🛠 React application framework based on Vite Plugin.

## Features

- ⚡️ Manually Defined Routing
- ✨ Routing-based Code Splitting
- 🎁 Exported Pure Static Application
- 🎨 Mock Data, Usable in the Production

### Routing

The framework takes over route definition and rendering, application entry. Developers only focus on business development after configure the route definition.

### Mock Data

Based on [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock), Built-in interception for **fetch**, you can easily use mock data in the production environment to facilitate project preview.

## How to use?

- **node version:** >=10.0.0
- **vite version:** >=2.0.0

### Install

```shell
# Vite plugin, Core function realization
$ yarn add @vitjs/vite-plugin --dev

# Vit app runtime, provide application runtime related components
$ yarn add @vitjs/vit
```

### Config

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  <script type="module" src="/@vit-app"></script>
</body>
```

```ts
// vite.config.ts
import type { UserConfig } from 'vite';
import vitApp from '@vitjs/vite-plugin';

const config: UserConfig = {
  plugins: [
    vitApp({
      // Configure routing according to the project structure, and import components uniformly from the `src` directory
      // icon currently supports automatic escaping as icons in [`@ant-design/icons`](https://ant.design/components/icon/#List-of-icons)
      routes: [
        {
          path: '/',
          component: './layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/welcome',
              exact: true,
            },
            {
              path: '/welcome',
              icon: 'smile',
              name: 'Welcome',
              component: './pages/Welcome',
            },
          ],
        },
      ],
    }),
  ],
};

export default config;
```

```json
// tsconfig.json
// For better TS type prompt, you need to add the following configuration
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@@/*": ["./src/.vit/*"]
    }
  }
}
```

In addition, you also need to add the directory where the temporary files are located to `.gitignore`:

```
.vit
```

### Upgrade

```shell
$ yarn upgrade --scope @vitjs
```

### Application Template

For more details, please refer directly to the application template **[theprimone/vite-react](https://github.com/theprimone/vite-react)**. It is worth noting that the current plug-in is still in the rapid iteration stage, and configuration incompatibility may occur.
