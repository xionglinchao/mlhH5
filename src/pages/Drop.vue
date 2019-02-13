<template>
  <x-page style="overflow: hidden;">
    <div style="height: 1000px; position: relative;">
      <div class="item" v-drop-node style="font-size: 20px; left: 30px;">item1</div>
      <div class="item" v-drop-node style="font-size: 20px; left: 100px;">item2</div>
      <div class="box box1" v-drop-container @drop="$_onDrop"></div>
      <div class="box box2" v-drop-container @drop="$_onDrop"></div>
    </div>
  </x-page>
</template>

<script>
// import { Toast } from 'mand-mobile'
import VConsole from 'vconsole'

export default {
  data () {
    return {}
  },
  mounted () {
    document.title = '拖动'
    window.vConsole = new VConsole()
  },
  methods: {
    $_onDrop (event) {
      console.log('$_onDrop', event)
      // Toast.succeed('找到元素', 600)
    }
  }
}
</script>

<style lang="stylus" scoped>
.item
  display inline-block
  border 12px solid red
  // padding 20px
  height 100px
  font-size 24px
  position absolute
  bottom 0
  cursor pointer
  user-select none
  background-color red
  color #fff
  z-index 999

.box
  position absolute
  display block
  margin-top 12px
  border 12px solid black
  width 400px
  height 200px
  bottom 140px
  left 140px
  background-color #fff

.box1
  // transform:rotate(90deg);
  margin-bottom 120px
  z-index 20

.box2
  border-color red
  left 50px
  
</style>
