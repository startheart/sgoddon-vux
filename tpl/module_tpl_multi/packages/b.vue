<template>
  <common-page
    type="b-class"
    title="b页面title"
    desc="b页面desc">
    <div slot="content">
      <h1>我是b页面的主体内容</h1>
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

<style lang="less" scoped>
  .b-class {
    h1 {
      color: green;
    }
  }
</style>

