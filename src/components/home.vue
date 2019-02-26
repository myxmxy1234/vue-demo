<template>
    <div class='home'>
        <button @click="add">{{num}}</button>
        <a :href="url">点击就送</a>
        <!-- <router-link to='/hello' tag="a">go helloworld page</router-link> -->
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            num: 0,
            url: 'https://www.baidu.com'
        }
    },
    methods: {
        add() {
            this.num++
        }
    },
    watch: {
        num(newVal, oldVal) {
            console.log(newVal, oldVal)
        }
    },
    beforeCreate () {
        console.log('beforeCreate')
    },
    created () {
        console.log('created')
    },
    beforeMount () {
        console.log('beforeMount')
    },
    mounted () {
        console.log('mounted')
    },
    beforeUpdate () {
        // console.log('beforeUpdate')
    },
    updated () {
        // console.log('updated')
    }
}
</script>

<style scoped>
    
</style>