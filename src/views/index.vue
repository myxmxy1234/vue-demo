<template>
  <div class="index">
    <app class="content"></app>
    <div class="tabs">
      <router-link
        :key="index"
        :to="item.path"
        @click.native="changeTab(index)"
        class="tab"
        tag="div"
        v-for="(item,index) in tabList"
      >
        <img :src="!item.active ? item.url[0]: item.url[1]" alt>
        {{item.text}}
      </router-link>
    </div>
  </div>
</template>

<script>
// import Index from './index.vue';
import app from './app.vue';
import index from '@a/images/index.png';
import indexActive from '@a/images/index-active.png';
import message from '@a/images/message.png';
import messageActive from '@a/images/message-active.png';
import user from '@a/images/user.png';
import userActive from '@a/images/user-active.png';
export default {
  name: 'index',
  components: {
    app
  },
  data() {
    return {
      tabList: [
        {
          url: [index, indexActive],
          active: true,
          text: '首页',
          path: '/index/home'
        },
        {
          url: [message, messageActive],
          active: false,
          text: '消息',
          path: '/index/message'
        },
        {
          url: [user, userActive],
          active: false,
          text: '我的',
          path: '/index/user'
        }
      ]
    };
  },
  created() {
    this.$showModel({
      showLeft: true,
      content: '今天天气不错',
      callBack: () => {
        console.log('clicked confirm')
      }
    })
  },
  methods: {
    changeTab(index) {
      this.tabList.forEach(e => e.active = false);
      this.tabList[index].active = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  .content {
    flex: 1;
    overflow: auto;
  }
  .tabs {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid rgba(0,0,0,.5);
    .tab {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #b8babd;
      padding: 0 20px;
      &.router-link-active {
        color: #ea5504;
      }
      img {
        width: 50px;
        height: 50px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
