import React from 'react';
import { history } from '@vitjs/vit';

import Button from '@/components/Button';

export default function Hello() {
  return (
    <div
      style={{
        marginTop: 16,
        padding: '16px 24px',
        border: 'red 2px dashed',
      }}
    >
      Hello Page
      <br />
      <Button onClick={() => history.push('/welcome')}>runtime history push to /welcome</Button>
    </div>
  );
}
