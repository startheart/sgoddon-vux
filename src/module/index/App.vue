<template>
  <div id="app">
    <header class="tpl-bar">
      <h1>tpl router实现多页面</h1>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
  import * as types from './store/mutation-types'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters(['testApiRequestStatus', 'testApiData'])
    },
    methods: {
      ...mapMutations({
        updateTestApiStatus: types.UPDATE_TESTAPI_REQUEST,
        updateTestApiData: types.UPDATE_TESTAPI_DATA
      }),
      ...mapActions(['getTestData'])
    },
    mounted () {
      this.$nextTick(() => {
        this.getTestData()
      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

</style>

