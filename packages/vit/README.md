# @vitjs/vit

[![npm package](https://img.shields.io/npm/v/@vitjs/vit.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@vitjs/vit) [![GitHub stars](https://img.shields.io/github/stars/vitjs/vit)](https://github.com/vitjs/vit/stargazers)

> 🛠 React application framework based on Vite.

基于 Vite 插件实现的类 Umi 的应用框架。

## Features

- ⚡️ 配置式路由
- ✨ 基于路由的代码分割
- 🎁 可导出为纯静态应用
- 🎨 Mock 数据

### 关于路由

框架接管了路由定义与渲染以及应用入口，开发者只需要配置好路由定义后，即可专注于业务开发。

### Mock 数据

基于 [vite-plugin-mock](https://github.com/anncwb/vite-plugin-mock)，并内置了对于 fetch 的拦截，可轻松在生产环境使用 Mock 数据。编译时自动注入 Mock 相关数据，开发者专注于 Mock 数据的定义即可。

## 如何使用？

- **node version:** >=10.0.0
- **vite version:** >=2.0.0

### 安装

```sh
# Vite 插件，核心功能实现
yarn add @vitjs/vite-plugin --dev

# Vit App 运行时，提供运行时组件
yarn add @vitjs/vit
```

### 配置

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
      // 根据项目结构配置路由，组件统一从 src 目录下引入
      // icon 当前支持自动转义为 @ant-design/icons 中的图标
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
              name: '欢迎页',
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
// 为了更好的 TS 类型提示，需要新增如下配置
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@@/*": ["./src/.vit/*"]
    }
  }
}
```

此外，还需要将临时文件所在目录加入到 .gitignore 中：

```
.vit
```

### 应用模板

更多细节可直接参考应用模板 **[vite-react](https://github.com/theprimone/vite-react)**。值得注意的是，当前插件还在快速迭代阶段，可能会出现配置不兼容的情况。
