import * as types from './mutation-types'
import {testApi} from '../api/index'
import {REQUEST_SUCCESS, REQUEST_PENDING, REQUEST_FAIL} from 'assets/js/env-global'

const ERR_OK = '0'

export const getTestData = function ({commit, state, rootState}) {
  commit(types.UPDATE_TESTAPI_REQUEST, REQUEST_PENDING)

  return new Promise((resolve, reject) => {
    return testApi({
      a: 1,
      b: 2
    }).then((res) => {
      if (res.errno === ERR_OK) {
        commit(types.UPDATE_TESTAPI_REQUEST, REQUEST_SUCCESS)
        commit(types.UPDATE_TESTAPI_DATA, res.data)
        return res.data
      } else {
        commit(types.UPDATE_TESTAPI_REQUEST, REQUEST_FAIL)
        return Promise.reject(res)
      }
    }).catch((res) => {
      res.type = 'fail'
      commit(types.UPDATE_TESTAPI_REQUEST, REQUEST_FAIL)
      commit(types.UPDATE_TESTAPI_DATA, res)
      return Promise.reject(res)
    })
  })
}
