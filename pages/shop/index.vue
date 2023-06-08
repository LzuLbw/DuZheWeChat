<template>
	<view>
		<!-- 轮播图 -->
		<view>
			<view class="swiper">
				<view class="swiper-box">
					<swiper circular="true" autoplay="true" @change="swiperChange">
						<swiper-item v-for="swiper in swiperList" :key="swiper.swiper_id">
							<image class="swiper-image" :src="swiper.swiperUrl"
								@tap="toSwiper(swiper)"></image>
						</swiper-item>
					</swiper>
					<view class="indicator">
						<view class="dots" v-for="(swiper, index) in swiperList"
							:class="[currentSwiper >= index ? 'on' : '']" :key="index"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 分类列表 -->
		<view class="category-list">
			<view class="category">
				<view class="category-img">
					<image class="category-image" src="/static/image/category/book.png" @tap="toCategoryDetail(1)">
					</image>
				</view>
				<view class="category-text">书籍</view>
			</view>

			<view class="category">
				<view class="category-img">
					<image class="category-image" src="/static/image/category/stationery.png"
						@tap="toCategoryDetail(2)"></image>
				</view>
				<view class="category-text">文具</view>
			</view>

			<view class="category">
				<view class="category-img">
					<image class="category-image" src="/static/image/category/wenchuang.png" @tap="toCategoryDetail(3)">
					</image>
				</view>
				<view class="category-text">文创产品</view>
			</view>

			<view class="category">
				<view class="category-img">
					<image class="category-image" src="/static/image/category/foods.png" @tap="toDiancan()"></image>
				</view>
				<view class="category-text">食品</view>
			</view>

			<view class="category">
				<view class="category-img">
					<image class="category-image" src="/static/image/category/coffee.png" @tap="toDiancan()"></image>
				</view>
				<view class="category-text">饮料</view>
			</view>

			<view class="category">
				<view class="category-img">
					<image class="category-image" src="/static/image/category/category.png" @tap="toCategoryList()">
					</image>
				</view>
				<view class="category-text">分类</view>
			</view>

			<view class="category">
				<view class="category-img">
					<image class="category-image" src="/static/image/category/cart.png" @tap="toCart()"></image>
				</view>
				<view class="category-text">购物车</view>
			</view>

			<view class="category">
				<view class="category-img">
					<image class="category-image" src="/static/image/category/address.png" @tap="toAddress()"></image>
				</view>
				<view class="category-text">地址</view>
			</view>

			<view class="category">
				<view class="category-img">
					<image class="category-image" src="/static/image/category/order.png" @tap="toOrder()"></image>
				</view>
				<view class="category-text">订单</view>
			</view>

		</view>
		<!-- 广告图 -->
		<view class="banner">
			<image mode="widthFix" src="/static/image/banner.jpg"></image>
		</view>
		<!-- 活动区 -->
		<view class="promotion">
			<view class="promotion-text">优惠专区</view>
			<view class="promotion-list">
				<view class="promotion-column" v-for="(row, index) in Promotion" @tap="toPromotion(row)" :key="index">
					<view class="promotion-top">
						<view class="promotion-title">{{ row.title }}</view>
						<view class="promotion-countdown" v-if="row.countdown">
							<view>{{ row.countdown.h }}</view>
							:
							<view>{{ row.countdown.m }}</view>
							:
							<view>{{ row.countdown.s }}</view>
						</view>
					</view>
					<view class="promotion-left">
						<view class="promotion-ad">{{ row.ad }}</view>
						<view class="promotion-into">点击进入</view>
					</view>
					<view class="promotion-right">
						<image class="promotion-image" :src="row.img"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods-title">
				<image class="goods-image" src="/static/image/hua.png"></image>
				猜你喜欢
				<image class="goods-image" src="/static/image/hua.png"></image>
			</view>
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
			<!-- <view class="loading-text">{{ loadingText }}</view> -->
		</view>
	</view>

</template>

<script>
	import {
		getUserProfile
	} from "@/api/system/user"
	import $http from "@/common/api/request.js"
	export default {
		props: {
			bigH: {
				type: String,
				default: "375upx"
			}
		},
		components: {

		},
		onLoad() {
			this.initSwiper();
			this.initProductList();
			this.getUser();
		},
		onReady() {

		},
		//标题栏按钮点击
		onNavigationBarButtonTap(e) {
			if (e.float == 'left') {
				uni.navigateTo({
					url: "/pages/shop/search/search"
				})
			} else if (e.float == 'right') {
				uni.scanCode({
					onlyFromCamera: true,
					hideAlbum: true,
					success: function(res) {
						console.log(res.result);
						void plus.runtime.openURL(res.result, function() {})
					}
				})
			}
		},
		data() {
			return {
				/*选中索引*/
				swiperList: [],
				// 分类菜单
				categoryList: [],
				productList: [],
				currentSwiper: 0,
				Promotion: [],
				loadingText: '正在加载...',
				userId: 0
			}
		},
		methods: {
			getUser() {
				getUserProfile().then(response => {
					this.userId = response.data.userId;
				})
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			toSwiper(e) {
				uni.showToast({
					title: e.src,
					icon: 'none'
				});
			},
			//分类跳转
			// toCategory(e) {
			// 	uni.navigateTo({
			// 		url: '../../goods/goods-list/goods-list?cid=' + e.id + '&name=' + e.name
			// 	});
			// },
			//推荐商品跳转
			toPromotion(e) {
				uni.showToast({
					title: e.title,
					icon: 'none'
				});
			},
			//商品跳转
			toGoods(id) {
				console.log(id);
				uni.navigateTo({
					//url: '/pages/shop/goods/goods?id=' + id + ' &userId = '+this.userId
					url: '/pages/shop/goods/goods?id= ' + id + '&userId=' + this.userId + ''
				});
			},
			//购物车跳转
			toCart() {
				uni.navigateTo({
					url: '/pages/shop/cart/cart?userId= ' + this.userId + ''
				});
			},
			//我的地址跳转
			toAddress() {
				uni.navigateTo({
					url: '/pages/shop/address/address?userId= ' + this.userId + ''
				});
			},
			toOrder() {
				uni.navigateTo({
					url: '/pages/shop/order/order'
				});
			},
			toCategoryList() {
				uni.navigateTo({
					url: '/pages/shop/category/category?userId= ' + this.userId + ''
				});
			},
			toDiancan() {
				uni.navigateTo({
					url: '/pages/shop/diancan/diancan'
				});
			},
			initSwiper() {
				$http.request({
					url: "/goods/swiper"
				}).then((res) => {
					this.swiperList = res;
					console.log(this.swiperList);
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			initProductList() {
				$http.request({
					url: "/goods/list"
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
			toCategoryDetail(categoryId) {
				uni.navigateTo({
					url: '/pages/shop/category/categoryDetail?categoryId=' + categoryId + '&userId=' + this.userId + ''
				})
			}
		}
	}
</script>

<style scoped>
	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;
	}

	.swiper-box {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
		position: relative;
		z-index: 1;

		
	}
	.swiper-image{
		width: 100%;
		height: 100%;
	}
	.indicator {
		position: absolute;
		bottom: 20upx;
		left: 20upx;
		background-color: rgba(255, 255, 255, 0.4);
		width: 150upx;
		height: 5upx;
		border-radius: 3upx;
		overflow: hidden;
		display: flex;
	}
	
	.dots {
		width: 0upx;
		background-color: rgba(255, 255, 255, 1);
		transition: all 0.3s ease-out;
	}
	
	.on {
		width: (100%/3);
	}

	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;


	}

	.banner {
		width: 100%;
		height: 100%;
		margin: 40upx 4%;
	}
	
	.image {
			width: 100%;
			height: 20vw;
			border-radius: 10vw;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
	}

	.category {
		width: 25%;
		margin-top: 50upx;
		display: flex;
		flex-wrap: wrap;
	}

	.category-text {
		margin-top: 16upx;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 24upx;
		color: #3c3c3c;
	}

	.category-img {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.category-image {
		width: 9vw;
		height: 9vw;
	}

	.promotion {
		width: 100%;
		margin: 0 4%;
	}

	.promotion-text {
		width: 100%;
		height: 60upx;
		font-size: 34upx;
		font-weight: 600;
		margin-top: -10upx;
	}

	.promotion-list {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.promotion-column {
		width: 43%;
		padding: 15upx 3%;
		background-color: #ebf9f9;
		border-radius: 10upx;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.promotion-top {
		width: 100%;
		height: 40upx;
		display: flex;
		align-items: center;
		margin-bottom: 5upx;
	}

	.promotion-title {
		font-size: 30upx;
	}

	.promotion-countdown {
		margin-left: 20upx;
		display: flex;
		height: 40upx;
		display: flex;
		align-items: center;
		font-size: 20upx;
	}

	.promotion-view {
		height: 30upx;
		background-color: #f06c7a;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		border-radius: 4upx;
		margin: 0 4upx;
		padding: 0 2upx;
	}

	.promotion-left {
		width: 50%;
		height: 18.86vw;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
	}

	.promotion-ad {
		margin-top: 5upx;
		width: 100%;
		font-size: 22upx;
		color: #acb0b0;
	}

	.promotion-into {
		width: 100%;
		font-size: 24upx;
		color: #aaa;
		margin-bottom: 5upx;
	}

	.promotion--right {
		width: 18.86vw;
		height: 18.86vw;
	}

	.promotion-image {
		width: 100%;
		height: 18.86vw;
	}

	.goods-title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80upx;
		color: #f47825;
		font-size: 30upx;
		margin-top: 10upx;
	}

	.goods-image {
		width: 30upx;
		height: 30upx;
	}

	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}

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

	.goods-slogan {
		color: #807c87;
		font-size: 24upx;
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
