const fs = require('fs-extra');
const glob = require('globby');

function toDest(file) {
  // 当前仅支持 @vitjs/vit
  return file.replace(/^src\//, './');
}

glob.sync('src/**/!(*.ts|*.tsx|tsconfig.json)').forEach((file) => {
  fs.copy(file, toDest(file), {
    overwrite: true,
  });
});


