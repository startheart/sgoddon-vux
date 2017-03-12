<template>
  <view-box ref="viewBox">
      <p v-for="1 in 20">{{i}}</p>
  </view-box>
</template>

<script type="text/ecmascript-6">
  import { ViewBox, Group, Cell } from 'vux'

  export default {
    data () {
      return {

      }
    },
    methods: {

    },
    components: {
      ViewBox,
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
