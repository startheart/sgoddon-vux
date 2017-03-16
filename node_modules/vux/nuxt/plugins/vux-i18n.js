import Vue from 'vue'

Vue.use({
  install (Vue) {
    Vue.prototype.$t = function (key) {
      return key
    }
  }
})