<template>
	<view class="main">

		<!-- <uni-notice-bar show-icon scrollable :text="ActivityData.activityMatters" /> -->
		<view style="height: 20px;"></view>
		<!-- 		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<u-notice-bar :text="ActivityData.activityMatters" color="#ffffff" bgColor="#f56c6c"></u-notice-bar>
			</view>
		</view> -->

		<image :src="ActivityData.activityPicurl"></image><br>

		<uni-steps :options="[{title: '未开始'}, {title: '报名中'}, {title:'报名截止'},{title: '进行中'}, {title: '已结束'}]"
			:active="stepactive" activeIcon="map-pin-ellipse" activeColor="#000000"></uni-steps>

		<br />

		<u-subsection :list="list" :current="current" @change="sectionChange"></u-subsection>

		<scroll-view scroll-x="false" scroll-y="true" class="content" v-if="fileshow">

			<view class="bgcontent">

				<view style="height: 1rpx;"></view>

				<uni-group title="活动基本信息" mode="card">

					<view class="itemitem">
						<uni-icons type="star" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
							class="maintitile">活动主题：</text>
						<text class="maintitilecontent">{{ActivityData.activityMaintitle}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="paperplane" size="20" color="#000000"
							style="margin-left: -5rpx;"></uni-icons><text class="maintitile">活动副标题：</text><text
							class="maintitilecontent">{{ActivityData.activitySubtitle}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="chatbubble" size="20" color="#000000"
							style="margin-left: -5rpx;"></uni-icons><text class="maintitile">活动类型：</text><text
							class="maintitilecontent">{{ActivityData.activityType}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="compose" size="20" color="#000000"
							style="margin-left: -5rpx;"></uni-icons><text class="maintitile">活动描述：</text><text
							class="maintitilecontent">{{ActivityData.activityDesc}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="link" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
							class="maintitile">活动公司：</text><text
							class="maintitilecontent">{{ActivityData.activityEnterprise}}</text><br />
					</view>
				</uni-group>


				<view style="height: 20rpx; background-color: #f8f9fa;">

				</view>


				<uni-group title="活动时间" mode="card">
					<view class="itemitem">
						<!-- <uni-icons type="fire" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons> -->
						<uni-tag text="报名开始时间" type="primary" size="small" style="margin-left: -5rpx;" />
						<!-- <text
							class="maintitile">报名开始时间：</text> -->
						<text class="maintitilecontent">{{ActivityData.activityRegistrationstarttime}}</text><br />
					</view>

					<view class="itemitem">
						<!-- <uni-icons type="notification" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
						class="maintitile">报名结束时间：</text> -->
						<uni-tag text="报名结束时间" type="primary" size="small" style="margin-left: -5rpx;" />
						<text class="maintitilecontent">{{ActivityData.activityRegistrationendtime}}</text><br />
					</view>

					<view class="itemitem">
						<!-- <uni-icons type="notification" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
						class="maintitile">报名结束时间：</text> -->
						<uni-tag text="活动场次信息" type="error" size="small" style="margin-left: -5rpx;" />
						<text class="maintitilecontent"></text><br />
					</view>


					<!-- <view>
						<uni-section class="mb-10" :title="sessionsession" :sub-title="hehehe" type="line">
							<text>开始时间</text>
							<text>结束时间</text>
							<text>地点</text>
						</uni-section>
					</view> -->

					<uni-table ref="table" border stripe emptyText="暂无更多数据" style="margin-top: 5rpx;">
						<uni-tr>
							<uni-th width="60" align="center">场次</uni-th>
							<uni-th width="150" align="center">场次开始时间</uni-th>
							<uni-th width="150" align="center">场次结束时间</uni-th>
							<uni-th align="center">场次进行地点</uni-th>
						</uni-tr>
						<uni-tr v-for="(item, index) in currentactsessions" :key="index">
							<uni-td>{{ item.sessionname }}</uni-td>
							<uni-td>
								<view class="name">{{ item.sessionstartdatetime }}</view>
							</uni-td>
							<uni-td>
								<view class="name">{{ item.sessionenddatetime }}</view>
							</uni-td>
							<uni-td align="center">{{ item.location }}</uni-td>
						</uni-tr>
					</uni-table>


					<!-- <view class="itemitem">
						<uni-icons type="font" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
							class="maintitile">活动开始时间：</text><text
							class="maintitilecontent">{{ActivityData.activityStarttime}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="info" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
							class="maintitile">活动结束时间：</text><text
							class="maintitilecontent">{{ActivityData.activityEndtime}}</text><br />
					</view> -->
				</uni-group>

				<uni-group title="活动地点信息" mode="card">
					<view class="itemitem">
						<uni-icons type="location" size="20" color="#000000"
							style="margin-left: -5rpx;"></uni-icons><text class="maintitile">活动地点：</text><text
							class="maintitilecontent">{{ActivityData.activityPlace}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="tune" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
							class="maintitile">活动归属小站：</text style="white-space: nowrap;">
						<!-- <text class="maintitilecontent">{{ActivityData.activityBelongtostation}}</text> -->
						<uni-tag :text="ActivityData.activityBelongtostation" type="success" style="margin-left: -5rpx;"
							@click="openstation()" />
						<br />
					</view>

					<view class="itemitem">
						<uni-icons type="map-pin" size="20" color="#000000"
							style="margin-left: -5rpx;"></uni-icons><text class="maintitile">活动举办省市：</text><text
							class="maintitilecontent">{{ActivityData.activityCity}}</text><br />
					</view>
				</uni-group>

				<uni-group title="注意事项" mode="card">

					<view class="itemitem">
						<uni-icons type="personadd" size="20" color="#000000"
							style="margin-left: -5rpx;"></uni-icons><text class="maintitile">活动人数：</text><text
							class="maintitilecontent">{{ActivityData.activitityNumbernum}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="personadd" size="20" color="#000000"
							style="margin-left: -5rpx;"></uni-icons><text class="maintitile">活动报名人数情况：</text><text
							class="maintitilecontent">{{signnum}} / {{actpersonnum}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="auth" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
							class="maintitile">活动发起人：</text><text
							class="maintitilecontent">{{ActivityData.activitySponsor}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="phone" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
							class="maintitile">活动发起人联系方式：</text><text
							class="maintitilecontent">{{ActivityData.activitySponsorcontact}}</text><br />
					</view>

					<view class="itemitem">
						<uni-icons type="help" size="20" color="#000000" style="margin-left: -5rpx;"></uni-icons><text
							class="maintitile">活动注意事项和其他说明：</text><text
							class="maintitilecontent">{{ActivityData.activityMatters}}</text><br />
					</view>
				</uni-group>

				<view class="itemitem" v-if="showsugsug">
					<uni-icons type="closeempty" size="20" color="#550000" style="margin-left: -5rpx;"></uni-icons><text
						class="maintitile" style="color: red;">{{ sugtext }}</text>
					<text class="maintitilecontent">{{ActivityData.activityReviewMessage}}</text><br />
				</view>

				<view style="height: 20rpx; background-color: #f8f9fa;"></view>

				<image :src="ActivityData.activityPicurl"></image><br>

				<!-- 			<view v-if="showsugsugbutton">
				<button @click="editapplication" class="mini-btn"
					style="vertical-align: middle;height: 30px;text-align: center;width: 100%;margin-bottom: 10px;"
					type="primary" size="mini">重新编辑活动申请信息</button>
			</view> -->

			</view>
			<view style="height: 50px;"></view>
		</scroll-view>

		<!-- 活动附件预览 -->
		<!-- <web-view v-if="fileifshow" :webview-styles="webviewStyles" src="ActivityData.activityAttachment"></web-view> -->
		<!-- <text v-if="fileifshow">文件预览界面</text> -->

		<!-- <web-view v-if="fileifurlshow" style="height:350px; margin-top: 400px;" :src="fileurlurl"></web-view> -->

		<!--  #ifdef  H5 -->
		<web-view v-if="fileifurlshow" style="height:350px; margin-top: 400px;" :src="fileurlurl"></web-view>
		<!--  #endif -->

		<!--  #ifdef  APP-PLUS -->
		<!-- <web-view v-if="fileifurlshow" style="height:350px; margin-top: 400px;" :src="fileurlurl"></web-view> -->
		<text v-if="fileifurlshow">{{byPhoneIn}}</text>
		<!--  #endif -->

		<view class="goods-carts" v-if="showsug">
			<view>
				<uni-goods-nav :options="options" :fill="true" :button-group="customButtonGroup1"
					@buttonClick="onClickSignUp(Activityid)" @click="onClick" />
			</view>
		</view>

		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="1500"></uni-popup-message>
			</uni-popup>
		</view>

		<!-- 		<view v-if="showsugsug" style=";">
			<uni-section class="mb-10" title="基础用法" sub-title="副标题"></uni-section>
		</view> -->


	</view>

</template>

<script>
	import $store from '@/store/modules/social/test.js';
	export default {
		data() {
			return {

				hehehe: "时间",
				sessionsession: "场次0",

				// 当前活动所属小站ID

				currentstationid: 0,

				currentactsessions: [],

				// 当前活动是否可以报名
				signupor: false,

				byPhoneIn: "正在通过手机内置应用加载附件...请稍后",

				fileifurlshow: false,

				fileurlurl: "",

				fileifshow: false,

				fileshow: true,

				list: ['活动相关信息', '活动附件预览'],
				current: 0,

				showsug: true,
				showsugsug: false,
				showsugsugbutton: false,

				sugtext: '',


				signnum: 0, // 当前活动已报名人数
				actpersonnum: 0, // 当前活动允许的总人数

				stepactive: 0,

				checkList: [false, false, false, false, false, false],
				Activityid: 1,
				ActivityData: {},
				useractstatus: false, //用户活动报名状态
				usergivelikestatus: false, //用户活动点赞状态
				usercollectionstatus: false, //用户活动收藏状态
				picUrl: "",

				options: [{
					icon: 'hand-up',
					text: '点赞',

				}, {
					icon: 'star',
					text: '收藏',
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}],
				customButtonGroup1: [{
					text: '立即报名',
					backgroundColor: 'linear-gradient(90deg, #55aaff, #aaaaff)',
					color: '#fff'
				}],
				type: 'center',
				msgType: 'success',
				messageText: '报名成功',
				value: '',
				currentuname: "",
				currentuid: 0
			}
		},
		onLoad: function(e) {

			this.$store.dispatch('GetInfo').then(res => {
				// console.log("================++++++++++++++++++++++=======================");
				console.log("当前登录用户的昵称为：");
				console.log(res.user.nickName);
				this.currentuname = res.user.nickName;
				console.log("当前登录用户的ID为");
				console.log(res.user.userId);
				this.currentuid = res.user.userId;

				this.initsessions();
				this.initactinfo();
				this.initextra();

				// 初始化当前小站信息

				//初始化报名按钮状态

				// 如果报名已满或时间已截止, 那么按钮变为不可用状态【组件不好变...】

			});

			console.log(e);
			this.Activityid = e.activityid;
			console.log("当前位置：'id = ", this.Activityid, '的活动详情');

		},

		onShow() {
			// onLoad();
			// this.onLoad();
			// console.log(getCurrentPages());
			// console.log(this.$options.name);
			this.initsessions();
			this.initactinfo();
			this.initextra();
		},

		methods: {

			initextra() {
				uni.request({
					url: 'http://123.56.217.170:8080/actSignupinfo/' + this.currentuid + "/" + this
						.Activityid,
					method: 'GET',
					data: {},
					success: res => {
						console.log("==========报名信息审核状态==============" + res.data);
						this.useractstatus = res.data;
						console.log("欢迎查看本活动，你的报名状态为 " + this.useractstatus);
						if (this.useractstatus) {
							this.customButtonGroup1[0].text = "取消报名";
						} else {
							this.customButtonGroup1[0].text = "立即报名";
						}
					},
					fail: () => {},
					complete: () => {}
				});

				//初始化点赞按钮状态
				uni.request({
					url: 'http://123.56.217.170:8080/actGivelike/' + this.currentuid + "/" + this
						.Activityid,
					method: 'GET',
					data: {},
					success: res => {
						console.log("======================？？？？？？？？？？？？？？？");
						console.log("当前活动的点赞状态为" + res.data);
						this.usergivelikestatus = res.data;

						if (this.usergivelikestatus) {
							this.options[0].icon = "hand-up-filled";
							this.options[0].text = "已点赞";
						} else {
							this.options[0].icon = "hand-up";
							this.options[0].text = "点赞";
						}
					},
					fail: () => {},
					complete: () => {}
				});

				//初始化收藏按钮状态
				uni.request({
					url: 'http://123.56.217.170:8080/actCollection/' + this.currentuid + "/" + this
						.Activityid,
					method: 'GET',
					data: {},
					success: res => {
						console.log("当前活动的收藏状态为" + res.data);
						this.usercollectionstatus = res.data;

						if (this.usercollectionstatus) {
							this.options[1].icon = "star-filled";
							this.options[1].text = "已收藏";
						} else {
							this.options[1].icon = "star";
							this.options[1].text = "收藏";
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},


			initactinfo() {
				//获取活动信息
				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/' + this.Activityid,
					method: 'GET',
					data: {},
					success: res => {
						console.log("对应id活动数据如下：");
						console.log(res);
						this.ActivityData = res.data.data;

						this.actpersonnum = this.ActivityData.activitityNumbernum;
						// console.log("当前活动的最大报名人数为：");
						// console.log(this.actpersonnum);

						// console.log("90909099090909", this.ActivityData.activityAttribution);
						// console.log(this.currentuid);

						if (this.ActivityData.activityAttribution == this.currentuid) {
							this.showsugsugbutton = true;
						}
						// console.log(this.showsugsugbutton);
						this.fileurlurl = this.ActivityData.activityAttachment;

						console.log("当前活动的审核情况");
						if (this.ActivityData.activityReviewstatus == 0) {
							// 活动还未审核
							this.showsug = false;
							this.showsugsug = true;
							this.sugtext = '当前活动还未审核'

						} else if (this.ActivityData.activityReviewstatus == 1) {

							// 活动已经审核通过

						} else if (this.ActivityData.activityReviewstatus == 2) {

							// 审核未通过
							this.showsug = false;
							this.showsugsug = true;
							this.sugtext = '当前活动审核未通过'
						}


						//初始化步骤条
						console.log("四个关键时间为:");
						console.log("报名开始时间：", this.ActivityData.activityRegistrationstarttime);
						console.log("报名结束时间：", this.ActivityData.activityRegistrationendtime);
						console.log("活动开始时间：", this.ActivityData.activityStarttime);
						console.log("活动结束时间：", this.ActivityData.activityEndtime);

						//报名开始时间
						let registrationstarttime = new Date(Date.parse(this.ActivityData
							.activityRegistrationstarttime));
						//报名结束时间
						let registrationendtime = new Date(Date.parse(this.ActivityData
							.activityRegistrationendtime));
						//活动开始时间
						let activityStarttime = new Date(Date.parse(this.ActivityData
							.activityStarttime));
						//活动结束时间
						let activityEndtime = new Date(Date.parse(this.ActivityData
							.activityEndtime));

						//当前时间
						let nowtime = new Date();

						console.log("==========>>>>");

						//活动未开始
						if (nowtime < registrationstarttime) {
							this.signupor = false;
							console.log("活动未开始");
							this.stepactive = 0;
						} else if (nowtime < registrationendtime && nowtime >
							registrationstarttime) {
							this.signupor = true;
							console.log("活动报名中");
							this.stepactive = 1;
						} else if (nowtime < activityStarttime && nowtime > registrationendtime) {
							console.log("等待活动开始");
							this.signupor = false;
							this.stepactive = 2;

							this.customButtonGroup1[0].backgroundColor =
								'linear-gradient(90deg, #bbbbbb, #aeaeae)';
						} else if (nowtime < activityEndtime && nowtime > activityStarttime) {
							console.log("活动进行中");
							this.signupor = false;
							this.stepactive = 3;

							this.customButtonGroup1[0].backgroundColor =
								'linear-gradient(90deg, #bbbbbb, #aeaeae)';
						} else if (nowtime > activityEndtime) {
							console.log("活动已结束");
							this.signupor = false;
							this.stepactive = 4;

							this.customButtonGroup1[0].backgroundColor =
								'linear-gradient(90deg, #bbbbbb, #aeaeae)';
						}

						// console.log(registrationstarttime);
						// console.log(new Date() > registrationstarttime);
						
						
						// 获取当前活动的报名人数【下单人数】
						uni.request({
							url: 'http://123.56.217.170:8080/actActivity/getNumberActOrderByActId/' + this.Activityid,
							method: 'GET',
							data: {},
							success: res => {
								console.log("当前活动的已报名人数:", res.data);
								this.signnum = res.data;

								if (this.signnum == this.ActivityData
									.activitityNumbernum) {
									this.customButtonGroup1[0].text = "报名人数已满";
									this.customButtonGroup1[0].backgroundColor =
										'linear-gradient(90deg, #bbbbbb, #aeaeae)';
								}

							},
							fail: () => {},
							complete: () => {}
						});

					},
					fail: () => {},
					complete: () => {}
				});
			},


			initsessions() {
				// 初始化场次信息
				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/getAllSessions/' + this.Activityid,
					method: 'GET',
					data: {},
					success: res => {
						console.log("当前活动的场次信息如下: ");
						// console.log(res.data.data);
						this.currentactsessions = res.data.data;
						console.log(this.currentactsessions);
					},
					fail: () => {},
					complete: () => {}
				});

			},

			// 查看小站详情
			openstation() {
				// console.log(id);
				
				var id = 0;
				
				console.log(this.ActivityData.activityBelongtostation);
				// 利用小站名查出小站唯一ID
				
				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/getAllStationInfo',
					method: 'GET',
					data: {},
					success: res => {
						console.log(res.data.data);
						for(let i = 0; i < res.data.data.length; i ++){
							if(res.data.data[i].name == this.ActivityData.activityBelongtostation){
								id = res.data.data[i].id;
							}
						}
						
						uni.navigateTo({
							url: '/pages/station/station-detail?id=' + id,
						})
						
					},
					fail: () => {},
					complete: () => {}
				});
				
				
			},

			// 切换选项卡
			sectionChange(index) {
				this.current = index;
				console.log(index);
				if (index) {
					// 切换到活动相关信息选项卡
					this.fileshow = false;
					this.fileifshow = true;


					// console.log(uni.getSystemInfoSync().platform);
					// console.log("????????????????????~~~~~~~~");
					// console.log(this.ActivityData.activityAttachment);

					if (this.ActivityData.activityAttachment[0] == "当" || this.ActivityData.activityAttachment === "" || this.ActivityData.activityAttachment == null) {
						console.log("哈哈哈哈");
						// 弹出一个通知
						this.messageToggle("当前活动暂无附件");
					} else {
						switch (uni.getSystemInfoSync().platform) {
							case 'android':
								this.fileifurlshow = false;
								uni.downloadFile({
									url: this.fileurlurl,
									success: function(res) {
										var filePath = res.tempFilePath;
										uni.openDocument({
											filePath: filePath,
											showMenu: true,
											success: function(res) {
												console.log('打开文档成功');
											}
										});
									}
								});
							case 'windows':
								this.fileifurlshow = true;
						}
					}



				} else {
					// 切换到活动附件预览选项卡
					this.fileshow = true;
					this.fileifshow = false;
					this.fileifurlshow = false;



				}
			},

			// 重新编辑活动申请信息
			editapplication() {
				console.log("我要重新编辑活动信息" + this.Activityid);

				uni.navigateTo({
					url: '../editapplication/editapplication?actid=' + this.Activityid,
					success: res => {
						console.log("打开编辑活动申请页面成功");
					},
					fail: () => {
						console.log("打开编辑活动申请页面失败");
					},
					complete: () => {}
				});

			},


			onClickSignUp(id) {

				// 直接跳转到下单一级页面
				console.log(id);

				// 如果已经过了报名时间，不能再次进行下单

				//报名开始时间
				let registrationstarttime = new Date(Date.parse(this.ActivityData.activityRegistrationstarttime));
				//当前时间
				let nowtime = new Date();
				//活动结束时间
				let activityEndtime = new Date(Date.parse(this.ActivityData.activityEndtime));

				if (nowtime < registrationstarttime) {
					this.messageToggle("当前活动报名还未开始");
				} else {
					if (this.signupor) {
						uni.navigateTo({
							url: '../order/SelectSession/SelectSession?actid=' + this.Activityid,
							success: res => {
								console.log("打开下单一级页面成功");
							},
							fail: () => {
								console.log("打开下单一级页面失败");
							},
							complete: () => {}
						});
					} else {
						if (nowtime > activityEndtime) {
							this.messageToggle("当前活动已结束");
						} else {
							this.messageToggle("当前活动报名已截止");
						}
					}
				}
				// if (this.useractstatus) {

				// 	//已经报名了，可进行取消报名的操作
				// 	console.log("用户点击了取消报名");
				// 	uni.request({
				// 		url: "http://123.56.217.170:8080/actSignupinfo/" + this.currentuid + "/" + this
				// 			.Activityid,
				// 		method: 'DELETE',
				// 		data: {},
				// 		success: res => {
				// 			console.log(res.data);
				// 			this.customButtonGroup1[0].text = "立即报名";
				// 			this.messageToggle("取消报名成功");
				// 			this.useractstatus = false;
				// 		},
				// 		fail: () => {},
				// 		complete: () => {}
				// 	});


				// } else {

				// 	console.log("用户点击了立即报名");

				// 	// 判断当前时间是否满足条件
				// 	//当前时间
				// 	let nowtime = new Date();
				// 	//报名开始时间
				// 	let registrationstarttime = new Date(Date.parse(this.ActivityData.activityRegistrationstarttime));
				// 	//报名结束时间
				// 	let registrationendtime = new Date(Date.parse(this.ActivityData.activityRegistrationendtime));

				// 	if (nowtime < registrationstarttime) {

				// 		this.messageToggle("报名还未开始");

				// 	} else if (this.signnum == this.ActivityData.activitityNumbernum) {

				// 		this.messageToggle("报名人数已满");

				// 	} else if (nowtime > registrationendtime) {

				// 		this.messageToggle("报名时间已截止");

				// 	} else {

				// 		//还未报名且已到达可报名时间且人数未满，可进行立即报名的操作
				// 		//立即报名
				// 		uni.request({
				// 			url: 'http://123.56.217.170:8080/actSignupinfo',
				// 			method: 'POST',
				// 			data: {
				// 				"userid": this.currentuid,
				// 				"activityid": this.Activityid
				// 			},
				// 			success: res => {
				// 				console.log(res.data);
				// 				this.customButtonGroup1[0].text = "取消报名";
				// 				this.messageToggle("报名成功");
				// 				this.useractstatus = true;
				// 			},
				// 			fail: () => {},
				// 			complete: () => {}
				// 		});

				// 	}
				// }
			},

			onClick(e) {

				if (e.content.text === "点赞") {

					//进行点赞操作
					uni.showToast({
						title: `点赞成功`,
						icon: 'none'
					})

					//发起点赞请求
					uni.request({
						url: 'http://123.56.217.170:8080/actGivelike',
						method: 'POST',
						data: {
							"userid": this.currentuid,
							"activityid": this.Activityid
						},
						success: res => {
							console.log(res.data);
							this.usergivelikestatus = true;
							this.options[0].icon = "hand-up-filled";
							this.options[0].text = "已点赞";
						},
						fail: () => {},
						complete: () => {}
					});
				} else if (e.content.text === "收藏") {
					//进行收藏操作
					uni.showToast({
						title: `收藏成功`,
						icon: 'none'
					})

					//发起收藏请求
					uni.request({
						url: 'http://123.56.217.170:8080/actCollection',
						method: 'POST',
						data: {
							"collectionuserid": this.currentuid,
							"collectionactivityid": this.Activityid
						},
						success: res => {
							console.log(res.data);
							this.usercollectionstatus = true;
							this.options[1].icon = "star-filled";
							this.options[1].text = "已收藏";
						},
						fail: () => {},
						complete: () => {}
					});


				} else if (e.content.text === "已点赞") {
					//进行取消点赞操作
					uni.showToast({
						title: `您取消了点赞`,
						icon: 'none'
					})

					//发起取消点赞的请求
					uni.request({
						url: "http://123.56.217.170:8080/actGivelike/" + this.currentuid + "/" + this.Activityid,
						method: 'DELETE',
						data: {},
						success: res => {
							console.log(res.data);
							this.usergivelikestatus = false;
							this.options[0].icon = "hand-up";
							this.options[0].text = "点赞";
						},
						fail: () => {},
						complete: () => {}
					});


				} else if (e.content.text === "已收藏") {
					//进行取消收藏操作
					uni.showToast({
						title: `您取消了收藏`,
						icon: 'none'
					})


					//发起取消收藏的请求
					uni.request({
						url: "http://123.56.217.170:8080/actCollection/" + this.currentuid + "/" + this
							.Activityid,
						method: 'DELETE',
						data: {},
						success: res => {
							console.log(res.data);
							this.usercollectionstatus = false;
							this.options[1].icon = "star";
							this.options[1].text = "收藏";
						},
						fail: () => {},
						complete: () => {}
					});

				}


				console.log("==============" + e);


			},

			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			messageToggle(type) {
				this.msgType = type
				this.messageText = `${type}`
				this.$refs.message.open()
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				console.log('点击确认')
				this.messageText = `点击确认了 ${this.msgType} 窗口`
				this.$refs.message.open()
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogClose() {
				console.log('点击关闭')
			},
			dialogInputConfirm(val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})

				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 2000)
			},
			shareToggle() {
				this.$refs.share.open()
			},

			favClick(index) {
				this.checkList[index] = !this.checkList[index]
				console.log(this.checkList[index]);
				this.$forceUpdate()
			},
			evaluate() {
				uni.navigateTo({
					url: '../evaluate/evaluate',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			buttonClick(e) {
				console.log('点击了立即报名按钮');
			}

		},
		onNavigationBarButtonTap(e) {
			console.log("点击了我的活动按钮");
			uni.navigateTo({
				url: '../myact/myact',
				success: res => {
					console.log("打开我的活动成功");
				},
				fail: () => {
					console.log("打开我的活动失败");
				},
				complete: () => {}
			});
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.subtitle,
	.type,
	.description,
	.company,
	.location,
	.note,
	.remark,
	.belong,
	.province,
	.price {
		margin-top: 20rpx;
	}

	.person,
	.sponsor {
		margin-top: 40rpx;
	}

	.person>view,
	.sponsor>view,
	.price>view {
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.datetime>view:first-child,
	.person>view:first-child,
	.price>view:first-child {
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.datetime>view:not(:first-child),
	.person>view:not(:first-child),
	.remark>view:first-child,
	.belong>view:first-child,
	.province>view:first-child {
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.datetime,
	.person,
	.sponsor,
	.price {
		display: flex;
		flex-direction: column;
	}

	.datetime>view,
	.person>view,
	.sponsor>view,
	.price>view,
	.belong>view,
	.province>view {
		display: flex;
		align-items: center;
	}

	.datetime>view:not(:first-child),
	.person>view:not(:first-child),
	.sponsor>view:not(:first-child),
	.price>view:not(:first-child),
	.belong>view:not(:first-child),
	.province>view:not(:first-child) {
		margin-top: 10rpx;
	}

	.datetime>view:last-child {
		margin-left: auto;
	}

	.status {
		font-size: 28rpx;
		margin-top: 40rpx;
		text-align: center;
		color: #ff0000;
	}

	// .footerreal {
	// 	background: #662e8c;
	// 	margin-top: -200px;
	// 	height: 50px;
	// 	color: #fff;
	// 	position: relative;
	// 	line-height: 180%;
	// 	padding: 0 10px@for
	// }

	.itemitem {
		margin-top: 15rpx;
		margin-bottom: 15rpx;
	}

	.main {}

	.bgcontent {
		background-color: #ffffff;
		margin-top: 10px;
	}

	.maintitilecontent {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: bold;
		margin-left: -5px;
		color: black;
		font-size: 14px;
	}

	.maintitile {
		font-family: '微软雅黑', Courier, monospace;
		margin-left: -6px;
		font-size: 13px;
		color: #86898a;
		font-weight: bold;
	}

	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.box {
		@include flex;
	}

	.button {
		@include flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.example-body {
		background-color: #fff;
		padding: 10px 0;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.popup-warn {
		color: #fff;
		background-color: #faecd8;
	}

	.popup-error {
		color: #fff;
		background-color: #fde2e2;
	}

	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}

	.success-text {
		color: #09bb07;
	}

	.warn-text {
		color: #e6a23c;
	}

	.error-text {
		color: #f56c6c;
	}

	.info-text {
		color: #909399;
	}

	.dialog,
	.share {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.dialog-box {
		padding: 10px;
	}

	.dialog .button,
	.share .button {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		margin: 0;
		margin-top: 10px;
		padding: 3px 0;
		flex: 1;
	}

	.dialog-text {
		font-size: 14px;
		color: #333;
	}

	.evaluate {
		height: 35px;
		font-size: 5px;
		font-size-adjust: inherit;
	}

	image {
		display: block;
		margin: 0 auto;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 5px;
		width: 90%;
		margin-top: -10px;
	}

	text {
		margin: 10px;
	}

	.content {
		margin-bottom: 100px;
		position: absolute;
	}

	.footer {
		height: 40px;
		display: flex;
		margin-top: 20px;
		width: 80%;
		margin-left: 35px;
	}

	.example-body {
		display: flex;
		padding: 10px 15px;
	}

	/* #ifdef MP-ALIPAY */
	.uni-fav {
		margin-left: 20rpx;
	}

	/* #endif */


	.favBtn {
		height: 40px;
		margin-right: 40px;
	}


	.example-body-fullWidth {
		padding: 32rpx 0;
	}

	.example-body-first {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
	}

	.favBtn-nav {
		// left:-50rpx;
	}

	.example-body {
		padding: 0;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>