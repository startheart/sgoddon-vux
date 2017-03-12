import Vue from 'vue'
const debug = process.env.NODE_ENV !== 'production'

const testAPI = debug ? '//test.xxx.niubi.com/testapi' : '//xxx.niubi.com/testapi'

// 添加一些公共参数
function wrapParams (params = {}) {
  let ret = {}

  ret.datatype = 'webapp'

  for (let key of Object.keys(params)) {
    ret[key] = params[key]
  }

  return ret
}

export const testApi = function (params) {
  params = wrapParams(params)
  return Vue.http.get(testAPI, {
    params
  }).then((res) => {
    return res.json()
  })
}
