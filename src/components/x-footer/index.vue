<template>
    <div class="page__ft" v-if="item">
        <!-- 作者二维码 -->
        <!--<dialog :show.sync="dialogIng" class="dialog-license" :scroll="false">-->
            <!--&lt;!&ndash;<p class="dialog-title">扫一扫 关注西昌之家！</p>&ndash;&gt;-->
            <!--<div class="img-box">-->
                <!--<img src="http://ybvv.img.admin9.com/images/36/2016/10/TP75244PCnrp2e4Y7nK5nNtGlHRCkM.jpeg" style="width:100%"/>-->
                <!--&lt;!&ndash;<img src="http://ybvv.img.admin9.com/qrcode_55.jpg" alt="" style="width:80%">&ndash;&gt;-->
            <!--</div>-->
            <!--<span class="vux-close" @click="dialogIng=false"></span>-->
        <!--</dialog>-->
        <div class="weui-footer">
            <p class="weui-footer__icon" @click="onHome" v-if="item.icon">
                <a href="javascript:void(0)"><img :src="item.icon"></a>
            </p>
            <p class="weui-footer__links" v-if="item.links">
                <a :href="getUrl(link.url)" class="weui-footer__link web-font" v-for="link in item.links">{{link.name}}</a>
            </p>
            <p class="weui-footer__text" v-html="item.copyright"></p>
        </div>
    </div>
</template>
<script>
    import { go, getUrl } from 'vux/src/libs/router'
    export default {
        props: {
            item: Object
        },
        computed: {
            linksLength () {
                return this.links.length
            }
        },
        methods: {
            getUrl (url) {
                return getUrl(url, this.$router)
            },
            onHome() {
                this.$emit('on-home')
            }
        }
    }
</script>
<style lang="less">
    @import '~weui/src/style/widget/weui-footer/weui-footer.less';
    /*@import '~vux/src/styles/close';*/
    .page__ft {
        padding-top: 1.5rem;
        padding-bottom: 1rem;
        text-align: center;
        img {
            height: 0.95rem;
        }
    }
    .dialog-title {padding: 1rem 0;}
    .vux-close { margin-top: 8px; margin-bottom: 8px; }
    .weui-footer__links > a { color: #CCC; }
    .dialog-license .img-box>img {height: 100%}
</style>
