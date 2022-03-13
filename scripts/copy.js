const fs = require('fs-extra');
const glob = require('globby');

function toDest(file) {
  return file.replace(/^src\//, 'dist/');
}

// 拷贝诸如 .tpl / .js 文件到编译目录中
glob.sync('src/**/(*.tpl|*.js)').forEach((file) => {
  fs.copy(file, toDest(file), {
    overwrite: true,
  });
});
