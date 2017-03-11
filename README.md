

## Build Setup

``` bash
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

