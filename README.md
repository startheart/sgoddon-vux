

## Build Setup

``` bash
# 好习惯
# 这样每次 npm i xxx --save 的时候会锁定依赖的版本号，相当于加了 --save-exact 参数。
npm config set save-exact true

#小提示：npm config set 命令将配置写到了 ~/.npmrc 文件，运行 npm config list 查看。

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
## changelog
1. 加入eslint语法检查
2. vuex做状态维护池




## 多页面配置
vue2.0版本多页面入口,是由webpack配置来完成的
比如说，我的项目文件结构如下
```
    webpack
      |---build
      |---src
        |---assets 资源
        |---components组件
        |---module各个模块
          |---index    index模块
            |---index.html
            |---index.js
            |---index.vue
          |---info       info模块
            |---info.html
            |---info.js
            |---info.vue
  ```

