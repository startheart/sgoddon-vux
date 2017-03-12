<template>
  <div class="common-page" :class="type">
    <header class="header">
      <h1>{{title}}</h1>
      <i @click="back" class="common-back"></i>
    </header>
    <div class="wrapper">
      <section v-show="desc" class="desc">
        <slot name="desc">{{desc}}</slot>
      </section>
      <main class="content">
        <slot name="content">{{content}}</slot>
      </main>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      type: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    }
  }
</script>

<style lang="less">
  .common-page {
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #efeff4;
    .header {
      position: relative;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background-color: #f7f7f7;
      box-shadow: 0 1px 6px #ccc;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      z-index: 99;
      h1 {
        font-size: 16px;
        font-weight: 700;
      }
      .common-back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 15px;
        font-size: 14px;
        color: rgb(0, 160, 220);
        font-style: normal;

        &:before {
          content: "<";
        }
      }
    }
    .wrapper {
      width: 100%;
      height: calc(100% - 44px);
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      .desc {
        padding: 10px;
        margin: 10px 0;
        line-height: 20px;
        font-size: 14px;
      }
      .content {
        margin: 10px;
      }
    }
  }
</style>

