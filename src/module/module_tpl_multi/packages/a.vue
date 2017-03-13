<template>
  <common-page
    type="a-class"
    title="a页面title"
    desc="a页面desc">
    <div slot="content">
      <h1>我是a页面的主体内容 计时器 {{times}} 秒</h1>
      <group title="cell demo">
        <cell title="sgoddon" value="Cool" is-link></cell>
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
        times: 0
      }
    },
    computed: {

    },
    methods: {
      addTimes () {
        return ++this.times
      }
    },
    mounted () {
      setInterval(this.addTimes, 1000)
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

