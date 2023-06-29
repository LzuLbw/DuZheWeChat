<template>
	<view class="">
		<view class="steps">
			<YSteps lineNum='0' color='##f2f2f2' backgroundColor='#f47952' :infoList='list'></YSteps>
		</view>
		<view class="returnedPurchaseDetail">
			<view class="item">退款信息</view>
			<view class="row" >
				<view class="order-info">
					<view class="left">
						<image class="image" :src="goodsData.goodsImgUrl"></image>
					</view>
					<view class="right">
						<view class="name">
							{{goodsData.goodsName}}
						</view>
						<view class="price-number">
							￥<view class="price">{{goodsData.goodsPrice}}</view>
							x<view class="number">{{goodsData.goodsNum}}</view>
						</view>
					</view>
			
				</view>
			</view>
			<view class="returnedPurchaseAmount">
				<view class="returnedAmount">退款金额</view>
				<view class="sum-price">￥{{goodsData.goodsPrice*goodsData.goodsNum}}</view>
			</view>
		</view>
		<!-- 脚部菜单 -->
		<view class="footer">
				<view class="settlement">
					<view class="btn" @tap="doCancleReturnedPurchase()">撤销申请</view>
					<view class="btn" >催处理</view>
				</view>
		</view>
	</view>
</template>
<script>
	import $http from "@/common/api/request.js"
	import YSteps from '@/components/shop/Y-Steps/Y-Steps.vue'
	export default {
		components: {
			YSteps
		},
		data() {
			return {
				list: [{
						date: '申请退款',
					},

					{
						date: '请等待商家处理',
						info: ''
					},

					{
						date: '退款成功',
					}
				],
				goodsData:{},
				userId:0
			};

		},
		onLoad(e) {
			console.log(e);
			this.goodsData = e;
			console.log(this.goodsData);
			this.userId = e.userId
		},
		methods: {
			doCancleReturnedPurchase(){
				$http.request({
					url: "/shop/doCancleReturnedPurchase",
					method: "POST",
					data: {
						userId: this.userId,
						orderId: this.goodsData.orderId
					}
				}).then((res) => {
					uni.showToast({
						title: "撤销成功",
						icon: "none",
						duration: 2000
					})
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
				uni.redirectTo({
					url: '/pages/shop/order_list/order_list?tbIndex=4&userId= '+this.userId+''
				})
			}
		}
	}
</script>

<style scoped>
	.steps {
		background-color: #fff;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-radius: 20upx 20upx 20upx 20upx;
	}

	.returnedPurchaseDetail {
		background-color: #fff;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-radius: 20upx 20upx 20upx 20upx;
	}
	.item{
		padding-top: 10rpx;
		padding-left: 10rpx;
		font-size: 40rpx;
	}
	.row{
		width: 100%;
		padding: 10upx 20upx;
		border-radius: 10upx;
		background-color: #fff;
		margin-bottom: 20upx;
	}
	.order-info{
		width: 100%;
		display: flex;
	}
	.left {
		flex-shrink: 0;
		width: 25vw;
		height: 25vw;
	}
	.image {
		width: 25vw;
		height: 25vw;
		border-radius: 10upx;
	}
	.right{
		width: 100%;
		margin-left: 10upx;
		position: relative;
	}
	.name{
		width: 100%;
		font-size: 28upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.price-number {
		position: absolute;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		font-size: 22upx;
		color: #333;
		display: flex;
		align-items: flex-end;
	}
	.price {
		font-size: 24upx;
		margin-right: 5upx;
	}
	.sum {
		padding: 0 8upx;
		display: flex;
		align-items: flex-end;
	}
	.sum-price {
		font-size: 30upx;
		padding-right: 10rpx;
	}
	.detail{
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		height: 60upx;
		font-size: 26upx;
	}
	.returnedPurchaseAmount{
		display: flex;
		justify-content: space-between;
	}
	.returnedAmount{
		padding-top: 10rpx;
		padding-left: 10rpx;
		font-size: 35rpx;
		padding-bottom: 10rpx;
	}
	.footer{
		width: 100%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
	}
	.settlement {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		margin-right: 10rpx;
	}
	.btn {
		margin-left: 10rpx;
		margin-right: 10rpx;
		padding: 0 30upx;
		height: 50upx;
		background-color: #f06c7a;
		color: #fff;
		display: flex;
		justify-content: flex-end;
		align-items: center; 
		border-radius: 30upx;
	}
</style>
