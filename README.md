# @vitjs/vit

[![npm package](https://img.shields.io/npm/v/@vitjs/vit.svg?style=flat-square?style=flat-square)](https://www.npmjs.com/package/@vitjs/vit) [![GitHub stars](https://img.shields.io/github/stars/vitjs/vit)](https://github.com/vitjs/vit/stargazers)

> 🛠 React application framework based on Vite.

基于 Vite 插件实现的类 Umi 的应用框架。

## 如何使用？

### 安装

```sh
yarn add @vitjs/vit --dev
```

### 配置

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  <script type="module" src="@vit-app"></script>
</body>
```

```ts
// vite.config.ts
import type { UserConfig } from 'vite';
// @vitjs/vit 默认为运行时依赖
// 其中的 Vite 插件需要独立引入使用
import vitApp from '@vitjs/vit/plugin';

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

此外，还需要将临时文件所在目录加入到 .gitignore 中：

```
.vit
```

更多用法可参考 [vite-react](https://github.com/theprimone/vite-react)。值得注意的是，当前插件还在快速迭代阶段，可能会出现配置不兼容的情况。

## 致谢

- [vite](https://github.com/vitejs/vite)
- [umi](https://github.com/umijs/umi)
