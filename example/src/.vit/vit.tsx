// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { renderRoutes } from '@vitjs/runtime';
import getRoutes from './routes';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter
      basename='/'
    >
      {renderRoutes({ routes: getRoutes() })}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
