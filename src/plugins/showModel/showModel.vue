<template>
  <div class="mask" v-show="visible">
      <div class="model">
          <div class="content-box">
              <div class="content">{{content}}</div>
          </div>
          <div class="buttons">
              <div class="button left-button" v-if="showLeft" @click="visible = false">{{leftText}}</div>
              <div class="button right-button" @click="rightEvent">{{rightText}}</div>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'showModel',
    data() {
      return {
          content: '',
          leftText: '取消',
          rightText: '确定',
          visible: false,
          showLeft: false,
          callBack: function(){}
      }
    },
    methods: {
        rightEvent() {
            this.visible = false
            this.callBack()
        }
    }
  }
</script>

<style style lang='scss' scoped>
    .mask {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, .5);
        .model {
            width: 500px;
            background: #fff;
            border-radius: 10px;
            padding-bottom: 20px;
            .content-box {
                text-align: center;
                padding: 40px;
                .content {
                    display: inline-block;
                }
            }
            .buttons {
                display: flex;
                align-items: center;
                color: #fff;
                justify-content: center;
                .button {
                    border-radius: 5px;
                    width: 40%;
                    padding: 15px 0;
                    text-align: center;
                    background: #409eff;
                }
                .left-button {
                    margin-right: 40px;
                }
            }
        }
    }
</style>
