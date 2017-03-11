<template>
    <loading :show="isLoading" position="absolute"></loading>
    <view-box v-ref:view-box class="container">

        <!--顶部-->
        <div class="header_default" slot="header">
            <x-header :left-options="{showBack: true}" class="vux-1px-b">
                赞
            </x-header>
        </div>

        <div class="likes-box">
            <div class="no-likes vux-center" v-if="!list">
                <slot name="no-text">还没有人点赞，赶紧点个赞吧！</slot>
            </div>
            <div class="like-list">
                <div class="like-list__item vux-1px-b" v-for="like in list">
                    <a class="like-item row">
                        <img class="item-avatar" alt="头像" :src="like.avatar">
                        <div class="col">
                            <p>{{like.nickname}}</p>
                            <p style="font-size:14px;">
                                <template v-if="like.content_pic">[图片]</template>
                                <template v-if="like.content_video">[视频]</template>
                                <template v-if="like.content_text">{{like.content_text}}</template>
                            </p>
                        </div>
                        <div class="like-icon">
                            <i class="iconfont">&#xe628;</i>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <infinite-loading :on-infinite="onInfinite"></infinite-loading>

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
                loadResult: [],
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
            this.ini();
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
                slef.ajax(Lib.M.apiurl('likes', {op:'detail'}), slef.loadResult, function(obj) {
                    slef.initialize.currentLoading = false
                    if (obj.err_code != 0) {
                        return console.log(obj.err_msg);
                    }
                    var data = obj.data;
                    var data_num = data.length;

                    if( data_num > 0 ){
                        for (var i = 0; i < data_num; i++) {
                            slef.loadResult.max_id = data[i].id;
                        }
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
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/reset.css';
    @import '~vux/src/styles/1px.less';
    body {background-color: #FFF; }
    .container .weui_tab_bd { padding-top: 46px;  padding-bottom: 0; }
    .like-item {
        line-height:24px;
        padding:5px 0;
        color:#777;
        position: relative;
        img.item-avatar {
            width:48px;
            height:48px;
            padding:6px;
            border-radius:50%;
            margin-right:7px;
            margin-left:9px;
        }
        .like-icon {
            position: absolute;
            top: 15px;
            right: 15px;
            color: #e81c4f;
        }
    }
</style>





