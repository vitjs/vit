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
        routes: [
          {
            path: '/hello/foo',
            name: 'Foo',
            component: './pages/Hello/Foo',
          },
          {
            path: '/hello/bar',
            name: 'Bar',
            component: './pages/Hello/Bar',
          },
        ],
      },
      {
        path: '/welcome',
        icon: 'smile',
        name: 'Welcome',
        component: './pages/Welcome',
        routes: [
          {
            path: '/welcome/bar',
            name: 'Bar',
            component: './pages/Welcome/Bar',
          },
        ],
      },
    ],
  },
];
