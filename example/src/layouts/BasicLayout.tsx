import React from 'react';

export interface BasicLayoutProps {
  children?: React.ReactNode;
}

export default function BasicLayout(props: BasicLayoutProps) {
  const { children } = props;
  return (
    <div>
      <div>BasicLayout</div>
      {children}
    </div>
  );
}
