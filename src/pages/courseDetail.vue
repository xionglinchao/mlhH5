<template>
  <!-- 课程系列 -->
  <div class="course_detail">
    <div class="scroll_box">
      <img class="course_pic" :src="setUrl(courseDetail.cover_img)" v-if="courseDetail.cover_img">
      <div class="course_title">{{courseDetail.title}}</div>
      <div class="price_update">
        <div class="price_box">
          <span>{{courseDetail.money == 0 ? '免费':'￥' + courseDetail.money}}</span>
          <!-- <span>￥{{courseDetail.original_money}}</span> -->
        </div>
        <div class="update_num">已更新{{courseDetail.update_num}}期</div>
      </div>
      <div class="sub_title">
        <div v-bind:class="{ active:!tabIdx }" @click="checkIntroClick">详情</div>
        <div v-bind:class="{ active:tabIdx }" @click="checkCatelog">目录</div>
      </div>
      <!-- 系列课程详情 -->
      <template v-if="tabIdx == 0">
        <div class="course_intro">
          <img class="detail_pic" src="../assets/course_detail.png">
          <div class="grey_line"></div>
          <div class="content" v-html="courseDetail.introduction"></div>
        </div>
      </template>
      <!-- 单个课程列表 -->
      <template v-else-if="tabIdx == 1">
        <div class="single_course" v-for="(item, index) in courseDetail.course" :key="index" @click="toPage('pay', {courseId: item.id, courseType: 1})">
          <img :src="setUrl(item.cover)" class="course_cover" v-if="item.cover">
          <div class="course_info">
            <div class="single_course_title beyondTwoLine">{{item.course_title}}</div>
            <div class="single_course_price">
              <div>第{{item.sort}}期</div>
              <div>{{item.free == 0 ? '免费':'￥' + item.free}}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="buy_btn" @click="toPage('pay', {courseId: courseDetail.id, courseType: 0})">购买套餐课程</div>
  </div>
</template>

<script>
export default {
  computed: {
  },
  data () {
    return {
      tabIdx: 0,   // 选项卡
      courseId: null,  // 系列课程id
      courseDetail: ''   // 系列课程详情
    }
  },
  mounted () {
    let that = this
    that.courseId = that.$route.query.courseId
    that.$nextTick(() => {
      that.getCourseDetail()
      that.setWechat('http://h5.06baobao.com/#/courseDetail?courseId=' + that.courseId)
    })
  },
  methods: {
    payClick () {

    },
    // 选项卡切换
    checkIntroClick () {
      this.tabIdx = 0
    },
    checkCatelog () {
      this.tabIdx = 1
    },
    // 课程系列详情
    getCourseDetail () {
      let that = this
      let data = {
        id: that.courseId,  // 系列课程id
        token: localStorage.getItem('token')
      }
      that.axios({
        method: 'POST',
        url: 'interface/Course/column_detail',
        data: data
      }).then((res) => {
        console.log('课程系列详情', res)
        if (res.err_code !== 1) {
          this.showAlert(res.msg)
          return false
        }
        that.courseDetail = res.data
      })
    }
  }
}
</script>

<style>
.course_detail .scroll_box {
  padding-bottom: 1rem;
}
.course_pic {
  width: 7.5rem;
  height: 4rem;
}
.course_detail .course_title {
  font-size: .32rem;
  color: #333333;
  padding: .3rem;
  border-bottom: .02rem solid #e9eaec;
}
.course_detail .price_update {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: .3rem;
}
.price_update .price_box {
  display: flex;
  align-items: flex-end;
}
.price_box span:first-child {
  font-size: .34rem;
  color: #ff5050;
}
.price_box span:nth-child(2) {
  font-size: .24rem;
  color: #999999;
  text-decoration: line-through;
  padding-left: .34rem;
}
.price_update .update_num {
  font-size: .24rem;
  color: #999999;
}
.course_detail .sub_title {
  display: flex;
  margin-top: .2rem;
}
.sub_title div {
  width: 3.75rem;
  height: .8rem;
  font-size: .28rem;
  color: #333333;
  border-bottom: solid .01rem #e9eaec;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sub_title .active {
  color: #1eac58;
  border-bottom: .01rem solid #1eac58;
}
/* 系列课程详情 */
.course_intro {
  width: 6.9rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: .08rem;
  box-shadow: 0 0 .1rem 0 rgba(22, 22, 22, 0.25);
  margin: .25rem .3rem;
}
.course_intro .detail_pic {
  width: 2.2rem;
  padding: .2rem 0;
}
.course_intro .grey_line {
  width: 100%;
  height: .02rem;
  background: #f5f5f5;
}
.course_intro .content {
  width: 6.5rem;
  padding: .2rem;
  font-size: .32rem;
}
.course_intro .content img {
  width: 6.1rem;
}
/* 单个课程 */
.course_detail .single_course {
  display: flex;
  padding: .3rem .2rem;
  border-bottom: solid .01rem #f0f0f0;
}
.single_course .course_cover {
  width: 2.4rem;
  height: 1.4rem;
}
.single_course .course_info {
  width: 4.8rem;
  height: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: .2rem;
}
.single_course_title {
  font-size: .28rem;
  color: #333;
}
.single_course_price {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.single_course_price div:first-child {
  font-size: .2rem;
  color: #999;
}
.single_course_price div:nth-child(2) {
  font-size: .3rem;
  color: #ff3f3c;
}
.course_detail .buy_btn {
  width: 7.5rem;
	height: 1rem;
	background-color: #1eac58;
  font-size: .36rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  z-index: 10;
}
</style>
