<template>
  <div>
      ACTIVITY - {{activity}}
  </div>
</template>

<script>
  export default {
    data() {
        return {
            activity: ''
        }
    },
    beforeRouteEnter (to, from, next) {
        
        next(vm => {
            vm.activity = to.query.name
        })
    }
  }
</script>

<style style lang='scss' scoped>

</style>
