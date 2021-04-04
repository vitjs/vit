import { {{{ creator }}}, History } from '@vitjs/runtime';

const options = {{{ options }}};

if (options.basename) {
  (<any> window).routerBase = options.basename;
}

const history: History = {{{ creator }}}(options);

export default history;
