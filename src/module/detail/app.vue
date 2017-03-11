<template>
    <loading :show="isLoading" position="absolute"></loading>
    <view-box v-ref:view-box class="container">
        <!--顶部-->
        <div class="header_default vux-1px-b" slot="header">
            <x-header :left-options="{showBack: true}" class="vux-1px-b">
                评论
            </x-header>
        </div>
        <div class="g-broadcast">
            <feed :dashang="live.is_dashang">
                <feed-item :item="topic">
                    <div slot="header" class="feed-top">
                        <div class="feed-avatar">
                            <img alt="头像" :src="topic.avatar">
                        </div>
                        <div class="feed-content-header row">
                            <div class="feed-info col">
                                <a href="#" class="title">{{topic.nickname}}</a>
                            </div>
                        </div>
                        <div class="row time-ago">
                            <span class="feed-location">{{topic.timeline}}</span>
                        </div>
                    </div>
                </feed-item>
                <!-- <div class="feed-meta-action row">
                    <div class="col time-ago-location">
                        <a class="col" @click="unLike(item, $index)" v-if="islike" style="color: #e81c4f">
                            <i class="iconfont">&#xe628;</i>&nbsp;{{ topic.like_num > 0 ? topic.like_num : '赞' }}
                        </a>
                        <a class="col" @click="onLike(item, $index)" v-else>
                            <i class="iconfont">&#xe638;</i>&nbsp;{{ topic.like_num > 0 ? topic.like_num : '赞' }}
                        </a>
                    </div>
                    <a href="#" class="button feed-action-btn"><i class="iconfont">&#xe605;</i> 分享</a>
                </div> -->
            </feed>

            <div class="feed_app_reward" v-if="topic.is_dashang==1">
                <div class="feed_app_reward_btn">
                    <a href="#" class="feed_app_reward_btn_a"><span></span></a>
                </div>
            </div>

            <!-- 评论例表 -->
            <div class="meta-nav">
                <nav class="feed-meta_nav">
                    <div class="nav_wrapper">
                        <div class="nav_list">
                            <a href="#" class="active">评论 {{ topic.reply_num }}</a>
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <ul class="discuss_list">
                    <li class="discuss_item" v-for="comment in list">
                        <div class="discuss_opr">
                            <span class="media_tool_meta tips_global meta_praise" :class="{'praised': comment.has_praised}">
                                <!-- <i class="icon_praise_gray" @click="praise(comment)"></i> -->
                                <!-- <span class="praise_num">{{comment.like_num}}</span> -->
                                {{comment.pubdate}}
                            </span>
                        </div>
                        <div class="user_info">
                            <strong class="nickname">{{comment.nickname}}</strong>
                            <img class="avatar" :src="comment.avatar">
                        </div>
                        <div class="discuss_message">
                            <!-- <span class="discuss_status">{{comment.status}}</span> -->
                            <div class="discuss_message_content">{{comment.message}}</div>
                        </div>
                        <p class="discuss_extra_info">
                            <a v-if="comment.is_from_me" class="discuss_del js_del" href="javascript:;" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">删除</a>
                        </p>
                        <div class="reply_result" v-if="comment.reply_list && comment.reply_list.length">
                            <div class="nickname">作者回复</div>
                            <div class="discuss_message">
                                <div class="discuss_message_content">{{comment.reply_list[0].content}}</div>
                            </div>
                            <p class="discuss_extra_info">{{comment.reply_list[0].time}}</p>
                        </div>
                    </li>
                </ul>
                <infinite-loading :on-infinite="onInfinite" spinner="waveDots"></infinite-loading>
            </div>

        </div>

        <x-footer @on-home="onFooterHome" :item="footer"></x-footer>

    </view-box>

    <popup :show.sync="commentBoxShow" style="top: 0px; max-width: 600px;">
        <div class="fullpage-container" style="max-width: 600px">
            <x-header :left-options="{showBack: false}" class="vux-1px-b">
                <a slot="left" @click="commentBoxShow=false">取消</a>
                评论
                <x-button type="primary" @click="onComment(topic)" mini slot="right" style="margin-top:-4px;color:#FFF;">发送</x-button>
            </x-header>
            <div class="" style="margin: 10px;">
                <textarea class="pop-content" v-model="comData.message" placeholder="请填写详细信息…" spellcheck="false" cols="100" auto="autofocus"></textarea>
            </div>
        </div>
    </popup>

    <!--提示-->
    <toast :show.sync="toastIng.show" :text="toastIng.text" :type="toastIng.type"></toast>

    <!-- 底部发稿栏 -->
    <div class="comment-box vux-1px-t">
        <div class="post-article">
            <p @click="commenting()" class="mods"><i class="iconfont write">&#xe602;</i>&nbsp;&nbsp;我也说两句...</p>
            <!--<i @click="popupIng.show1=true" class="iconfont btn_forwarding">&#xe613;</i>-->
            <!--<i @click="wxshare()" class="iconfont btn_forwarding">&#xe603;</i>-->
            <a :href="getUrl('live', {id:topic.live_id})"><i class="iconfont btn_forwarding">&#xe631;</i></a>
        </div>
    </div>

    <!-- <pre> {{ $data|json }} </pre> -->
</template>

<script>
    import Lib from 'assets/Lib.js'
    import $ from 'webpack-zepto'
    import {getUrl} from 'vux/src/libs/router'
    import Loading from 'vux-components/loading'
    import InfiniteLoading from 'vue-infinite-loading';
    import ViewBox from 'vux-components/view-box'
    import XHeader from 'vux-components/x-header'
    import XButton from 'vux-components/x-button'
    import Popup from 'vux-components/popup'
    import Toast from 'vux-components/toast'
    import XFooter from 'components/x-footer'

    import {Feed, FeedItem, FeedAction} from 'components/feed'

    export default {
        components: {
            ViewBox, Loading, InfiniteLoading, XHeader, XFooter,
            Feed, FeedItem, FeedAction, XButton, Popup, Toast
        },
        data() {
            return {
                commentBoxShow: false,
                isLoading: true,
                toastIng: { show: false, text: '成功', type: '' },
                initialize: {
                    currentLoaded: false,
                    currentLoading: false
                },
                render_data: [],
                live: [],
                topic: [],
                list:[],
                comData:[]
            }
        },
        init (){
            this.ini = function () {
                this.render_data = window.$render_data
                this.live = this.render_data.live
                this.user = window.$render_data.user
                this.live.is_dashang = this.live.is_dashang == 1 ? true : false
                this.topic = this.render_data.topic
                this.comData = {
                    live_id: this.live.id,
                    topic_id: this.topic.id,
                    cid: this.topic.id
                }
                this.loadResult = {
                    step: 10,
                    max_id: 0,
                    live_id: this.live.id,
                    topic_id: this.topic.id
                }
            }
        },
        created: function () {
            this.ini()
            // 分享
            this.shareData = {
                title: this.live.title,
                desc: this.topic.content_text || this.live.smalltext,
                link: Lib.M.murl('live', {id:this.live.id}),
                imgUrl: this.live.share_imgurl
            }
        },
        ready(){
            Lib.wxShare(this.shareData)
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
                slef.ajax(Lib.M.apiurl('reply_list'), slef.loadResult, function (obj) {
                    slef.initialize.currentLoading = false
                    if (obj.err_code != 0) {
                        return console.log(obj.err_msg)
                    }
                    var data = obj.data
                    var data_num = data.length
                    if (data_num > 0) {
                        slef.list = slef.list.concat(data);
                        var lastArr = data.pop()
                        slef.loadResult.max_id = lastArr.id
                    }
                    // 当输出条数 小于等五 每次输出次数则不再加载
                    if (data_num < slef.loadResult.step || !data_num) {
                        slef.currentLoaded = true
                        slef.$broadcast('$InfiniteLoading:complete')
                        $('.infinite-status-prompt').remove()
                    }
                    else {
                        slef.currentLoading = false;
                        slef.$broadcast('$InfiniteLoading:loaded');
                    }
                })

            },
            praise (item) {
                if (!item.has_praised) {
                    item.like_num++
                    item.has_praised = true
                    console.log(JSON.stringify(item))

                    // var g = "liveContent" + f.id;
                    // // var e = event.currentTarget;
                    // var data = {
                    //     live_id: item.live_id,
                    //     id: item.id
                    // }
                    // var apiurl = Lib.M.apiurl('likeing') + '&callback=?';
                    // if (dhStorage.get(g)) {
                    //     this.list[d].isclikeing = false;
                    //     this.list[d].like_num = parseInt(this.list[d].like_num) - 1;
                    //     dhStorage.remove(g);
                    //     data.set = 'setDes'
                    //     $.getJSON(apiurl, data);
                    // }
                    // else {
                    //     this.list[d].isclikeing = true;
                    //     this.list[d].like_num = parseInt(this.list[d].like_num) + 1;
                    //     dhStorage.set(g, true);
                    //     data.set = 'setInc'
                    //     $.getJSON(apiurl, data);
                    // }

                }
            },
            commenting(topic) {

                // 已关闭评论
                if( this.live.comment_config.end_switch_config == 0 && this.live.status == 2 ){
                    this.toastIng.show = true
                    this.toastIng.text = '直播结束，不可再评论'
                    this.toastIng.type = 'text'
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

                if (topic) {
                    $('.pop-content').attr("placeholder", "回复：" + topic.nickname)
                }
                else {
                    $('.pop-content').attr("placeholder", "写评论")
                }
                setTimeout(() => {
                    $('.pop-content').focus()
                }, 0);
                this.commentBoxShow = true
            },
            onComment(){
                var self = this;
                if(self.comData.message==''){
                    self.toastIng = { show: true, text: '内容不能为空', type: 'cancel' }
                    return false;
                }
                self.commentBoxShow = false
                self.isLoading = true
                self.ajax(Lib.M.apiurl('reply_post'), self.comData, function (obj) {
                    self.isLoading = false
                    if ( obj.err_code != 0 ) {
                        self.toastIng = { show: true, text: obj.err_msg, type: 'cancel' }
                        return console.log(obj.err_msg)
                    }
                    self.toastIng = { show: true, text: '成功', type: '' }
                    setTimeout(() => {
                        window.location.reload()
                    }, 300);
                })
            },
            onLike () {
                console.log('on like' + this.islike);
            },
            unLike (){
                console.log('on unlike' + this.islike);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/reset.css';
    @import '~vux/src/styles/1px.less';

    .g-broadcast {
        margin-top: 45px;
        background-color:#fff;
    }
    .feed-media {
        padding: 12px 12px 0;
    }

    .feed-top {
        position:relative;
        padding-left:50px;
        height:40px;
        .feed-avatar {
            display:block;
            min-width:38px;
            min-height:38px;
            width:38px;
            height:38px;
            margin-right:10px;
            border-radius:50%;
            background-color:#ddd;
            overflow:hidden;
            position:absolute;
            left:0;
            img {
                max-width:100%;
                border-radius:50%
            }
        }
        .time-ago {
            color:#a4a4a4;
            font-size:12px;
        }
    }

    .feed-content-header {
        .feed-info, .profile-info{
            position:relative;
            display:flex;
            a.title, h3 {
                color:#4a7ab4;
                font-weight:700;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                max-width:130px
            }
        }
    }

    .feed-meta-action {
        padding-top: 10px;
        .time-ago-location {
            line-height:40px;
            font-size:.9rem;
            overflow:hidden;
            text-overflow:hidden;
            white-space:nowrap;
        }
        .feed-action-btn {
            display:inline-block;
            text-decoration:none;
            max-width:150px;
            font-size:.9rem;
            color:#717171;
            min-height:inherit;
            line-height:40px;
            padding:0 6px;
            cursor:pointer;
            border:none;
            background:none;
            outline:none;
            vertical-align:middle
        }
    }

    .discuss_btn_wrp {
        display: none;
        margin-top: 20px;
        margin-bottom: 20px;
        text-align: right
    }
    .btn_discuss {
        padding-left: 1.5em;
        padding-right: 1.5em
    }
    .discuss_list {
        padding: 12px;
        font-size: 16px
    }

    .discuss_item {
        position: relative;
        padding-left: 45px;
        margin-bottom: 15px;
        &:after {
            content:"\200B";
            display: block;
            height: 0;
            clear: both
        }
        .user_info {
            min-height: 20px;
            overflow: hidden
        }
        .nickname {
            display: block;
            font-weight: 400;
            font-style: normal;
            color: #727272;
            width: 9em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal
        }
        .avatar {
            position: absolute;
            top: 0;
            left: 0;
            top: 3px;
            width: 35px;
            height: 35px;
            background-color: #ccc;
            vertical-align: top;
            margin-top: 0;
            border-radius: 50%;
        }
        .discuss_message {
            color: #3e3e3e;
            line-height: 1.5
        }
        .discuss_extra_info {
            color: #8c8c8c;
            font-size: 12px
        }
        .discuss_extra_info a {
            margin-left: .5em
        }
        .discuss_status {
            color: #ff7a21;
            white-space: nowrap;
            i {
                font-style: normal;
                margin-right: 2px
            }
        }
        .discuss_opr {
            float: right;
            color: #8c8c8c;
            font-size: 12px;
            .meta_praise {
                display: inline-block;
                text-align: right;
                padding-top: 5px;
                margin-top: -5px
            }
        }
        .discuss_del {
            margin-left: .5em
        }
    }

    .discuss_icon_tips {
        margin-bottom: 20px;
        img {
            vertical-align: middle;
            margin-left: 3px;
            margin-top: -4px
        }
        .icon_edit {
            width: 12px
        }
        .icon_access {
            width: 13px
        }
    }

    .reply_result {
        position: relative;
        margin-top: .5em;
        padding-top: .5em;
        padding-left: .4em;
        &:before {
            content:" ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            border-top: 1px solid #dadada;
            transform-origin: 0 0;
            transform: scaleY(0.5)
        }
        .nickname {
            position: relative;
            overflow: visible;
            &:before {
                content:" ";
                position: absolute;
                left: -0.4em;
                top: 50%;
                margin-top: -7px;
                width: 3px;
                height: 14px;
                background-color: #02bb00
            }
        }
    }
    .rich_tips.discuss_title_line {
        margin-top: 50px
    }

    .meta_praise {
        tap-highlight-color: rgba(0, 0, 0, 0);
        outline: 0;
        min-width: 3.5em;
        .praise_num {
            display: inline-block;
            vertical-align: middle;
            font-size: 13px;
            color: #666;
        }
    }

    .icon_praise_gray {
        background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAA+CAYAAAA1dwvuAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACd0lEQVRYhe2XMWhUMRjHfycdpDg4iJN26CQih4NUlFIc3iTasaAO+iZBnorIId2CDg6PLqWDXSy0p28TJ6ejILgoKiLFSeRcnASLnDf2HPKll8b3ah5NQPB+cHzJl0v+73J5Sf6NwWCAD6kqxoEV4BywCTwA2j59V9QlxrxUNJeBOSkfBtaAHvDcp/O+GkJHJd4H7kr5nm/nOkJHJH4FHkv5WAyhUxLfAgelvBlUKFXFBNCU6oYl+j6oEHohADwFtoDTUn8dTChVxX7gjlSfSJyS+CaYEDCPXs4d4IXkzDR+8BWqfI9SVUyil/ENST20ml8BF4Afu4z9HT3V80B/TAY9CxTABNAHxp1Oj4B1q34dWAamGa5Al0PALfSs3TS/aE1EcERWgQXgozPIN+Ai6O2ljFQVM8BLZJqN0KTEhgj9kvrViqf1wYz5BcoXQ38Pg9uckfiuSigU0xLXowmlqpgCjgNd4FM0IeCKxGcmEUtoRqLZScILpaqYA06iN9/tTTfGLzKvxLKdDCqUquIEcB59xK9GE2J4xLeBn3ZD1abaq/sQqSpmgWvo82rBbTdCPeAA4N69/noXS1XhphaBz27SPPVtapz/FXSBFsNDcgcN3wvkiBEjRoSndAtqLXXKvuvtYfMs+SP3T3tYm6ge1iaqh7UJ62HRTqNZko/mYV3CeVjA9rAuUTxsGd4edrcX1vWwddn2sHmWaA/bWuq4HnYLff3aC7U8bAiaMPyPJp3GhnxCUOlhQxPdwxrieViLbp4lUT2sIbqHNcTzsBYbeZZE9bCGeB7WIrqHNbTzLNnhYWMIlXpYI9Rz8gM8/GsFi3mW/Ace9jf8QZwIX5o4uQAAAABJRU5ErkJggg==) no-repeat 0 0;
        width: 13px;
        height: 13px;
        vertical-align: middle;
        display: inline-block;
        background-size: 100% auto;
        &.praised {
            background-position: 0 -18px
        }
    }
    .praised .icon_praise_gray {
        background-position: 0 -18px
    }


    // 底部发稿
   .comment-box {
       height: 55px;
       max-width: 640px;
       margin: 0 auto;
       position: fixed;
       bottom: 0;
       left: 0;
       right: 0;
       background-color: #FFF;
       color: #ACACAC;
       z-index: 1;
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

    .feed_app_reward {
        padding:10px 12px;
        background-color:#fff;
        text-align:center;
        letter-spacing:normal;
        word-spacing:normal;
        margin-bottom:7px
    }
    .feed_app_reward_btn {
        line-height:0;
        margin:10px 0
    }
    .feed_app_reward_btn_a {
        width:60px;
        height:60px;
        margin:0 auto;
        display:inline-block;
        vertical-align:middle
    }
    .feed_app_reward_btn_a span {
        width:0;
        height:0;
        padding:50%;
        background-position:100% 0;
        overflow:hidden;
        background-repeat:no-repeat;
        display:block;
        text-align:center;
        background-size:200%;
        -webkit-transform-origin:center;
        transform-origin:center;
        margin:0 auto;
        background-image:url(https://ocrjl5j3c.qnssl.com/vue/static/img/dashang@2x.d8f2b47.png)
    }
    .feed_app_reward_btn_a.activated span {
        background-color:#fff!important;
        background-position:0 0
    }
    .feed_app_reward_person-number {
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAABAQMAAAAGv++CAAAABlBMVEX////Z2dl4b8nnAAAAAXRSTlMAQObYZgAAABRJREFUeNpj+E8Y/GBABYxE6PkAAHcsR6Qt8qYTAAAAAElFTkSuQmCC) no-repeat 50%;
        color:gray;
        text-decoration:none
    }
    .feed_app_reward_persons {
        width:100%;
        margin:10px auto;
        overflow:hidden;
        vertical-align:middle;
        text-align:center
    }
    .feed_app_reward_persons>ul {
        width:100%;
        line-height:0;
        margin:0 auto
    }
    .feed_app_reward_persons>ul>li {
        display:inline-block;
        float:none;
        margin:0;
        width:40px;
        height:40px;
        text-align:center
    }
    .feed_app_reward_persons>ul>li img {
        width:30px;
        height:30px;
        border-radius:50%;
        margin:5px auto
    }

    .meta-nav {
        display:block;
        text-align:left;
        width:100%;
        background-color:#fff
    }
    .feed-meta_nav {
        position:relative
    }
    .meta-nav .more {
        float:right;
        width:auto;
        padding:0 8px;
        height:44px;
        line-height:44px;
        font-size:12px;
        position:relative;
        border-bottom:1px solid #dbdbdb;
        z-index:1
    }
    @media (-webkit-min-device-pixel-ratio:2), (min-device-pixel-ratio:2) {
        .meta-nav .more {
            border:none;
            background-image:-webkit-linear-gradient(top, transparent 50%, #dbdbdb 0, #dbdbdb);
            background-image:linear-gradient(180deg, transparent 50%, #dbdbdb 0, #dbdbdb);
            background-repeat:no-repeat;
            background-size:100% 1px;
            background-position:bottom
        }
    }
    .nav_wrapper {
        margin-right:0;
        margin-left:0;
        height:44px;
        overflow:hidden;
        overflow-x:scroll;
        -webkit-overflow-scrolling:touch;
        border-bottom:1px solid #dbdbdb
    }
    @media (-webkit-min-device-pixel-ratio:2), (min-device-pixel-ratio:2) {
        .nav_wrapper {
            border:none;
            background-image:-webkit-linear-gradient(top, transparent 50%, #dbdbdb 0, #dbdbdb);
            background-image:linear-gradient(180deg, transparent 50%, #dbdbdb 0, #dbdbdb);
            background-repeat:no-repeat;
            background-size:100% 1px;
            background-position:bottom
        }
    }
    .nav_wrapper::-webkit-scrollbar {
        display:none
    }
    .nav_wrapper .nav_list {
        white-space:nowrap;
        height:100%
    }
    .nav_wrapper .nav_list a {
        display:inline-block;
        font-size:14px;
        line-height:43px;
        color:#a4a4a4;
        padding:0 8px;
        margin-left:12px;
        background-color:#fff;
        z-index:4;
        white-space:nowrap;
        font-weight:700
    }
    .nav_wrapper .nav_list a:first-child {
        margin-left:10px
    }
    .nav_wrapper .nav_list a.active {
        color:#42b983;
        border-bottom:1px solid #42b983
    }

    @media screen and (min-width:600px) {
        .vux-popup-dialog {
            left:50%!important;
            margin-left:-300px
        }
    }
    .fullpage-container {
        background-color: #fff;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .pop-content {
        width: 100%;
        min-height: 60px;
        border: none;
        resize: none;
    }
</style>
