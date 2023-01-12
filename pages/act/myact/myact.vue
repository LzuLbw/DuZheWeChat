<template>
	<view>

		<u-subsection :list="list" :current="current" @change="sectionChange"></u-subsection>
		<!-- 
		<text>
			{{activitydata}}
		</text> -->
		<view v-for="(item,index) in activitydata">

			<view @click="opendetail(item.activityId)" :data-activityid="item.activityId">


				<uni-card :cover="'http://localhost/dev-api' + activitydata[index].activityPicUrl">

					<view>
						<uni-tag :text="activitydata[index].activityReviewstatus"  v-if="tagtag"
							custom-style="background-color: #00557f; border-color: #4335d6; color: #fff;float:right;">
						</uni-tag>
						
						<text class="uni-body">{{item.activityMaintitle}}</text><br>
						<text class="uni-body">{{item.activitySubtitle}}</text>
					</view>

				</uni-card>

			</view>

		</view>

		<view style="margin-top: 100px;">
			<u-empty mode="data" :show="show">
			</u-empty>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				show: false,
				
				tagtag: false,

				list: ['已报名的活动', '申请发布的活动'],
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 1,

				//已经报名的活动信息
				activity_signup: [],
				//审核通过的活动信息
				activity_approved: [],
				//历史参加的活动信息
				activity_history: [],
				// 我申请发布的活动信息
				activity_application: [],

				activitydata: [],

				actPicUrl: []

			}
		},


		onLoad() {

			//请求接口拿到三种数据
			// this.signupinfo();


			// this.activity_signup = "已经报名的活动信息";
			// this.activity_approved = "已经审核的活动信息";
			// this.activity_history = "历史参加的活动信息";
			// this.activitydata.push(this.activity_signup);
			// this.activitydata.push(this.activity_approved);
			// this.activitydata.push(this.activity_history);
			// console.log(this.activitydata);
		},

		onShow() {
			this.sectionChange(0);
		},

		methods: {

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
			},

			sectionChange(index) {
				console.log("=========================>" + index);
				this.current = index;

				if (index === 0) {
					this.tagtag = false;
					
					// 已报名的活动
					// this.signupinfo();
					uni.request({
						url: 'http://localhost:8080/actActivity/signup/' + getApp().globalData.uid,
						method: 'GET',
						data: {},
						success: res => {
							console.log(res.data.data);
							
							this.activitydata = res.data.data;
							
						},
						fail: () => {},
						complete: () => {}
					});
					
					// 获取报名状态信息
					uni.request({
						url: 'http://localhost:8080/actSignupinfo/listActSignUser/' + getApp().globalData.uid,
						method: 'GET',
						data: {},
						success: res => {
							console.log(res.data.data);
						},
						fail: () => {},
						complete: () => {}
					});
					
					
				} else if (index === 1) {
					
					
					
					// console.log("暂未开发完成");
					this.tagtag = true;
					console.log(getApp().uid);

					uni.request({
						url: 'http://localhost:8080/actActivity/activity/user/application/' + getApp().globalData
							.uid,
						method: 'GET',
						data: {},
						success: res => {
							console.log(res.data.data.length);

							if (res.data.data.length == 0) {
								this.show = true;
							} else {
								this.show = false;
							}

							this.activitydata = res.data.data;


							console.log(res.data.data[0]);

							for (let i = 0; i < this.activitydata.length; i++) {

								if (this.activitydata[i].activityReviewstatus == 0) {
									this.activitydata[i].activityReviewstatus = "未审核";
								} else if (this.activitydata[i].activityReviewstatus == 1) {
									this.activitydata[i].activityReviewstatus = "申请已通过审核";
								} else if (this.activitydata[i].activityReviewstatus == 2) {
									this.activitydata[i].activityReviewstatus = "申请未通过审核";
								}
							}


						},
						fail: () => {},
						complete: () => {}
					});


					this.activitydata = [];
					// this.approvedinfo();
				} else if (index === 2) {
					console.log("暂未开发完成");
					this.activitydata = [];
					// this.endinfo();
				} else if (index == 3) {
					console.log("暂未开发完成!");
					this.activitydata = [];
				} else if (index == 4) {
					console.log("暂未开发完成");
					this.activitydata = [];
				}

			},
			signupinfo() {
				//已经报名
				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/signup/' + getApp().globalData.uid,
					method: 'GET',
					data: {},
					success: res => {
						console.log("已经报名的活动信息");
						console.log(res.data);
						console.log(res.data.data.length);
						if (res.data.data.length === 0) {
							this.show = true;
						} else {
							this.show = false;
						}
						// this.activity_signup = res.data;
						// this.activitydata.push(res.data);
						this.activitydata = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			approvedinfo() {
				//已经审核通过的活动信息
				uni.request({
					url: 'http://localhost:8080/actActivity/approved/' + getApp().globalData.uid,
					method: 'GET',
					data: {},
					success: res => {
						console.log("已经审核通过的活动信息");
						console.log(res.data);
						console.log(res.data.data.length);
						if (res.data.data.length === 0) {
							this.show = true;
						} else {
							this.show = false;
						}
						// this.activity_approved = res.data;
						// this.activitydata.push(res.data);
						this.activitydata = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			endinfo() {
				//历史参加的活动信息
				uni.request({
					url: 'http://localhost:8080/actActivity/end/' + getApp().globalData.uid,
					method: 'GET',
					data: {},
					success: res => {
						console.log("历史参加的活动信息");
						console.log(res.data);
						console.log(res.data.data.length);
						if (res.data.data.length === 0) {
							this.show = true;
						} else {
							this.show = false;
						}
						// this.activity_history = res.data;
						// this.activitydata.push(res.data);
						this.activitydata = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onNavigationBarButtonTap(e) {
			console.log("点击了申请发布活动按钮");
			uni.navigateTo({
				url: '../application/application',
				success: res => {
					console.log("打开申请发布活动页面成功");
				},
				fail: () => {
					console.log("打开申请发布活动页面失败");
				},
				complete: () => {}
			});
		}
	}
</script>

<style>
	.button {
		width: 10px;
		height: 10px;
		float: right;
	}
</style>
