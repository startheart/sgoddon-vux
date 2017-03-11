<template>
    <panel :header="header" :list="list" :type="type"></panel>
</template>
<script>
    import Panel from 'vux-components/panel'
    export default{
        props: {
            header: String,
            footer: Object,
            list: Array,
            type: {
                type: String,
                default: '1'
            }
        },
        components: {
            Panel
        }
    }
</script>
<style>

</style>
