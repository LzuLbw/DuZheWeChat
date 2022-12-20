<template>
  <view class="flex-col page">
    <view class="flex-col content">
      <view class="flex-col">
        <view class="flex-col items-start">
          <view class="page_title">{{stationDeatil.name}}</view>
          <view class="address_text">{{stationDeatil.location}}</view>
        </view>
        <image
          class="banner_image"
          :src="stationDeatil.imageUrl"
        />
      </view>
      <view class="flex-col group_5">
        <view class="page_title">简介</view>
        <view class="paragraph_text">
          {{stationDeatil.description}}
        </view>
      </view>
      <button class="button" plain="true" size="mini" type="primary">
		  <view class="button_text">进入小站</view>
		</button>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
		  stationDeatil:{}
	  };
    },
	onLoad(option){
		this.loadData(parseInt(option.id));
	},
    methods: {
		async loadData(id){
			const that = this;
			await uni.request({
				url:'http://localhost:8080/readerstation/' + id,
				success: (res) => {
					console.log(res.data);
					that.stationDeatil = res.data.data;
				}
			})
		},
	},
  };
</script>

<style scoped lang="scss">
  .page {
    background-color: #ffffffff;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .content {
      padding: 28rpx 40rpx 38rpx;
      flex: 1 1 auto;
      overflow-y: auto;
      .page_title {
        align-self: flex-start;
        color: #000000;
        font-size: 36rpx;
        font-family: 'PingFangSC-Semibold';
        font-weight: 600;
        line-height: 50rpx;
      }
      .address_text {
        margin-top: 8rpx;
        color: #000000;
        font-size: 26rpx;
        font-family: 'PingFangSC-Regular';
        line-height: 36rpx;
      }
      .banner_image {
        margin-top: 32rpx;
        border-radius: 16rpx;
        width: 670rpx;
        height: 400rpx;
      }
      .group_5 {
        margin-right: 14rpx;
        margin-top: 64rpx;
        .paragraph_text {
          margin-top: 32rpx;
          color: #000000;
          font-size: 26rpx;
          font-family: 'PingFangSC-Regular';
          line-height: 48rpx;
          text-align: left;
        }
      }
      .button {
		background-color: #006eff;
        margin-top: 60rpx;
        padding: 40rpx 0;
		align-items: center;
        border-radius: 8rpx;
        width: 200rpx;
		display: flex;
        .button_text {
          color: #ffffff;
          font-size: 34rpx;
		  margin-left: 30rpx;
          line-height: 48rpx;
		  align-self: center;
		  display: flex;
        }
      }
    }
  }
</style>