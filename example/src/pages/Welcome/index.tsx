import { useState } from 'react';

import Block from '@/components/Block';
import Button from '@/components/Button';

import { history } from '@vitjs/runtime';

export default function Welcome() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const hello = () => {
    setData(undefined);
    setError(undefined);
    setLoading(true);
    fetch('/api/hello?name=@vitjs/vit', {
      method: 'get',
    })
      .then((response) => {
        response
          .clone()
          .text()
          .then((text) => console.log('hello text:\n', text));
        return response.json();
      })
      .then((json) => {
        console.log('data', json);
        setData(json);
      })
      .catch((err) => {
        console.log('error', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const helloPost = () => {
    setData(undefined);
    setError(undefined);
    setLoading(true);
    fetch('/api/hello', {
      method: 'post',
      body: JSON.stringify({
        hello: 'world',
      }),
    })
      .then((response) => {
        response
          .clone()
          .text()
          .then((text) => console.log('hello text:\n', text));
        return response.json();
      })
      .then((json) => {
        console.log('data', json);
        setData(json);
      })
      .catch((err) => {
        console.log('error', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const version = () => {
    setData(undefined);
    setError(undefined);
    setLoading(true);
    fetch('/api/version', {
      method: 'get',
    })
      .then((response) => {
        response
          .clone()
          .text()
          .then((text) => console.log('version text:\n', text));
        return response.json();
      })
      .then((json) => {
        console.log('data', json);
        setData(json);
      })
      .catch((err) => {
        console.log('error', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Block>
      <h2>Welcome Page</h2>
      <br />
      <Button onClick={() => history.push('/user/login')}>runtime history push to /user/login</Button>
      <br />
      <br />
      <Button onClick={hello}>mock: hello</Button>
      <Button onClick={helloPost}>mock: hello post</Button>
      <Button onClick={version}>mock: version</Button>
      <div style={{ width: '100%', minHeight: 100 }}>
        {loading && <div>{'loading...'}</div>}
        {data && <div style={{ whiteSpace: 'pre' }}>{JSON.stringify(data, null, 2)}</div>}
        {error && <div>Something went wrong...</div>}
      </div>
    </Block>
  );
}
