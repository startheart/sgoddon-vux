<template>
    <loading :show="isLoading" position="absolute"></loading>
    <view-box v-ref:view-box class="container">

        <!--顶部-->
        <div class="header_default" slot="header">
            <x-header :left-options="{showBack: true}" class="header_default">
                观看记录
            </x-header>
        </div>

        <!--互动例表-->
        <div style="margin-top: 45px">
            <panel :list="list"></panel>
        </div>

        <x-footer @on-home="onFooterHome" :item="footer"></x-footer>

    </view-box>
    <!--<pre> {{ $data|json }} </pre>-->
</template>

<script>
    import Lib from 'assets/Lib.js'
    import $ from 'webpack-zepto'
    import Loading from 'vux-components/loading'
    import ViewBox from 'vux-components/view-box'
    import XHeader from 'vux-components/x-header'
    import XFooter from 'components/x-footer'

    import Panel from 'vux-components/panel'
    export default {
        components: {
            ViewBox, Loading, XHeader, XFooter,
            Panel
        },
        data() {
            return {
                isLoading: true,
                render_data: [],
                list: []
            }
        },
        init (){
            this.ini = function () {
                this.render_data = window.$render_data
                this.user = this.render_data.user
            }
            this.refresh = function() {
                var slef = this
                slef.ajax(Lib.M.apiurl('history'), {uid:this.user.uid}, function(obj){
                    slef.list = obj.data
                })
            }
        },
        created: function () {
            this.ini();
            this.refresh();
        },
        ready(){
            setTimeout(() => {
                this.isLoading = false;
            }, 100);
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
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/reset.css';
    body {background: #FFF}
</style>





