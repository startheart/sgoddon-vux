<template>
  <div class="hello">
    <h1>tpl --- {{ msg }}</h1>
  </div>
</template>

<script>
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>

