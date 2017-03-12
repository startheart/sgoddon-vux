import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import A from './packages/a.vue'
import B from './packages/b.vue'

Vue.use(VueRouter)

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
  render (h) {
    return h(App)
  }
}).$mount('#app')

