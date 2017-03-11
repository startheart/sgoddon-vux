<template>
    <popup :show.sync="show" class="liwu-box">
        <div class="weui-grids">
            <a href="javascript:;" class="weui-grid" v-for="i in 8">
                <div class="weui-grid__icon">
                    <img src="./icon_liwu/Banana.png" alt="">
                </div>
                <p class="weui-grid__label">5元</p>
            </a>
        </div>
    </popup>
</template>

<style lang="less">
    @import '~weui/src/style/widget/weui-grid/weui-grid.less';
    .weui-grid { width: 25%; padding:10px }
</style>

<script>
    import Popup from 'vux-components/popup'
    export default {
        props: {
            show: {
                type: Boolean,
                default: false,
                twoWay: true
            }
        },
        components: {
            Popup
        }
    }
</script>