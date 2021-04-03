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

## 发布

### [version](https://github.com/lerna/lerna/blob/main/commands/version/README.md)

```shell
lerna version 1.0.1 # explicit
lerna version patch # semver keyword
lerna version       # select from prompt(s)
```

### [publish](https://github.com/lerna/lerna/blob/main/commands/publish/README.md)

```shell
lerna publish              # publish packages that have changed since the last release
lerna publish from-git     # explicitly publish packages tagged in the current commit
lerna publish from-package # explicitly publish packages where the latest version is not present in the registry
```
