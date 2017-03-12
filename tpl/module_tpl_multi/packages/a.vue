<template>
  <common-page
    type="a-class"
    title="a页面title"
    desc="a页面desc">
    <div slot="content">
      <h1>我是a页面的主体内容</h1>
      <group title="cell demo">
        <cell title="Vux" value="Cool" is-link></cell>
      </group>
    </div>
  </common-page>
</template>

<script type="text/ecmascript-6">
  import CommonPage from '../common/common-page.vue'
  import { Group, Cell } from 'vux'

  export default {
    data () {
      return {

      }
    },
    methods: {

    },
    components: {
      CommonPage,
      Group,
      Cell
    }
  }
</script>

<style lang="less" scoped>
  .a-class {
    h1 {
      color: red;
    }
  }
</style>

