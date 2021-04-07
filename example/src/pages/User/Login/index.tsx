import React from 'react';
import { history } from '@vitjs/vit';

import Block from '@/components/Block';
import Button from '@/components/Button';

export default function Hello() {
  return (
    <Block>
      <h2>Login Page</h2>
      <br />
      <Button onClick={() => history.push('/welcome')}>runtime history push to /welcome</Button>
    </Block>
  );
}
