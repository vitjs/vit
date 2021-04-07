import React from 'react';
import { history } from '@vitjs/vit';

import Block from '@/components/Block';
import Button from '@/components/Button';

export default function Hello({ children }: any) {
  return (
    <Block>
      Hello Page
      <br />
      <Button onClick={() => history.push('/welcome')}>runtime history push to /welcome</Button>
      <Button onClick={() => history.push('/welcome/bar')}>runtime history push to /welcome/bar</Button>
      <Button onClick={() => history.replace('/welcome/bar')}>runtime history replace to /welcome/bar</Button>
      <Block>{children}</Block>
    </Block>
  );
}
