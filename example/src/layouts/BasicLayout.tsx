import React from 'react';
import { Link } from '@vitjs/vit';

export interface IRoute {
  component: React.ReactNode;
  icon?: React.ReactNode;
  name?: string;
  path: string;
  redirect: string;
  routes: IRoute[];
}

export interface BasicLayoutProps {
  children?: React.ReactNode;
  routes: IRoute[];
}

export default function BasicLayout(props: BasicLayoutProps) {
  const { children, routes } = props;

  const renderMenu = (routes: IRoute[]) => {
    return routes
      .filter((item) => {
        return !item.redirect && item.path;
      })
      .map((item) => {
        const subRoutes = item.routes;

        return (
          <div key={item.path}>
            <Link to={item.path}>
              {item.icon && <span style={{ marginRight: 4 }}>{item.icon}</span>}
              {item.path === '/' ? 'Home' : item.name || item.path}
            </Link>
            {subRoutes && <div style={{ marginLeft: 16 }}>{renderMenu(subRoutes)}</div>}
          </div>
        );
      });
  };

  return (
    <div
      style={{
        padding: '16px 24px',
        border: 'red 2px dashed',
      }}
    >
      <h2>BasicLayout</h2>
      {renderMenu(routes)}
      {children}
    </div>
  );
}
