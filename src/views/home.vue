<template>
  <div class="home-index">
    <header class="head">
      <div class="user-info">
        <img
          class="head-img"
          src="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqfZiaM40GIYvfZqhekEO9NfqqyMy4moicJibPB2TfBiaCKn7jPKPeXfickKkFtD9icTavBbcteZekqazicw/132"
          alt
        >
        <p>HI,YuXin Ma, 下午好！</p>
      </div>
    </header>
    <div class="manager-activity">
        <div class="my-manager">
            <Title :url="iconList[0].url" :title="iconList[0].title">
            </Title>
            <div class="card"></div>
            <Title :url="iconList[1].url" :title="iconList[1].title">
              <a href="javascript:;" @click='getMoreActivities' class="more-activities">更多</a>
            </Title>
            <div class="activities-list">
              <activity class='activity' v-for="(item, index) in activities" :key='index' :url='item.url.slice(-4)' :startTime='item.startTime' :endTime='item.endTime' @click.native='enterInActivity(item.campaignId)'></activity>
            </div>
            <div></div>
        </div>
    </div>
  </div>
</template>

<script>
import Title from '@c/title.vue'
import activity from '@c/activity.vue'
import { getActivityList } from '@u/api'
export default {
  name: 'home',
  data() {
    return {
        iconList: [
            {
              url: 'https://ziker-static.yun.pingan.com/static/share/wx-app/static-resource/imgs/huiduoduo/icon/icon-jingli.png',
              title: '我的客户经理'
            },
            {
              url: 'https://ziker-static.yun.pingan.com/static/share/wx-app/static-resource/imgs/huiduoduo/icon/icon-hot.png',
              title: '热推活动'
            },
            {
              url: 'https://ziker-static.yun.pingan.com/static/share/wx-app/static-resource/imgs/huiduoduo/icon/icon-wjx.png',
              title: '常用工具'
            }
        ],
        activities: [],
        toolList: []
    };
  },
  mounted() {
    this.getAllActivities()
  },
  computed: {

  },
  methods: {
    enterInActivity(campaignId) {
      this.$router.push({path: '/activityPage', query: {name: campaignId}})
    },
    getMoreActivities() {
      this.$router.push('/list')
    },
    getAllActivities: function() {
      getActivityList().then(res => {
        if(res.data.resultCode === '000000' && res.data.data.resultCode === '000000') {
          let activityList = res.data.data.resultData.filter(e => {
            return e.status.toUpperCase() === 'OPENING' && e.type.toUpperCase() !== "TOOLS"
          })
          let toolList = res.data.data.resultData.filter(e => {
            return e.status.toUpperCase() === 'OPENING' && e.type.toUpperCase() === "TOOLS"
          })

          this.activities.push(...activityList)
          this.toolList.push(...toolList)
        }
      })
    }
  },
  components: {
    Title,
    activity
  },
  beforeRouteLeave(to, from, next) {
    next()
  }
};
</script>

<style lang='scss' scoped>
.home-index {
  display: flex;
  flex-direction: column;
  height: 100%;
  .head {
    height: 5.973333rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    background: url($url+"index/bg/kh.png") 0 0 / 100% 100%;
    .head-img {
      width: 94px;
      height: 94px;
      border-radius: 50%;
      margin-bottom: 30px;
    }
    p {
      color: #fff;
    }
  }
  .manager-activity {
      flex: 1;
      padding: 30px 50px;
      overflow: auto;
      .my-manager {
          .more-activities {
            float: right;
            text-decoration: none;
            color: #b3b3b3;
            &:after {
              content: '>'
            }
          }
      }
      .card {
        height: 4.666667rem;
        background: #fff;
        margin: .266667rem 0;
        box-shadow: 0 0 .48rem .053333rem rgba(229, 65, 48, 0.2);
      }  
      .activities-list {
        .activity {
          margin-bottom: .266667rem;
        }
      } 
  }
}
</style>
