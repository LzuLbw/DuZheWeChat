<template>
	<view class="content">
		<image :src="data.imgUrl" style="width: 750rpx;" mode="widthFix"></image>
		<view style="width: 720rpx;margin: 8rpx auto;font-size: 32rpx;color: #3c3e41;font-weight: bold;">
			{{data.title}}
		</view>
		<view style="width: 720rpx;display: flex;justify-content: space-between;margin-top: 12rpx;">
			<view class="">
				<u-icon name="/static/jifen.png" size="32" label-size="52" :label="data.price" label-color="#1296db"></u-icon>
				<text style="color: #1296db;font-size: 25rpx;margin-left: 6rpx;">{{data.score}}积分</text>
			</view>
		</view>
		<view style="width: 720rpx;height: 10rpx;background: #e8ebf5;margin: 18rpx auto;"></view>
		<view style="width: 720rpx;margin: 8rpx auto;display: flex;align-items: center;">
			<view style="width: 8rpx;height: 32rpx;background: #1296db;border-radius: 8rpx;"></view>
			<view style="font-size: 32rpx;margin-left: 6rpx;color: #3c3e41;">
				商品简介
			</view>
		</view>
		<view style="width: 700rpx;margin: 24rpx auto;height: 1rpx;background: #f1f1f1;">
			
		</view>
		<view style="width: 700rpx;margin: 8rpx auto;font-size: 28rpx;color: #424346;">
			{{data.introduction}}
		</view>
		<view style="width: 720rpx;height: 10rpx;background: #e8ebf5;margin: 18rpx auto;"></view>
		<view style="width: 720rpx;margin: 8rpx auto;display: flex;align-items: center;">
			<view style="width: 8rpx;height: 32rpx;background: #1296db;border-radius: 8rpx;"></view>
			<view style="font-size: 32rpx;margin-left: 6rpx;color: #3c3e41;">
				商品详情
			</view>
			
		</view>
		<view style="width: 700rpx;margin: 24rpx auto;height: 1rpx;background: #f1f1f1;">
			
		</view>
		<view style="width: 700rpx;margin: 8rpx auto;font-size: 28rpx;color: #424346;">
			<u-parse :html="data.info"></u-parse>
			{{data.content}}
		</view>
		<view style="width: 750rpx;height: 160rpx;">
			
		</view>
		<view style="width: 750rpx;display: flex;position: fixed;bottom: 0rpx;left: 0rpx;background: white;height: 100rpx;box-shadow: 0 0 23rpx #636363;">
			<view style="width: 500rpx;height: 100rpx;display: flex;align-items: center;margin-left: 16rpx;">
				积分兑换:{{data.price}}
			</view>
			<view @click="duihuan" style="width: 250rpx;height: 100rpx; background: #1296db;color: white;display: flex;align-items: center;justify-content: center;">
				积分兑换
			</view>
		</view>
	</view>
</template>

<script>
	import { listPrize, getPrize, delPrize, addPrize, updatePrize } from "@/api/readerstation-member/prize";
	export default {
		data() {
			return {
				data:{},
				userinfo:''
			}
		},
		onLoad(o) {
			// var id = o.id
			var that = this
			this.getgoodinfo(o.id)
		},
		onShareAppMessage() {
			
		},
		onShow() {
			var that = this
			var app = getApp()
			if(app.globalData.userinfo){
				this.userinfo = app.globalData.userinfo
			}else{
				uni.login({
					success(res) {
						var code = res.code
						that.$u.post('wxuserlogin',{code:code}).then(res=>{
							console.log(res)
							if(res){
								that.userinfo = res
								app.globalData.userinfo = res
							}
						})
					}
				})
			}
		},
		methods: {
			duihuan:function(){
				var that = this
				if(this.userinfo){
					if(this.userinfo.money < this.data.price){
						uni.showToast({
							title:'积分不足',
							icon:'none'
						})
					}else{
						uni.showModal({
							title:'确认兑换',
							content:'兑换此商品需要'+that.data.price+'积分,确认兑换吗?',
							complete(res) {
								console.log(res)
								// var that = this
								if(res.confirm){
									that.$u.post('userdhgood',{gid:that.data.id,uid:that.userinfo.id}).then(res=>{
										console.log(res)
										if(res.code == 200){
											uni.showToast({
												title:'兑换成功'
											})
											setTimeout(function(){
												uni.switchTab({
													url:'/pages/center/index'
												})
											},1500)
										}else{
											uni.showToast({
												title:res.msg,
												icon:'none'
											})
										}
									})
								}else{
									
								}
							}
						})
					}
				}else{
					uni.showToast({
						title:'请先登录'
					})
					setTimeout(function(){
						uni.switchTab({
							url:'/pages/center/index'
						})
					},1500)
				}
			},
			getgoodinfo:function(id){
				// alert(id)
				getPrize(id).then(response => {
				        this.data = response.data;
						// alert(this.data)
				      });
				// alert(this.data)
				// var that = this
				// // this.$u.post('getgoodsinfo').then(res=>{
				// 	// console.log(res)
				// 	that.data = u
				// })
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
