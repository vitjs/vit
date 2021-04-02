export default [
  {
    path: '/',
    component: './layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/hello',
        exact: true,
      },
      {
        path: '/hello',
        icon: 'star',
        name: 'Hello',
        component: './pages/Hello',
      },
      {
        path: '/welcome',
        icon: 'smile',
        name: 'Welcome',
        component: './pages/Welcome',
      },
    ],
  },
];
