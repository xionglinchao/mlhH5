<template>
  <div class="mx-image" @click="$_onClick($event)">
    <img :src="src">
  </div>
</template>

<script>
export default {
  name: 'x-img',

  props: {
    // 图片地址
    src: {
      type: String,
      required: true
    }
  },

  methods: {
    // 绑定点击事件
    $_onClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="stylus" scoped>

.mx-image
  font-size 0
  line-height: 1
  img
    pointer-events none
    width 100%

</style>
