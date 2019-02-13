<template>
  <div class="home_container">
    <!-- 首页 -->
    <template v-if="tabIdx == 0">
      <!-- 固定搜索栏 -->
      <div class="fixed_box">
        <div class="search_bar">
          <input class="course_input" @change="inputTyping" placeholder="查找更多精彩课程" v-model="searchValue"  type="text">
        </div>
      </div>
      <!-- 课程列表 -->
      <div class="scroll_box">
        <scroll ref="scroll" :pullUpLoad="true" :pullDownRefresh="true" @pullingDown="PullDown" @pullingUp="PullUp">
          <div class="course_box" v-for="(item,index) in courseList" :key="index" @click="toPage('courseDetail', {courseId: item.id})">
            <img :src="setUrl(item.cover_img)" class="course_pic">
            <div class="course_cont">
              <div class="course_title">{{ item.title }}</div>
              <div class="course_bottom_box">
                <div class="course_update">
                  <span>已更新{{ item.update_num }}期</span>
                  <span>{{ item.people }}人在学</span>
                </div>
                <div class="course_price">{{item.money >  0 ? '￥' + item.money:'免费'}}</div>
              </div>
            </div>
          </div>
        </scroll>
      </div>
    </template>
    <!-- 我的 -->
    <template v-else>
      <div class="person_container">
        <!-- 个人信息 -->
        <div class="person_info">
          <img class="user_photo" :src="personInfo.litpic" v-if="personInfo.litpic">
          <div class="user_name_num">
            <div>{{ personInfo.username }}</div>
            <div>{{ personInfo.vipname }}</div>
          </div>
        </div>
        <!-- 我的优惠券 -->
        <div class="personal_coupon" @click="toPage('couponList')">
          <div class="couponIcon_box">
            <img src="../assets/couponIcon.png">
            <div>我的优惠券</div>
          </div>
          <img class="arrow_right" src="../assets/rightArrow.png">
        </div>
        <!-- 我的二维码 -->
        <div class="personal_ercode">
          <div class="ercode_icon">
            <img src="../assets/erCode.png">
            <div>我的二维码</div>
          </div>
          <img class="personPage_ercode" :src="setUrl(personInfo.qr_code)" v-if="personInfo.qr_code">
          <div class="ercode_tips">扫描二维码</div>
        </div>
      </div>
    </template>
    <!-- 底部tab栏 -->
    <div class="bottom_tab">
      <div :class="{ active:tabIdx == 0 }" @click="toHomePage">首页</div>
      <div :class="{ active:tabIdx == 1 }" @click="toPersonPage">我的</div>
    </div>
  </div>
</template>

<script>
import scroll from '../components/scroll/scroll.vue'
export default {
  name: 'Home',
  components: {
    scroll
  },
  computed: {
    scroll () {
      return this.$refs.scroll
    },
    scroller () {
      return this.$refs.scroll
    }
  },
  data () {
    return {
      tabIdx: 0,
      searchValue: '', // 搜索内容
      courseList: [],  // 课程首页列表
      perPage: 1,  // 页码
      perPageSize: 10,  // 页面加载数
      personInfo: ''  // 个人主页信息
    }
  },
  mounted () {
    let that = this
    that.$nextTick(() => {
      that.getCourseList()
      that.getPersonInfo()
      that.setWechat('http://h5.06baobao.com/#/')
    })
  },
  methods: {
    //  每次刷新或者加载后重新刷新DOM结构
    refresh () {
      this.scroll.refresh()
    },
    // 下拉刷新
    PullDown () {
      setTimeout(() => {
        this.getCourseList()
        this.refresh()
      }, 500)
    },
    // 上拉加载
    PullUp () {
      setTimeout(() => {
        this.perPage++
        this.getCourseList()
        this.refresh()
      }, 500)
    },
    // 获取课程首页列表
    getCourseList () {
      console.log('我的3333333', localStorage.getItem('token'))
      let that = this
      that.axios({
        method: 'POST',
        url: 'interface/Course/column_list',
        data: {
          per_page: that.perPage,  // 页码
          limit: that.perPageSize   // 页面展示数量
        }
      }).then((res) => {
        console.log('课程首页列表', res)
        if (res.err_code !== 1) {
          that.showAlert(res.msg)
          return false
        }
        if (that.perPage === 1) {
          that.courseList = res.data
          that.scroller.finishUpdate(true)
        } else {
          that.courseList = that.courseList.concat(res.data)
          if (res.data.length > 0) {
            that.scroller.finishUpdate(true)
          } else {
            that.scroller.finishUpdate(false)
          }
        }
      })
    },
    // 获取 我的 信息
    getPersonInfo () {
      let that = this
      let data = {
        token: localStorage.getItem('token')
      }
      console.log('我的4444444', data)
      that.axios({
        method: 'POST',
        url: 'interface/Home_page/my',
        data: data
      }).then((res) => {
        console.log('我的', res)
        if (res.code !== 1) {
          this.showAlert(res.msg)
          return false
        }
        that.personInfo = res.data
      })
    },
    // 搜索栏
    inputTyping () {
      let that = this
      console.log(that.searchValue)
      that.axios({
        method: 'POST',
        url: 'interface/Course/course_index_search',
        data: {
          course_title: that.searchValue
        }
      }).then((res) => {
        console.log('搜索结果', res)
        if (res.err_code !== 1) {
          this.showAlert(res.msg)
          return false
        }
        that.courseList = res.data
      })
    },
    // 底部tab栏切换
    toHomePage () {
      this.tabIdx = 0
    },
    toPersonPage () {
      this.tabIdx = 1
      this.getPersonInfo()
    }
  }
}
</script>

<style>
/* 首页 */
.home_container {
  background-color: rgba(251, 249, 254, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.home_container .fixed_box {
  width: 100%;
  background-color: rgba(251, 249, 254, 1);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  z-index: 20;
}
.home_container .search_bar {
  width: 5.9rem;
  height: .6rem;
  background-color: #fff;
  margin-top: .25rem;
  margin-bottom: .1rem;
  border-radius: .3rem;
  box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.11);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.home_container .course_input {
  width: 5.2rem;
  height: .6rem;
  border: none;
  border-radius: .3rem;
  font-size: .28rem;
  outline: none;
  text-align: center;
}
.home_container .scroll_box {
  height: 100%;
  padding: 0.9rem 0;
}
.search_bar .search_icon {
  width: .4rem;
  height: .4rem;
  color: #a4a4a4;
}
.search_bar>div {
  font-size: .2rem;
  color: #a4a4a4;
  padding-left: 4px;
}
.home_container .course_box {
  display: flex;
  padding-top: .25rem;
  padding-bottom: .25rem;
  padding-left: .16rem;
  padding-right: .16rem;
  border-bottom: 2px solid #f0f0f0;
}
.course_box .course_pic {
  width: 2.06rem;
  height: 1.18rem;
  box-shadow: 0px 1px 10px 0px rgba(21, 21, 21, 0.15);
}
.course_box .course_cont {
  height: 1.18rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: .14rem;
}
.course_cont .course_title {
  width: 5rem;
  font-size: .24rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
}
.course_cont .course_bottom_box {
  width: 5rem;
  display: flex;
  justify-content: space-between;
}
.course_bottom_box .course_update {
  font-size: .17rem;
  color: #999999;
}
.course_bottom_box .course_price {
  font-size: .20rem;
  color: #ff3f3c;
}
/* 底部tab栏 */
.home_container .bottom_tab {
  width: 100%;
  height: 0.9rem;
  background: #fff;
  position: fixed;
  z-index: 20;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  border-top: .01rem solid #f0f0f0;
}
.home_container .bottom_tab div {
  font-size: .36rem;
  color: #333;
  width: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home_container .bottom_tab .active {
  color: #57c456;
}
/* 我的 */
.home_container .person_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -1rem;
}
.person_container .person_info {
  width: 6.9rem;
  height: 1.8rem;
  background-color: #ffffff;
  box-shadow: 0 .05rem .06rem 0 rgba(20, 20, 20, 0.09);
  border-radius: .06rem;
  display: flex;
  align-items: center;
}
.person_container .person_info .user_photo {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  margin: .3rem .2rem .3rem .15rem;
}
.person_info .user_name_num div:first-child {
  font-size: .32rem;
  color: #1eac58;
}
.person_info .user_name_num div:nth-child(2) {
  font-size: .26rem;
  color: #666;
}
/* 我的优惠券 */
.person_container .personal_coupon {
  width: 6.9rem;
  height: .9rem;
  background-color: #fff;
  box-shadow: 0 .05rem .06rem 0 rgba(20, 20, 20, 0.09);
  border-radius: .06rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: .25rem 0;
}
.personal_coupon .couponIcon_box {
  display: flex;
  align-items: center;
}
.personal_coupon .couponIcon_box img {
  width: .48rem;
  height: .48rem;
  margin: 0 .3rem 0 .15rem;
}
.personal_coupon .couponIcon_box div {
  font-size: .3rem;
  color: #333;
}
.personal_coupon .arrow_right {
  width: .5rem;
  height: .5rem;
}
/* 个人主页二维码 */
.person_container .personal_ercode {
  width: 6.9rem;
  height: 7.4rem;
  background-color: #ffffff;
  box-shadow: 0 .05rem 0.06rem 0 rgba(20, 20, 20, 0.09);
	border-radius: .06rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.personal_ercode .ercode_icon {
  display: flex;
  align-items: center;
  width: 6.5rem;
  padding: .25rem 0;
}
.personal_ercode .ercode_icon img {
  width: .45rem;
  height: .45rem;
}
.personal_ercode .ercode_icon div {
  font-size: .3rem;
  color: #333333;
  padding-left: .25rem;
}
.personal_ercode  .personPage_ercode {
  width: 4.3rem;
  height: 4.3rem;
}
.personal_ercode .ercode_tips {
  width: 5.8rem;
  height: 1rem;
  border: solid .01rem #ebebeb;
  margin-top: .5rem;
  font-size: .32rem;
  color: #b7b7b7;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
