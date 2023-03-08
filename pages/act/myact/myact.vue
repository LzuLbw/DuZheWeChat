<template>
	<view>

		<u-subsection :list="list" :current="current" @change="sectionChange"></u-subsection>
		<!-- 
		<text>
			{{activitydata}}
		</text> -->
		<view v-for="(item,index) in activitydata">

			<view @click="opendetail(item.activityId)" :data-activityid="item.activityId">


				<uni-card :cover="activitydata[index].activityPicurl">

					<view>
						<!-- 活动申请是否通过 -->
						<uni-tag :text="activitydata[index].activityReviewstatus" v-if="tagtag"
							custom-style="background-color: #00557f; border-color: #4335d6; color: #fff;float:right;">
						</uni-tag>
						
						<!-- 活动报名是否通过 -->
						<uni-tag :text="signupdata[index].approved" v-if="signtagtag"
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
	import $store from '@/store/modules/social/test.js';
	export default {
		data() {
			return {

				show: false,

				tagtag: false, // 活动申请是否通过
				signtagtag: true, //


				list: ['已报名的活动', '申请发布的活动'],
				// 或者如下，也可以配置keyName参数修改对象键名
				// list: [{name: '未付款'}, {name: '待评价'}, {name: '已付款'}],
				current: 0,

				//已经报名的活动信息
				activity_signup: [],
				//审核通过的活动信息
				activity_approved: [],
				//历史参加的活动信息
				activity_history: [],
				// 我申请发布的活动信息
				activity_application: [],

				activitydata: [],

				actPicUrl: [],
				signupdata: [],

				currentuname: "",
				currentuid: 0

			}
		},


		onLoad() {

			this.$store.dispatch('GetInfo').then(res => {
				console.log("当前登录用户的昵称为：", res.user.nickName);
				this.currentuname = res.user.nickName;
				console.log("当前登录用户的ID为", res.user.userId);
				this.currentuid = res.user.userId;

				this.sectionChange(1);
			});

		},

		onShow() {
			this.sectionChange(1);
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
				this.current = index;

				if (index === 0) {
					this.tagtag = false;
					this.signtagtag = true;

					// 已报名的活动
					// this.signupinfo();
					uni.request({
						url: 'http://123.56.217.170:8080/actActivity/signup/' + this.currentuid,
						method: 'GET',
						data: {},
						success: res => {
							console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							console.log(res.data.data);

							this.activitydata = res.data.data;
							if (res.data.data.length == 0) {
								this.show = true;
							} else {
								this.show = false;
							}


						},
						fail: () => {},
						complete: () => {}
					});

					// 获取报名状态信息
					uni.request({
						url: 'http://123.56.217.170:8080/actSignupinfo/listActSignUser/' + this.currentuid,
						method: 'GET',
						data: {},
						success: res => {

							console.log("??????????????????????????????????????");
							console.log(res.data.data);
							this.signupdata = res.data.data;

							for (let i = 0; i < this.signupdata.length; i++) {

								if (this.signupdata[i].approved == 0) {
									this.signupdata[i].approved = "报名还未审核";
								} else if (this.signupdata[i].approved == 1) {
									this.signupdata[i].approved = "报名已通过审核";
								} else if (this.signupdata[i].approved == 2) {
									this.signupdata[i].approved = "报名未通过审核 ：" + this.signupdata[i]
										.approvedmessage;
								}
							}
						},
						fail: () => {},
						complete: () => {}
					});


				} else if (index === 1) {

					this.tagtag = true;
					this.signtagtag = false;
					this.tagtag = true;

					uni.request({
						url: 'http://123.56.217.170:8080/actActivity/activity/user/application/' + this.currentuid,
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


							// console.log(res.data.data[0]);

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


					// this.activitydata = [];
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
					url: 'http://123.56.217.170:8080/actActivity/signup/' + this.currentuid,
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
					url: 'http://123.56.217.170:8080/actActivity/approved/' + this.currentuid,
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
					url: 'http://123.56.217.170:8080/actActivity/end/' + this.currentuid,
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
