<!-- 活动总体页面 Ding Jiaxiong -->
<!-- 全部活动卡片渲染 -->;
<template>

	<view>
		<!-- 组合条件查询组件 -->
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

		<!-- 		<view style="margin-top: 5px;margin-left: 5px;margin-right: 5px;">
			<u-gap height="20" bgColor="#00aaff"></u-gap>
		</view> -->


		<view v-for="(item,index) in AllActivityData" :key="index">

			<view @click="opendetail(item.activityId)" :data-activityid="item.activityId" style="text-align: center;">
				<uni-card>
					<!-- <uni-card :cover="AllActivityData[index].activityPicurl" padding="10px"> -->
					<view v-if="endifif[index]">
						<div class="row"
							style="width:100%; position:relative;z-index:1;margin:0 auto; background: #000000;">
							<img :src="AllActivityData[index].activityPicurl"
								style="width:100%; opacity:0.6; filter: alpha(opacity=60);" />
							<div style="width:100%;position:absolute;z-index:2;top:50%; text-align:center;">
								<h2 style="color:#fff">活动已结束</h2>
							</div>
						</div>
					</view>

					<view v-if="!endifif[index]">
						<image :src="AllActivityData[index].activityPicurl" style="width: 100%;"></image>
					</view>

					<view>
						<view>
							<text class="uni-body">【{{item.activityMaintitle}}】</text>
							<!-- <text class="uni-body" style="color: gray;">{{item.activitySubtitle}}</text> -->
							<view style="float: right;">
								<uni-tag :text="actchargeif[index].text" :type='actchargeif[index].stylestyle' />
							</view>
						</view>
					</view>

				</uni-card>

			</view>

		</view>

		<u-back-top :scroll-top="scrollTop"></u-back-top>

		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
			:direction="direction" @trigger="trigger" />

		<view style="height: 10px;"></view>
	</view>
</template>

<script>
	import $store from '@/store/modules/social/test.js';
	export default {
		data() {
			return {

				actchargeif: [],

				currentuname: "",
				currentuid: 0,

				// 悬浮按钮的配置参数
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#71aaaa',
					iconColor: '#fff'

				},
				is_color_type: false,
				content: [{
						iconPath: '/static/act/star.png',
						selectedIconPath: '/static/act/star.png',
						text: '我的活动',
						active: false
					},
					{
						iconPath: '/static/act/apply.png',
						selectedIconPath: '/static/act/apply.png',
						text: '申请发布',
						active: false
					},
					{
						iconPath: '/static/act/scan.png',
						selectedIconPath: '/static/act/scan.png',
						text: '签到签退',
						active: false
					},

				],

				// 初始化一个状态数组, 存储当前活动是否已经结束
				endifif: [],

				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',


				AllActivityData: [],
				scrollTop: 0,
				chooseValue1: "",
				chooseValue2: "",
				chooseValue3: "",

				//活动地点数据
				list1: [{
					id: 1,
					content: '线上活动'
				}, {
					id: 2,
					content: '线下活动'
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
						content: '等待活动开始'
					},
					{
						id: 4,
						content: '进行中'
					},
					{
						id: 5,
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
			// console.log("当前所在位置：全部活动页面");
			// console.log("当前登录用户id=", getApp().globalData.uid);

			// console.log("当前登录用户昵称=", getApp().globalData.name);

			//获取全部活动数据
			uni.request({
				url: 'http://123.56.217.170:8080/actActivity',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.data);
					this.AllActivityData = res.data.data;
					this.endifif = [];
					this.actchargeif = [];
					// 拿到当前时间
					let nowtime = new Date();

					// 拿到每个活动的是否结束信息【用于初始化蒙版】
					for (var i = 0; i < this.AllActivityData.length; i++) {
						// 拿到每个活动的结束时间
						let activityEndtime = new Date(Date.parse(this.AllActivityData[i].activityEndtime));
						if (nowtime > activityEndtime) {
							this.endifif.push(true);
						} else {
							this.endifif.push(false);
						}
					}
					this.actchargeif.length = 0;
					// 拿到是否免费的信息，用于初始化index
					for (let i = 0; i < this.AllActivityData.length; i++) {
						// console.log(this.actchargeif);
						if(!this.AllActivityData[i].activityCharge){
							this.actchargeif.push({text: "免费", stylestyle: 'success'});
						}else{
							this.actchargeif.push({text: "付费", stylestyle: 'warning'});
						}
						
					}
					
					console.log(this.actchargeif);
					// uni.request({
					// 	url: 'http://123.56.217.170:8080/actActivity/getAllPrices/' + this
					// 		.AllActivityData[i].activityId,
					// 	method: 'GET',
					// 	data: {},
					// 	success: res => {

					// 		if (res.data.data.length === 0) {
					// 			// 免费活动
					// 			let item = {
					// 				textvalue: "免费活动",
					// 				style: 'success'
					// 			}
					// 			// this.actchargeif.push(item);
					// 		} else {
					// 			// // 拿到最低价
					// 			// var minprice = 100000;
					// 			// // console.log(Number.isInteger((res.data.data[i].price)));
					// 			// for (let i = 0; i < res.data.data.length; i++) {
					// 			// 	if (res.data.data[i].price < minprice) {
					// 			// 		console.log("交换");
					// 			// 		minprice = res.data.data[i].price;
					// 			// 	}
					// 			// }

					// 			// console.log(minprice);

					// 			// var textinfo = "收费活动 " + "￥" + minprice + "起"

					// 			let item = {
					// 				textvalue: "收费活动",
					// 				style: 'warning'
					// 			}
					// 			// this.actchargeif.push(item);
					// 		}

					// 		console.log("??????????????????????????");
					// 		console.log(this.actchargeif);

					// 	},
					// 	fail: () => {},
					// 	complete: () => {}
					// });

					// console.log("??????????????????????????????????");
					// console.log(this.actchargeif);

					// console.log(this.endifif);
				},
				fail: () => {},
				complete: () => {}
			});

			// 初始化当前活动发起人筛选
			uni.request({
				url: 'http://123.56.217.170:8080/actActivity/getsponsors',
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res.data.data);

					this.list3 = [];
					// 初始化list3
					for (let i = 0; i < res.data.data.length; i++) {
						// console.log(i);
						var item = {
							id: (i + 1),
							content: res.data.data[i]
						};
						// console.log(item);
						this.list3.push(item);
					}

				},
				fail: () => {},
				complete: () => {}
			});

		},

		onShow() {

			this.$store.dispatch('GetInfo').then(res => {
				// console.log("当前登录用户的昵称为：", res.user.nickName);
				// console.log("当前登录用户的ID为", res.user.userId);
				this.currentuname = res.user.nickName;
				this.currentuid = res.user.userId;

				// 初始化悬浮按钮状态
				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/iftaaactPermission/' + this.currentuid,
					method: 'GET',
					data: {},
					success: res => {

						this.content = [{
									iconPath: '/static/act/star.png',
									selectedIconPath: '/static/act/star.png',
									text: '我的活动',
									active: false
								},
								{
									iconPath: '/static/act/apply.png',
									selectedIconPath: '/static/act/apply.png',
									text: '申请发布',
									active: false
								},
								{
									iconPath: '/static/act/scan.png',
									selectedIconPath: '/static/act/scan.png',
									text: '签到签退',
									active: false
								},

							],


							// console.log(this.currentuid);
							// console.log("=======================");
							console.log(res.data.data);

						if (res.data.data.length != 0) {
							console.log("当前登录用户可进行签到扫码操作");
						} else {
							console.log("当前登录用户不可进行签到扫码操作");
							this.content.pop();
						}

					},
					fail: () => {},
					complete: () => {}
				});

			})


			uni.request({
				url: 'http://123.56.217.170:8080/actActivity',
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res.data.data);
					this.AllActivityData = res.data.data;

					this.endifif = [];
					// 拿到当前时间
					let nowtime = new Date();

					// 拿到每个活动的是否结束信息【用于初始化蒙版】
					for (var i = 0; i < this.AllActivityData.length; i++) {
						// 拿到每个活动的结束时间
						let activityEndtime = new Date(Date.parse(this.AllActivityData[i].activityEndtime));
						if (nowtime > activityEndtime) {
							this.endifif.push(true);
						} else {
							this.endifif.push(false);
						}
					}

					console.log(this.endifif);
					
					this.actchargeif.length = 0;
					// 拿到是否免费的信息，用于初始化index
					for (let i = 0; i < this.AllActivityData.length; i++) {
						// console.log(this.actchargeif);
						if(!this.AllActivityData[i].activityCharge){
							this.actchargeif.push({text: "免费", stylestyle: 'success'});
						}else{
							this.actchargeif.push({text: "付费", stylestyle: 'warning'});
						}
						
					}


				},
				fail: () => {},
				complete: () => {}
			});

		},

		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},

		methods: {

			// 悬浮按钮的方法=============================================

			trigger(e) {
				console.log(e)

				if (e.item.text == "签到签退") {
					console.log("点击了进行签到签退");

					// 直接调用函数进行扫码
					// 只允许通过相机扫码
					uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							console.log('条码类型：' + res.scanType);
							console.log('条码内容：' + res.result);

							let obj = JSON.parse(res.result);
							console.log(obj);

							// 将扫描到的信息加入数据库
							uni.request({
								url: 'http://123.56.217.170:8080/actSignupinfo/SignInScan/new',
								method: 'POST',
								data: {

									"userid": obj.userid,
									"username": obj.username,
									"actid": obj.actid,
									"actname": obj.actname

								},
								success: res => {
									console.log(res);


									if (res.data == "签到成功") {
										uni.showToast({

											title: '签到成功',
											duration: 2000
										});
									} else {
										uni.showToast({
											icon: 'error',
											title: '签到失败',
											duration: 2000
										});
									}
								},
								fail: () => {

								},
								complete: () => {}
							});


						}
					});


				} else if (e.item.text == "我的活动") {
					console.log("点击了我的活动按钮");
					uni.navigateTo({
						url: 'myact/myact',
						success: res => {
							console.log("打开成功,id = ", id);
						},
						fail: () => {
							console.log("打开我的活动页面失败");
						},
						complete: () => {}
					});
				} else if (e.item.text == "申请发布") {
					console.log("点击了申请发布按钮");
					uni.navigateTo({
						url: 'application/application',
						success: res => {
							console.log("打开成功,id = ", id);
						},
						fail: () => {
							console.log("打开申请发布页面失败");
						},
						complete: () => {}
					});
				} else {
					console.log("无事");
				}


			},

			// // 悬浮按钮的方法=============================================

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
				this.messageText = `这是一条${type}消息提示`
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
					// console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 3000)
			},
			shareToggle() {
				this.$refs.share.open()
			},



			// 保留 别动
			change1(e) {
				console.log('活动地点', this.chooseValue1);
				console.log('活动状态', this.chooseValue2);
				console.log('活动发起人', this.chooseValue3);

				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/condition/',
					method: 'POST',
					data: {

						"place": this.chooseValue1,
						"status": this.chooseValue2,
						"sponsor": this.chooseValue3

					},
					success: res => {
						// console.log(res.data);
						this.AllActivityData = res.data.data;
						this.endifif = [];
						// 拿到当前时间
						let nowtime = new Date();

						// 拿到每个活动的是否结束信息【用于初始化蒙版】
						for (var i = 0; i < this.AllActivityData.length; i++) {
							// 拿到每个活动的结束时间
							let activityEndtime = new Date(Date.parse(this.AllActivityData[i]
								.activityEndtime));
							if (nowtime > activityEndtime) {
								this.endifif.push(true);
							} else {
								this.endifif.push(false);
							}
						}
						
						this.actchargeif.length = 0;
						// 拿到是否免费的信息，用于初始化index
						for (let i = 0; i < this.AllActivityData.length; i++) {
							// console.log(this.actchargeif);
							if(!this.AllActivityData[i].activityCharge){
								this.actchargeif.push({text: "免费", stylestyle: 'success'});
							}else{
								this.actchargeif.push({text: "付费", stylestyle: 'warning'});
							}
							
						}

						console.log(this.endifif);

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
					url: 'http://123.56.217.170:8080/actActivity/condition/',
					method: 'POST',
					data: {

						"place": this.chooseValue1,
						"status": this.chooseValue2,
						"sponsor": this.chooseValue3

					},
					success: res => {
						// console.log(res.data);
						this.AllActivityData = res.data.data;
						this.endifif = [];
						// 拿到当前时间
						let nowtime = new Date();

						// 拿到每个活动的是否结束信息【用于初始化蒙版】
						for (var i = 0; i < this.AllActivityData.length; i++) {
							// 拿到每个活动的结束时间
							let activityEndtime = new Date(Date.parse(this.AllActivityData[i]
								.activityEndtime));
							if (nowtime > activityEndtime) {
								this.endifif.push(true);
							} else {
								this.endifif.push(false);
							}
						}
						
						this.actchargeif.length = 0;
						// 拿到是否免费的信息，用于初始化index
						for (let i = 0; i < this.AllActivityData.length; i++) {
							// console.log(this.actchargeif);
							if(!this.AllActivityData[i].activityCharge){
								this.actchargeif.push({text: "免费", stylestyle: 'success'});
							}else{
								this.actchargeif.push({text: "付费", stylestyle: 'warning'});
							}
							
						}

						console.log(this.endifif);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			change3(e) {

				// 初始化当前活动发起人筛选
				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/getsponsors',
					method: 'GET',
					data: {},
					success: res => {
						// console.log(res.data.data);

						this.list3 = [];
						// 初始化list3
						for (let i = 0; i < res.data.data.length; i++) {
							// console.log(i);
							var item = {
								id: (i + 1),
								content: res.data.data[i]
							};
							// console.log(item);
							this.list3.push(item);
						}

					},
					fail: () => {},
					complete: () => {}
				});

				console.log('活动地点', this.chooseValue1);
				console.log('活动状态', this.chooseValue2);
				console.log('活动发起人', this.chooseValue3);

				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/condition/',
					method: 'POST',
					data: {

						"place": this.chooseValue1,
						"status": this.chooseValue2,
						"sponsor": this.chooseValue3

					},
					success: res => {
						// console.log(res.data);
						this.AllActivityData = res.data.data;

						// 拿到当前时间
						let nowtime = new Date();
						this.endifif = [];

						// 拿到每个活动的是否结束信息【用于初始化蒙版】
						for (var i = 0; i < this.AllActivityData.length; i++) {
							// 拿到每个活动的结束时间
							let activityEndtime = new Date(Date.parse(this.AllActivityData[i]
								.activityEndtime));
							if (nowtime > activityEndtime) {
								this.endifif.push(true);
							} else {
								this.endifif.push(false);
							}
						}
						
						this.actchargeif.length = 0;
						// 拿到是否免费的信息，用于初始化index
						for (let i = 0; i < this.AllActivityData.length; i++) {
							// console.log(this.actchargeif);
							if(!this.AllActivityData[i].activityCharge){
								this.actchargeif.push({text: "免费", stylestyle: 'success'});
							}else{
								this.actchargeif.push({text: "付费", stylestyle: 'warning'});
							}
							
						}

						console.log(this.endifif);
					},
					fail: () => {},
					complete: () => {}
				});
			},


			// change(e) {
			// 	console.log("e:", e);
			// },

			print() {
				console.log(this.AllActivityData);
			},
			opendetail(id) {
				// console.log("点击查看活动ID为" + id + "的活动详情");
				uni.navigateTo({
					url: '/pagesB/act/detail/detail?activityid=' + id,
					success: res => {
						console.log("打开成功,id = ", id);
					},
					fail: () => {
						console.log("打开详情页失败");
					},
					complete: () => {}
				});
			}
		},
		onNavigationBarButtonTap(e) {
			// console.log("点击了我的活动按钮");
			uni.navigateTo({
				url: '/pagesB/myact/myact',
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

<style lang="scss" scoped>
	.warp {
		padding: 10px;
	}

	.button {
		margin-bottom: 10px;
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



	.example-body {
		padding: 10px;
	}
</style>