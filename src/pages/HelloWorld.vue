<template>
  <div>
    <x-img :src="img" @click="$_onClick" v-if="false"/>
    <button @click.native="$_onLogout">清空登录状态</button>
    <button @click.native="$_onSetCustomShareInfo">设置分享信息</button>
    <p>{{user.profile.nickname}}</p>
    <x-img :src="user.profile.avatar" v-if="user.profile.avatar"/>
    <p>{{user.profile.openid}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: state => state.user // 用户信息
    })
  },
  data () {
    return {
      img: require('@/assets/logo.png')
    }
  },
  mounted () {
    document.title = '页面1'
  },
  methods: {
    // 绑定图片点击事件
    $_onClick (event) {
      console.log('图片点击')
    },
    // 清空登录状态
    $_onLogout (event) {
      // let that = this
      // Dialog.confirm({
      //   title: '确认',
      //   content: '是否退出登录',
      //   confirmText: '确定',
      //   onConfirm: () => {
      //     that.$store.dispatch('logout')
      //   }
      // })
    },
    // 设置分享信息
    $_onSetCustomShareInfo (event) {
      // 默认场景
      this.$store.commit('set_jssdk_scene', 'default')
      // 自定义场景
      // this.$store.commit('set_jssdk_scene', 'scene1')
    }
  }
}
</script>

<style lang="stylus" scoped>
p
  font-size: 24px

</style>
