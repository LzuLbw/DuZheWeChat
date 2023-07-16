<template>
	<view>
		<view class="bg-color-white border-bottom-left-radius-xl border-bottom-right-radius-xl padding-lg">
			<view class="row-start-center padding-v-side-lg border-bottom-solid-1">
				<image class="img-size-lg border-radius-base margin-right-lg" :src="productImage" mode="aspectFit">
				</image>
				<text class="font-size-lg font-weight-bold">商品评价</text>
				<uni-rate class="margin-side-lg" :size="toPx(UNI_FONT_SIZE_BASE)*1.5" :active-color="UNI_COLOR_RED"
					:value="productRate" v-model="productRate"></uni-rate>
				<text class="font-size-lg text-color-greyblack">{{rateOptions[parseInt(productRate) - 1]}}</text>
			</view>

			<textarea class="font-size-lg margin-top-lg comment-textarea" value="" :maxlength="maxCommentContentCount"
				placeholder="点击下方小标签写出您的感受,可以帮助更多小伙伴哦~" v-model="commentContent" />

			<view class="row-end-center margin-bottom-base">
				<view class="">
					<text
						class="font-size-base text-color-greyblack">{{commentContent.length}}/{{maxCommentContentCount}}</text>
				</view>
			</view>

			<cl-upload v-model="list" action="http://123.56.217.170:8080/common/upload" @onSuccess="onSuccess">
			</cl-upload>

			<checkbox-group class="margin-top-base" name=""  @change="onAnonymousChange">
				<label class="row-start-center">
					<checkbox value="isAnonymous" checked="true" class="checkbox" />
					<text class="font-size-lg">匿名评价</text>
				</label>
			</checkbox-group>
		</view>
		<view class="bg-color-white border-radius-xl padding-lg margin-top-base">
			<view class="row-between-center margin-bottom-base">
				<text class="font-size-lg font-weight-bold">物流服务评价</text>
				<text class="font-size-lg text-color-greyblack">满意请给5星哦</text>
			</view>

			<view class="logistics-comment-item">
				<view class="logistics-comment-item-label">
					<text class="logistics-comment-item-label-text">商品符合度</text>
				</view>
				<uni-rate :active-color="UNI_COLOR_RED" :size="toPx(UNI_FONT_SIZE_BASE)*1.5"
					class="logistics-comment-item-rate" v-model="conformityOfGoodsRate"></uni-rate>
			</view>
			<view class="logistics-comment-item">
				<view class="logistics-comment-item-label">
					<text class="logistics-comment-item-label-text">店家服务态度</text>
				</view>
				<uni-rate :active-color="UNI_COLOR_RED" :size="toPx(UNI_FONT_SIZE_BASE)*1.5"
					class="logistics-comment-item-rate" v-model="shopOwnerServiceAttitudeRate"></uni-rate>
			</view>
			<view class="logistics-comment-item">
				<view class="logistics-comment-item-label">
					<text class="logistics-comment-item-label-text">快递配送速度</text>
				</view>
				<uni-rate :active-color="UNI_COLOR_RED" :size="toPx(UNI_FONT_SIZE_BASE)*1.5"
					class="logistics-comment-item-rate" v-model="expressDeliverySpeedRate"></uni-rate>
			</view>
			<view class="logistics-comment-item">
				<view class="logistics-comment-item-label">
					<text class="logistics-comment-item-label-text">快递员服务</text>
				</view>
				<uni-rate :active-color="UNI_COLOR_RED" :size="toPx(UNI_FONT_SIZE_BASE)*1.5"
					class="logistics-comment-item-rate" v-model="courierServiceRate"></uni-rate>
			</view>
			<view class="logistics-comment-item">
				<view class="logistics-comment-item-label">
					<text class="logistics-comment-item-label-text">快递包装</text>
				</view>
				<uni-rate :active-color="UNI_COLOR_RED" :size="toPx(UNI_FONT_SIZE_BASE)*1.5"
					class="logistics-comment-item-rate" v-model="expressPackageRate"></uni-rate>
			</view>

			<view class="margin-top-lg" @tap="onConfirmTap">
				<view class="row-center-center bg-color-red border-radius-lg padding-base">
					<text class="font-size-lg text-color-white">提交</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		toPx
	} from 'common/shop/helper.js';
	import style from 'common/shop/style.js';
	import $http from "@/common/api/request.js"
	export default {
		data() {
			return {
				...style,
				productImage: '',
				productRate: 0,
				rateOptions: ['非常差', '差', '一般', '好', '非常好'],
				maxCommentContentCount: 300,
				commentContent: '',
				isAnonymous: false,
				conformityOfGoodsRate: 0,
				shopOwnerServiceAttitudeRate: 0,
				expressDeliverySpeedRate: 0,
				courierServiceRate: 0,
				expressPackageRate: 0,
				list: [],
				userId: '',
				goodsId: '',
			}
		},
		onLoad(e) {
			console.log(e);
			this.productImage = e.imgUrl;
			this.userId = e.userId;
			this.goodsId = e.goodsId;
			console.log(this.goodsId);
		},
		methods: {
			toPx,
			onAnonymousChange(e) {
				console.log(e.detail.value);
				this.isAnonymous = (e.detail.value.indexOf('isAnonymous') !== -1);
			},
			onConfirmTap() {
				console.log(this.list);
				console.log(this.goodsId);
				let upLoadUrl = [];
				let len = this.list.length;
				const isAnonymous = 0;
				for (let i = 0; i < len; i++) {
					upLoadUrl.push(this.list[i]);
				}
				if (upLoadUrl.length < 5) {
					const diff = 5 - upLoadUrl.length;
					for (let i = 0; i < diff; i++) {
						upLoadUrl.push(null);
					}
				}
				if(this.isAnonymous){
					isAnonymous = 1
				}
				console.log(upLoadUrl);
				$http.request({
					url: "/shop/goodsComment",
					method: "POST",
					data: {
						goodsId: this.goodsId,
						userId: this.userId,
						productRate: this.productRate,
						commentContent: this.commentContent,
						medias: this.medias,
						isAnonymous: isAnonymous,
						conformityOfGoodsRate: this.conformityOfGoodsRate,
						shopOwnerServiceAttitudeRate: this.shopOwnerServiceAttitudeRate,
						expressDeliverySpeedRate: this.expressDeliverySpeedRate,
						courierServiceRate: this.courierServiceRate,
						expressPackageRate: this.expressPackageRate,
						upLoadUrl: upLoadUrl
					}
				}).then((res) => {
					uni.showToast({
						title: "提交成功",
						icon: "none"
					})
					uni.navigateTo({
						url: '/pages/shop/order/order'
					});
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})


			},
			onSuccess(reslut) {
				// 把服务端返回的图片地址添加到list中与组件数据同步
				console.log(reslut);
				this.list.push(reslut.url)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-color-white {
		color: #FFFFFF;
	}

	.padding-base {
		padding: 20rpx 16rpx;
	}

	.border-radius-lg {
		border-radius: 12rpx;
	}

	.bg-color-red {
		background-color: #dd524d;
	}

	.row-center-center {
		@include flex-layout(row, center, center);
	}

	.row-between-center {
		@include flex-layout(row, space-between, center);
	}

	.border-radius-xl {
		border-radius: 24rpx;
	}

	.row-start-center {
		@include flex-layout(row, flex-start, center);
	}

	.margin-top-base {
		margin-top: 20rpx;
	}

	.font-size-base {
		font-size: 28rpx;
		line-height: 28rpx * 1.4;
	}

	.margin-bottom-base {
		margin-bottom: 20rpx;
	}

	.row-end-center {
		@include flex-layout(row, flex-end, center);
	}

	.comment-textarea {
		height: 300rpx;
	}

	.margin-top-lg {
		margin-top: 30rpx;
	}

	.text-color-greyblack {
		color: #777;
	}

	.margin-side-lg {
		margin-left: 24rpx;
		margin-right: 24rpx;
	}

	.font-weight-bold {
		font-weight: bold;
	}

	.font-size-lg {
		font-size: 32rpx;
		line-height: 32rpx * 1.4;
	}

	.margin-right-lg {
		margin-right: 40upx;
	}

	.border-radius-base {
		border-radius: 6rpx;
	}

	.img-size-lg {
		width: 80rpx;
		height: 80rpx;
	}

	.border-bottom-solid-1 {
		@include border([] [] [1px solid] []);
	}

	.padding-v-side-lg {
		padding-top: 30rpx;
		padding-bottom: 30rpx;
	}

	.padding-lg {
		padding: 30rpx 24rpx;
	}

	.border-bottom-right-radius-xl {
		border-bottom-right-radius: 24rpx;
	}

	.border-bottom-left-radius-xl {
		border-bottom-left-radius: 24rpx;
	}

	.bg-color-white {
		background-color: #FFFFFF;
	}

	.img-size-lg {
		width: 80rpx;
		height: 80rpx;
	}

	.comment-textarea {
		height: 300rpx;
	}

	.logistics-comment-item-label {
		width: 200rpx;
	}

	.logistics-comment-item-label-text {
		font-size: 32rpx;
	}

	.logistics-comment-item-rate {}
</style>
