<template>
	<view class="shop-list">
		<view class="shop-title f-color">
			<view class="shop-item">
				<view class="">价格</view>
				<view class="shop-icon">
					<view class="iconfont icon-shangjiantou up"></view>
					<view class="iconfont icon-xiajiantou down"></view>
				</view>
			</view>

			<view class="shop-item">
				<view class="">折扣</view>
				<view class="shop-icon">
					<view class="iconfont icon-shangjiantou up"></view>
					<view class="iconfont icon-xiajiantou down"></view>
				</view>
			</view>

			<view class="shop-item">
				<view class="">类别</view>
				<view class="shop-icon">
					<view class="iconfont icon-shangjiantou up"></view>
					<view class="iconfont icon-xiajiantou down"></view>
				</view>
			</view>

		</view>
		<Lines></Lines>

		<CommodityList :dataList='dataList'></CommodityList>

	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	import Lines from "@/components/shop/common/Lines.vue"
	import CommodityList from "@/components/shop/common/CommodityList.vue"
	export default {
		props:{
			keyword:String
		},
		data() {
			return {
				dataList: []
			}
		},
		components: {
			Lines,
			CommodityList
		},
		mounted() {
			this.getData();
		},
		methods:{
			//请求搜索数据
			getData(){
				$http.request({
					url: "/goods/search",
					data:{
						name:this.keyword,
						nprice:"desc"
					}
				}).then((res) => {
					this.dataList = res;
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style scoped>
	.shop-title {
		display: flex;
	}

	.shop-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
	}

	.shop-icon {
		position: relative;
		margin-left: 10rpx;
	}

	.iconfont {
		width: 16rpx;
		height: 8rpx;
		position: absolute;
		left: 0;
	}

	.up {
		top: -24rpx;
	}

	.down {
		top: -24rpx;
	}
</style>
