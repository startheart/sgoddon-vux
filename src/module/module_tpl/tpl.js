import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  render (h) {
    return h(App)
  }
}).$mount('#app')

