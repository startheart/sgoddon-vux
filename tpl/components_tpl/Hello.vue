<template>
  <div class="hello">
    <h1>tpl --- {{ msg }}</h1>
    <group title="cell demo">
      <cell title="Vux" value="Cool" is-link></cell>
    </group>
  </div>
</template>

<script>

import { Group, Cell } from 'vux'

const COMPONENT_NAME = 'hello'

export default {
  name: COMPONENT_NAME,
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props: {
    
  },
  compued: {
    
  },
  methods: {

  },
  created() {

  },
  components: {
    Group,
    Cell
  }
}
</script>

<style lang="less" scoped>

</style>
