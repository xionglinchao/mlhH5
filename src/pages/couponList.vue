<template>
  <div class="couponList_container">
    <div class="coupon_box">
      <div class="single_coupon" style="position:relative;" v-for="item in couponList" >
        <div v-if="item.type == 1 || item.type == 3">
          <img class="coupon_pic" src="../assets/course_coupon.png">
          <div class="course_name beyondTwoLine">{{ item.name }}</div>
        </div>
        <div v-else>
          <img class="coupon_pic" src="../assets/book_coupon.png">
        </div>
        <div class="course_price">￥{{ item.value }}</div>
        <div class="use_time">有效期：{{ item.end_time }}之前</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      couponList: []  // 优惠券列表
    }
  },
  mounted () {
    let that = this
    that.$nextTick(() => {
      that.getCouponList()
      that.setWechat('http://h5.06baobao.com/#/')
    })
  },
  methods: {
    // 获取优惠券列表
    getCouponList () {
      let that = this
      let data = {
        token: localStorage.getItem('token'),
        type: 1
      }
      that.axios({
        method: 'POST',
        url: 'interface/Personal_center/my_coupon',
        data: data
      }).then((res) => {
        console.log('优惠券', res)
        if (res.code !== 1) {
          that.showAlert(res.msg)
          return false
        }
        that.couponList = res.data.coupon
      })
    }
  }
}
</script>

<style>
.couponList_container .coupon_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: .2rem 0;
}
.couponList_container .coupon_box .single_coupon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.coupon_box .single_coupon .coupon_pic {
  width: 6.75rem;
  height: 2.6rem;
}
.coupon_box .single_coupon .course_name {
  width: 3rem;
  font-size: .24rem;
  color: #fff;
  position: absolute;
  top: .8rem;
  left: 1.54rem;
}
.coupon_box .single_coupon .course_price {
  font-size: .46rem;
  color: #fff;
  position: absolute;
  top: .8rem;
  right: .3rem;
}
.coupon_box .single_coupon .use_time {
  font-size: .24rem;
  color: #c3c3c3;
  position: absolute;
  left: .24rem;
  bottom: .28rem;
}
</style>