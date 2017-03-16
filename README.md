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
7. 增加vConsole 手机上查看控制台




## 多页面配置
vue2.0版本多页面入口,是由webpack配置来完成的
比如说，我的项目文件结构如下
```
    webpack
      |---build  webpack build 的 各个配置文件
      |---config 不同环境的基础配置
      |---dist   npm run build 生成的output文件
      |---node_modules 引用的npm生态圈的模块
      |---src   项目的根目录
        |---assets 资源\公共js配置文件\公共less头
        |---components组件 各module页面可共用的公共组件 也就是网站级组件
        |---module 各个模块页面 一个模块一个单页 通过配置router也可实现其他页面切换
                   这样分模块的原因是：整个网站的所有页面都可以放到同一个仓库里开发
          |---index    index模块
            |---api  放置各个服务端接口
              |---index.js index接口
            |---components  模块内部的组件 也就是页面级的组件
              |---header   header组件
            |---store vuex的store数据模块 各模块划分请参考vuex使用文档
              |---actions.js
              |---getters.js
              |---index.js
              |---mutation-types.js
              |---mutation.js
              |---state.js
            |---App.vue 模块的主vue 包含模板 逻辑 样式
            |---index.html 模块的入口html
            |---index.js 模块的入口js

          |---module_tpl       tpl模块
            ...
          |---module_tpl_multi       tpl_multi模块
            ...
      |---static   图片等静态资源
      |---test   测试
      |---tpl   为了方便生成components 和模块 下面的可以直接复制过去使用
        |---components_tpl   components的模板栗子
        |---module_tpl   无vue-router的单页模块栗子
        |---module_tpl_multi   包含vue-router的多页模块栗子
      |---.babelrc   babel语法的配置文件
      |---.editorconfig   编辑器的配置文件 -> 规范接入的同学
      |---.eslintignore   配置eslint语法检测忽略的文件
      |---.eslintrc.js   eslint语法检测的配置文件
      |---.gitignore   git提交忽略的文件
      |---package.json   依赖包配置

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
