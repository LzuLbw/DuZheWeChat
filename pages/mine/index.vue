<template>
  <view class="mine-container" :style="{height: `${windowHeight}px`}">
    <!--顶部个人信息栏-->
    <view class="header-section">
      <view class="flex padding justify-between">
        <view class="flex align-center">
          <view v-if="!avatar" class="cu-avatar xl round bg-white">
            <view class="iconfont icon-people text-gray icon"></view>
          </view>
          <image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round" mode="widthFix">
          </image>
          <view v-if="!name" @click="handleToLogin" class="login-tip">
            点击登录
          </view>
          <view v-if="name" @click="handleToInfo" class="user-info">
            <view class="u_title">
              {{ name }}
            </view>
          </view>
        </view>
        <view @click="handleToInfo" class="flex align-center">
          <text></text>
          <view class="iconfont icon-right you"></view>
        </view>
      </view>
    </view>

    <view class="content-section">
      <view class="mine-actions grid col-4 text-center">
        <view class="action-item" @click="handleMember">
          <view class="iconfont icon-friendfill text-pink icon"></view>
          <text class="text">我的会员</text>
        </view>
        <view class="action-item" @click="handleShop">
          <view class="iconfont icon-service text-blue icon"></view>
          <text class="text">我的订单</text>
        </view>
        <view class="action-item" @click="handleAct">
          <view class="iconfont icon-community text-mauve icon"></view>
          <text class="text">我的活动</text>
        </view>
        <view class="action-item" @click="handleBook">
          <view class="iconfont icon-dianzan text-green icon"></view>
          <text class="text">我的书架</text>
        </view>
      </view>

      <view class="menu-list">
        <view class="list-cell list-cell-arrow" @click="handleToEditInfo">
          <view class="menu-item-box">
            <view class="iconfont icon-user menu-icon"></view>
            <view>编辑资料</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleHelp">
          <view class="menu-item-box">
            <view class="iconfont icon-help menu-icon"></view>
            <view>常见问题</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleAbout">
          <view class="menu-item-box">
            <view class="iconfont icon-aixin menu-icon"></view>
            <view>关于我们</view>
          </view>
        </view>
        <!-- <view class="list-cell list-cell-arrow" @click="handleToSetting">
          <view class="menu-item-box">
            <view class="iconfont icon-setting menu-icon"></view>
            <view>应用设置</view>
          </view>
        </view> -->
      </view>
	  
	  <view class="menu-list">
	    <view class="list-cell list-cell-arrow" @click="handleToSetting">
	      <view class="menu-item-box">
	        <view class="iconfont icon-setting menu-icon"></view>
	        <view>应用设置</view>
	      </view>
	    </view>
	  </view>
	  
	  <!-- <view class="menu-list">
	    <view class="list-cell list-cell-arrow" @click="handleToOthers">
	      <view class="menu-item-box">
	        <view class="iconfont icon-setting menu-icon"></view>
	        <view>其他服务</view>
	      </view>
	    </view>
	  </view> -->

    </view>
  </view>
</template>

<script>
  // import storage from '@/utils/storage'
  
  export default {
    data() {
      return {
        name: this.$store.state.user.name,
        version: getApp().globalData.config.appInfo.version
      }
    },
    computed: {
      avatar() {
        return this.$store.state.user.avatar
      },
      windowHeight() {
        return uni.getSystemInfoSync().windowHeight - 50
      }
    },
    methods: {
      handleToInfo() {
        this.$tab.navigateTo('/pagesD/mine/info/index')
      },
      handleToEditInfo() {
        this.$tab.navigateTo('/pagesD/mine/info/edit')
      },
      handleToSetting() {
        this.$tab.navigateTo('/pagesD/mine/setting/index')
      },
	  handleToOthers() {
	    this.$tab.navigateTo('/pages/others/index')
	  },
      handleToLogin() {
        this.$tab.reLaunch('/pages/login')
      },
      handleToAvatar() {
        this.$tab.navigateTo('/pagesD/mine/avatar/index')
      },
      handleLogout() {
        this.$modal.confirm('确定注销并退出系统吗？').then(() => {
          this.$store.dispatch('LogOut').then(() => {
            this.$tab.reLaunch('/pages/index')
          })
        })
      },
      handleHelp() {
        this.$tab.navigateTo('/pagesD/mine/help/index')
      },
      handleAbout() {
        this.$tab.navigateTo('/pagesD/mine/about/index')
      },
      handleMember() {
        this.$tab.navigateTo('/pagesD/mine/member/index')
      },
      handleShop() {
        // this.$modal.showToast('模块建设中~')
		this.$tab.navigateTo('/pagesA/shop/order/order')
      },
	  handleAct() {
	  		this.$tab.navigateTo('/pagesB/act/myact/myact')
	  },
	  handleBook() {
	  		this.$tab.navigateTo('/pagesC/study/articleshell/articleshell')
	  }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f5f6f7;
  }
.you {
	color: #BEBEBE
}
  .mine-container {
    width: 100%;
    height: 100%;


    .header-section {
      padding: 15px 15px 45px 15px;
      // background-color: #3c96f3;
	  background-color: #f5f6f7;
      color: white;

      .login-tip {
        font-size: 18px;
        margin-left: 10px;
      }

      .cu-avatar {
        border: 2px solid #eaeaea;

        .icon {
          font-size: 40px;
		  
        }
      }

      .user-info {
        margin-left: 15px;
		color: grey;



        .u_title {
          font-size: 18px;
          line-height: 30px;
        }
      }
    }

    .content-section {
      position: relative;
      top: -50px;

      .mine-actions {
        margin: 15px 15px;
        padding: 20px 0px;
        border-radius: 8px;
        background-color: white;

        .action-item {
          .icon {
            font-size: 28px;
          }

          .text {
            display: block;
            font-size: 13px;
            margin: 8px 0px;
          }
        }
      }
    }
  }
</style>
