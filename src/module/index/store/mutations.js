import * as types from './mutation-types'

const mutations = {
  [types.UPDATE_TESTAPI_REQUEST] (state, testApiRequestStatus) {
    state.testApiRequestStatus = testApiRequestStatus
  },
  [types.UPDATE_TESTAPI_DATA] (state, testApiData) {
    state.testApiData = testApiData
  }
}

export default mutations
