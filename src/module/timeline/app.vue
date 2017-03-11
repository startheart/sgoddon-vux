<template>
    <loading :show="isLoading" position="absolute"></loading>
    <view-box v-ref:view-box class="container">

        <!--顶部-->
        <div class="header_default" slot="header">
            <x-header :left-options="{showBack: true}" class="header_default">
                互动
            </x-header>
        </div>

        <!--互动例表-->
        <div class="timeline-box">
            <panel :list="list"></panel>
        </div>

        <infinite-loading :on-infinite="onInfinite" spinner="waveDots"></infinite-loading>

        <x-footer></x-footer>

    </view-box>
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

    import Panel from 'vux-components/panel'
    export default {
        components: {
            ViewBox, Loading, InfiniteLoading, XHeader, XFooter,
            Panel
        },
        data() {
            return {
                isLoading: true,
                initialize: {
                    currentLoaded: false,
                    currentLoading: false
                },
                loadResult: [],
                render_data: [],
                list: []
            }
        },
        init (){
            this.ini = function () {
                this.loadResult = {
                    step: 10,
                    max_id: 0
                }
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
            },
            // 自动加载
            onInfinite() {
                var slef = this;
                if (slef.initialize.currentLoading || slef.initialize.currentLoaded) {
                    return false
                }
                slef.initialize.currentLoading = true;
                slef.ajax(Lib.M.apiurl('timeline'), slef.loadResult, function(obj) {
                    slef.initialize.currentLoading = false
                    if (obj.err_code != 0) {
                        return console.log(obj.err_msg);
                    }
                    var data = obj.data;
                    var data_num = data.length;

                    if( data_num > 0 ){
                        var temp = [];
                        for (var i = 0; i < data_num; i++) {
                            if ( data[i].topic ){
                                var desc = '@'+data[i].topic.nickname+': '
                                if ( data[i].topic.content_pic ){
                                    desc += '[图片]'
                                }
                                if ( data[i].topic.content_video ){
                                    desc += '[视频]'
                                }
                                if ( data[i].topic.content_text ){
                                    desc += data[i].topic.content_text
                                }
                                var row = {
                                    src: data[i].topic.avatar,
                                    title: data[i].content_text,
                                    desc: desc
                                }
                            }
                            else {
                                var title = ''
                                if( data[i].content_pic ){
                                    title += '[图片]'
                                }
                                if( data[i].content_video ){
                                    title += '[视频]'
                                }
                                if( data[i].content_text ){
                                    title += data[i].content_text
                                }
                                var row = {
                                    src: data[i].live.cover,
                                    title: title,
                                    desc: data[i].live.title
                                }
                            }
                            temp.push(row);
                            slef.loadResult.max_id = data[i].id;
                        }
                        slef.list = slef.list.concat(temp);
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
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/reset.css';
    body {background: #FFF}
    .weui_tab_bd { padding-top: 46px; }
    .recent {
        color: rgb(4, 190, 2)
    }
</style>





