<template>
	<view class="main">

		<uni-notice-bar show-icon scrollable :text="ActivityData.activityMatters" /><br>
		<image :src="'http://localhost/dev-api' + ActivityData.activityPicUrl"></image><br>

		<uni-steps :options="[{title: '未开始'}, {title: '报名中'}, {title: '进行中'}, {title: '已结束'}]" :active="stepactive"
			activeIcon="map-pin-ellipse" activeColor="#003312"></uni-steps>

		<br />

		<scroll-view scroll-y="true" class="content">

			<view class="bgcontent">

				<view class="itemitem">
					<uni-icons type="star" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动主题：</text><text
						class="maintitilecontent">{{ActivityData.activityMaintitle}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="paperplane" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动副标题：</text><text
						class="maintitilecontent">{{ActivityData.activitySubtitle}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="chatbubble" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动类型：</text><text
						class="maintitilecontent">{{ActivityData.activityType}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="compose" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动描述：</text><text
						class="maintitilecontent">{{ActivityData.activityDesc}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="link" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动公司：</text><text
						class="maintitilecontent">{{ActivityData.activityEnterprise}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="fire" size="20" color="#000000"></uni-icons><text
						class="maintitile">报名开始时间：</text><text
						class="maintitilecontent">{{ActivityData.activityRegistrationstarttime}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="notification" size="20" color="#000000"></uni-icons><text
						class="maintitile">报名结束时间：</text><text
						class="maintitilecontent">{{ActivityData.activityRegistrationendtime}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="font" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动开始时间：</text><text
						class="maintitilecontent">{{ActivityData.activityStarttime}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="info" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动结束时间：</text><text
						class="maintitilecontent">{{ActivityData.activityEndtime}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="personadd" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动人数：</text><text
						class="maintitilecontent">{{ActivityData.activitityNumbernum}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="auth" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动发起人：</text><text
						class="maintitilecontent">{{ActivityData.activitySponsor}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="phone" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动发起人联系方式：</text><text
						class="maintitilecontent">{{ActivityData.activitySponsorcontact}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="location" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动地点：</text><text
						class="maintitilecontent">{{ActivityData.activityPlace}}</text><br />
				</view>

				<view class="itemitem">
					<uni-icons type="" size="20" color="#000000"></uni-icons><text
						class="maintitile">活动注意事项和其他说明：</text><text
						class="maintitilecontent">{{ActivityData.activityMatters}}</text><br />
				</view>



			</view>

		</scroll-view>

		<view class="goods-carts">
			<view>
				<uni-goods-nav :options="options" :fill="true" :button-group="customButtonGroup1"
					@buttonClick="onClickSignUp" @click="onClick" />
			</view>
		</view>

		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="1500"></uni-popup-message>
			</uni-popup>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				value: ''
			}
		},
		onLoad: function(e) {
			console.log(e);
			this.Activityid = e.activityid;
			console.log("当前位置：'id = ", this.Activityid, '的活动详情');
			console.log("当前用户uid = ", getApp().globalData.uid);
			console.log("当前用户name = ", getApp().globalData.name);
			console.log("当前活动的id为" + this.Activityid);

			//获取活动信息
			uni.request({
				url: 'http://localhost:8080/actActivity/' + this.Activityid,
				method: 'GET',
				data: {},
				success: res => {
					console.log("对应id活动数据如下：");
					console.log(res);
					this.ActivityData = res.data.data;

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
					let activityStarttime = new Date(Date.parse(this.ActivityData.activityStarttime));
					//活动结束时间
					let activityEndtime = new Date(Date.parse(this.ActivityData.activityEndtime));

					//当前时间
					let nowtime = new Date();

					//活动未开始
					if (nowtime < registrationstarttime) {
						console.log("活动未开始");
						this.stepactive = 0;
					} else if (nowtime < registrationendtime && nowtime > registrationstarttime) {
						console.log("活动报名中");
						this.stepactive = 1;
					} else if (nowtime < activityEndtime && nowtime > activityStarttime) {
						console.log("活动进行中");
						this.stepactive = 2;
					} else if (nowtime > activityEndtime) {
						console.log("活动已结束");
						this.stepactive = 3;
					}



					console.log(registrationstarttime);
					console.log(new Date() > registrationstarttime);

				},
				fail: () => {},
				complete: () => {}
			});

			//初始化报名按钮状态
			uni.request({
				url: 'http://localhost:8082/actSignupinfo/' + getApp().globalData.uid + "/" + this.Activityid,
				method: 'GET',
				data: {},
				success: res => {
					console.log("==========" + res.data);
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
				url: 'http://localhost:8082/actGivelike/' + getApp().globalData.uid + "/" + this.Activityid,
				method: 'GET',
				data: {},
				success: res => {
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
				url: 'http://localhost:8082/actCollection/' + getApp().globalData.uid + "/" + this.Activityid,
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
		methods: {
			onClickSignUp() {
				console.log(this.useractstatus);

				if (this.useractstatus) {

					//已经报名了，可进行取消报名的操作
					console.log("用户点击了取消报名");
					uni.request({
						url: "http://localhost:8082/actSignupinfo/" + getApp().globalData.uid + "/" + this
							.Activityid,
						method: 'DELETE',
						data: {},
						success: res => {
							console.log(res.data);
							this.customButtonGroup1[0].text = "立即报名";
							this.messageToggle("取消报名成功");
							this.useractstatus = false;
						},
						fail: () => {},
						complete: () => {}
					});


				} else {

					console.log("用户点击了立即报名");
					//还未报名，可进行立即报名的操作
					//立即报名
					uni.request({
						url: 'http://localhost:8082/actSignupinfo',
						method: 'POST',
						data: {
							"userid": getApp().globalData.uid,
							"activityid": this.Activityid
						},
						success: res => {
							console.log(res.data);
							this.customButtonGroup1[0].text = "取消报名";
							this.messageToggle("报名成功");
							this.useractstatus = true;
						},
						fail: () => {},
						complete: () => {}
					});


				}
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
						url: 'http://localhost:8082/actGivelike',
						method: 'POST',
						data: {
							"userid": getApp().globalData.uid,
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
						url: 'http://localhost:8082/actCollection',
						method: 'POST',
						data: {
							"collectionuserid": getApp().globalData.uid,
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
						url: "http://localhost:8082/actGivelike/" + getApp().globalData.uid + "/" + this
							.Activityid,
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
						url: "http://localhost:8082/actCollection/" + getApp().globalData.uid + "/" + this
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
	.itemitem {
		margin: 2px 2px;
	}

	.main {}

	.bgcontent {
		background-color: #ffffff;
		margin-top: 10px;
	}

	.maintitilecontent {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-weight: 545;
		color: black;
		font-size: 14px;
	}

	.maintitile {

		font-family: 'Courier New', Courier, monospace;
		margin-left: -6px;
		font-size: 14px;
		color: #4c474d;
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
