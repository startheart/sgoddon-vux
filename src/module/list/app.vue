<template>
    <loading :show="isLoading" text="加载中…"></loading>
    <view-box v-ref:view-box class="container">
        <div style="margin: 10px;overflow: hidden;" v-for="item in list">
            <a :href="getUrl('live',{id:item.id})">
                <masker style="border-radius: 2px;">
                    <div class="m-img" :style="{backgroundImage: 'url(' + item.cover + ')'}"></div>
                    <div slot="content" class="m-title">
                        {{item.title}}
                        <br/>
                        <span class="m-time">{{item.starttime * 1000 | fromNow}}</span>
                    </div>
                </masker>
            </a>
        </div>
        <tabbar class="vux-demo-tabbar" icon-class="vux-center" slot="bottom">
            <tabbar-item>
                <img slot="icon" src="./img/直播.png">
                <span slot="label">直播列表</span>
            </tabbar-item>
            <tabbar-item :link="getUrl('ucenter')">
                <img slot="icon" src="./img/个人.png">
                <span slot="label">个人中心</span>
            </tabbar-item>
        </tabbar>
        <x-footer></x-footer>
    </view-box>
    <!--<pre> {{ $data|json }} </pre>-->
</template>

<script>
    import Lib from 'assets/Lib.js'
    import $ from 'webpack-zepto';
    import {getUrl} from 'vux/src/libs/router'

    import Loading from 'vux-components/loading'
    import Masker from 'vux-components/masker'
    import ViewBox from 'vux-components/view-box'
    import {Tabbar, TabbarItem} from 'vux-components/tabbar'
    import fromNow from 'vux-components/../filters/friendly-time'

    import XFooter from 'components/x-footer'

    export default {
        filters: {
            fromNow
        },
        components: {
            Loading,
            ViewBox,
            Masker,
            XFooter,
            Tabbar, TabbarItem
        },
        data() {
            return {
                isLoading: true,
                render_data: [],
                list: []
            }
        },
        init: function () {
            var self = this;
            this.ini = function () {
                self.render_data = window.$render_data
                this.shareData = {
                    title: self.render_data.base.gzh_name,
                    desc: self.render_data.base.gzh_desc,
                    link: window.location.href
                }
            }
            this.refresh = function () {
                $.getJSON(Lib.M.apiurl('livelist') + '&callback=?', function (result) {
                    self.list = result.data
                })
            }
        },
        created: function () {
            this.ini();
            this.refresh();
            Lib.wxShare(this.shareData)
        },
        ready(){
            var slef = this;
            setTimeout(() => {
                slef.isLoading = false;
            }, 300);
        },
        methods: {
            getUrl (doo, query) {
                var url = Lib.M.murl(doo, query);
                return getUrl(url, this.$router)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/reset.css';
    @import '~vux/src/styles/center';
    .m-img {
        padding-bottom: 47%;
        display: block;
        position: relative;
        max-width: 100%;
        background-size: cover;
        background-position: center center;
        cursor: pointer;
        border-radius: 2px;
    }
    .m-title {
        color: #FFF;
        text-align: center;
        text-shadow: 0 0 0.2rem rgba(0, 0, 0, .5);
        font-weight: 500;
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        text-align: center;
        top: 50%;
        transform: translateY(-50%);
    }
    .m-time {
        font-size: 0.7rem;
        padding-top: 0.4rem;
        padding-left: 3.5rem;
        padding-right: 3.5rem;
        border-top: 1px solid #F0F0F0;
        display: inline-block;
        margin-top: 0.5rem;
    }
</style>
