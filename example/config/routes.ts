export default [
  {
    path: '/',
    component: './layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: './layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './pages/User/Login',
          },
        ],
      },
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
            exact: true,
          },
          {
            path: '/account',
            icon: 'user',
            name: '个人页',
            component: './pages/Account',
          },
        ],
      },
    ],
  },
];
