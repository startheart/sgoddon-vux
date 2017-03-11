<template>
    <div class="user-info">
        <div class="user-avatar" :style="{backgroundImage: 'url('+user.avatar+')'}"></div>
        <div class="user-name">
            <p class="text-success">{{ user.nickname }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            user: Object
        },
        methods: {},
        components: {},
    }
</script>

<style lang="less">
    .user-info { position: relative; display: block; width: 100%; font-size: 0; color: black }
    .user-info .user-avatar { display: inline-block; vertical-align: middle; width: 26px; padding-top: 26px; margin-right: 10px; background-size: cover; background-position: center center; background-repeat: no-repeat; border-radius: 100%; background-color: #F2F2F2 }
    .user-info .user-name { display: inline-block; font-size: 16px; vertical-align: middle }
    .user-info .user-name > p { line-height: 28px; color: #09BB07 }
    .user-info .user-name > .time { font-size: 12px; color: #9B9B9B }
</style>
