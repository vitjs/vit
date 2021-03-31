import React from 'react';

export interface BasicLayoutProps {
  children?: React.ReactNode;
}

export default function BasicLayout(props: BasicLayoutProps) {
  const { children } = props;
  return (
    <div>
      <h2>Vit App</h2>
      <div>BasicLayout</div>
      {children}
    </div>
  );
}
