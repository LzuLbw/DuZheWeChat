<template>
	<!-- <button @click="print">打印所有活动信息</button> -->
	<!-- 全部活动卡片渲染 -->
	<view>
		<!-- 组合条件查询 -->
		<view style="display: flex;margin-top: 10px;margin-right: 10px;">
			<w-select style="margin-left: 20rpx;" v-model='chooseValue1' defaultValue="活动地点" :list='list1'
				valueName='content' @change='change1'>
			</w-select>
			<w-select style="margin-left: 20rpx;" v-model='chooseValue2' defaultValue="活动状态" :list='list2'
				valueName='content' @change='change2'>
			</w-select>
			<w-select style="margin-left: 20rpx;" v-model='chooseValue3' defaultValue="活动发起人" :list='list3'
				valueName='content' @change='change3'>
			</w-select>
		</view>


		<view v-for="(item,index) in AllActivityData">

			<view @click="opendetail(item.activityId)" :data-activityid="item.activityId">

				<uni-card :cover="AllActivityData[index].activityPicUrl">

					<view>
						<text class="uni-body">{{item.activityMaintitle}}</text><br>
						<text class="uni-body">{{item.activitySubtitle}}</text>
					</view>

				</uni-card>

			</view>

		</view>

		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				AllActivityData: [],
				scrollTop: 0,
				chooseValue1: "",
				chooseValue2: "",
				chooseValue3: "",

				//活动地点数据
				list1: [{
					id: 1,
					content: '线上'
				}, {
					id: 2,
					content: '线下'
				}],

				//活动状态数据
				list2: [{
						id: 1,
						content: '未开始'
					}, {
						id: 2,
						content: '报名中'
					},
					{
						id: 3,
						content: '进行中'
					},
					{
						id: 4,
						content: '已结束'
					}
				],

				//活动发起人数据
				list3: [{
					id: 1,
					content: '读者公司'
				}, {
					id: 2,
					content: '用户发起'
				}],

			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			console.log("当前所在位置：全部活动页面");
			console.log("当前登录用户id=", getApp().globalData.uid);

			//获取全部活动数据
			uni.request({
				url: 'http://localhost:8082/actActivity',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.data);
					this.AllActivityData = res.data.data;
				},
				fail: () => {},
				complete: () => {}
			});

		},
		methods: {

			change1(e) {
				console.log('活动地点', this.chooseValue1);
				console.log('活动状态', this.chooseValue2);
				console.log('活动发起人', this.chooseValue3);

				uni.request({
					url: 'http://localhost:8082/actActivity/condition/',
					method: 'POST',
					data: {

						"place": this.chooseValue1,
						"status": this.chooseValue2,
						"sponsor": this.chooseValue3

					},
					success: res => {
						console.log(res.data);
						this.AllActivityData = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});


			},
			change2(e) {
				console.log('活动地点', this.chooseValue1);
				console.log('活动状态', this.chooseValue2);
				console.log('活动发起人', this.chooseValue3);

				uni.request({
					url: 'http://localhost:8082/actActivity/condition/',
					method: 'POST',
					data: {

						"place": this.chooseValue1,
						"status": this.chooseValue2,
						"sponsor": this.chooseValue3

					},
					success: res => {
						console.log(res.data);
						this.AllActivityData = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			change3(e) {
				console.log('活动地点', this.chooseValue1);
				console.log('活动状态', this.chooseValue2);
				console.log('活动发起人', this.chooseValue3);

				uni.request({
					url: 'http://localhost:8082/actActivity/condition/',
					method: 'POST',
					data: {

						"place": this.chooseValue1,
						"status": this.chooseValue2,
						"sponsor": this.chooseValue3

					},
					success: res => {
						console.log(res.data);
						this.AllActivityData = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},


			change(e) {
				console.log("e:", e);
			},

			print() {
				console.log(this.AllActivityData);
			},
			opendetail(id) {
				console.log("点击查看活动ID为" + id + "的活动详情");
				uni.navigateTo({
					url: '../detail/detail?activityid=' + id,
					success: res => {
						console.log("打开成功,id = ", id);
					},
					fail: () => {
						console.log("打开详情页失败");
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		height: 200vh;
	}
</style>
