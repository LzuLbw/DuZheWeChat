<template>
	<view class="">
		<view class="order-list">
			<view class="list">
				<view class="onorder" v-if="keepData.length==0">
					<image class="image" src="/static/image/shop/noorder.png"></image>
					<view class="text">
						没有相关收藏
					</view>
				</view>
				<view class="row" v-for="(row,index) in keepData" :key="index">
					<view class="order-info">
						<view class="left">
							<image class="left-image" :src="row.goods_imgUrl" @tap="togoodsDetail(row.goods_id)"></image>
						</view>
						<view class="right">
							<view class="name">
								{{row.goods_name}}
							</view>
							<view class="price-number">
								￥<view class="price">{{row.nprice}}</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	export default {
		data() {
			return {
				userId:0,
				keepData: []
			}
		},
		onLoad(e) {
			console.log(e);
			this.userId = e.userId;
			console.log(this.userId); 
			this.getData();
		},
		methods: {
			getData() {
				console.log(this.userId);
				$http.request({
					url: "/shop/selectKeepByUid",
					method: "POST",
					data: {
						userId: this.userId
					}
				}).then((res) => {
					console.log(res);
					this.keepData = res;
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			togoodsDetail(id){
				uni.navigateTo({
					url: '/pages/shop/goods/goods?id= ' + id + '&userId=' + this.userId + ''
				});
			}
		}
	}
</script>

<style>
	.order-list {
		margin-top: 10upx;
		padding-top: 20upx;
		width: 100%;
	}

	.list {
		width: 94%;
		margin: 0 auto;
	}

	.onorder {
		width: 100%;
		height: 50vw;
		display: flex;
		justify-content: center;
		align-content: center;
		flex-wrap: wrap;


	}

	.image {
		width: 20vw;
		height: 20vw;
		border-radius: 100%;
	}

	.text {
		width: 100%;
		height: 60upx;
		font-size: 28upx;
		color: #444;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.row {
		width: 100%;
		padding: 10upx 20upx;
		border-radius: 10upx;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.order-info {
		width: 100%;
		display: flex;
	}

	.left {
		flex-shrink: 0;
		width: 25vw;
		height: 25vw;


	}

	.left-image {
		width: 25vw;
		height: 25vw;
		border-radius: 10upx;
	}

	.right {
		width: 100%;
		margin-left: 10upx;
		position: relative;
	}

	.name {
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
</style>
