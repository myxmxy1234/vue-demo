<template>
  <div class="color-piker-box">
    <div @click="showSketch($event)" class="common-input-color-style" :class="{active: colorPikerShow}">
      <div class="color-piker-show" :style="{'background-color': bgColor}"></div>
    </div>
    <div class="color-piker-select-box" @click="$event.stopPropagation()" v-if="colorPikerShow">
      <Sketch v-model="colors" @input="changeColor"></Sketch>
      <div class="color-piker-recently-used">
        <ul>
          <span>最近使用</span>
          <li v-for="(item, index) in recentlyUsedColor" :key="index" @click="selectRecentlyColor(item)" :style="{'background-color': item}"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Sketch} from 'vue-color';
  import $ from 'jquery';
  export default {
    data() {
      return {
        recentlyUsedColor: [],
        colors: '#fff',
        colorPikerShow: false
      }
    },
    components: {Sketch},
    props: ['value'],
    computed: {
      bgColor() {
        return this.changeColorStyle(this.value)
      }
    },
    created() {
      this.recentlyUsedColor = JSON.parse(localStorage.getItem('recentlyUsedColor')) || [];
    },
    mounted() {
      //点击空白处隐藏调色器
      $(window).click(() => {
        if (this.colorPikerShow) {
          this.colorPikerShow = false;
          //将当前所选择颜色存入localStorage中最近使用字段中
          this.storageRecentlyUsedColor(this.colors.hex);
          this.$emit('closeColorPicker');
        }
      });
    },
    // watch: {
    //   value: {
    //     handler(val) {
    //       this.dealWithColor(val);
    //     },
    //     immediate: true
    //   }
    // },
    methods: {
      //颜色格式转换
      changeColorStyle(color) {
        console.log(color);
        if (color.color.indexOf('#') !== -1) {
          //16进制转rgba格式
          return this.hexRgba(color.color, color.opacity || 1);
        } else if (color.color.indexOf('rgba') !== -1) {
          //rgba格式
          return color.color;
        } else {
          //rgb格式转rgba格式
          return this.rgbRgba(color.color, color.opacity || 1);
        }
      },
      //RGB颜色转换为16进制
      rgbHex(rgb) {
        let color = rgb.toString().match(/\d+/g);
        let hex = "#";
        for (let i = 0; i < 3; i++) {
          hex += ("0" + Number(color[i]).toString(16)).slice(-2);
        }
        return hex;
      },
      //16进制+opacity转rgba格式
      hexRgba(hex, opacity) {
        return this.rgbRgba(this.hexRgb(hex), opacity);
      },
      //rgba转hex + opacity
      rgbaHexOpacity(rgba) {
        rgba = rgba.replace('rgba', 'rgb');
        let rgb = rgba.slice(0, rgba.indexOf(')'));
        rgb = rgb.slice(0, rgb.lastIndexOf(',')) + ')';
        let a = rgba.slice(rgba.lastIndexOf(',') + 1, rgba.indexOf(')'));
        return {
          hex: this.rgbHex(rgb),
          a: a
        }
      },
      //rgb+opacity转rgba
      rgbRgba(rgb, opacity) {
        let rgba = '';
        rgba = rgb.replace('rgb', 'rgba');
        rgba = rgba.slice(0, rgba.indexOf(')'));
        rgba = rgba + ',' + opacity + ')';
        return rgba;
      },
      //选色器的rgba转css样式rgba
      cssRgba(rgba) {
        return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + rgba.a + ')';
      },
      //css样式的rgba转换成选色器的rgba参数
      colorPikerRgba(rgba) {
        rgba = rgba.slice(rgba.indexOf('(') + 1, rgba.indexOf(')'));
        rgba = rgba.split(',');
        return {
          r: rgba[0].trim(),
          g: rgba[1].trim(),
          b: rgba[2].trim(),
          a: rgba[3].trim()
        }
      },
      //16进制颜色转为RGB格式
      hexRgb(hex) {
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (hex && reg.test(hex)) {
          if (hex.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
              sColorNew += hex.slice(i, i + 1).concat(hex.slice(i, i + 1));
            }
            hex = sColorNew;
          }
          //处理六位的颜色值
          let sColorChange = [];
          for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + hex.slice(i, i + 2)));
          }
          return "rgb(" + sColorChange.join(",") + ")";
        }
      },
      //往local中存储选色器最近使用颜色
      storageRecentlyUsedColor(color) {
        let recentlyUsedColor = JSON.parse(localStorage.getItem('recentlyUsedColor')) || [];
        let flag = true;
        let colors = color.toLocaleLowerCase();
        for (let i = 0; i < recentlyUsedColor.length; i++) {
          if (recentlyUsedColor[i] === colors) {
            recentlyUsedColor.splice(i, 1);
            flag = false;
            break;
          }
        }
        if (flag && recentlyUsedColor.length >= 7) {
          recentlyUsedColor.splice(0, 1);
        }
        recentlyUsedColor.push(colors);
        localStorage.setItem('recentlyUsedColor', JSON.stringify(recentlyUsedColor));
      },
      //点击显示、隐藏选色器
      showSketch(ev) {
        ev.stopPropagation();
        if (this.colorPikerShow) {
          this.colorPikerShow = false;
          //将当前所选择颜色存入localStorage中最近使用字段中
          this.storageRecentlyUsedColor(this.colors.hex);
          this.$emit('closeColorPicker');
        } else {
          //触发window的click事件，关闭其他选色器
          $(window).trigger('click');
          this.colorPikerShow = true;
          this.recentlyUsedColor = JSON.parse(localStorage.getItem('recentlyUsedColor'));
          this.$emit('openColorPicker');
        }
      },
      //颜色改变
      changeColor() {
        this.$emit('input', this.cssRgba(this.colors.rgba));
      },
      //点击选色器最近使用颜色
      selectRecentlyColor(item) {
        let rgba = this.rgbRgba(this.hexRgb(item), 1);
        this.colors = this.colorPikerRgba(rgba)
        this.$emit('input', rgba);
      }
    }
  }
</script>
<style scoped>
  .color-piker-box {
    position: relative;
    width: 100px;
    height: 50px;
  }
  .common-input-color-style {
    width: 54px;
    height: 26px;
    padding: 0;
    border: none;
  }
  /*.color-piker-box{*/
    /*position: relative;*/
    /*width: 120px;*/
    /*text-indent: 0;*/
  /*}*/
  .vc-sketch {
    position: absolute!important;
    left: 118%;
    transform: translateX(-50%);
    top: 30px;
    width: 233px!important;
    z-index: 3;
    line-height: normal;
  }
  /*颜色选择器最近使用颜色盒子样式*/
  .color-piker-recently-used{
    width: 254px;
    height: 30px;
    line-height: 30px;
    background: #fff;
    position: absolute;
    left: 118%;
    transform: translateX(-50%);
    top: 347px;
    z-index: 3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
  }
  /*.color-piker-recently-used{*/
    /*width: 260px;*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    /*background: #fff;*/
    /*position: absolute;*/
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
    /*top: 349px;*/
    /*z-index: 3;*/
    /*border-bottom-left-radius: 4px;*/
    /*border-bottom-right-radius: 4px;*/
    /*box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);*/
  /*}*/
  .color-piker-recently-used > ul{
    margin-left: 10px;
  }
  .color-piker-recently-used li{
    float: right;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    overflow: hidden;
    margin: 7px 9px 0 0;
    vertical-align: top;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.15);
  }
  .color-piker-show{
    cursor: pointer;
    border: none;
    height: 100%;
  }
</style>
