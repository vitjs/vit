English | [简体中文](./README.zh-CN.md)

<p align="center">
  <a href="https://github.com/vitjs/vit#vitjsvit">
    <img width="180" src="./icons/logo.svg" alt="Vit logo">
  </a>
</p>
<p align="center">
  <a href="https://github.com/vitjs/vit/stargazers"><img src="https://img.shields.io/github/stars/vitjs/vit" alt="GitHub stars"></a>
  <a href="https://www.npmjs.com/package/@vitjs/vit"><img src="https://img.shields.io/npm/v/@vitjs/vit.svg" alt="npm package"></a>
  <a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatility"></a>
  <a href="http://vitejs.dev/"><img src="https://img.shields.io/badge/vite-%3E%3D2.0.0-%234fc921" alt="vite compatility"></a>
</p>

# Vit 🚀

> React application framework inspired by UmiJS.

- ⚡️ Manually Defined Routing
- ✨ Routing-based Code Splitting
- 🎁 Exported Pure Static Application
- 🎨 Mock Data, Usable in the Production

### Routing

The framework takes over route definition and rendering, application entry. Developers only focus on business development after configure the route definition.

### Mock Data

Based on [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock), Built-in interception for **fetch**, you can easily use mock data in the production environment to facilitate project preview.

## How to use?

### Install

```shell
# Vite plugin, Core function realization
$ yarn add @vitjs/vit --dev

# Vit app runtime, provide application runtime related components
$ yarn add @vitjs/runtime
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
import vitApp from '@vitjs/vit';

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

```js
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

In addition, the plugin will generate runtime dependencies, so the `build` script of the application needs to remove the `tsc` command. In the end, add the directory `.vit` where the temporary files are located to `.gitignore`.

### Auto import

[`globalImports`](https://github.com/vitjs/vit/blob/master/packages/vit/src/types.ts#L9) lets you customize the files that need to be imported globally automatically. By default, you can see [`import.ts`](https://github.com/vitjs/vit/blob/master/packages/vit/src/generateFiles/import.ts#L2)

In particular, [`_app.tsx`](https://github.com/vitjs/vit/blob/master/packages/core/src/Service/index.ts#L21) can be automatically import to rewrite the application's rendering logic.

### Upgrade

```shell
$ yarn upgrade --scope @vitjs

$ yarn upgrade --scope @vitjs --latest
```

### Application Template

For more details, please refer directly to the application template **[yunsii/vite-react](https://github.com/yunsii/vite-react)**. It is worth noting that the current plugin is still under heavy development, API and usages are not set in stone yet.
