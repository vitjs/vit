import { history } from '@vitjs/runtime';

import Block from '@/components/Block';
import Button from '@/components/Button';

export default function Hello() {
  return (
    <Block>
      <h2>Account Page</h2> <br />
      <Button onClick={() => history.push('/user/login')}>runtime history push to /user/login</Button>
    </Block>
  );
}
