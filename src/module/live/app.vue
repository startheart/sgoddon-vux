<template>
    <loading :show="loadingIng.show" :text="loadingIng.text"></loading>
    <view-box v-ref:view-box class="container">

        <!--顶部广告-->
        <a :href="topadr.downurl" class="download" v-if="topadr.app_icon && topadr.btn_txt">
            <img :src="topadr.app_icon">
            <span class="desc" v-html="topadr.desc"></span>
            <x-button mini type="primary" class="open">{{ topadr.btn_txt }}</x-button>
        </a>

        <!--图文模式-->
        <div class="idx-broadtitle" v-if="live.category == 1 && live.category_photo">
            <div class="header">
                <div class="banner">
                    <img :src="live.category_photo" style="width: 100%">
                    <div class="watch-count" style="z-index:100">
                        <i class="iconfont">&#xe60e;</i> {{live.view_num}}
                    </div>
                </div>
            </div>
        </div>

        <!--视频模式-->
        <div class="live-box" v-if="live.category > 1">
            <div class="live-box-hd">
                <div id="livePlElement" style="font-size: 0" :style="'width:'+player_box.width+'px;height:'+player_box.height+'px;overflow: hidden;'">
                    <iframe frameborder="0" :src="'http://ybvv.img.admin9.com/category_' + (live.category == 2 ? 'livecode_' : 'vodcode_') + live.salt + '.htm'" :width="player_box.width" :height="player_box.height" allowfullscreen></iframe>
                </div>
                <div class="watch-count" style="z-index:100">
                    <i class="iconfont">&#xe60e;</i> {{live.view_num}}
                </div>
            </div>
        </div>

        <div class="title-box">
            <h1 class="title">{{ live.title }}</h1>
        </div>

        <!--tab切换-->
        <sticky style="z-index: 100">
            <tab :animate="false" :line-width="1" active-color="#01a3ff">
                <tab-item :selected="loadResult.livetype === 1" @click="tabChange(1)">直播</tab-item>
                <tab-item :selected="loadResult.livetype === 2" @click="tabChange(2)">互动</tab-item>
                <tab-item :selected="loadResult.livetype === 3" @click="tabChange(3)">简介</tab-item>
                <!--<tab-item :selected="loadResult.livetype === 4" @click="tabChange(4)">双11促销</tab-item>-->
            </tab>
        </sticky>

        <!-- 内容区 -->
        <div class="g-broadcast">

          <!--直播内容-->
            <div v-if="loadResult.livetype == 1" class="live-list">
                <timeline color="#01a3ff">
                    <timeline-item v-for="item in list">
                        <feed :dashang="live.is_dashang">
                            <feed-item :item="item">
                                <div slot="header" @click="operation(item ,$index)">
                                    <h4 :class="$index == 0 ? 'recent' : ''">{{item.pubdate}}</h4>
                                    <p class="liveer-tag vux-center-v">
                                        {{item.user.nickname}}
                                        <img src="./imgs/shangbang.png" v-if="item.nominate == 2 && item.disparity == 2" style="height:18px;margin-left:5px" />
                                        <img src="./imgs/zhuchiren.png" v-else style="height:18px;margin-left:5px" />
                                    </p>
                                </div>
                            </feed-item>
                            <feed-action :item="item"
                                         :islike.sync="item.isclikeing"
                                         @on-like="clikeing(item, $index)"
                                         @on-unlike="clikeing(item, $index)"
                                         @on-comment="commenting(item)"
                                         @on-dashang="onDashang(item, $index)">
                            </feed-action>
                        </feed>
                    </timeline-item>
                </timeline>
            </div>

            <!--聊天内容-->
            <div v-if="loadResult.livetype == 2" class="g-broadcast-item" :class="item.uid > 0 && item.uid == user.uid ? 'author' : ''" v-for="item in list">
                <a :href="item.headjump" class="link">
                    <img :src="item.user.avatar" class="avatar">
                </a>
                <div class="g-broadcast-content" :class="item.is_dashang == 1 ? 'hongbao' : ''">
                    <div class="operate-area">
                        <feed :dashang="live.is_dashang">
                            <feed-item :item="item">
                                <div slot="header" @click="operation(item ,$index)">
                                    <p class="article-info" @click="operation(item ,$index)">
                                        <span class="username hide-txt">{{item.user.nickname || '网友'}}</span>
                                        <span class="post-time"><i class="iconfont">&#xe60a;</i> {{item.pubdate}}</span>
                                    </p>
                                </div>
                                <!--回复-->
                                <div slot="footer" class="reply-topic mt10" v-if="item.c_conetnt && item.is_dashang == 0">
                                    <div class="desc">
                                        <span style="color: #42BD56;">@{{item.c_conetnt.nickname}}:</span>
                                        <template v-if="item.c_conetnt.content_pic">[图片]</template>
                                        <template v-if="item.c_conetnt.content_video">[视频]</template>
                                        {{ item.c_conetnt.content_text }}
                                    </div>
                                </div>
                            </feed-item>
                            <feed-action v-if="item.is_dashang==0"
                                         :item="item"
                                         :islike.sync="item.isclikeing"
                                         @on-like="clikeing(item, $index)"
                                         @on-unlike="clikeing(item, $index)"
                                         @on-comment="operation(item, $index)"
                                         @on-dashang="onDashang(item, $index)">
                            </feed-action>
                        </feed>
                    </div>
                </div>
            </div>

            <!--活动介绍-->
            <div v-if="loadResult.livetype == 3">
                <div class="g-broadcast-live-content txt-p vux-1px-tb" :gutter="0">
                    <div class="live-content-all" v-html="live.content"></div>
                </div>
                <group title="主持人">
                    <cell :title="user.nickname" v-for="user in liveer_list">
                        <div slot="value"><img width="24" style="display:block;margin-right:5px;border-radius: 50%; background-color:#222" :src="user.avatar"></div>
                    </cell>
                    <cell title="直播时间" :value="live.starttime"></cell>
                </group>
            </div>

            <!--商品-->
            <div v-if="loadResult.livetype == 4">
                <goods header="11.11 促销 联系QQ：344100965" :list="goods" type="1"></goods>
            </div>

        </div>

        <infinite-loading :on-infinite="onInfinite" v-if="loadResult.livetype < 3">
            <span slot="no-more">哎呀，没有了〜！</span>
        </infinite-loading>

        <x-footer @on-home="onFooterHome" :item="footer"></x-footer>

    </view-box>

    <div class="side_tools">
        <!-- 刷新按钮 -->
        <span class="side_tool refresh" v-if="loadResult.livetype<3" @click="tabChange(loadResult.livetype)"></span>
        <!-- 打赏 -->
        <span class="side_tool dashang" v-if="loadResult.livetype<3 && live.is_dashang==1" @click="onDashang()"></span>
    </div>

    <!-- 底部发稿栏 -->
    <div class="comment-box">
        <div class="post-article">
            <p @click="commenting()" class="mods"><i class="iconfont write">&#xe602;</i>&nbsp;&nbsp;我也说两句...</p>
            <!--<i @click="popupIng.show1=true" class="iconfont btn_forwarding">&#xe613;</i>-->
            <!--<i @click="wxshare()" class="iconfont btn_forwarding">&#xe603;</i>-->
            <a :href="getUrl('list')"><i class="iconfont btn_forwarding">&#xe631;</i></a>
        </div>
    </div>

    <!--礼物-->
    <pop-gift :show.sync="popupIng.show1"></pop-gift>

    <!-- 打赏 -->
    <hongbao v-if="live.is_dashang"
             :show.sync="dashangIng"
             :item="payData"
             @on-reward="onReward"
             @on-cancel-redbag="onCancelRedbag">
    </hongbao>

    <!-- 弹出框 -->
    <pop-post :show.sync="initialize.ispop" @on-confirm="onConfirm"></pop-post>

    <!--管理菜单-->
    <actionsheet
            :show.sync="admin_menus.show"
            :menus="admin_menus.menus"
            @on-click-menu="adminMenus_click"
            cancel-text="取消" show-cancel>
    </actionsheet>

    <!--提示-->
    <toast :show.sync="toastIng.show" :text="toastIng.text" :type="toastIng.type"></toast>

    <!--关注弹窗-->
    <dialog v-if="followIng" :show.sync="followIng" :scroll="false" class="dialog-follow">
        <p class="dialog-title">观看本次直播需要先关注我们</p>
        <div class="img-box">
            <img :src="sysinfo.attachurl + 'qrcode_' + sysinfo.acid + '.jpg'" alt="" width="80%">
        </div>
        <div class="txt-box" style="padding-bottom: 0.5rem">
            <p>长按图片识别二维码关注</p>
        </div>
    </dialog>

    <!-- <pre> {{ $data|json }} </pre> -->

</template>

<script>
    import Lib from 'assets/Lib.js'
    import $ from 'webpack-zepto';
    import dhStorage from 'store';
    import { getUrl } from 'vux/src/libs/router'

    import Loading from 'vux-components/loading'
    import InfiniteLoading from 'vue-infinite-loading';

    import ViewBox from 'vux-components/view-box'
    import Group from 'vux-components/group'
    import Cell from 'vux-components/cell'
    import XButton from 'vux-components/x-button'
    import { Tab, TabItem } from 'vux-components/tab'
    import Toast from 'vux-components/toast'
    import Actionsheet from 'vux-components/actionsheet'
    import Sticky from 'vux-components/sticky'
    import Dialog from 'vux-components/dialog'

    import { Timeline, TimelineItem } from 'components/timeline'
    import { Feed, FeedItem, FeedAction } from 'components/feed'
    import PopPost from 'components/pop-post'
    import PopGift from 'components/pop-gift'
    import Hongbao from 'components/hongbao'
    import Goods from 'components/goods'

    import XFooter from 'components/x-footer'

    export default {
        components: {
            Loading,
            InfiniteLoading,
            ViewBox,
            XButton,
            Tab, TabItem,
            Group, Cell,
            Feed, FeedItem, FeedAction,
            PopPost, Toast,
            Actionsheet,
            Timeline,
            TimelineItem,
            Hongbao,
            Sticky,
            XFooter,
            Goods,
            PopGift,
            Dialog
        },
        data() {
            return {
                distance: 100,
                followIng: false,
                loadingIng: { show: true, text: '加载中…' },
                toastIng: { show: false, text: '成功', type: '' },
                popupIng:{ show1: false,  show2: false },
                dashangIng: false,
                isGoods: true,
                initialize: [],
                loadResult: [],
                player_box: [],
                shareData: [],
                comData: [],
                payData: {},
                list: [],
                goods: [],
                admin_menus: { show: false, menus: {} },
                footer_copyright:[]
            }
        },
        init: function() {
            this.ini = function() {
                this.sysinfo = window.sysinfo
                this.live = window.$render_data.live
                this.live.is_dashang = this.live.is_dashang == 1 ? true : false
                this.user = window.$render_data.user
                this.fans = window.$render_data.fans
                this.topadr = window.$render_data.topadr
                this.liveer_list = window.$render_data.liveer_list
                this.footer = window.$render_data.footer
                this.loadResult = {
                    step: 10,
                    max_id: 0,
                    live_id: this.live.id,
                    livetype: parseInt(window.$render_data.live.open_switch) || 1
                }
                this.initialize = {
                    currentLoaded: false,
                    currentLoading: false,
                    ispop: false,
                    isAdmin: this.live.isAdmin
                }
                this.comData = {}
            }
            this.refresh = function() {
                var slef = this;
                if (slef.initialize.currentLoading || slef.initialize.currentLoaded) {
                    return false
                }
                slef.initialize.currentLoading = true;
                $.ajax({
                    type: "get",
                    url: Lib.M.apiurl('livedata'),
                    data: slef.loadResult,
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function(f) {
                        slef.initialize.currentLoading = false;
                        var e = f.data;
                        var g = e.length;
                        if (g) {
                            var temp = [];
                            for (var i = 0; i < g; i++) {
                                if (dhStorage.get("liveContent" + e[i].id)) {
                                    e[i].isclikeing = true
                                }
                                else {
                                    e[i].isclikeing = false
                                }
                                temp.push(e[i]);
                                slef.loadResult.max_id = e[i].id;
                            }
                            slef.list = slef.list.concat(temp);
                            slef.$broadcast('$InfiniteLoading:loaded');
                            // 当输出条数 小于 每次输出次数则不再加载
                            if (g < slef.loadResult.step) {
                                slef.$broadcast('$InfiniteLoading:complete');
                            }
                        }
                        else {
                            slef.$broadcast('$InfiniteLoading:complete');
                        }
                    }
                })
            }
            this.regoods = function () {
                // 商品
                var slef = this
                $.ajax({
                    type: "get",
                    url: Lib.M.apiurl('goods_list'),
                    data: {live_id: this.live.id},
                    dataType: "jsonp",
                    jsonp: "callback",
                    success: function(obj) {
                        slef.goods = obj.data
                    }
                })
            }
            // 初始化视频
            this.videoInit = function() {
                var w = $(window).width();
                w = w > 600 ? 600 : w;
                this.player_box.width = w;
                this.player_box.height = (w / 16) * 9; // 默认宽屏
                if (window.$render_data.live.player_box == 1) {
                    this.player_box.height = (w / 4) * 3;
                    console.log('普屏')
                }
            }
        },
        created: function() {
            this.ini()
            if (window.$render_data.live.category > 1) {
                this.videoInit()
            }
            if( this.loadResult.livetype == 4 ){
                this.regoods()
            }
            // 分享
            this.shareData = {
                title: this.live.title,
                desc: this.live.smalltext,
                link: window.location.href,
                imgUrl: this.live.share_imgurl
            }
        },
        ready() {
            var self = this;
            setTimeout(() => {
                self.loadingIng.show = false
                // 有打赏
                if( dhStorage.get('payStar') === 1 ){
                    dhStorage.remove('payStar')
                    if( window.$render_data.payStar == true ){
                        self.toast(true, '打赏成功', '')
                    }
                    else{
                        self.toast(true, '打赏失败', 'cancel')
                    }
                }
            }, 300)
            // 打赏
            if( self.live.is_dashang == 1 ){
                this.payData = {
                    'live_id' : self.live.id,
                    're_nickname' : window.$render_data.base.gzh_name,
                    're_avatar' : self.sysinfo.attachurl + 'headimg_' + self.sysinfo.acid + '.jpg'
                }
            }
            // 需要关注
            if( this.live.look_lock == 1 && ( !this.fans || this.fans.follow == 0 ) ){
                this.followIng = true
            }
            Lib.wxShare(this.shareData)
        },
        methods: {
            getUrl (op, par) {
                var url = Lib.M.murl(op, par);
                return getUrl(url, this.$router)
            },
            // toast 提示
            toast(show, text, type) {
                this.toastIng.show = show;
                this.toastIng.text = text;
                this.toastIng.type = type;
            },
            // 自动加载
            onInfinite() {
                this.refresh();
            },
            // tab切换
            tabChange(d) {
                this.ini();
                this.loadResult.livetype = d
                this.$broadcast('$InfiniteLoading:reset')
                this.list = []
                this.refresh()
            },
            operation(e, d) {
                if (this.initialize.isAdmin > 0) {
                    var menus = {};
                    menus.menu1 = '回复';
                    menus.menu2 = '不通过';
                    if (e.nominate == 1) {
                        menus.menu3 = '推送到直播';
                    }
                    if (e.nominate == 2) {
                        menus.menu4 = '从直播撤销';
                    }
                    this.admin_menus.menus = menus;
                    this.admin_menus.index = e;
                    this.admin_menus.show = true;
                }
                else {
                    this.commenting(e);
                }
            },
            popMessage(d, item) {
                var slef = this;
                var data = {
                    type: d,
                    live_id: item.live_id,
                    id: item.id
                }
                $.getJSON(Lib.M.apiurl('editor_admin') + '&callback=?', data, function(result) {
                    slef.list.splice(item.index,1)
                })
            },
            commenting(item) {
                console.log(item);
                // 直播页卡评论跳转到详细页
                if( this.loadResult.livetype == 1 && this.live.comment_config.live_tag_comment == 1 && item ){
                    window.location.href = Lib.M.murl('detail',{live_id:this.live.id, topic_id:item.id})
                    return false
                }

                // 已关闭评论
                if( this.live.comment_config.end_switch_config == 0 && this.live.status == 2 ){
                    this.toast(true, '直播结束，不可再评论！', 'text')
                    return false
                }

                const forward = window.location.href

                // 微信直接到授权页面
                const ua = navigator.userAgent
                const isWechat = /micromessenger/i.test(ua)
                if( isWechat ){
                    window.location.href = Lib.M.murl('auth', {forward: forward})
                    return false
                }

                // 会员登录
                if ( !this.user.uid && this.live.comment_config.is_member == 0 ){
                    window.location.href = Lib.M.murl('auth', {forward: forward})
                    return false
                }

                this.initialize.ispop = true
                this.comData.livetype = this.loadResult.livetype;
                this.comData.live_id = this.live.id;
                if (item) {
                    this.comData.cid = item.id;
                    $('.pop-content').attr("placeholder", "回复：" + item.user.nickname)
                }
                else {
                    this.comData.cid = 0;
                    $('.pop-content').attr("placeholder", "我也说两句..")
                }
            },
            // 点赞
            clikeing(f, d) {
                var slef = this;
                var g = "liveContent" + f.id;
                // var e = event.currentTarget;
                var data = {
                    live_id: slef.loadResult.live_id,
                    id: f.id
                }
                var apiurl = Lib.M.apiurl('likeing') + '&callback=?';
                if (dhStorage.get(g)) {
                    this.list[d].isclikeing = false;
                    this.list[d].like_num = parseInt(this.list[d].like_num) - 1;
                    dhStorage.remove(g);
                    data.set = 'setDes'
                    $.getJSON(apiurl, data);
                }
                else {
                    this.list[d].isclikeing = true;
                    this.list[d].like_num = parseInt(this.list[d].like_num) + 1;
                    dhStorage.set(g, true);
                    data.set = 'setInc'
                    $.getJSON(apiurl, data);
                }
            },
            // 发布评论
            onConfirm(item) {
                var self = this;
                self.loadingIng.show = true
                self.loadingIng.text = '提交中…'
                $.extend(self.comData, item);
                $.ajax({
                    type: "POST",
                    url: Lib.M.apiurl('comment'),
                    data: self.comData,
                    success: function(result) {
                        self.loadingIng.show = false
                        if (result.err_code == 0) {
                            self.toast(true, '发布成功', '')
                            // 不是主持人在直播页卡发布后切换至互动
                            if (self.loadResult.livetype != 2 && self.live.isAdmin == false) {
                                self.tabChange(2)
                            }
                            else {
                                self.list.unshift(result.data);
                            }
                        }
                        else {
                            self.toast(true, result.err_msg, 'cancel')
                        }
                        self.initialize.ispop = false;
                    }
                });

            },
            // 打动作
            onDashang(item) {
                // 打赏给主题作者
                if( item ){
                    this.payData.cid = item.id
                    this.payData.re_avatar = item.user.avatar
                    this.payData.re_nickname = item.user.re_nickname
                }
                this.dashangIng = true
            },
            // 构建打赏链接
            onReward(money){
                dhStorage.set('payStar', 1);
                document.getElementById("app").style.display="none";
                var reward_url = Lib.M.murl('pay') + '&live_id=' + this.payData.live_id + '&money=' + money
                if( this.payData.cid ){
                    reward_url = reward_url+ '&cid=' + this.payData.cid;
                }
                window.location.href = reward_url;
            },
            //取消打赏
            onCancelRedbag(){
                dhStorage.remove('payStar');
                this.payData = {
                    'live_id' : this.live.id,
                    're_nickname' : window.$render_data.base.gzh_name,
                    're_avatar' : self.sysinfo.attachurl + 'headimg_' + self.sysinfo.uniacid + '.jpg'
                }
            },
            // 管理菜单
            adminMenus_click(key) {
                var item = this.admin_menus.index;
                if (key == 'menu1') { // 回复
                    this.commenting(item);
                }
                else if (key == 'menu2') { // 不通过
                    this.popMessage(1, item)
                }
                else if (key == 'menu3') { // 推送到直播
                    this.popMessage(2, item)
                }
                else if (key == 'menu4') { // 从直播撤销
                    this.popMessage(3, item)
                }
            },
            wxshare() {
                this.toast(true, '请从右上角分享', 'text')
            },
            warding(){
                $('.liwu-box').show();
            },
            liwuUrl(money) {
                $('.liwu-box').hide();
                dhStorage.set('payStar', 1);
                document.getElementById("app").style.display="none";
                window.location.href = Lib.M.murl('pay') + '&live_id=' + this.live.id + '&money='+money;
            },
            onFooterHome(){
                console.log('on-footer-home')
            }
        }
    }
</script>
<style lang="less">
    @import '../../assets/reset.css';
    @import '~vux/src/styles/center';
    .watch-count {
        padding: 2px 10px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 20px;
        line-height: 15px;
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        font-size: 10px;
        color: #FFF;
        .iconfont {
            font-size: 10px;
        }
    }

    /*下载按钮*/
    .download {
        display: block;
        padding: 0.5rem;
        /*line-height: 2.2rem;*/
        position: relative;
        z-index: 10;
        background-color: #FFF;
        img {
            width: 2.5rem;
            height: 2.5rem;
            vertical-align: middle;
            /*margin-right: 0.7rem;*/
        }
        .desc {
            font-size: 0.8rem;
            color: #666;
        }
        .open {
            position: absolute;
            right: 0.5rem;
            top: 0.95rem;
        }
    }
    /*标题*/
    .title-box {
        background-color: #FFF;
        .title {
            max-height: 5.8rem;
            padding: 0.6rem 1rem 0;
            color: #333;
            overflow: hidden;
            text-align: justify;
            font-weight: normal;
            font-size: 1.2rem;
        }
    }
    /*图文直播 标题*/
    .idx-broadtitle {
        background-color: #FFF;
        .header {
            .banner {
                position: relative;
                min-height: 6rem;
            }
        }
    }
    // 聊天
    .g-broadcast {
        padding-top: 0.8rem;
    }
    .g-broadcast-item {
        padding-right: 15px;
        padding-left: 15px;
        margin-bottom: 0.8rem;
        .link {
            float: left;
            overflow: hidden;
            text-align: center;
            .name {
                line-height: 1.6rem;
                font-size: 1.2rem;
                color: #666;
            }
        }
        .avatar {
            display: block;
            width: 2rem;
            height: 2rem;
            margin-bottom: 5px;
            border-radius: 50%;
        }
        &.author {
            .link {
                float: right;
            }
            .g-broadcast-content {
                margin-left: 0;
                margin-right: 2.6rem;
                background-color: rgba(66, 189, 86, 0.1);
                &:before {
                    left: inherit;
                    right: -8px;
                    border: 8px solid #E3F0E5;
                    border-right-width: 0;
                    border-top-color: transparent;
                    border-bottom-color: transparent;
                }
            }
        }
        video {
            width:14rem;height:10.5rem;
        }
    }

    .g-broadcast-content {
        margin-bottom: 0.5rem;
        margin-left: 2.6rem;
        display: block;
        background-color: #FFF;
        position: relative;
        border-radius: 0.35rem;
        &:before {
            content: '';
            display: block;
            width: 0;
            height: 0;
            position: absolute;
            left: -8px;
            top: 8px;
            border: 8px solid #FFF;
            border-left-width: 0;
            border-top-color: transparent;
            border-bottom-color: transparent;
        }
        .operate-area {
            padding: 0.5rem;
        }
        &.hongbao{
             background-color: #ff9a3b;
             width: 180px;
             border-bottom: 1px solid #c07e41;
             &:before {
                 content: '';
                 display: block;
                 width: 0;
                 height: 0;
                 position: absolute;
                 left: -8px;
                 border: 8px solid #ff9a3b;
                 border-left-width: 0;
                 border-top-color: transparent;
                 border-bottom-color: transparent;
             }
            .feed-bd__txt {
                font-size:0.7rem;
            }
            .article-info .username,
            .article-info .post-time,
            .feed-bd__txt {
                color: #FFF;
            }
        }
    }

    .article-info {
        overflow: hidden;
        font-size: 0.7rem;
        .username {
            display: inline-block;
            max-width: 70%;
            color: #666;
        }
        .post-time {
            display: block;
            float: right;
            color: #999;
            .iconfont {
                font-size: 0.7rem;
            }
        }
    }
    .g-broadcast-live-content {
        background-color: #FFF;
        padding: 1rem;
        color: #666;
        text-align: justify;
        .moreContentBtn {
            position: relative;
            color: #3c689d;
            font-size: 12px;
            line-height: 1;
            margin-top: -1rem;
            margin-bottom: 0;
            outline: none;
            padding-bottom: 10px;
            text-align: right;
            .iconfont {
                font-size: 12px;
            }
        }
        .live-content-all {
            margin-bottom: 1rem;
        }
    }

    // 视频区域
    .live-box {
        .live-box-hd {
            min-height: 9rem;
            background-color: #000;
            position: relative;
        }
        .live-box-bd {
            padding-top: 8px;
            color: #FFF;
            background-color: #000;
            text-align: center;
        }
    }

    /*被引用评论*/
    .reply-topic {
        background-color: #F6F6F6;
        font-size: 0.8rem;
        .username {
            padding-top: 5px;
        }
        .desc {
            padding: 5px;
        }
    }

    // 侧边工具
    .side_tools {
        .side_tool {
            width: 2.3rem;
            height: 2.3rem;
            display: block;
            position: fixed;
        }
        // 刷新按钮
        .refresh {
            right: 0.5rem;
            bottom: 4rem;
            background: url("./imgs/btn_refresh.png") center/2.2rem 2.2rem no-repeat;
        }
        // 打赏
        .dashang {
            right: 0.5rem;
            bottom: 7rem;
            background: url("./imgs/icon-shang.png") center/2.2rem 2.2rem no-repeat;
        }
    }

    // 底部发稿
   .comment-box {
       max-width: 600px;
       margin: 0 auto;
       position: fixed;
       bottom: 0;
       left: 0;
       right: 0;
       border-top: 1px solid #EEE;
       background-color: #FFF;
       color: #ACACAC;
       z-index: 100;
   }
    .post-article {
        padding: 0.5rem 3rem 0.5rem 0.5rem;
        .mods {
            height: 2.3rem;
            line-height: 2.3rem;
            padding-left: 0.8rem;
            background-color: #EDEDED;
            border-radius: 6px;
        }
        .btn_forwarding {
            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
            font-size: 2rem;
            line-height: 2.3rem;
            color: orangered;
        }
    }

    // 图文直播时间线
    .live-list {
        .vux-timeline {
            margin-top: -1rem;
            p { color: #888; font-size: 0.8rem; }
            h4 { color: #666; font-weight: 400; }
            .recent { color: #01A3FF; }
            .content { text-align: justify; }
        }
        video {
            width:16rem;height:12rem;
        }
    }
    @media (min-width: 600px) {
        .live-list video, .g-broadcast-item video {
            width:24rem;height:18rem;
        }
    }
</style>
