<template>
    <loading :show="isLoading" position="absolute"></loading>
    <view-box v-ref:view-box class="container">

        <!--顶部-->
        <div class="header_default vux-1px-b" slot="header">
            <x-header :left-options="{showBack: true}" @click="onClickMore" class="vux-1px-b">
                <a slot="right" :href="getUrl('tixian')">提现</a>
                打赏
            </x-header>
        </div>

        <div class="timeline-box">
            <!--打赏记录-->
            <div class="list-item vux-1px-b" v-for="item in list" v-if="loadResult.type == 1">
                <a class="row">
                    <img class="list-item__avatar" alt="头像" :src="item.from_user.avatar">
                    <p class="col">{{ item.from_user.nickname }} 打赏 <span>¥ {{ item.fee }}</span></p>
                    <p class="time">{{ item.paytime }}</p>
                </a>
            </div>
        </div>

        <infinite-loading :on-infinite="onInfinite" spinner="waveDots"></infinite-loading>

        <x-footer @on-home="onFooterHome" :item="footer"></x-footer>

    </view-box>
    <!--<pre> {{ $data|json }} </pre>-->
</template>

<script>
    import Lib from 'assets/Lib.js'
    import $ from 'webpack-zepto'
    import {getUrl} from 'vux/src/libs/router'
    import Loading from 'vux-components/loading'
    import InfiniteLoading from 'vue-infinite-loading';
    import ViewBox from 'vux-components/view-box'
    import XHeader from 'vux-components/x-header'
    import XFooter from 'components/x-footer'

    export default {
        components: {
            ViewBox, Loading, InfiniteLoading, XHeader, XFooter
        },
        data() {
            return {
                isLoading: true,
                initialize: {
                    currentLoaded: false,
                    currentLoading: false
                },
                render_data: [],
                list: []
            }
        },
        init (){
            this.ini = function () {
                this.loadResult = {
                    step: 10,
                    max_id: 0,
                    type: 1
                }
                this.render_data = window.$render_data;
            }
        },
        created: function () {
            this.ini()
        },
        ready(){
            setTimeout(() => {
                this.isLoading = false;
            }, 100);
        },
        methods: {
            getUrl (op, par) {
                var url = Lib.M.murl(op, par);
                return getUrl(url, this.$router)
            },
            ajax: function (url, param, success) {
                param.ajax = 1
                $.ajax({
                    type: 'get',
                    url: url,
                    dataType: 'jsonp',
                    jsonp: "callback",
                    data: param,
                    success: success
                });
            },
            // 自动加载
            onInfinite() {

                var slef = this;
                if (slef.initialize.currentLoading || slef.initialize.currentLoaded) {
                    return false
                }
                slef.initialize.currentLoading = true;
                slef.ajax(Lib.M.apiurl('dashang_detail'), slef.loadResult, function(obj) {
                    slef.initialize.currentLoading = false
                    if (obj.err_code != 0) {
                        return console.log(obj.err_msg)
                    }
                    var data = obj.data
                    var data_num = data.length
                    console.log(data_num)
                    if( data_num > 0 ){
                        slef.list = slef.list.concat(data);
                    }
                    // 当输出条数 小于 每次输出次数则不再加载
                    if ( data_num < slef.loadResult.step || !data_num ) {
                        slef.currentLoaded = true
                        slef.$broadcast('$InfiniteLoading:complete')
                    }
                    else{
                        slef.currentLoading = false;
                        slef.$broadcast('$InfiniteLoading:loaded');
                    }
                })

            },
            // 明细
            onClickMore (){
                if( this.loadResult.type == 1 ){
                    console.log('明细')
                    this.loadResult.type = 2
                    this.currentLoading = false;
                    this.$broadcast('$InfiniteLoading:loaded');
                    this.onInfinite()
                }
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/reset.css';
    @import '~vux/src/styles/1px.less';

    .container .weui_tab_bd { padding-top: 46px; }
    .weui_tab_bd { padding-bottom:0px;}
    .timeline-box {  background-color: #FFF}
    .list-item {
        line-height:46px;
        padding:0 15px;
        color:#777;
        img.list-item__avatar {
            width:46px;
            height:46px;
            padding:6px;
            border-radius:50%;
        }
        p { font-size:0.75rem;}
        p.col>span { color: #FFA500}
    }
</style>
