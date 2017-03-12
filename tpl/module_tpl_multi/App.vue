<template>
  <div id="app">
    <header class="tpl-bar">
      <h1>tpl router实现多页面</h1>
    </header>
    <section class="tpl-content">
      <ul class="tpl-list">
        <li class="tpl-item" v-for="component in components">
          <router-link class="link" :to="component.path">{{component.text}}<i
              class="tpl-click"></i>
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
    data () {
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
    mounted () {

    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  .tpl-bar {
    position: fixed;
    z-index: 10;
    right: 0;
    left: 0;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #f7f7f7;
    box-shadow: 0 1px 6px #ccc;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    h1 {
      font-size: 18px;
      font-weight: 500;
    }
  }
    
  .tpl-content {
    position: fixed;
    width: 100%;
    top: 44px;
    left: 0;
    bottom: 0;
    .tpl-list {
      padding-left: 10px;
      .tpl-item {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        .link {
          display: block;
          position: relative;
          width: 100%;
          color: #333;
          text-decoration: none;
          outline: 0;
          .tpl-click {
            position: absolute;
            right: 0;
            padding: 0 5px;
            font-size: 30px;
            color: #ccc;

            &:before {
              content: ">";
            }
          }
        }
      }
    }
  }

  .tpl-view {
    transition: all 0.3s;
    transform: translate3d(0, 0, 0);
    &.move-enter-active, &.move-leave-active {
      transform: translate3d(100%, 0, 0);
    }
  }
</style>

