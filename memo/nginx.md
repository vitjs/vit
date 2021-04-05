# nginx 调试

## 配置

```
# /etc/nginx/sites-enabled/github-pages
server {
  location /vit-example {
    alias /path/to/output/directory;
    index index.html;
  }
}
```

## 常用命令

```
# 校验 nginx 配置
nginx -t

# 查看 nginx 状态
sudo service nginx status

sudo service nginx start
sudo service nginx stop
sudo service nginx restart
```
