<template>
  <div class='activity' :style="{background: bg}">
      <div class="intro">
          <span>平安人寿</span>
          <span class='time'>{{startTime | formatTime}} - {{endTime | formatTime}}</span>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          bg: `url(https://ck-static.yun.pingan.com/static/ci/share/wx-app/static-resource/imgs/huiduoduo/activity/index/${this.url}.jpg) no-repeat 0 0 / 100% 100%`
      }
    },
    props: {
        url: {
            type: String,
            required: true
        },
        startTime: {
            type: Number,
            required: true
        },
        endTime: {
            type: Number,
            required: false
        }
    }
  }
</script>

<style style lang='scss' scoped>
    .activity {
        height: 2.8rem;
        position: relative;
        border-radius: .266667rem;
        .intro {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            line-height: .4rem;
            font-size: .346667rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #fff;
            font-size: .32rem;
            padding: .266667rem .4rem ;
            border-radius: .266667rem;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
        }
    }
</style>
