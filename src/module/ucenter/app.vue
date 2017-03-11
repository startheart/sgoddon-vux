<template>
    <loading :show="loadingIng.show" :text="loadingIng.text"></loading>

    <view-box v-ref:view-box class="container">

        <div class="mine_header">
            <div class="mine_header_img">
                <img :src="user.avatar">
                <i class="mine_edit icon_write"></i>
            </div>
            <h5 class="mine_header_name">{{user.nickname}}</h5>
        </div>

        <group class="no-margin">
            <cell title="打赏" :link="getUrl('dashang')">
                <span slot="icon"><i class="iconfont icon-dashang">&#xe619;</i></span>
                <span slot="value">¥{{user.credit2.value}}</span>
            </cell>
            <cell title="互动" :link="getUrl('timeline')">
                <span slot="icon"><i class="iconfont icon-timeline">&#xe610;</i></span>
            </cell>
            <cell title="我的赞" :link="getUrl('likes')">
                <span slot="icon"><i class="iconfont icon-likes">&#xe638;</i></span>
            </cell>
        </group>

        <group class="no-margin">
            <cell title="最近观看记录" :link="getUrl('history')">
                <span slot="icon"><i class="iconfont icon-history">&#xe61a;</i></span>
            </cell>
            <cell title="更多直播" :link="getUrl('list')">
                <span slot="icon"><i class="iconfont icon-list">&#xe614;</i></span>
            </cell>
        </group>

        <x-footer @on-home="onFooterHome" :item="footer"></x-footer>

    </view-box>
    <!--<pre> {{ $data|json }} </pre>-->
</template>

<script>
    import Lib from 'assets/Lib.js'
    import {getUrl} from 'vux/src/libs/router'

    import Loading from 'vux-components/loading'
    import ViewBox from 'vux-components/view-box'
    import Group from 'vux-components/group'
    import Cell from 'vux-components/cell'

    import XFooter from 'components/x-footer'
    export default {
        components: {
            Loading,
            ViewBox,
            Group,
            Cell,
            XFooter
        },
        data() {
            return {
                loadingIng: {
                    show: true,
                    text: '加载中…'
                }
            }
        },
        init(){
            this.wxShare = function () {
                Lib.wxShare()
            }
            this.user = window.$render_data.user
        },
        created: function () {
            this.wxShare()
        },
        ready(){
            setTimeout(() => {
                this.loadingIng.show = false;
            }, 300);
        },
        methods: {
            getUrl (op, par) {
                var url = Lib.M.murl(op, par);
                return getUrl(url, this.$router)
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/reset.css';
    @import '~vux/src/styles/1px.less';
    .mine_header{
        width:100%;height:10rem;background-color:#1cb5ff;text-align:center;position:relative;overflow:hidden
    }
    .mine_header_img {
        position:relative;width:3.5rem;height:3.5rem;border-radius:3.5rem;padding:.25rem;margin:0 auto;margin-top:1.8rem;background-color:rgba(255,255,255,.2);
        img {
            width:100%;height:100%;border-radius:6rem
        }
    }
    .mine_header_name{
        color:#fff;width:100%;margin-top:0.8rem;font-size:1rem;font-weight:500
    }
    .weui_cell_ft span { font-size:0.8rem;}
    .iconfont { margin-right: 0.5rem; }
    .icon-dashang { color: orange}
    .icon-timeline { color: orangered}
    .icon-likes { color: dodgerblue}
    .icon-list { color: red}
    .icon-history { color: #9B9B9B}
    /*.iconfont { color: #000}*/
</style>





