<template>
	<view class="content">
		<!-- <view style="width: 750rpx;">
			<u-swiper :list="lblist" name="img" height="800" borderRadius="0"></u-swiper>
		</view> -->
		
		<image @click="gomycard()" v-if="banner" :src="banner" style="margin: 32rpx auto 1rpx auto; width: 715rpx;height: 380rpx;border-radius: 16rpx;box-shadow: 0 0 16rpx #2979FF;" mode=""></image>
		<!-- <view style="display: flex;flex-direction: column; width: 720rpx;margin: 12rpx auto;background: white;border-radius: 16rpx;">
			<view style="color: #2979FF;font-weight: bold;">
				免费领取积分卡
			</view>
		</view> -->
		<view style="width: 740rpx;display: flex;justify-content: space-between;margin: 24rpx auto;flex-wrap: wrap;">
			<view @click="gogoodinfo(u)" v-for="u in list" style="width: 350rpx;display: flex;margin: 10rpx auto; align-items: center; flex-direction: column;background: white;border-radius: 16rpx;">
				<image :src="u.img" style="width: 350rpx;height: 350rpx;border-top-left-radius: 16rpx;border-top-right-radius: 16rpx;" mode=""></image>
				<view class="u-line-1" style="width: 320rpx; color: rgb(41,121,255);font-size: 30rpx;font-weight: bold;margin: 8rpx auto;text-align: center;">
					{{u.title}}
				</view>
				<view style="color: #555555;font-size: 28rpx;margin-top: 8rpx;">
					{{u.price}}积分
				</view>
				<view style="margin: 12rpx auto;">
					<u-tag text="积分兑换" type="primary" mode="dark" shape="circle"></u-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				bgyx: false,
				lblist:['/static/mine/member/head.png','/static/mine/member/head.png'],
				banner:'/static/mine/member/head.png',
				list:[{
					img:'/static/mine/member/head.png',
					title:'书本',
					price:8
				},1,1,1,1,1,1,1,1,1,1]
			}
		},
		// computed: {
		//       ...mapGetters(['userInfo']),
		//     },
		onLoad() {
			var that = this
			this.getindexinfo()
		},
		onShareAppMessage() {
			
		},
		methods: {
			gogoodinfo:function(good){
				uni.navigateTo({
					// url:'/pages/index/goodsinfo?id='+good.id
					url:'/pages/mine/member/exchange/goodsinfo'
				})
			},
			gomycard:function(){
				uni.switchTab({
					url:'/pages/center/index'
				})
			},
			getindexinfo:function(){
				var that = this
				this.$u.post('getindexinfo').then(res=>{
					console.log(res)
					that.lblist = res.lblist
					that.banner = res.banner
					that.list = res.list
				})
			}
		}
	}
</script>
<style>
	page{
		background: rgb(152, 152, 152);
	}
</style>
<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 32rpx;
		font-weight: bold;
		color: #2b2b41;
	}
	
	.button-demo {
		margin-top: 80rpx;
	}
	
	.link-demo {
		margin-top: 80rpx;
	}
</style>
