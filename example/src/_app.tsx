import { AppProps } from '@vitjs/runtime';

export default function CustomApp(props: AppProps) {
  const { Component } = props;
  return (
    <>
      Test
      <Component />
    </>
  );
}
