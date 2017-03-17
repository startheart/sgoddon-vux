import Vue from 'vue'
const debug = process.env.NODE_ENV !== 'production'

const testAPI = debug ? '/mvc/blog/CategoriesTags.aspx' : '//www.cnblogs.com/mvc/blog/CategoriesTags.aspx?'

const errHandler = () => {
  return Promise.reject({
    $status: 'fail'
  })
}

// 添加一些公共参数
function wrapParams (params = {}) {
  let ret = {}

  // ret.datatype = 'webapp'

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
  }).catch(err => errHandler(err))
}
