<template>
	<view>

		<u-subsection :list="list" :current="current" @change="sectionChange"></u-subsection>
		<!-- 
		<text>
			{{activitydata}}
		</text> -->
		<view v-for="(item,index) in activitydata" v-if="tagtag">

			<view @click="opendetail(item.activityId)" :data-activityid="item.activityId" style="text-align: center;">


				<uni-card :cover="activitydata[index].activityPicurl">

					<view>
						<uni-tag :text="item.activityReviewstatus"
							custom-style="background-color: #00557f; border-color: #4335d6; color: #fff;float:right;">
						</uni-tag>


						<text class="uni-body" style="float: left;">{{item.activityMaintitle}}</text><br>
						<text class="uni-body"
							style="float: left;font-size: 10px;color: gray;">{{item.activitySubtitle}}</text>
					</view>

				</uni-card>

			</view>

		</view>

		<view v-for="(item,index) in signupdata" v-if="signtagtag">


			<view @click="opendetail(item.activityid)" :data-activityid="item.activityid" style="text-align: center;">


				<uni-card :cover="signupdata[index].activity_picurl">

					<view>

						<uni-tag :text="item.approved" v-if="signtagtag"
							custom-style="background-color: #00557f; border-color: #4335d6; color: #fff;float:right;">
						</uni-tag>

						<text class="uni-body" style="float: left;">{{item.activity_maintitle}}</text><br>
						<text class="uni-body"
							style="float: left;font-size: 10px;color: gray;">{{item.activity_subtitle}}</text>
					</view>

				</uni-card>

			</view>

		</view>



		<view v-if="scantagtag">
			这是测试扫码签到的子界面

			<view class="qrimg">
				<tki-qrcode ref="qrcode" :cid="cid" :val="val" :size="size" :unit="unit" :background="background"
					:foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv"
					:onval="onval" :loadMake="loadMake" :showLoading="showLoading" :loadingText="loadingText"
					@result="qrR" />
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
	import tkiQrcode from "@/node_modules/tki-qrcode/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {

				// 生成二维码的信息
				cid: '',
				val: "{}",
				size: 200,
				unit: 'rpx',
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				showLoading: true,
				loadingText: '二维码生成中...',

				// 生成二维码

				show: false,

				tagtag: false, // 【查看申请发布活动】
				signtagtag: false, // 【查看报名的】
				scantagtag: false, // 【测试扫码签到】


				list: ['已报名的活动', '申请发布的活动', '签到签退'],
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
			// this.sectionChange(1);
		},

		methods: {

			qrR(res) {
				console.log(res);
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
			},

			sectionChange(index) {
				this.current = index;

				if (index === 0) {
					this.tagtag = false;
					this.scantagtag = false;
					this.signtagtag = true;

					this.activitydata = [];


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

								// 获取报名状态信息
								uni.request({
									url: 'http://123.56.217.170:8080/actSignupinfo/listActSignUser/' +
										this.currentuid,
									method: 'GET',
									data: {},
									success: res => {

										// console.log("??????????????????????????????????????");
										// console.log(res.data.data);
										this.signupdata = res.data.data;
										console.log("dingdingdingdddddddddddddddddddddddd");
										console.log(this.signupdata);

										for (let i = 0; i < this.signupdata.length; i++) {

											if (this.signupdata[i].approved === 0) {
												this.signupdata[i].approved = "报名还未审核";
											} else if (this.signupdata[i].approved === 1) {
												this.signupdata[i].approved = "报名已通过审核";
											} else if (this.signupdata[i].approved === 2) {
												this.signupdata[i].approved = "报名未通过审核 ：" + this
													.signupdata[i]
													.approvedmessage;
											}
										}
										console.log("=========1111111===============", this
											.signupdata);
									},
									fail: () => {},
									complete: () => {}
								});

							}


						},
						fail: () => {},
						complete: () => {}
					});


				} else if (index === 1) {

					this.tagtag = true;
					this.scantagtag = false;
					this.signtagtag = false;

					this.signupdata = [];

					uni.request({
						url: 'http://123.56.217.170:8080/actActivity/activity/user/application/' + this.currentuid,
						method: 'GET',
						data: {},
						success: res => {
							console.log(res.data.data.length);

							console.log(res.data.data);

							if (res.data.data.length == 0) {
								this.show = true;
							} else {
								this.show = false;


								this.activitydata = res.data.data;


								// console.log(res.data.data[0]);

								for (let i = 0; i < this.activitydata.length; i++) {

									if (this.activitydata[i].activityReviewstatus === 0) {
										this.activitydata[i].activityReviewstatus = "活动申请未审核";
									} else if (this.activitydata[i].activityReviewstatus === 1) {
										this.activitydata[i].activityReviewstatus = "活动申请已通过审核";
									} else if (this.activitydata[i].activityReviewstatus === 2) {
										this.activitydata[i].activityReviewstatus = "活动申请未通过审核";
									}
								}
							}




						},
						fail: () => {},
						complete: () => {}
					});


					// this.activitydata = [];
					// this.approvedinfo();
				} else if (index === 2) {

					this.tagtag = false;
					this.scantagtag = true;
					this.signtagtag = false;

					console.log("暂未开发完成");

					let temp = {
						"type": "签到二维码",
						"userid": this.currentuid,
						"actid": 100, // 暂时定死
						"extra": ""
					}

					this.val = JSON.stringify(temp);
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