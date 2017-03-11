<template>
    <!-- 打赏 -->
    <dialog :show.sync="show" :scroll="false" class="dashang_redbag">
        <div class="redbag">
            <div class="redbag__headpic" v-if="item.re_avatar"><img :src="item.re_avatar"></div>
            <div class="redbag__towho">{{ item.re_nickname }}</div>
            <div class="redbag__towhy">爱赞赏的人，运气不会太差～</div>
            <div class="redbag__list">
                <div class="redbag__area">
                    <ul class="clearfix">
                        <li v-for="money in moneys" @click="reward(money)">
                            <a class="redbag__item" href="javascript:;">{{money}} 元</a>
                        </li>
                        <li>
                            <span class="redbag__item othermoney">
                                <input type="text" v-model="othermoney" type="number" pattern="[0-9]*" placeholder="任意赏" @focus="handleFocus">
                            </span>
                        </li>
                    </ul>
                    <x-button type="warn" v-if="othermoneyIng" class="othermoney__btn" @click="reward(othermoney)">打赏</x-button>
                </div>
            </div>
        </div>
        <!--关闭-->
        <div class="redbag_cancel" @click="noCancelredbag">
            <icon type="cancel" class="icon-white"></icon>
        </div>
    </dialog>
</template>
<style lang="less">
    .dashang_redbag { z-index: 999; }
    .redbag_cancel {
        display: block;
        height: 1.5rem;
        width: 1.5rem;
        position: absolute;
        top: 0.25rem;
        right: 0.5rem;
        .icon-white {
             color: #FFF;
             &:before {
                 color: #FFF;
             }
        }
        .iconfont {font-size: 1.2rem; color: #FFF;}
    }
    .redbag {
        width: 100%; background: url(./imgs/redbag.png) top center no-repeat;
        background-size: 100% 5rem;
        padding-top: 7rem;
    }
    .redbag__headpic {
        width: 4rem; height: 4rem;
        border-radius: 4rem;
        border: solid 0.25rem #ececec;
        position: absolute; left: 50%; top: 2.5rem;
        margin-left: -2rem; overflow: hidden;
        img { width: 100%; height: 100%;font-size: 0 }
    }
    .redbag__towho { color: #333; text-align: center; margin-bottom: 0.5rem; }
    .redbag__towhy { color: #999; font-size: 0.7rem; text-align: center; }
    .redbag__list { padding: 1rem 0; width: 100%; text-align: center; }
    .redbag__area {
        overflow: hidden; margin:0 1.5rem;
        ul {margin-left:-0.25rem; margin-right: -0.25rem }
        li {
            position: relative;
            float: left;
            width: 33.33333333%;
            padding: 0 0.25rem 0.5rem;
            box-sizing: border-box;
        }
    }
    .redbag__item {
        border: 2px solid #d74751;
        border-radius: 0.5rem;
        padding: 0.75rem 0;
        display: block; color: #d74751;
        &:hover { background-color: #d74751; color: #fff; }
        &.othermoney {
            border: 2px solid #9B9B9B;
            input {width: 100%;border:none;background-color: #FAFAFC;text-align: center; color: #9B9B9B}
            &:hover { background: none; }
        }
    }
    .othermoney__btn {
        margin-top: 0.5rem;
        background-color: #d74751;
    }
</style>
<script>
    import Dialog from 'vux-components/dialog'
    import XButton from 'vux-components/x-button'
    import Icon from 'vux-components/icon'

    export default{
        components: {
            Icon, Dialog, XButton
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            item: Object
        },
        data(){
            return{
                money: '',
                moneys: [1, 5, 10, 30, 50],
                othermoney: '',
                othermoneyIng: false
            }
        },
        methods: {
            // 取消打赏
            noCancelredbag(){
                this.show = false
                this.money = ''
                this.$emit('on-cancel-redbag')
            },
            // 任意赏
            handleFocus(){
                this.othermoneyIng = true;
            },
            reward(money){
                this.$emit('on-reward', money)
            }
        }
    }
</script>
