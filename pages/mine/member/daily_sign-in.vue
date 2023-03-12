<template>
  <view class="calendar">
    <view class="header">
      <view class="current-date">{{ currentDate }}</view>
      <view class="btn-group">
        <view class="btn btn-prev" @click="onSwitchPrevMonth()">上个月</view>
        <view class="btn btn-next" @click="onSwitchNextMonth()">下个月</view>
      </view>
    </view>
    <view class="body">
      <view class="weeks">
        <view class="week-item" v-for="week in weeks" :key="week"
          >{{ week }}
        </view>
      </view>
      <view class="day-list">
        <view
          :class="{
            'day-item': true,
            today: day.isToday,
            checked: day.checked,
            'current-month-day': day.type === 'current'
          }"
          v-for="(day, index) in dayList"
          :key="index"
          @click="handleClick(day)"
        >
          <text class="text">{{ day.checked ? '√' : day.day }}</text>
        </view>
      </view>
    </view>
	<view style="text-align: center;" @click="if_signIn()">
		<image style="width: 150rpx;height: 100rpx;text-align: center;" src="/static/mine/sign-in/sign-in.png" mode="widthFix">
	</view>
	<!-- <image @click="handleClickSignIn(day)" style="width: 150rpx;height: 100rpx;text-align: center;" src="/static/mine/sign-in/sign-in.png" mode="widthFix"> -->
	<!-- <image style="width: 150rpx;height: 100rpx;" src="/static//mine/sign-in/sign-in.png" mode="widthFix">
	<image  @click=""></image> -->
  </view>
</template>

<script>
	import { listScore_record, getScore_record, delScore_record, addScore_record, updateScore_record } from "@/api/readerstation-member/score_record";
	import { listTask_finish, ifSign_in,getTask_finish, delTask_finish, addTask_finish, updateTask_finish } from "@/api/readerstation-member/task_finish";
	import { getUserProfile } from "@/api/system/user"
	import { listTask, getTask, delTask, addTask, updateTask } from "@/api/readerstation-member/task";
	import { listUser_score, getUser_score, delUser_score, addUser_score, updateUser_score } from "@/api/readerstation-member/user_score";
export default {
  props: {
    checks: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
		e:9,
      year: null,
      month: null,
      day: null,
	  // year: "",
	  // month: "",
	  // day: "",
      dayList: [],
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
	  
	  score_record:{
		// id: 0,
		// userId: null,
		// sourceId: null,
		// sourceType: null,
		// exprieStatus: 0,
		// remark: null,
		// symbol: null,
		// score: null,
		// expireAt: null,
		// createAt: null
	  },
	  i:{},
	  // form为新增任务完成记录表单参数
		form: {},
		// score_record: {},
		taskList:[],
		sign_in_Score:0,
		user_score: {
	    // userId:"",
	    // level: "",
	    // totalScore: 0,
	    // usableScore: 0,
	    // createAt: "",
	    // updateAt: "",
	    // deleted: ""
	  },
    }
  },
  onLoad() {
	  // this.time = this.getTime();
    this.getScore_info()
  },
  computed: {
    currentDate() {
      const year = this.year
      const month = this.month < 10 ? '0' + this.month : this.month

      return `${year}-${month}`
    }
  },
  watch: {
    checks() {
      this.initDate()
    }
  },
  created() {
    const { year, month, day } = this.getCurrentDate()

    this.initDate(year, month, day)
  },
  methods: {
	  if_signIn(){
		  ifSign_in(this.user.userId).then(response => {
			  if (response == 1) {
			  	this.$modal.msgSuccess("今日已经签到！");
			  } else{
			  	this.handleClickSignIn()
			  }
		  	// return response
		  })
	  },
	  
	  handleAddscore_record(element){
		  this.score_record.userId = this.user_score.userId
		  this.score_record.sourceId = element.id
		  this.score_record.sourceType = 1
		  this.score_record.exprieStatus = '0'
		  this.score_record.remark = ''
		  this.score_record.symbol = 'in'
		  this.score_record.score = element.score
		  var timer = this.year + '-' + this.month >= 1 && this.month <= 9 ? (this.month = "0" + this.month) : "" + '-' + this.day >= 0 && this.day <= 9 ? (this.day = "0" + this.day) : ""
		  this.score_record.expireAt = timer
		  this.score_record.createAt = timer
		  addScore_record(this.score_record).then(response => {
			  this.i = response.data
			  this.handleAddtask_finish(element)
		                // this.$modal.msgSuccess("新增成功");
		              });
	  },
	  handleAddtask_finish(element) {
		  this.form.userId = this.user_score.userId
		  this.form.taskId = element.id
		  
		  this.form.scoreUuid = this.id
		  this.form.finishScore = element.score
		  var timer = this.year + '-' + this.month >= 1 && this.month <= 9 ? (this.month = "0" + this.month) : "" + '-' + this.day >= 0 && this.day <= 9 ? (this.day = "0" + this.day) : ""
		  this.form.createAt = timer
	        addTask_finish(this.form).then(response => {
	                      this.$modal.msgSuccess("签到成功");
	                    });
	      },
    initDate(year = this.year, month = this.month, day = this.day) {
      const dayList = this.getDayList(year, month)

      this.year = year
      this.month = month
      this.day = day
      this.dayList = dayList
    },
	//签到增加积分
	handleClickSignIn(){
		if(this.e==1){
			this.$modal.msgSuccess("今日已经签到！");
		}
		else{
			let that = this
			listTask().then(response => {
				this.taskList = response.rows;
				this.taskList.forEach(
			 			 function(element){
			 				if(element.identify == 1){
								that.updateScore(element.score)
			 					that.handleAddscore_record(element)
			 				}
			 			}
				)
			});
		}
		
		 
	},

	updateScore(addscore){
		// var i = Number(this.user_score.totalScore) + Number(addscore)
		this.user_score.totalScore = Number(this.user_score.totalScore) + Number(addscore)
		this.user_score.usableScore = Number(this.user_score.usableScore) + Number(addscore)
		// alert(this.user_score.totalScore)
		updateUser_score(this.user_score).then(response => {
		              // this.$modal.msgSuccess("签到成功！");
		});
	},
	
    handleClick(day) {
      const payload = {
        year: this.year,
        month: this.month,
        ...day
      }

      switch (day.type) {
        case 'prev':
          this.onSwitchPrevMonth(day)
          break
        case 'next':
          this.onSwitchNextMonth(day)
          break
        default:
          this.$emit('current-month-day', payload)
      }
    },
    onSwitchPrevMonth(day) {
      const { prevYear, prevMonth } = this.getPrevMonthInfo(
        this.year,
        this.month
      )
      const payload = {
        year: prevYear,
        month: prevMonth,
        oldYear: this.year,
        oldMonth: this.month,
        ...day
      }

      this.initDate(prevYear, prevMonth)
      this.$emit('prev-month-day', payload)
    },
    onSwitchNextMonth(day) {
      const { nextYear, nextMonth } = this.getNextMonthInfo(
        this.year,
        this.month
      )
      const payload = {
        year: nextYear,
        month: nextMonth,
        oldYear: this.year,
        oldMonth: this.month,
        ...day
      }

      this.initDate(nextYear, nextMonth)
      this.$emit('next-month-day', payload)
    },
    getPrevMonthInfo(year, month) {
      let prevYear = year
      let prevMonth = month - 1

      if (prevMonth < 1) {
        prevMonth = 12
        prevYear -= 1
      }

      return {
        prevYear,
        prevMonth
      }
    },
    getNextMonthInfo(year, month) {
      let nextYear = year
      let nextMonth = month + 1

      if (nextMonth > 12) {
        nextMonth = 1
        nextYear += 1
      }

      return {
        nextYear,
        nextMonth
      }
    },
    getDayList(year, month) {
      const prevMonthDays = this.getPrevMonthDays(year, month)
      const currentMonthDays = this.getCurrentMonthDays(year, month)
      const nextMonthDays = this.getNextMonthDays(year, month)

      return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
    },
    getCurrentDate() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()

      return {
        year,
        month,
        day
      }
    },
    getMonthLastDay(year, month) {
      const { nextYear, nextMonth } = this.getNextMonthInfo(year, month)
      const date = new Date(`${nextYear}/${nextMonth}/1`)
      const firstDayTimeStamp = date.getTime()
      const oneDayTimeStamp = 24 * 60 * 60 * 1000
      const prevMonthLastDay = new Date(
        firstDayTimeStamp - oneDayTimeStamp
      ).getDate()

      return prevMonthLastDay
    },
    getPrevMonthDays(year, month) {
      const { prevYear, prevMonth } = this.getPrevMonthInfo(year, month)
      const prevMonthLastDay = this.getMonthLastDay(prevYear, prevMonth)
      const date = new Date(`${year}/${month}/1`)
      const week = date.getDay()

      const days = []

      for (let i = 0; i < week; i++) {
        days.unshift({
          type: 'prev',
          checked: false,
          day: prevMonthLastDay - i
        })
      }

      return days
    },
    getCurrentMonthDays(year, month) {
      const currentMonthLastDay = this.getMonthLastDay(year, month)
      const checks = this.checks
      const days = []
      const {
        year: currentYear,
        month: currentMonth,
        day: currentDay
      } = this.getCurrentDate()

      for (let i = 1; i <= currentMonthLastDay; i++) {
        let checked = false
        let isToday =
          currentYear === year && currentMonth === month && currentDay === i

        checks.forEach(date => {
          const dateArr = date.split('-')

          if (year == dateArr[0] && month == dateArr[1] && i == dateArr[2]) {
            checked = true
          }
        })

        days.push({
          type: 'current',
          checked,
          isToday,
          day: i
        })
      }
      return days
    },
    getNextMonthDays(year, month) {
      const currentMonthLastDay = this.getMonthLastDay(year, month)
      const date = new Date(`${year}/${month}/${currentMonthLastDay}`)
      const week = date.getDay()
      const days = []

      let day = 0

      for (let i = week + 1; i <= 6; i++) {
        day++

        days.push({
          type: 'next',
          checked: false,
          day
        })
      }

      return days
    },
	//进入页面得到用户信息
	getScore_info() {
	  getUserProfile().then(response => {
	    this.user = response.data
				  this.getScore_info_sub(this.user.userId)
	  })
	},
	//通过用户id得到用户积分表
	getScore_info_sub(userID){
				  getUser_score(userID).then(response => {
				    this.user_score = response.data
					// this.getLevel()
				  })
	},
	
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  background-color: #fff;
  color: $uni-text-color;
  .header {
    padding: 0 24upx;
    display: flex;
    justify-content: space-between;
    border-bottom: 2upx solid #eee;
    .current-date {
      text-align: center;
      font-size: 34upx;
      padding: 32upx 0;
      color: #030303;
    }
    .btn-group {
      display: flex;
      align-items: center;
      .btn {
        line-height: 1;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        text-align: center;
        box-sizing: border-box;
        font-weight: 500;
        padding: 12upx 20upx;
        font-size: 24upx;
        &.btn-prev {
          border-radius: 2px 0 0 2px;
          border-right: 0;
        }
        &.btn-next {
          border-radius: 0 2px 2px 0;
        }
      }
    }
  }
  .body {
    .weeks {
      display: flex;
      font-size: 30upx;
      padding: 32upx 0;
      .week-item {
        flex: 1;
        text-align: center;
      }
    }
    .day-list {
      display: flex;
      flex-wrap: wrap;
      .day-item {
        display: flex;
        justify-content: center;
        width: 14.285%;
        text-align: center;
        padding: 30upx 0;
        font-size: 36upx;
        color: #c8c8c8;
        &.current-month-day {
          color: #171717;
        }
        &.checked,
        &.today {
          padding: 26upx 0;
          .text {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 56upx;
            height: 56upx;
            border-radius: 100%;
            box-sizing: border-box;
            background-color: #3f9dff;
            color: #fff;
            font-size: 28upx;
            padding: 28upx 0;
          }
        }
      }
    }
  }
}
</style>
