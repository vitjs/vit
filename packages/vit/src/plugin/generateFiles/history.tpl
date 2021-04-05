import { {{{ creator }}}, History } from '@vitjs/runtime';

const options = {{{ options }}};

if (options.basename) {
  (window as any).routerBase = options.basename;
}

const history: History = {{{ creator }}}(options);

export default history;
