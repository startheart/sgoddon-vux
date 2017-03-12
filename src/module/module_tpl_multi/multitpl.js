import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import App from './App'
import A from './packages/a.vue'
import B from './packages/b.vue'

// TODO 需要使用 vConsole 的同学请打开注释即可
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)

FastClick.attach(document.body)

const routes = [
  {
    path: '/a',
    component: A
  },
  {
    path: '/b',
    component: B
  }
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render (h) {
    return h(App)
  }
}).$mount('#app')

