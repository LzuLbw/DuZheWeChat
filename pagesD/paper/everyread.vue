<template>
	<view class="page">
		<view class="content">
			<scroller @init="initScroller" @down="refreshData" @up="getData" :up="optUp" :fixed="true">
				<swiper class="swiper" :indicator-dots="true" :autoplay="true">
					<swiper-item class="item" v-for="(item,index) in slider" :key="index">
						<image :lazy-load="true" :src="item.imageUrl" mode="aspectFill" @click="toPage(item.id)"></image>
						<view class="title">
							<text>{{item.title}}</text>
						</view>
					</swiper-item>
				</swiper>
				<articleList :list="list"/>
			</scroller>
		</view>
	</view>
</template>

<script>
	import scroller from '@/pagesD/components/scroller/scroller.vue';
	import articleList from '@/components/list.vue';
	export default {
		data() {
			return {
				input:'',
				list: [],
				scroller: {},
				optUp: { auto: true, onScroll: true, page: { size: 20 }, empty: { tip: '暂无文章~' } },
				currentSliderIndex: '',
				slider: [],
				totalPage:0
			}
		},
		components:{
			scroller,
			articleList
		},
		mounted() {
			// this.getData()
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: '刷新中'
			});
			this.loadData();
		},
		methods: {
			initScroller(scroller) {
				this.scroller = scroller;
			},
			/*加载数据*/
			loadData() {
				this.slider = [];
				this.list = [];
				this.currentSliderIndex = 0;
				this.scroller.resetUpScroll();
			},
			/*刷新数据*/
			refreshData() {
				uni.showLoading({
					title: '刷新中'
				});
				this.scroller.resetUpScroll();
			},
			getData(){
				const that = this;
				uni.request({
					url:'http://123.56.217.170:8080/article/list',
					method:'GET',
					success: (res) => {
						console.log(res.data)
						var totalPage = Math.ceil(res.data.data.length / 10);
						that.list = res.data.data;
						that.slider = res.data.data.slice(0,10);
						that.scroller.endByPage(res.data.data.length, totalPage);
					},
					fail: res => {
						that.scroller.endErr();
					},
					complete: res => {
						uni.stopPullDownRefresh();
						uni.hideLoading();
					}
				})
			},
			toPage(id){
				id = parseInt(id);
				uni.navigateTo({
					url:'/pagesD/paper/detail?id=' + id,
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	page{
		height:100%;
	}
	.page {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}
	.content {
		flex: 1;
		margin-top: 70rpx;
		width: 100%;
		position: relative;
	}
	.swiper {
		margin: 0rpx 24rpx 0;
		image {
			height: 350rpx;
			width: 100%;
			border-radius: 15rpx;
			//box-shadow: 0 0 12px #dddee1;
		}
		.current {
			width: 97%;
			height: 350rpx;
			margin: 1.5% 1.5%;
			transition: all 0.2s ease-in 0s;
		}
		.item {
			position: relative;
			.title {
				position: absolute;
				left: 0;
				bottom: 0;
				display: flex;
				justify-content: center;
				width: 100%;
				text {
					margin: 7% 6%;
					display: flex;
					align-items: center;
					//background-image: linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
					//background-image: linear-gradient(90deg,rgba(255, 181, 19,.8),rgba(255, 181, 19,.2));
					color: #fff;
					display: -webkit-box;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
					font-size: 34rpx;
					padding: 14rpx 20rpx;
					max-width: 610rpx;
					line-height: 1.3;
					border-radius: 5rpx;
				}
			}
		}
	}
</style>
