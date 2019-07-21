<template>
  <div class="app-main">
    <keep-alive include="home">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {}
};
</script>
