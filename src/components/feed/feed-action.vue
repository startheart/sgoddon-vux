<template>
    <div class="feed-action row">
        <a class="feed-action-btn col" @click="onDashang" v-if="isDashang">
            <i class="iconfont icon-dashang">&#xe619;</i>&nbsp;赏
        </a>
        <div class="vux-1px-r" v-if="isDashang"></div>
        <a class="feed-action-btn col" @click="onComment">
            <i class="iconfont">&#xe610;</i>&nbsp;{{ item.reply_num > 0 ? item.reply_num : '评论' }}
        </a>
        <div class="vux-1px-r"></div>
        <a class="feed-action-btn col" @click="unLike(item, $index)" v-if="islike" style="color: #e81c4f">
            <i class="iconfont">&#xe628;</i>&nbsp;{{ item.like_num > 0 ? item.like_num : '赞' }}
        </a>
        <a class="feed-action-btn col" @click="onLike(item, $index)" v-else>
            <i class="iconfont">&#xe638;</i>&nbsp;{{ item.like_num > 0 ? item.like_num : '赞' }}
        </a>
    </div>
</template>
<style lang="less">
    @import '~vux/src/styles/1px.less';
    .vux-1px-r { width: 1px;margin: 0.25rem 0 }
    .icon-dashang {color: #F0B900}
    .feed-action {
        color: #a4a4a4;
        &.border { border-top: 1px solid #eee; }
        &.time-ago {
            line-height: 40px;
            font-size: .9rem;
            overflow: hidden;
            white-space: nowrap;
            span {
                font-size: 12px;
                vertical-align: top
            }
        }
    }
    .feed-action-btn {
        text-decoration: none;
        font-size: 0.9rem;
        color: #a4a4a4;
        padding: 0 6px;
        cursor: pointer;
        border: none;
        background: none;
        outline: none;
        vertical-align: middle;
        text-align: center;
    }
</style>
<script>
    export default{
        data () {
            return {
                isDashang: this.$parent.dashang
            }
        },
        props: {
            item: {
                type: Object,
                "default": []
            },
            islike: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onDashang () {
                this.$emit('on-dashang')
            },
            onComment () {
                this.$emit('on-comment')
            },
            onLike () {
                console.log('on like' + this.islike);
                this.$emit('on-like')
            },
            unLike (){
                console.log('on unlike' + this.islike);
                this.$emit('on-unlike')
            }
        }
    }
</script>
