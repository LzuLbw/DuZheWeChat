<template>
	<view class="search">
		<Lines></Lines>
		<view class="search-item">
			<view class="search-title">
				<view class="f-color">最近搜索</view>
				<view class="iconfont icon-lajixiang" @tap="clearHistory"></view>
			</view>
			<view v-if="searchData.length > 0 ">
				<view class="search-name f-color" v-for="(item,index) in searchData" :key="index" @tap="toSearchList(item)">{{item}}</view>
				<view class="search-name f-color">刘慈欣</view>
			</view>
			<view v-else class="search-end">暂无搜索记录</view>
		</view>

		<view class="search-item">
			<view class="search-title">
				<view class="f-color">热门搜索</view>
			</view>
			<view>
				<view class="search-name f-color">三体</view>
				<view class="search-name f-color">刘慈欣</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Lines from "@/pagesA/components/common/Lines.vue"
	export default {
		data() {
			return {
				//输入的关键词
				keyword: '',
				//已经搜索的词
				searchData: []
			}
		},
		onLoad() {
			uni.getStorage({
				key: "searchData",
				success: (res) => {
					this.searchData = JSON.parse(res.data);
				}
			})
		},
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text;
		},
		onNavigationBarButtonTap(e) {
			this.search();
		},
		onNavigationBarSearchInputConfirmed() {
			this.search();
		},
		components: {
			Lines
		},
		methods: {
			search() {
				if (this.keyword === "") {
					return uni.showToast({
						title: "关键字不能为空",
						icon: "none"
					})
				} else {
					this.toSearchList(this.keyword);
				}
				uni.hideKeyboard();
				this.addsearch();

			},
			//记录最近搜索值
			addsearch() {
				let idx = this.searchData.indexOf(this.keyword);
				if (idx < 0) {
					this.searchData.unshift(this.keyword);
				} else {
					this.searchData.unshift(this.searchData.splice(idx, 1)[0]);
				}
				uni.setStorage({
					key: "searchData",
					data: JSON.stringify(this.searchData)
				})
			},
			//清楚搜索记录
			clearHistory() {
				uni.showModal({
					title: "重要提示",
					content: "是否清楚搜索记录",
					cancelText: "取消",
					confirmText: "确定",
					success: (res) => {
						if (res.confirm) {
							uni.removeStorage({
								key: "searchData"
							})
							this.searchData = [];
						}
					}
				})

			},
			//点击搜索记录进入页面
			toSearchList(item){
				uni.navigateTo({
					url: "/pages/shop/search-list/search-list?keyword=" + item + " "
				})
			}
		}
	}
</script>

<style scoped>
	.search-item {
		padding: 20rpx;
	}

	.search-title {
		display: flex;
		justify-content: space-between;
	}

	.search-name {
		padding: 4rpx 24rpx;
		background-color: "#E1E1E1";
		display: inline-block;
		border-radius: 26rpx;
		margin: 10rpx;
	}

	.search-end {
		text-align: center;
	}
</style>
