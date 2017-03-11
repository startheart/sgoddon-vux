<template>
    <loading :show="isLoading" position="absolute" :text="loadingText"></loading>
    <view-box v-ref:view-box class="container">

        <!--顶部-->
        <div class="header_default" slot="header">
            <x-header :left-options="{showBack: true}" class="vux-1px-b">
                <span slot="right" v-if="boxType === 2" @click="boxType=1,list=[]">关闭</span>
                提现
            </x-header>
        </div>

        <div class="cash-box" v-if="boxType === 1">
            <div class="score-display clearfix">
                <h2>历史一共被打赏</h2>
                <countup :end-val="all_cash" :duration="3" :decimals="2" class="indicators"></countup>
                <img src="http://wx-static.drip.im/img/shop/single/score/score-shadow-icon.png" class="shadow">
            </div>
            <group class="mt0">
                <cell :title="'已到账： ¥ '+credit_right">
                    <!--<span slot="value">明细</span>-->
                    <x-button slot="value" mini type="default" @click="boxType=2">明细</x-button>
                </cell>
                <cell :title="'可提现： ¥ '+credit_left">
                    <!--<span slot="value" v-if="credit_left > 0">提现</span>-->
                    <x-button slot="value" mini type="default" :disabled="credit_left < 0.1" @click="confirmIng=true">提现</x-button>
                </cell>
            </group>
        </div>

        <div class="cash-box m-timeline" v-if="boxType === 2">
            <timeline color="#E5E5E5" v-if="list">
                <timeline-item v-for="item in list">
                    <div class="row text-muted">
                        <div class="col">
                            <h4 :class="[$index === 0 ? 'recent' : '']">提现</h4>
                            <p>¥{{item.fee}}</p>
                        </div>
                        <div class="col m-left">
                            <p v-text="item.create_time * 1000 | fromNow"></p>
                            <p class="text-success" v-if="item.status == 2">已到账</p>
                            <p class="text-danger" v-if="item.status == 1">处理中</p>
                        </div>
                    </div>
                </timeline-item>
                <infinite-loading :on-infinite="onInfinite" spinner="waveDots"></infinite-loading>
            </timeline>
        </div>

        <x-footer @on-home="onFooterHome" :item="footer"></x-footer>

    </view-box>

    <!--确认提现-->
    <confirm :show.sync="confirmIng" title="提现申请" @on-confirm="onConfirm" confirm-text="确认" cancel-text="取消">
        <p style="text-align:center;font-size:2rem; color: orange"><span>¥{{credit_left}}</span></p>
        <p style="font-size:12px;margin-top: 10px">提交提现申请后，将在 1-3 个工作日到达到你的微信钱包。</p>
    </confirm>

    <toast :show.sync="toastIng">申请成功</toast>
    <toast :show.sync="toastErrorIng" :text="toastErrorText" type="cancel"></toast>

    <!--<pre> {{ $data|json }} </pre>-->
</template>

<script>
    import Lib from 'assets/Lib.js'
    import $ from 'webpack-zepto'
    import Loading from 'vux-components/loading'
    import InfiniteLoading from 'vue-infinite-loading';
    import ViewBox from 'vux-components/view-box'
    import XHeader from 'vux-components/x-header'
    import XFooter from 'components/x-footer'
    import Countup from 'vux-components/countup'
    import Group from 'vux-components/group'
    import Cell from 'vux-components/cell'
    import Confirm from 'vux-components/confirm'
    import Toast from 'vux-components/toast'
    import XButton from 'vux-components/x-button'

    import { Timeline, TimelineItem } from 'components/timeline'
    import fromNow from 'vux-components/../filters/friendly-time'
    export default {
        filters: {
            fromNow
        },
        components: {
            ViewBox, Loading, XHeader, XFooter, InfiniteLoading,
            Countup, Group, Cell, Confirm, Toast,
            Timeline, TimelineItem, XButton
        },
        data() {
            return {
                isLoading: true,
                loadingText: '加载中…',
                confirmIng: false,
                toastIng: false,
                toastErrorIng: false,
                toastErrorText: '',
                all_cash: 0.00,
                credit_left: 0.00,
                credit_right: 0.00,
                boxType :1,
                initialize: {
                    currentLoaded: false,
                    currentLoading: false
                },
                loadResult:[],
                list: []
            }
        },
        init (){
            this.ini = function () {
                this.loadResult = { step: 10, max_id: 0}
                this.credit = window.$render_data.credit;

                this.all_cash = parseFloat(this.credit.all_cash)
                this.credit_left = this.credit.credit2.value //可提现
                this.credit_right = this.credit.his_cash //可提现
            }
        },
        created: function () {
            this.ini();
        },
        ready(){
            setTimeout(() => {
                this.isLoading = false;
            }, 300);
        },
        methods: {
            getUrl (url) {
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
                slef.ajax(Lib.M.apiurl('my_cash'), slef.loadResult, function(obj) {
                    slef.initialize.currentLoading = false
                    if (obj.err_code != 0) {
                        return console.log(obj.err_msg);
                    }
                    var data = obj.data;
                    var data_num = data.length;

                    if( data_num > 0 ){
                        slef.list = slef.list.concat(data);
                    }

                    // 当输出条数 小于 每次输出次数则不再加载
                    if (data_num < slef.loadResult.step || !data_num) {
                        slef.currentLoaded = true
                        slef.$broadcast('$InfiniteLoading:complete')
                    }
                    else{
                        slef.currentLoading = false;
                        slef.$broadcast('$InfiniteLoading:loaded');
                    }
                })
            },
            // 提现申请
            onConfirm (){
                var slef = this
                slef.isLoading = true
                slef.loadingText = '申请中'
                slef.ajax(Lib.M.apiurl('my_cash'), {tixian:1}, function(obj) {
                    slef.isLoading = false
                    slef.loadingText = '加载中'
                    if( obj.err_code === 0 ){
                        slef.toastIng = true
                        slef.credit_left = '0.00'
                        slef.boxType = 2
                    }
                    else{
                        slef.toastErrorIng = true
                        slef.toastErrorText = obj.err_msg
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/reset.css';
    @import '~vux/src/styles/1px.less';
    body {background-color: #FFF;}
    .container .weui_tab_bd { padding-top: 46px; }
    .container .weui_tab_bd { padding-bottom:0px;}

    .score-display {
        margin: 2.5rem 0;
        text-align: center;
        h2 {
            color: #333;
            font-size: 1rem;
            font-weight: normal;
        }
        .indicators {
            color: #04BE02;
            font-size: 5rem;
            font-style: normal;
            display: inline-block;
            vertical-align: text-top;
            line-height: 1;
        }
        .shadow {
            margin: 1rem auto 0;
            display: block;
            height: 1.4rem;
            display: block;
        }
        .indicators {color: #FFA500}
    }

    .m-timeline {
        h4{color: #333;}
        p { font-size:14px; }
        .m-left {text-align: right}
    }
</style>





