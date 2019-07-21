<template>
  <transition :name="direction === 'forward' ? 'pop-in': 'pop-out'"> 
    <div class='list-index'>
        List Page
        <button @click='prev'>返回</button>
    </div>
  </transition>
  
</template>

<script>
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        aa: false,
        transitionName: ''
      }
    },
    methods: {
      prev() {
        this.$router.go(-1)
      }
    },
    computed: {
      ...mapState({
        direction: state => state.getDirection
      })
    }
  }
</script>

<style style lang='scss' scoped>
    .list-index {
      position: absolute;
      height: 100vh;
      width: 100%;
      left: 0;
      top: 0;
      z-index: 10;
    }
</style>
