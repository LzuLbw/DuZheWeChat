<template>
	<view style="padding: 20rpx;">
		<uni-notice-bar show-icon scrollable text="此活动票具有特殊性,非普通商品,除因不可抗力因素导致的取消或延期外,其他理由概不支持退换。" />

		<view
			style="display: flex;flex-wrap: wrap;background-color: cornflowerblue;color: aliceblue; border-radius: 3px;padding: 15px;height: 200rpx;justify-content: center;align-items: center;">
			<p style="margin: 20rpx; font-weight: bold;">订单状态: {{orderstatusa}}</p>
			<p v-if="countshow">( {{ countdown }} )</p>
			<p style="color: cornsilk;font-size: 10rpx;"></p>

		</view>
		<view style="height: 20rpx;background-color:whitesmoke"></view>

		<view
			style="display: flex;background-color: white;color: aliceblue; border-radius: 3px;padding: 15px;justify-content: center;align-items: center;">
			<image :src="orderdata.activity_picurl" style="height: 180rpx;width: 230rpx;"></image>
			<view style="margin-left: 50rpx;">
				<view style="margin: 20rpx;"> {{orderdata.activity_maintitle}} </view>
				<view style="margin: 20rpx;">时间: {{orderdata.SessionStartDatetime}} </view>
				<view style="margin: 20rpx;">地点: {{orderdata.location}} </view>
				<view style="margin: 20rpx; float: right;">x {{orderdata.ticketnum}} </view>
			</view>
		</view>
		<view style="height: 20rpx;background-color:whitesmoke"></view>
		<view
			style="background-color: white;color: aliceblue; border-radius: 3px;padding: 15px;justify-content: center;align-items: center;">
			<view style="margin: 20rpx;font-size: 30rpx;font-weight: bold;"> 报名信息: </view>
			<view style="margin: 20rpx;"> 联系人: {{orderdata.username}} </view>
			<view style="margin: 20rpx;"> 联系方式: {{orderdata.phonenumber}} </view>
		</view>

		<view style="height: 20rpx;background-color:whitesmoke"></view>
		<view
			style="background-color: white;color: aliceblue; border-radius: 3px;padding: 15px;justify-content: center;align-items: center;">
			<view style="margin: 20rpx;font-size: 30rpx;font-weight: bold;"> 订单信息: </view>
			<view style="margin: 20rpx;"> 订单编号: {{orderdata.actorderid}} </view>
			<view style="margin: 20rpx;"> 下单时间: {{orderdata.ordertime}} </view>
			<view style="margin: 20rpx;"> 商品总价: ￥{{orderdata.totalprice}} </view>
			<view style="margin: 20rpx;"> {{paystatus}} {{orderdata.realpay}} </view>
		</view>

		<view
			style="position: fixed;bottom: 0;left: 0;width: 100%;z-index: 999; background-color: white;display: flex;">
			<u-button v-if="payshow" size="default" @click="pay">立即支付</u-button>
			<u-button v-if="cancelshow" size="default" @click="cancelorder">取消订单</u-button>
			<u-button size="default" @click="contactcustomerservice">联系客服</u-button>
		</view>


		<!-- 几种情况: 未付款的订单(可以申请取消)、已付款的订单(未消费)、已取消(取消)的订单 -->

		<!-- 做几个不同的页面 -->
		<view style="height: 150rpx;background-color:whitesmoke"></view>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确定" title="提示" :content="messageText"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
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
				orderid: 0,
				orderdata: {},
				countdown: '',
				cancelshow: true,
				payshow: true,
				countshow: true,

				orderstatusa: '',
				paystatus: "实付款: ￥",

				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',

			}
		},

		onLoad(e) {
			console.log(e);
			this.orderid = e.data;
			// 获取订单信息
			uni.request({
				url: 'http://123.56.217.170:8080/actSignupinfo/getOrderByActOrderId/' + this.orderid,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.data);
			
					res.data.data[0].SessionStartDatetime = res.data.data[0].SessionStartDatetime.replace("T",
						" ");
					res.data.data[0].ordertime = res.data.data[0].ordertime.replace("T", " ");
			
					this.orderdata = res.data.data[0];
			
					// console.log(this.orderdata.SessionStartDatetime);
			
					// this.orderdata.SessionStartDatetime = this.orderdata.SessionStartDatetime.replace("T", " ");
					// console.log(this.orderdata.SessionStartDatetime);
			
					if (this.orderdata.orderstatus === 0) {
						this.orderstatusa = '未支付';
					} else if (this.orderdata.orderstatus === 1) {
						this.orderstatusa = '已支付';
						this.countshow = false;
						// this.cancelshow = false;
						this.payshow = false;
					} else {
						this.orderstatusa = '已取消';
						this.cancelshow = false;
						this.payshow = false;
						this.countshow = false;
					}
			
			
					if (this.orderdata.orderstatus == 1) {
						this.countdown = "已支付";
						// this.
					} else if (this.orderdata.orderstatus == 2) {
						this.countdown = '已取消';
					} else {
						// 拿到超时时间
						const endTimeString = this.orderdata.ordertimeout; // 示例数据，你需要替换为从数据库获取的值
			
						// 解析超时时间为时间戳
						const endTime = new Date(endTimeString).getTime();
			
						// 使用 setInterval 更新倒计时
						setInterval(() => {
							const now = Date.now();
							const remainingTime = endTime - now;
			
							if (remainingTime > 0) {
								const seconds = Math.floor(remainingTime / 1000);
								const minutes = Math.floor(seconds / 60);
								const hours = Math.floor(minutes / 60);
								const days = Math.floor(hours / 24);
			
								this.countdown =
									`${minutes % 60}分钟 ${seconds % 60}秒`;
							} else {
								this.countdown = '已取消'; // 超过设定时间，显示超时信息
							}
						}, 1000);
					}
			
					// if (this.countdown === '超时') {
					// 	// 发起请求取消当前订单，【设置为已取消】
			
					// }
			
				},
				fail: () => {},
				complete: () => {}
			});

		},

		onShow() {
			// 获取订单信息
			uni.request({
				url: 'http://123.56.217.170:8080/actSignupinfo/getOrderByActOrderId/' + this.orderid,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.data);

					res.data.data[0].SessionStartDatetime = res.data.data[0].SessionStartDatetime.replace("T",
						" ");
					res.data.data[0].ordertime = res.data.data[0].ordertime.replace("T", " ");

					this.orderdata = res.data.data[0];

					// console.log(this.orderdata.SessionStartDatetime);

					// this.orderdata.SessionStartDatetime = this.orderdata.SessionStartDatetime.replace("T", " ");
					// console.log(this.orderdata.SessionStartDatetime);

					if (this.orderdata.orderstatus === 0) {
						this.orderstatusa = '未支付';
					} else if (this.orderdata.orderstatus === 1) {
						this.orderstatusa = '已支付';
						this.countshow = false;
					} else {
						this.orderstatusa = '已取消';
						this.cancelshow = false;
						this.payshow = false;
						this.countshow = false;
					}


					if (this.orderdata.orderstatus == 1) {
						this.countdown = "已支付";
						// this.
					} else if (this.orderdata.orderstatus == 2) {
						this.countdown = '已取消';
					} else {
						// 拿到超时时间
						const endTimeString = this.orderdata.ordertimeout; // 示例数据，你需要替换为从数据库获取的值

						// 解析超时时间为时间戳
						const endTime = new Date(endTimeString).getTime();

						// 使用 setInterval 更新倒计时
						setInterval(() => {
							const now = Date.now();
							const remainingTime = endTime - now;

							if (remainingTime > 0) {
								const seconds = Math.floor(remainingTime / 1000);
								const minutes = Math.floor(seconds / 60);
								const hours = Math.floor(minutes / 60);
								const days = Math.floor(hours / 24);

								this.countdown =
									`${minutes % 60}分钟 ${seconds % 60}秒`;
							} else {
								this.countdown = '已取消'; // 超过设定时间，显示超时信息
							}
						}, 1000);
					}

					// if (this.countdown === '超时') {
					// 	// 发起请求取消当前订单，【设置为已取消】

					// }

				},
				fail: () => {},
				complete: () => {}
			});
		},

		methods: {

			messageToggle(type) {
				this.msgType = type
				this.messageText = `${type}`
				this.$refs.message.open()
			},


			cancelorder() {
				console.log("点击了取消订单");
				this.dialogToggle('error', "确定取消订单吗?");

			},
			contactcustomerservice() {
				console.log("点击了联系客服");
				this.messageToggle("此功能暂未开放!");
				// this.dialogToggle('info', "暂未开发此功能!");
			},
			pay() {
				console.log("点击了立即支付");
								
				
								
				// // 发起支付
				// uni.getProvider({
				// 	service:'payment',
				// 	success:function(res){
				// 		console.log(res.provider);
				// 	}
				// })
				
				
			},

			dialogConfirm() {
				// console.log('点击确认')
				// this.messageText = `点击确认了 ${this.msgType} 窗口`
				// this.$refs.message.open()
				console.log("点击了确认!");
				this.countdown = "已取消";
				this.countshow = false;

				uni.request({
					url: 'http://123.56.217.170:8080/actSignupinfo/cancalActOrderByActOrderId/' + this.orderid,
					method: 'GET',
					data: {},
					success: res => {
						console.log(res);


						// 获取订单信息
						uni.request({
							url: 'http://123.56.217.170:8080/actSignupinfo/getOrderByActOrderId/' + this
								.orderid,
							method: 'GET',
							data: {},
							success: res => {
								console.log(res.data.data);

								res.data.data[0].SessionStartDatetime = res.data.data[0]
									.SessionStartDatetime.replace("T",
										" ");
								res.data.data[0].ordertime = res.data.data[0].ordertime.replace(
									"T", " ");

								this.orderdata = res.data.data[0];

								// console.log(this.orderdata.SessionStartDatetime);

								// this.orderdata.SessionStartDatetime = this.orderdata.SessionStartDatetime.replace("T", " ");
								// console.log(this.orderdata.SessionStartDatetime);

								if (this.orderdata.orderstatus === 0) {
									this.orderstatusa = '未支付';
								} else if (this.orderdata.orderstatus === 1) {
									this.orderstatusa = '已支付';
								} else {
									this.orderstatusa = '已取消';
									this.cancelshow = false;
									this.payshow = false;
								}


								if (this.orderdata.orderstatus == 1) {
									this.countdown = "已支付";
									// this.
								} else if (this.orderdata.orderstatus == 2) {
									this.countdown = '已取消';
								} else {
									// 拿到超时时间
									const endTimeString = this.orderdata
									.ordertimeout; // 示例数据，你需要替换为从数据库获取的值

									// 解析超时时间为时间戳
									const endTime = new Date(endTimeString).getTime();

									// 使用 setInterval 更新倒计时
									setInterval(() => {
										const now = Date.now();
										const remainingTime = endTime - now;

										if (remainingTime > 0) {
											const seconds = Math.floor(remainingTime /
												1000);
											const minutes = Math.floor(seconds / 60);
											const hours = Math.floor(minutes / 60);
											const days = Math.floor(hours / 24);

											this.countdown =
												`${minutes % 60}分钟 ${seconds % 60}秒`;
										} else {
											this.countdown = '已取消'; // 超过设定时间，显示超时信息
										}
									}, 1000);
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

			dialogClose() {
				// console.log('点击关闭')
				console.log("点击了关闭!");
			},

			dialogToggle(type, info) {
				this.msgType = type
				this.messageText = info
				this.$refs.alertDialog.open()
			},


		}
	}
</script>

<style>

</style>