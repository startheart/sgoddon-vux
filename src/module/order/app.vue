<template>
    <loading :show="isLoading" position="absolute"></loading>
    <view-box v-ref:view-box class="container">

        <!--顶部-->
        <div class="header_default" slot="header">
            <x-header :left-options="{showBack: true}" class="header_default">
                订单
            </x-header>
        </div>

    </view-box>
    <!--<pre> {{ $data|json }} </pre>-->
</template>

<script>
    import Lib from 'assets/Lib.js'
    import $ from 'webpack-zepto'
    import Loading from 'vux-components/loading'
    import ViewBox from 'vux-components/view-box'
    import XHeader from 'vux-components/x-header'

    export default {
        components: { ViewBox, Loading, XHeader },
        data() {
            return {
                isLoading: true,
                render_data: [],
                list: []
            }
        },
        init (){
            this.ini = function () {
                this.loadResult = {step: 10, max_id: 0}
                this.render_data = window.$render_data;
            }
        },
        created: function () {
            var slef = this;
            slef.ini();
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
    .mt0 .weui_cells { margin-top: 0; }
    .score { color: #F18D34; font-size: 1.4rem; }
</style>





