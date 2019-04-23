<template>
    <div class='title-index'>
        <img :src="url" class="iconUrl" alt="">
        {{title}}
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        url: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    .title-index {
        line-height: 1.12rem;
        font-size: .373333rem;
        .iconUrl {
            width: .4rem;
            height: .4rem;
            vertical-align: middle;
            margin-right: .333333rem;
            margin-top: -0.053333rem;
        }
    }
</style>