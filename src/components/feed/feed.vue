<template>
    <div class="feed-media">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            dashang: {
                type: Boolean,
                default: 0
            }
        }
    }
</script>
