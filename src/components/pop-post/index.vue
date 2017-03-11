<template>
    <div class="comment-mod">
        <loading :show="loadingIng.show" :text="loadingIng.text"></loading>
        <div class="x-pop-post">
            <dialog :show.sync="show" :mask-transition="maskTransition" :dialog-transition="dialogTransition"
                    @on-hide="$emit('on-hide')" @on-show="$emit('on-show')">
                <div class="weui_dialog_hd" v-if="title">
                    <strong class="weui_dialog_title">{{title}}</strong>
                </div>
                <div class="weui_dialog_bd" style="padding: 0px;">
                    <group marginTop="margin-top" gutter="-1px">
                        <div style="padding: 10px;">
                            <textarea class="pop-content" v-model="comData.content" placeholder="请填写详细信息…" spellcheck="false" cols="100"></textarea>
                            <!--图片上传-->
                            <ul class="preview-img clearfix" v-show="comData.imageIds.length > 0">
                                <li class="item" v-for="localId in comData.imageIds">
                                    <template v-if="comData.slidePic[$index]">
                                        <img :src="comData.imageIds[$index]" v-if="comData.slidePic[$index]">
                                        <span class="delete-img" @click="deleteImage($index)"></span>
                                    </template>
                                    <template v-else>
                                        <img src="./imgs/loading.gif">
                                    </template>
                                </li>
                            </ul>
                            <div class="preview-video" v-if="comData.videoUrl" @click="playLocalVideo()">
                                <img :src="comData.videoUrl+'?vframe/jpg/offset/5/w/100/h/100'" class="video-thumb">
                                <img src="./imgs/icon_video_play.png" class="video-icon">
                            </div>
                        </div>
                    </group>
                </div>
                <div class="weui_dialog_ft pop-operate-box clearfix" style="margin-top:0">
                    <span class="iconfont upload-button" @click="chooseImage">&#xe608;</span>
                    <span class="iconfont upload-button" @click="fileInput">&#xe614;</span>
                    <div class="operate">
                        <span class="cancel-btn operate-btn" @click="onCancel">取消</span>
                        <span class="post-btn operate-btn" @click="onConfirm">提交</span>
                    </div>
                </div>
            </dialog>
        </div>
    </div>
</template>
<style lang="less">
    @import '../../libs/layer_mobile/need/layer.css';
    .pop-operate-box {
        height: 44px;
        background-color: #FFF;
        display: block;
        &:after {
            border-top: none;
        }
        .upload-button {
            margin-top: 0;
            padding: 0 0.6rem;
            float: left;
            color: #CCC;
            font-size: 1.2rem;
            &:first-child {
                margin-left: 5px;
            }
        }
        .operate {
            float: right;
            margin-top: 0;
            margin-right: 15px;
            .operate-btn {
                padding: 5px 18px;
                border: 1px solid #E5E5E5;
                border-radius: 4px;
                font-size: 14px;
                color: #818181;
            }
            .post-btn {
                margin-left: 5px;
                border-color: #42BD56;
                background-color: #42BD56;
                color: #FFF;
            }
        }
    }
    .pop-content {
        width: 100%;
        min-height: 60px;
        border: none;
        resize: none;
    }
    .preview-img .item {
        float: left;
        position: relative;
        margin: 10px 10px 0 0;
        img {
            width: 3rem;
            height: 3rem;
            border-radius: 4px;
        }
        .delete-img {
            display: block;
            position: absolute;
            right: -6px;
            top: -6px;
            width: 15px;
            height: 15px;
            background: url("./imgs/delete_img_btn.png") center/15px 15px no-repeat;
            overflow: hidden;
        }
    }
    .preview-video {
        width: 64px;
        height: 64px;
        margin-top: 10px;
        position: relative;
        overflow: hidden;
        .video-thumb {
            height: 100%;
            margin-left: 50%;
            transform: translateX(-50%);
        }
        .video-icon {
            width: 34px;
            height: 34px;
            position: absolute;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 5;
        }
    }
</style>
<script>
    import Dialog from 'vux-components/dialog'
    import Lib from 'assets/Lib.js'
    import $ from 'webpack-zepto';
    import layer from 'src/libs/layer_mobile/layer';
    import Group from 'vux-components/group'
    import Toast from 'vux-components/toast'
    import Loading from 'vux-components/loading'

    export default {
        components: {
            Dialog,
            Group,
            Loading
        },
        data: function () {
            return {
                comData: [],
                voiceData: [],
                loadingIng: [],
                commenting: false
            }
        },
        init() {
            this.ini = function () {
                this.comData = {
                    content: '',
                    videoUrl: '',
                    imageIds: [], // 本地地址
                    slidePic: [] // 远程地址
                }
                this.voiceData = {
                    voiceStatus: 1,
                    voiceTime: 0,
                    voiceId: '',
                    voiceUrl: ''
                }
                this.loadingIng = {
                    show: false,
                    text: ''
                }
            }
        },
        created: function () {
            this.ini()
        },
        props: {
            show: {
                type: Boolean,
                default: false,
                twoWay: true
            },
            title: {
                type: String,
                required: false
            },
            confirmText: {
                type: String,
                default: 'confirm'
            },
            cancelText: {
                type: String,
                default: 'cancel'
            },
            maskTransition: {
                type: String,
                default: 'vux-fade'
            },
            dialogTransition: {
                type: String,
                default: 'vux-dialog'
            }
        },
        methods: {
            onConfirm() {
                var self = this;
                if (!self.comData.content && !self.comData.videoUrl && self.comData.imageIds.length == 0) {
                    return self.onCancel();
                }
                if (self.comData.imageIds.length > 0 && self.comData.slidePic.length != self.comData.imageIds.length) {
                    return self.layerAlert("图片上传中，请稍后");
                }
                this.$emit('on-confirm', this.comData)
                this.ini()
            },
            onCancel() {
                this.show = false
                this.ini()
                this.$emit('on-cancel')
            },
            layerAlert: function (msg) { //提示
                if (!msg) return false;
                layer.open({
                    content: msg,
                    shade: false,
                    time: 2,
                    style: 'background-color:rgba(0,0,0,0.6); color:#fff; border:none; text-align:center'
                });
            },
            fileInput() { //发布视频，弹出选择视频
                var self = this;
                //创建input对象
                var input = document.createElement("input");
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'video/*');
                input.click();
                input.onchange = function () {
                    var formData = new FormData();
                    formData.append('file', input.files[0]);
                    console.log(input.files[0])
                    // 大于20M不能上传
                    if (input.files[0].size > 20971520) {
                        self.layerAlert('视频大小不能超过20M，请重新选择！')
                        return false;
                    }
                    // 上传状态
                    self.loadingIng.show = true
                    self.loadingIng.text = '上传中…'
                    var live_id = Lib.M.GetQueryString('id')
                    var apiurl = Lib.M.apiurl('upload_video') + '&live_id=' + live_id
                    $.ajax({
                        url: apiurl,
                        type: 'POST',
                        timeout: 60000,
                        data: formData,
                        cache: false,
                        contentType: false, //不可缺
                        processData: false, //不可缺
                        success: function (res) {
                            if (res.err_code == 0) {
                                self.comData.videoUrl = res.data.url
                            }
                            else {
                                return self.layerAlert(res.err_msg)
                            }
                            self.loadingIng.show = false
                        },
                        error: function (res) {
                            console.log(res)
                        },
                        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                            self.loadingIng.show = false
                            //超时,status 还有success, error 等值的情况
                            if (status == 'timeout') {
                                self.layerAlert('上传超时，视频过大或稍后再试！')
                            }
                        }
                    });
                }
            },
            //播放视频
            playLocalVideo() {
                console.log('video play')
                var slef = this;
                var video = document.createElement("video");
                video.controls = true;
                video.src = slef.comData.videoUrl;
                video.play();
            },
            //相册
            chooseImage() {
                var self = this;
                if (self.comData.imageIds.length >= 9) {
                    return self.layerAlert("最多上传9张图片");
                }
                wx.chooseImage({
                    count: 9 - self.comData.imageIds.length,
                    sizeType: ['compressed'],
                    sourceType: ['album', 'camera'],
                    success: function (res) {
                        var localIds = res.localIds;
                        $.each(localIds, function (k, obj) {
                            self.comData.imageIds.unshift(obj);
                        })
                        self.uploadImage(localIds);
                    }
                });
            },
            //上传图片
            uploadImage(localIds) {
                var self = this;
                var LocalId = localIds.shift();
                wx.uploadImage({
                    localId: LocalId,
                    isShowProgressTips: 0, // 不显示上传状态
                    success: function (res) {
                        var serverId = res.serverId;
                        self.comData.slidePic.push(serverId);
                        if (localIds.length > 0) {
                            self.uploadImage(localIds);
                        }
                    }
                });
            },
            //删除图片
            deleteImage(index) {
                var self = this;
                layer.open({
                    content: '你确定要删除第' + (index + 1) + '张照片？',
                    style: 'font-size:18px',
                    btn: ['确认', '取消'],
                    shadeClose: false,
                    yes: function () {
                        self.comData.imageIds.splice(index, 1);
                        self.comData.slidePic.splice(index, 1);
                        layer.closeAll();
                    },
                    no: function () {

                    }
                });
            }
        }
    }
</script>
