<template>
    <loading :show="isLoading" position="absolute"></loading>
    <view-box v-ref:view-box class="container">
        <div>
            <group title="个人资料">
                <cell title="头像" is-link @click="handlePicture">
                    <a class="head-img"><img :src="avatar"></a>
                </cell>
                <cell title="昵称" is-link :value="nickname" @click="change(\'nickname\')"></cell>
                <cell title="性别" is-link :value="sex" @click="change(\'gender\')"></cell>
            </group>
            <group>
                <address v-if="statusSuccess && regions.length>3" @on-hide="changeRegion" title="省,市" :value.sync="region_serialize" :list="regions" :placeholder="location"></address>
                <datetime v-if="now > 0" @on-change="changeBirth" :value.sync="birthday" :placeholder="birth" :min-year="1900" :max-year="now" title="生日" format="YYYY-MM-DD" placeholder="请选择日期" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
            </group>
        </div>
        <!--<rename v-if="showList.nickname" @close-box="close" @save-profile="save" :name="nickname" transition="expand"></rename>-->
        <!--<gender v-show="showList.gender" @close-box="close" @save-profile="save" :gender="sex" transition="expand"></gender>-->
        <toast :show.sync="success" :time="700">修改成功</toast>
        <toast :show.sync="fail" :time="1000" type="text">{{ failText }}</toast>
        <loading :show="isPost"></loading>
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
    import Toast from 'vux-components/toast'
    import XHeader from 'vux-components/x-header'
    import XFooter from 'components/x-footer'
    import Group from 'vux-components/group'
    import Cell from 'vux-components/cell'


    import { ButtonTab, ButtonTabItem } from 'vux-components/button-tab'

    export default {
        components: {
            ViewBox, Loading, InfiniteLoading, Toast, XHeader, XFooter,
            Group, Cell,
            ButtonTab, ButtonTabItem
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





