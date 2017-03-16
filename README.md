# sgoddon-vux

> 基于vux的多页网站demo

## 技术栈
- MVVM框架： Vue 2.0
- 源码：es6
- 代码风格检查：eslint
- 构建工具：webpack2.0
- 前端路由：vue-router
- 状态管理：vuex
- 服务端通讯：vue-resource

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

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## changelog
1. 加入eslint语法检查
2. vuex 做状态维护池bus http://vuex.vuejs.org/
3. vue-resource api请求中间件
4. vux UI组件库升级到2.x
5. vue 升级到2.0
6. webpack 升级到2.0




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

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
