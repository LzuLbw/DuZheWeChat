<template>
	<view>
		<Lines></Lines>
		<view class="category">
			<!-- 左侧滑动 -->
			<scroll-view scroll-y="true" class="category-left" :style="'height:' +clentHeight+ 'px;'">
				<view v-for='(item,index) in leftData' :key="index" @tap="changeLeftTab(index,item.id)">
					<view class="left-name" :class=' activeIndex === index ?"left-name-active":"left-item"'>
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<!-- 右侧滑动 -->
			<scroll-view scroll-y="true" class="category-right" :style="'height:' +clentHeight+ 'px;'">
				<view class="right-list" v-for="(item,index) in rightData" :key="index">
					<block v-for="(k,i) in item" :key="i">
						<view class="list-title">{{k.cat_name}}</view>
						<view class="right-content">
							<view class="right-item" v-for="(j,idx) in k.children" :key="idx">
								<image class="right-img" :src= "'/static/image'+ (j.icon).substring(8)" mode="" @tap="toCatDetail(j.cat_id)"></image>
								<view class="right-name">{{j.cat_name}}</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>

	</view>

</template>

<script>
	import $http from "@/common/api/request.js"
	import Lines from "@/components/shop/common/Lines.vue"
	export default {
		//mixin: [uniCloud.mixinDatacom],
		data() {
			return {
				userId:0,
				clentHeight: 0,
				activeIndex: 0,
				//左侧数据
				leftData: [],
				//右侧数据
				rightData: [],
			}
		},
		//获取可视区域的高度值
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					this.clentHeight = res.windowHeight - this.getClentHeight();
				}
			})
		},
		onLoad(e) {
			this.getData();
			console.log(e.userId);
			this.userId = e.userId;
		},
		components: {
			Lines
		},
		methods: {
			//请求数据方法
			getData(id) {
				if (id === (this.activeIndex + 1)) {
					return;
				}

				$http.request({
					url: "/goods/category"
				}).then((res) => {
					console.log(res);
					let map = new Map();
					let trees = [];
					let arr = res;
					for (let v of arr){
					    // set(key,value)方法：	向当前Map对象中添加一个值，返回的Map对象，所以支持链式写法
					    map.set(v.cat_id, v)
					}
					for (let v of arr){
					    const pid = v.parent_cid;
					    if (!map.has(pid)) {
					        trees.push(v)
					    }
					    else {
					        const parent = map.get(pid)
					        !(parent.children instanceof Array) && (parent.children = [])
					        parent.children.push(v)
					    }
					}
					let leftData = [];
					let rightData = [];
					trees.forEach(v=>{
						leftData.push({
							id:v.cat_id,
							name:v.cat_name
						})
						//如果点击的id值相同
						if(v.cat_id===(this.activeIndex+1)){
							rightData.push(v.children);
							console.log(v.children);
						}
					})
					this.leftData = leftData;
					this.rightData = rightData;
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			getClentHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if (system === 'ios') {
					return 44 + res.statusBarHeight;
				} else if (system === 'android') {
					return 24 + res.statusBarHeight;
				} else {
					return 0;
				}
			},
			//左侧点击事件
			changeLeftTab(index, id) {
				this.getData(id);
				this.activeIndex = index;
			},
			toCatDetail(catId){
				console.log(catId);
				uni.navigateTo({
					url: '/pages/shop/category/catDetail?catId=' + catId + '&userId=' + this.userId + ''
				})
			}
		},
		//input输入框点击事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: "/pages/search/search"
			})
		}
	}
</script>

<style scoped>
	.category {
		display: flex;
	}

	,
	.category-left {
		width: 200rpx;
	}

	,
	.left-item {
		border-bottom: 2rpx solid #FFFFFF;
		font-size: 28rpx;
		font-weight: bold;
		background-color: #F7F7F7;
	}

	,
	.left-name {
		padding: 30rpx 6rpx;
		text-align: center;
	}

	,
	.left-name-active {
		border-left: 8rpx solid #49BDFB;
		background-color: #FFFFFF;
	}

	,
	.category-right {
		flex: 1;
		padding-left: 30rpx;
	}

	,
	.list-title {
		font-weight: bold;
		padding: 30rpx 0;

	}

	,
	.right-content {
		display: flex;
		flex-wrap: wrap;
	}

	,
	.right-item {
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		align-content: center;
		padding: 10rpx;
	}

	,
	.right-name {
		padding: 16rpx 0;
	}

	.right-img {
		width: 150rpx;
		height: 150rpx;
	}
</style>
