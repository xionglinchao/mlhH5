<template>
  <div class="pay_page container" :class="{active3:goodsInfo.original_free == 0 || payStatus == 1}">
    <template v-if="goodsInfo.original_free == 0 || payStatus == 1">
      <div style="width:100%;height:11.83rem;">
        <div class="pay_success container">
          <div class="course_title beyondOneLine">{{ courseType === 1 ? paySuccessInfo.course_title : paySuccessInfo.title }}</div>
          <div class="purchase_info">
            <div class="course_tips">
              <!-- <div>使用日期：2018-12-20至2020-12-20</div> -->
              <div>使用方法：请扫码观看课程视频</div>
            </div>
            <img class="course_cover" :src="setUrl(courseType === 1 ? paySuccessInfo.cover : paySuccessInfo.cover_img)" v-if="paySuccessInfo.cover_img || paySuccessInfo.cover">
          </div>
          <div style="width: 4.3rem;height: 3.6rem;margin-top: 1.2rem;">
            <img class="ercode" :src="setUrl(paySuccessInfo.qr_code)" v-if="paySuccessInfo.qr_code">
          </div>
          <div class="ercode_tip">长按保存或扫描二维码</div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 课程信息 -->
      <div style="background:#fff;padding-bottom:.2rem;">
        <div class="user_info">
          <img class="user_photo" :src="userInfo.litpic">
          <div class="user_name">{{ userInfo.username }}</div>
        </div>
        <div class="course_info">
          <img class="course_cover" :src="setUrl(goodsInfo.cover)" v-if="goodsInfo.cover">
          <div class="title_cont_price">
            <div class="course_title beyondTwoLine">{{ goodsInfo.course_title }}</div>
            <!-- <div class="sub_title beyondOneLine">这是一堂神奇的课程这是一堂神奇的课程</div> -->
            <div class="price_box">
              <div class="course_price">{{ goodsInfo.original_free > 0 ? '￥'+ goodsInfo.original_free:'免费'}}</div>
              <div class="coutrse_type">{{ goodsInfo.type }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 优惠券 -->
      <div class="coupon_box" @click="couponPopup('couponShowPop')">
        <div class="choose_coupon">选择优惠券</div>
        <div class="coupon_status">
          <div>{{ couponInfo.length > 0 ? '有可用优惠券':'暂无优惠券' }}</div>
          <img src="../assets/rightArrow.png">
        </div>
      </div>
      <!-- 优惠券弹窗 -->
      <div v-transfer-dom>
        <popup v-model="couponShowPop" position="bottom">
          <div class="coupon_popup">
            <div class="coupon_num">可用优惠券({{ couponInfo.length }})</div>
            <div v-for="item in couponInfo" style="position:relative;width:100%;" @click="chooseCoupon('couponShowPop', item.coupon_info, item.c_id)">
              <img class="coupon_pic" src="../assets/course_coupon.png">
              <div class="coupon_price">￥{{ item.coupon_info }}</div>
              <div class="coupon_title beyondTowLine">{{ item.name }}</div>
              <div class="coupon_time">有效期：{{ item.end_time }}前使用有效</div>
            </div>
            <div class="no_use_coupon" @click="couponPopup('couponShowPop')">不使用优惠</div>
          </div>
        </popup>
      </div>
      <!-- 底部支付栏 -->
      <div class="pay_bottom_box">
        <div class="pay_info">
          <div class="pay_money">
            <span>待支付：</span>
            <span>￥{{ (goodsInfo.original_free - couponValue) > 0 ? goodsInfo.original_free - couponValue:'0'  }}</span>
          </div>
          <div class="discount">{{ couponValue ? '已优惠￥' + couponValue:'暂无优惠' }}</div>
        </div>
        <div class="pay_btn" @click="payBtnClick">立即支付</div>
      </div>
    </template>
  </div>
</template>
<script>
import { Popup, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Popup
  },
  data () {
    return {
      couponShowPop: false,  // 默认优惠券弹窗关闭
      courseId: '',  // 系列课程id
      courseType: '',  // 课程类型 0 套课 1 单课
      goodsInfo: '',  // 购买商品信息
      userInfo: '',  // 用户信息
      couponInfo: '',  // 优惠券信息
      couponValue: '',  // 优惠券价格
      couponId: '',  // 优惠券id
      payStatus: -1,  // 是否购买成功
      paySuccessInfo: ''  // 购买成功信息
    }
  },
  mounted () {
    let that = this
    that.$nextTick(() => {
      that.getBuyDetail()
      that.getPaySuccess()
      that.setWechat('http://h5.06baobao.com/#/')
    })
    that.courseId = that.$route.query.courseId
    that.courseType = that.$route.query.courseType
  },
  methods: {
    // 优惠券使用
    couponPopup (name) {
      this.$data[name] = !this.$data[name]
      this.couponValue = ''
    },
    toPage (name) {
      this.$router.push({
        name: name
      })
    },
    // 选择优惠券
    chooseCoupon (name, value, couponid) {
      this.couponValue = value
      this.couponId = couponid
      this.$data[name] = !this.$data[name]
    },
    // 获取购买详情
    getBuyDetail () {
      let that = this
      let data = {
        id: that.courseId,  // 课程id
        type: that.courseType,  // 课程类型
        token: localStorage.getItem('token')
      }
      that.axios({
        method: 'POST',
        url: 'interface/Course/buy_course',
        data: data
      }).then((res) => {
        console.log('购买详情', res)
        if (res.err_code !== 1) {
          that.showAlert(res.msg)
          return false
        }
        that.goodsInfo = res.data.course
        that.userInfo = res.data.user
        that.couponInfo = res.data.coupon
      })
    },
    // 点击购买
    payBtnClick () {
      let that = this
      let data = {
        token: localStorage.getItem('token'),
        id: that.courseId,  // 课程id
        type: that.courseType,  // 课程类型
        order_money: that.goodsInfo.original_free, // 课程价格
        c_id: that.couponId  // 优惠券id
      }
      that.axios({
        method: 'POST',
        url: 'interface/Pay/purchaseColumn',
        data: data
      }).then((res) => {
        console.log('购买', res)
        if (Number(res.code) !== 1) {
          that.showAlert(res.msg)
          return false
        }
        that.wxpay(res.msg.config)
      })
    },
    // 微信支付
    wxpay (payData) {
      let that = this
      let data = {
        appId: payData.appId,
        nonceStr: payData.nonceStr,
        package: payData.package,
        paySign: payData.paySign,
        signType: payData.signType,
        timeStamp: payData.timestamp
      }
      console.log('支付参数', data)
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data,
        function (res) {
          console.log('调用成功！', res)
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 支付成功
            that.payStatus = 1
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            // 用户取消
            that.showAlert('您已取消支付')
          } else {
            that.$vux.loading.hide()
            console.log(res.errMsg)
          }
        }
      )
    },
    // 购买成功页面
    getPaySuccess () {
      let that = this
      let data = {
        token: localStorage.getItem('token'),
        type: that.courseType,  // 课程类型
        id: that.courseId   // 课程id
      }
      that.axios({
        method: 'POST',
        url: 'interface/Home_page/course_code',
        data: data
      }).then((res) => {
        console.log('购买成功页面', res)
        if (res.code !== 1) {
          that.showAlert(res.msg)
          return false
        }
        that.paySuccessInfo = res.data
      })
    }
  }
}
</script>
<style>
.pay_page {
  background: #f7f9fa;
}
.active3 {
  background: #1eac58;
}
.pay_page .user_info {
  display: flex;
  align-items: center;
  background: #fff;
  padding: .15rem .3rem;
}
.user_info .user_photo {
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  background: lightblue;
}
.user_info .user_name {
  font-size: .28rem;
  color: #333333;
  padding-left: .12rem;
}
.pay_page .course_info {
  display: flex;
  background-color: #fafafa;
  padding: .16rem .3rem .07rem .3rem;
}
.course_info .course_cover {
  width: 2.4rem;
  height: 1.6rem;
  border-radius: .15rem;
}
.course_info .title_cont_price {
  width: 4.4rem;
  height: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: .12rem;
}
.title_cont_price .course_title {
  font-size: .28rem;
  color: #333333;
}
.title_cont_price .sub_title {
  font-size: .24rem;
  color: #999;
  padding-bottom: .2rem;
}
.title_cont_price .price_box {
  display: flex;
  justify-content: space-between;
}
.price_box .course_price {
  font-size: .24rem;
  color: #fc5d48;
}
.price_box .coutrse_type {
  font-size: .24rem;
  color: #999;
}
.pay_page .coupon_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  margin-top: .15rem;
  padding: .2rem .3rem;
}
.coupon_box .choose_coupon {
  font-size: .28rem;
  color: #333;
}
.coupon_box .coupon_status {
  display: flex;
  align-items: center;
}
.coupon_box .coupon_status  div {
  font-size: .28rem;
  color: #666;
}
.coupon_box .coupon_status img {
  width: .42rem;
  height: .52rem;
}
.pay_page .pay_bottom_box {
  width: 100%;
  height: 1rem;
  position: fixed;
  bottom: 0;
  background: #fff;
  display: flex;
}
.pay_bottom_box .pay_info {
  width: 4.2rem;
  display: flex;
  flex-direction: column;
  padding-left: .3rem;
}
.pay_bottom_box .pay_info .pay_money {
  display: flex;
  padding-top: .12rem;
}
.pay_money span:first-child {
  font-size:.26rem;
  color:#666;
}
.pay_money span:nth-child(2) {
  font-size:.24rem;
  color:#fc5d48;
}
.pay_info .discount {
  font-size: .26rem;
  color: #b1b1b1;
}
.pay_bottom_box .pay_btn {
  width: 3.3rem;
  height: 1rem;
  font-size: .36rem;
  color: #fff;
  background: #03b349;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 优惠券弹窗 */
.coupon_popup {
  background-color: #fff;
  color: #000;
  padding: .2rem;
  height: 8.35rem;
  overflow: scroll;
  text-align: center;
}
.coupon_popup .coupon_num {
  font-size: .26rem;
  color: #666;
  width: 6.9rem;
  padding: .1rem 0;
  text-align: left;
}
.coupon_popup .coupon_pic {
  width: 6.75rem;
  height: 2.55rem;
}
.coupon_popup .coupon_price {
  font-size: .5rem;
  color: #fff;
  position: absolute;
  top: .7rem;
  right: .5rem;
}
.coupon_popup .coupon_title {
  max-width: 3rem;
  font-size: .3rem;
  color: #fff;
  position: absolute;
  left: 1.8rem;
  top: .7rem;
  text-align: left;
}
.coupon_popup .coupon_time {
  font-size: .26rem;
  color: #c3c3c3;
  position: absolute;
  bottom: .3rem;
  left: .4rem;
}
.coupon_popup .no_use_coupon {
  width: 2.8rem;
	height: .8rem;
	border-radius: .38rem;
	border: solid .02rem #b1b1b1;
  font-size: .3rem;
  color: #666666;
  margin: .2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2.35rem;
}

/* 购买成功 */
.pay_success {
  background: #1eac58;
  background-image: url(../assets/course_ercode.png);
  background-repeat:no-repeat;
  background-size:100% 11.83rem;
  -moz-background-size:100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pay_success .course_title{
  width: 6.4rem;
  font-size: .4rem;
  color: #333;
  font-weight: bold;
  padding-top: 1rem;
}
.pay_success .purchase_info {
  width: 6.4rem;
  display: flex;
  justify-content: space-between;
  padding-top: .1rem;
}
.pay_success .purchase_info .course_tips {
  width: 3.25rem;
  font-size: .28rem;
  color: #666;
}
.purchase_info .course_tips div:first-child {
  padding-bottom: .2rem;
}
.pay_success .purchase_info .course_cover {
  width: 2rem;
  height: 2rem;
}
.pay_success .ercode {
  width: 4.3rem;
  height: 3.6rem;
}
.pay_success .ercode_tip {
  width: 5.8rem;
  height: 1rem;
  border: solid .01rem #ebebeb;
  font-size: .32rem;
  color: #b7b7b7;
  margin-top: .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
