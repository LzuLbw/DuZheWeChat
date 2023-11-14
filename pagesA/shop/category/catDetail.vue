<template>
	<view class="product-list">
		<view class="product" v-for="(item,index) in productList" :key="index" @tap="toGoods(item.id)">
			<image class="product-image" :src="item.imgUrl" :style=" 'height:' + bigH+';'"></image>
			<view class="goods-name">{{ item.name }}</view>
			<view class="goods-info">
				<view class="goods-price">￥{{ item.nprice }}</view>
				<view class="old-price">￥{{ item.oprice }}</view>
				<view class="discount">{{ item.discount }}折</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	export default {
		props: {
			bigH: {
				type: String,
				default: "375upx"
			}
		},
		onLoad(e) {
			console.log(e.userId);
			this.catId = e.catId;
			this.userId = e.userId;
			console.log(this.catId);
			this.initProductList();
		},
		data(){
			return{
				productList: [],
				catId:0,
				userId:0
			}
		},
		methods: {
			toGoods(id) {
				uni.navigateTo({
					url: '/pagesA/shop/goods/goods?id=' + id + '&userId=' + this.userId + ''
				});
			},
			initProductList() {
				$http.request({
					url: "/goods/CatList",
					method: "GET",
					data: {
						catId:this.catId
					}
				}).then((res) => {
					console.log(res);
					this.productList = res;
					console.log(this.productList);
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
		}
	}
</script>

<style>
	.product-list {
		width: 100%;
		padding: 0 4% 3vw 4%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.product {
		width: 48%;
		border-radius: 20upx;
		background-color: #fff;
		margin: 0 0 15upx 0;
		box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

	}

	.product-image {
		width: 100%;
		border-radius: 20upx 20upx 0 0;
	}

	.goods-name {
		width: 92%;
		padding: 10upx 4%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-align: justify;
		overflow: hidden;
		font-size: 30upx;
	}

	.goods-info {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		width: 92%;
		padding: 10upx 4% 10upx 4%;
	}

	.goods-price {
		color: #e65339;
		font-size: 30upx;
		font-weight: 600;
	}

	.old-price {
		text-decoration: line-through;
		font-size: 24upx;
		color: #999999;
	}

	.discount {
		border-radius: 4upx;
		border: 1px solid #FF3333;
		padding: 2upx 10upx;
		font-size: 20upx;
		color: #FF3333;
	}
</style>
