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



		<view v-if="scantagtag" style="padding: 10px;">
			
			<!-- 			这是测试扫码签到的子界面

			<view class="qrimg">
				<tki-qrcode ref="qrcode" :cid="cid" :val="val" :size="size" :unit="unit" :background="background"
					:foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv"
					:onval="onval" :loadMake="loadMake" :showLoading="showLoading" :loadingText="loadingText"
					@result="qrR" />
			</view> -->

			<!-- 真正报名通过的活动信息 -->
			<view class="actsignin-list">
				<view class="actsignin-item" v-for="(item, index) in actsigninList" :key="index" @click="handleClick(item)">
					<image class="actsignin-image" :src="item.image"></image>
					<view class="actsignin-content">
						<view class="actsignin-title">{{ item.title }}</view>
						<view class="actsignin-desc">{{ item.desc }}</view>
					</view>
				</view>
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
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		
		data() {
			return {
				// 真正报名通过的信息列表
				actsigninList: [],

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
			
			handleClick(item){
				console.log(item);
				
				// 跳转至生成二维码页面
				uni.navigateTo({
					url: '../signinandsignout/myrealact/myrealact?userid=' + this.currentuid + '&username=' + this.currentuname + '&actid=' + item.actid + '&actname=' + item.title,
					success: res => {
						console.log("打开生成二维码页面成功");
					},
					fail: () => {
						console.log("打开生成二维码页面失败");
					},
					complete: () => {}
				});
				
				
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
					this.show = true;
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


							this.signupdata.length = 0;

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

							this.signupdata.length = 0;
							this.activitydata.length = 0;

							console.log(res.data.data.length);

							console.log(res.data.data);

							if (res.data.data.length == 0) {
								this.show = true;
								this.signtagtag = false;
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
					this.show = false;
					this.tagtag = false;
					this.scantagtag = true;
					this.signtagtag = false;

					console.log("暂未开发完成");

					// 获取报名状态信息
					uni.request({
						url: 'http://123.56.217.170:8080/actSignupinfo/listActSignUserYes/' + this.currentuid,
						method: 'GET',
						data: {},
						success: res => {
							console.log(res.data.data);

							this.actsigninList.length = 0;

							for (let i = 0; i < res.data.data.length; i++) {
								this.actsigninList.push({

									image: res.data.data[i].activity_picurl,
									title: res.data.data[i].activity_maintitle,
									desc: res.data.data[i].activity_subtitle,
									actid: res.data.data[i].activityid,
									username: res.data.data[i].user_name,
									userid:res.data.data[i].userid

								})
							}


						},
						fail: () => {},
						complete: () => {}
					});

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


	.actsignin-list {
		display: flex;
		flex-direction: column;
	}

	.actsignin-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20px;
	}

	.actsignin-image {
		width: 150px;
		height: 100px;
		margin-right: 20px;
	}

	.actsignin-content {
		flex: 1;
	}

	.actsignin-title {
		font-size: 15px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	.actsignin-desc {
		font-size: 11px;
		color: #666;
	}
</style>