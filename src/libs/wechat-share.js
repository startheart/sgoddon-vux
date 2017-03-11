;!(function () {
    var wechatShare = function (opt) {
        if (!(this instanceof wechatShare)) {
            return new wechatShare(opt);
        }
        var config = {
            title: '微友圈',
            desc: '众里九她千百度，她在微友圈停驻！',
            link: window.location.href,
            imgUrl: window.sysinfo.MODULE_URL + 'icon.jpg',
            // request_share_url: 'http://oauth.admin9.com/wap/wxjssdk?url=' + encodeURIComponent(window.location.href.split('#')[0]),
            success_callback: function () {

            },
            cancel_callback: function () {

            },
            debug: false
        }
        this.defaults = extendObj(config, opt)
        this.init();
    }

    wechatShare.prototype = {
        init: function () {
            var self = this;
            self.doconfig();
        },
        doconfig: function () {
            var self = this;

            // 分享
            jssdkconfig.jsApiList = [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'translateVoice',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'onVoicePlayEnd',
                'pauseVoice',
                'stopVoice',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'closeWindow',
                'scanQRCode',
                'chooseWXPay',
                'openProductSpecificView',
                'addCard',
                'chooseCard',
                'openCard'
            ];
            wx.config(window.jssdkconfig);

            wx.ready(function () {

                wx.hideOptionMenu();

                var share_title = self.defaults.title;
                var share_desc = self.defaults.desc;
                var share_link = self.defaults.link;
                var share_img = self.defaults.imgUrl;

                wx.showMenuItems({
                    menuList: [
                        'menuItem:share:timeline',
                        'menuItem:share:appMessage'
                    ]
                });

                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: share_title, // 分享标题
                    link: share_link, // 分享链接
                    imgUrl: share_img, // 分享图标
                    success: function () {
                        self.defaults.success_callback();
                    },
                    cancel: function () {
                        self.defaults.cancel_callback();
                    }
                });

                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: share_title, // 分享标题
                    desc: share_desc, // 分享描述
                    link: share_link, // 分享链接
                    imgUrl: share_img, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        self.defaults.success_callback();
                    },
                    cancel: function () {
                        self.defaults.cancel_callback();
                    }
                });

                wx.onMenuShareQQ({
                    title: share_title, // 分享标题
                    desc: share_desc, // 分享描述
                    link: share_link, // 分享链接
                    imgUrl: share_img, // 分享图标
                    success: function () {
                        self.defaults.success_callback();
                    },
                    cancel: function () {
                        self.defaults.cancel_callback();
                    }
                });

                wx.onMenuShareWeibo({
                    title: share_title, // 分享标题
                    desc: share_desc, // 分享描述
                    link: share_link, // 分享链接
                    imgUrl: share_img, // 分享图标
                    success: function () {
                        self.defaults.success_callback();
                    },
                    cancel: function () {
                        self.defaults.cancel_callback();
                    }
                })
            });
        }
    }

    var cloneObj = function (oldObj) { //复制对象方法
        if (typeof(oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
        var newObj = new Object();
        for (var i in oldObj)
            newObj[i] = cloneObj(oldObj[i]);
        return newObj;
    }

    var extendObj = function () { //扩展对象
        var args = arguments;
        if (args.length < 2) return;
        var temp = cloneObj(args[0]); //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    }

    if (typeof define === 'function') { // RequireJS && SeaJS
        define(function () {
            return wechatShare;
        });
    } else if (typeof exports !== 'undefined') { // NodeJS
        console.log(wechatShare);
        module.exports = wechatShare;
    } else {
        this.wechatShare = wechatShare;
    }
})()
