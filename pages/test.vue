<template>
  <view class="container">
    <uni-list>
      <!-- <uni-list-item showExtraIcon="true" :extraIcon="{type: 'person-filled'}" title="id" :rightText="member.userId" /> -->
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'phone-filled'}" title="余额" :rightText="member.accumulate_money" />
      <!-- <uni-list-item showExtraIcon="true" :extraIcon="{type: 'email-filled'}" title="邮箱" :rightText="member.accumulate_money" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'calendar-filled'}" title="创建日期" :rightText="member.frozen_money" /> -->
    </uni-list>
	<text ></text>
  </view>
</template>

<script>
  import { getMemberProfile } from "@/api/system/user"

  export default {
    data() {
      return {
        member: {}
      }
    },
    onLoad() {
      this.getMember()
    },
    methods: {
      getMember() {
        getMemberProfile().then(response => {
          this.member = response.data
		  alert(response.data.accumulate_money)
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }
</style>
