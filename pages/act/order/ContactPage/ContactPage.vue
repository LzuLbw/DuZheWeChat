<template>
	<view class="container">
		<view style="height: 20rpx;background-color: white;"></view>
		<image class="poster" :src="resorderdata.actpicurl" />

		<uni-group title="活动信息" mode="card">
			<view style="margin-top: 10px;margin-bottom: 10px;"> 活动名: {{resorderdata.actname}} </view>
			<view style="margin-top: 10px;margin-bottom: 10px;"> 活动开始时间: {{resorderdata.sessionstartdatetime}} </view>
			<view style="margin-top: 10px;margin-bottom: 10px;"> 活动结束时间: {{resorderdata.sessionenddatetime}} </view>
		</uni-group>

		<uni-group title="票价信息" mode="card">
			<view style="margin-top: 10px;margin-bottom: 10px;"> 票种: {{resorderdata.pricedescription}} </view>
			<view style="margin-top: 10px;margin-bottom: 10px;"> 单价: {{resorderdata.pricenum}} </view>
			<view style="margin-top: 10px;margin-bottom: 10px;"> 数量: {{resorderdata.ticketnum}} </view>
		</uni-group>

		<uni-group title="填写个人信息" mode="card">
			<view class="form">
				<input class="input" type="text" placeholder="姓名" v-model="name"></input><br>
				<input class="input" type="text" maxlength="11" placeholder="手机号" v-model="phone"></input>
			</view>
		</uni-group>



		<view style="height: 100px;"></view>

		<view style="position: fixed;bottom: 0;left: 0;width: 100%;z-index: 999; background-color: white;">
			<view class="total">
				<text class="label">总价：</text>
				<text class="value">{{resorderdata.sumpricecost}}元</text>
			</view>
			<button class="submit-btn" @click="submitOrder">{{subtext}}</button>
		</view>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="知道了" title="提示" :content="messageText"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
		
		<u-toast ref="uToast" />

	</view>
</template>

<script>
	import $store from '@/store/modules/social/test.js';
	export default {
		data() {
			return {


				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',

				loadingshow: false,
				status: 'more',
				subtext: "提交订单",

				name: '',
				phone: '',
				resorderdata: {},
				currentuname: '',
				currentuid: 0,

				orderstatus: 0

			}
		},

		onLoad(orderdata) {
			let orderdatadetail = JSON.parse(decodeURIComponent(orderdata.data));
			console.log(orderdatadetail);
			this.resorderdata = orderdatadetail;
			
			// 获取用户信息
			this.$store.dispatch('GetInfo').then(res => {
				console.log("当前下单用户的昵称为：", res.user.nickName);
				console.log("当前下单用户的ID为", res.user.userId);
				this.currentuname = res.user.nickName;
				this.currentuid = res.user.userId;
				
				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/getUserInfoByUserId/' + res.user.userId,
					method: 'GET',
					data: {},
					success: res => {
						console.log("--------------------------");
						console.log(res);
						
						this.name = res.data.data.userName;
						this.phone = res.data.data.phonenumber;
					},
					fail: () => {},
					complete: () => {}
				});
				
			});


		},

		onShow() {
			this.$store.dispatch('GetInfo').then(res => {
				console.log("当前下单用户的昵称为：", res.user.nickName);
				console.log("当前下单用户的ID为", res.user.userId);
				this.currentuname = res.user.nickName;
				this.currentuid = res.user.userId;
				
				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/getUserInfoByUserId/' + res.user.userId,
					method: 'GET',
					data: {},
					success: res => {
						console.log("--------------------------");
						console.log(res);
						
						this.name = res.data.data.userName;
						this.phone = res.data.data.phonenumber;
					},
					fail: () => {},
					complete: () => {}
				});

			});
			this.name = '';
			this.phone = '';
			this.subtext = '提交订单';
			

		},

		computed: {
			totalPrice() {
				return this.ticketPrice * this.ticketQuantity
			}
		},
		methods: {

			dialogConfirm() {
				// console.log('点击确认')
				// this.messageText = `点击确认了 ${this.msgType} 窗口`
				// this.$refs.message.open()
			},

			dialogClose() {
				// console.log('点击关闭')
			},

			dialogToggle(type, info) {
				this.msgType = type
				this.messageText = info
				this.$refs.alertDialog.open()
			},


			submitOrder() {
				//生成当前时间和十分钟自动超时时间
				// 打印当前订单信息

				// 判断当前总金额，如果为0说明是免费活动，无需支付
				if (this.resorderdata.sumpricecost === 0) {
					this.orderstatus = 1;
				};

				// 检查输入信息
				if (this.name === '') {
					this.dialogToggle('error', "您还未填写姓名");
				} else {

					if (this.phone === '') {
						this.dialogToggle('error', "您还未填写手机号");
					} else {
						uni.request({
							url: 'http://123.56.217.170:8080/actActivity/addAActOrder',
							method: 'POST',
							data: {
								"actid": this.resorderdata.actid,
								"userid": this.currentuid,
								"sessionid": this.resorderdata.sessionid,
								"priceid": this.resorderdata.priceid,
								"username": this.name,
								"phonenumber": this.phone,
								"ticketnum": this.resorderdata.ticketnum,
								"totalprice": this.resorderdata.sumpricecost,
								"orderstatus": this.orderstatus
							},
							success: res => {
								console.log(res.data);
								// 提交订单的逻辑代码
								this.subtext = "正在生成订单...";
								setTimeout(() => {
									this.subtext = "订单生成完成!正在跳往订单详情页...";
									// 跳向新页面
									uni.navigateTo({
										url: '../../orderdetail/orderdetail?data=' + res.data,
										success: res => {
											console.log("打开订单详情页面成功");
										},
										fail: () => {
											console.log("打开订单详情页面失败");
										},
										complete: () => {}
									});

								}, 2000);
								// 拿到生成订单的id 信息
								
							},
							fail: () => {},
							complete: () => {}
						});
					}
				}

			}
		}
	}
</script>

<style>
	/* 	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
	} */

	.poster {
		width: 100%;
		height: 200px;
		object-fit: cover;
		/* margin-bottom: 10px; */
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
	}

	.title {
		font-size: 24px;
		font-weight: bold;
		margin-bottom: 10px;
		text-align: center;
	}

	.session {
		font-size: 18px;
		margin-bottom: 10px;
		text-align: center;
	}

	.price,
	.quantity {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.label {
		margin-top: 5px;
		font-size: 16px;
		font-weight: bold;
		margin-left: 10px;
		text-align: center;
	}

	.value {
		font-size: 16px;
		margin-left: 5px;
	}

	.input {
		width: 100%;
		height: 40px;
		margin-bottom: 10px;
		padding: 0 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
	}

	.total {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.submit-btn {
		width: 80%;
		height: 40px;
		background-color: #f60;
		color: #fff;
		font-size: 15px;
		font-weight: bold;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-bottom: 5px;
	}
</style>