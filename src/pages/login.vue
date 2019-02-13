<template>
  <div class="login_page container">
    <img src="../assets/login.png" class="login_pic">
    <div class="login_content">
      <!-- 输入手机号 -->
      <div class="single_input">
        <img src="../assets/accout.png">
        <input type="text" placeholder="请输入手机号" maxlength="11" v-model="phoneNum">
      </div>
      <!-- 输入图形验证码 -->
      <!-- <div class="single_input sec">
        <img src="../assets/validation.png">
        <input v-model="picCodeNum" placeholder="请输入图形验证码" maxlength="4">
        <img class="pic_code" @click="getPictureCode" :src="setUrl(picture_code)" v-if="picture_code">
      </div> -->
      <!-- 短信验证码 -->
      <div class="single_input">
        <img style="width: .4rem;height: .3rem;" src="../assets/SMS.png">
        <input type="text" v-model="sms_code" placeholder="请输入短信验证码" maxlength="6">
        <button
          class="sendSmsBtn"
          disabled="disabled"
          type="button"
          @click="getCodeClick"
          :disabled="disabled || time > 0"
        >{{ countDown }}</button>
      </div>
      <!-- 提交按钮 -->
      <div class="confirm_btn" @click="loginClick">立即登录</div>
    </div>
    <!-- 滑块验证弹窗 -->
    <div class="verified_popup" v-if="swiperPopup">
      <div class="verifiedRulePopup_bg" @click="closePopup"></div>
      <div class="swiper_verified">
        <div id="captcha"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      phoneNum: '',  // 手机号
      picCodeNum: '', // 图形验证码
      picture_code: '',  // 图形验证码图片
      sms_code: '',  // 手机验证码
      verify_ticket: '',
      disabled: false, // 是否禁用验证按钮
      time: 0,  // 默认倒计时秒数
      second: 60,  // 倒计时
      swiperPopup: false  // 易盾滑块弹窗
    }
  },

  mounted () {
    let that = this
    that.$nextTick(() => {
      // this.init()
    })
  },
  methods: {
    // 易盾初始化
    init () {
      let that = this
      /* eslint-disable */
      initNECaptcha({
      // config对象，参数配置
        captchaId: 'd217d61693664001a3b6341eb5360e22',
        element: '#captcha',
        mode: 'float',
        width: '320px',
        onReady: function (instance) {
        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
        },
        onVerify: function (err, data) {
          /**
         * 第一个参数是err（Error的实例），验证失败才有err对象
         * 第二个参数是data对象，验证成功后的相关信息，data数据结构为key-value，如下：
         * {
         *   validate: 'xxxxx' // 二次验证信息
         * }
         */
          let dataSMS = {
            phone: that.phoneNum,
            token: that.$store.state.token,
            NECaptchaValidate: data.validate
          }
          console.log('5555555555', dataSMS)
          that.axios({
            method: 'POST',
            url: 'interface/Login/sendCode',
            data: dataSMS
          }).then((res) => {
            console.log('发送验证码', res)
            if (res.code === 1) {
              that.verify_ticket = res.data.verify_ticket
              that.time = that.second
              that.disabled = true
              console.log(that.disabled)
              that.swiperPopup = false
              that.timer()
            } else {
              that.showAlert(res.msg)
            }
          })
        }
      },
      function onload (instance) {
        // 初始化成功后得到验证实例instance，可以调用实例的方法
        console.log('instance', instance)
      },
      function onerror (err) {
          // 初始化失败后触发该函数，err对象描述当前错误信息
      })
    },
    // 关闭弹窗
    closePopup () {
      this.swiperPopup = false
    },
    // 验证码倒计时
    getCodeClick () {
      let that = this
      if (that.phoneNum === '') {
        that.showAlert('请输入手机号')
        return false
      }
      that.swiperPopup = true
      that.init()
    },
    timer () {
      if (this.time > 0) {
        this.time--
        setTimeout(this.timer, 1000)
      } else {
        this.disabled = false
      }
    },
    // 立即登入
    loginClick () {
      let that = this
      // if (that.picture_code === '') {
      //   this.showAlert('请输入图形验证码')
      //   return false
      // }
      if (that.sms_code === '') {
        this.showAlert('请输入手机验证码')
        return false
      }
      if (that.sms_code === '') {
        this.showAlert('请输入手机号')
        return false
      }
      let data = {
        verify_ticket: that.verify_ticket,
        sms_code: that.sms_code,
        phone: that.phoneNum,
        token: that.$store.state.token
      }
      this.axios({
        method: 'POST',
        url: 'interface/Login/bindPhone',
        data: data
      }).then((res) => {
        console.log('登入', res)
        if (res.code === 1) {
          localStorage.setItem('bind', res.bind)
          that.$router.push('/')
          console.log(111222, that.$router)
        } else {
          that.showAlert(res.msg)
        }
      })
    }
  },
  computed: {
    countDown () {
      return this.time > 0 ? this.time + 's 后重获取' : '获取验证码'
    }
  }
}
</script>
<style>
.login_page {
  background: #fff;
}
.login_page .login_pic {
  width: 100%;
}
.login_page .login_content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login_page .single_input {
  width: 6rem;
  display: flex;
  align-items: center;
  padding: 0.2rem 0;
  border-bottom: solid 0.01rem #eeeeee;
  margin-bottom: 0.1rem;
}
.login_page .single_input img:first-child {
  width: 0.45rem;
  height: 0.45rem;
}
.login_page .single_input input {
  width: 3.7rem;
  height: 0.45rem;
  outline: none;
  border: none;
  background: none;
  margin-left: 0.22rem;
}
.login_page .sec {
  padding-bottom: 0.05rem;
}
.login_page .single_input .pic_code {
  width: 1.6rem;
  height: 0.75rem;
}
/* 验证码倒计时 */
.sendSmsBtn {
  width: 1.8rem;
  background: transparent;
  border: none;
  color: #1eac58;
  outline: none;
}
.login_page .confirm_btn {
  width: 6rem;
  height: 1rem;
  background: #1eac58;
  border-radius: .5rem;
  font-size: .36rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.24rem;
}
/* 滑块验证弹窗 */
.login_page .verified_popup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 1s forwards;
  -webkit-animation: fadeIn 1s forwards;
}
.login_page .verified_popup .verifiedRulePopup_bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
.login_page .verified_popup .swiper_verified {
  position: absolute;
  top: 7rem;
}
</style>