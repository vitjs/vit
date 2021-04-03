# lerna 使用手册

## [添加包](https://github.com/lerna/lerna/tree/main/commands/create#lernacreate)

```shell
lerna create module
```

## [添加依赖](https://github.com/lerna/lerna/tree/main/commands/add#lernaadd)

```shell
# Install module-1 to module-2
lerna add module-1 --scope module-2 [--dev | --peer]
```

## [删除依赖](https://github.com/lerna/lerna/issues/1886#issuecomment-513936734)

```shell
# Uninstall module-1 from module-2
lerna exec 'yarn remove module-1' --scope module-2
```
