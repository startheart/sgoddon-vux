<template>
    <loading :show="isLoading" text="加载中…"></loading>
    <view-box v-ref:view-box class="container">
        <group marginTop="margin-top" gutter="-1px">
            <x-textarea placeholder="此时发生了什么…" :value.sync="initialize.content"></x-textarea>
            <div class="weui_cell weui_cell_before">
                <div class="weui_cell_bd weui_cell_primary">
                    <div class="weui-uploader">
                        <div class="weui-uploader__bd">
                            <ul class="weui-uploader__files" id="uploaderFiles">
                                <li class="weui-uploader__file" :style="{backgroundImage: 'url('+photo+')'}" v-for="(index, photo) in initialize.attachment"></li>
                            </ul>
                            <div class="weui-uploader__input-box" v-show="initialize.upload_index_item < 9">
                                <!--<input id="uploaderInput" class="weui-uploader__input" type="file" @click="chooseImage" accept="image/*" multiple="">-->
                                <input id="uploaderInput" class="weui-uploader__input" type="button" @click="chooseImage">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </group>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="popMessage()">发布</a>
            <a class="weui-btn weui-btn_default" :href="getUrl();">返回直播页</a>
        </div>

        <!--上传错误提示-->
        <toast :show.sync="initialize.posting1" type="warn" width="12em">
            请填写内容，<br />并至少上传1张照片
        </toast>
        <!--正在提交-->
        <loading :show="initialize.posting2" text="正在提交…" width="8em"></loading>
        <!--发布成功提示-->
        <toast :show.sync="initialize.posting3" type="success" width="8em">
            发布成功
        </toast>

        <!--<pre> {{ $data|json }} </pre>-->
    </view-box>
</template>

<script>
    import Lib from 'assets/Lib.js'
    import $ from 'webpack-zepto';
    import {getUrl} from 'vux/src/libs/router'

    import Loading from 'vux-components/loading'
    import ViewBox from 'vux-components/view-box'
    import XHeader from 'vux-components/x-header'

    import Group from 'vux-components/group'
    import Cell from 'vux-components/cell'
    import XTextarea from 'vux-components/x-textarea'

    import Toast from 'vux-components/toast'

    export default {
        components: {
            Loading,
            ViewBox,
            XHeader,
            Group, Cell, XTextarea, Toast
        },
        data() {
            return {
                isLoading: true,
                render_data: [],
                initialize: []
            }
        },
        init: function () {
            var self = this;
            this.ini = function () {
                self.live_id = Lib.M.GetQueryString('live_id')
                self.render_data = window.$render_data
                self.initialize = {
                    post_lock: false,
                    posting1: false,
                    posting2: false,
                    posting3: false,
                    content: '',
                    localIds:[],
                    serverId:[],
                    attachment: [],
                    upload_index_item: 0,
                    max_upload_num:0
                }
            }
            Lib.wxShare({
                title: window.$render_data.base.gzh_name,
                desc: '［发布直播］' + window.$render_data.base.gzh_name,
                link: Lib.M.murl('list', {id:this.live_id}),
                imgUrl: window.sysinfo.MODULE_URL + 'icon.jpg'
            });
        },
        created: function () {
            this.ini();
        },
        ready(){
            var slef = this;
            setTimeout(() => {
                slef.isLoading = false;
            }, 300);
        },
        methods: {
            getUrl () {
                var url = Lib.M.murl('live', {'id':this.live_id});
                return getUrl(url, this.$router)
            },
            popMessage: function () {
                var self = this;
                if ( !self.initialize.content || self.initialize.max_upload_num < 1 ) {
                    return self.initialize.posting1 = true;
                }
                self.initialize.posting2 = true;

                var data = {
                    live_id:self.live_id,
                    serverId:self.initialize.serverId,
                    content:self.initialize.content
                }
                console.log(data)
                $.ajax({
                    url: Lib.M.apiurl('editor_post'),
                    data: data,
                    type: 'POST',
                    datatype:'json',
                    success: function (ret) {
                        if(ret.err_code != 0){
                            self.initialize.posting2 = false;
                            return alert(ret.err_msg);
                        }
                        self.initialize = [];
                        self.initialize.posting3 = true;
                    }
                });
            },
            chooseImage (){
                var self = this;
                var count = 9 - self.initialize.max_upload_num;
                wx.chooseImage({
                    count: count,
                    // sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        self.initialize.localIds.push.apply(self.initialize.localIds, res.localIds);
                        self.initialize.max_upload_num = self.initialize.localIds.length;
                        setTimeout(function(){
                             self.uploadImage();
                        }, 100)
                    }
                });
            },
            uploadImage (){
                var self = this;
                var localId = self.initialize.localIds[self.initialize.upload_index_item]
                wx.uploadImage({
                    localId: localId.toString(),
                    isShowProgressTips: 1,
                    success: function (res) {
                        self.initialize.upload_index_item++;
                        self.initialize.serverId.push(res.serverId);
                        self.initialize.attachment.push(localId);
                        if (self.initialize.upload_index_item <= self.initialize.max_upload_num) {
                            return setTimeout(function(){
                                self.uploadImage();
                            },0)
                        }
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/reset.css';
    @import '~weui/src/style/widget/weui-cell/weui-uploader';
    @import '~weui/src/style/widget/weui-button/weui-button';
    .weui_cell_before:before { border-top:none;}
</style>





