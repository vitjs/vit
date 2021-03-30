export default [
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
];
