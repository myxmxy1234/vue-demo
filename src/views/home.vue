<!--
 * @Author: your name
 * @Date: 2019-04-19 08:35:27
 * @LastEditTime : 2020-01-14 10:32:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test\src\views\home.vue
 -->
<template>
  <div>
    <input type="text" v-limit:0-7="num" v-model="num">
  </div>
</template>

<script>
  export default {
    directives: {
      limit: {
        update(el, binding) {
          // console.log('update', binding);
        },
        componentUpdated(el, binding, vnode) {
          let limit = binding.arg.split('-'),
          value = binding.value
          if (+value >= limit[0] && +value <= limit[1]) {
            el.value = value
          } else {
            el.value = 0
          }
          console.log('componentUpdated',binding);
          console.log(vnode);
        }
      }
    },
    components: {
    },
    data() {
      return {
        num: 0
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
