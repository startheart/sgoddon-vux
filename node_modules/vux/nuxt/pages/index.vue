<template>
  <div>
    <h1>hello {{name}}</h1>
    <group>
      <cell title="title" value="value"></cell>
    </group>
    <alert v-model="show">hello</alert>
  </div>
</template>

<script>
// import { Group, Cell } from 'vux'

import Group from 'vux/src/components/group/'
import Cell from 'vux/src/components/cell/'
import Alert from 'vux/src/components/alert/'

export default {
  components: {
    Group,
    Cell,
    Alert
  },
  data: () => {
    return {
      name: 'world',
      show: true
    }
  }
}
</script>