<template>
</template>
<style lang="less">
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
