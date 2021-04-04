import React from 'react';

export interface ButtonProps {
  onClick?: () => void;
}

export default function Button(props: React.PropsWithChildren<ButtonProps>) {
  return <button {...props} />;
}
