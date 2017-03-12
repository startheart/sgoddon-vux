<template>
  <div id="app">
    <header class="tpl-bar">
      <h1>tpl 单页面</h1>
      <p>{{msg}}</p>
    </header>
    <group title="cell demo">
      <cell title="Vux" value="Cool" is-link></cell>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Group, Cell } from 'vux'

  export default {
    data () {
      return {
        msg: 'tpl栗子'
      }
    },
    mounted () {

    },
    components: {
      Group,
      Cell
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  #app {
    text-align: center;
  }
</style>

