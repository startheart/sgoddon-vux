<template>
  <common-page
    type="a-class"
    title="a页面title"
    desc="a页面desc">
    <div slot="content">
      <h1>我是a页面的主体内容</h1>
    </div>
  </common-page>
</template>

<script type="text/ecmascript-6">
  import CommonPage from '../common/common-page.vue'

  export default {
    data () {
      return {

      }
    },
    methods: {

    },
    components: {
      CommonPage
    }
  }
</script>

<style lang="less">
  .a-class {
    h1 {
      color: red;
    }
  }
</style>

