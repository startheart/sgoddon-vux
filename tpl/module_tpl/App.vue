<template>
  <div id="app">
    <header class="tpl-bar">
      <h1>tpl router实现多页面</h1>
    </header>
    <section class="tpl-content" ref="mfct">
      <ul class="tpl-list">
        <li class="tpl-item" v-for="component in components">
          <router-link class="link" :to="component.path">{{component.text}}<i
              class="mfic-click"></i>
          </router-link>
        </li>
      </ul>
    </section>
    <transition name="move">
      <router-view class="tpl-view"></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        components: [
          {
            path: '/a',
            text: 'A页面'
          },
          {
            path: '/b',
            text: 'B页面'
          }
        ]
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>

