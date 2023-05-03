<template>
	<view class="container">
		<view style="height: 20rpx;background-color: white;"></view>
		<image class="poster" :src="ActivityData.activityPicurl" />


		<!-- <view class="title">{{  }}</view> -->

		<uni-section :title="ActivityData.activityMaintitle" :sub-title="ActivityData.activitySubtitle"
			type="line"></uni-section>

		<!-- <view style="height: 20rpx;background-color: white;"></view> -->
		<view style="height: 20rpx;background-color:whitesmoke"></view>

		<uni-section class="mb-10" title="场次选择" :sub-title="totalsessions">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
		</uni-section>


		<view style="display: flex; flex-wrap: wrap;">
			<view style="width: 375rpx;" v-for="(item,index) in currentactsessions" :key="index"
				@click="selectsessionopt(item)">
				<uni-group mode="card" :class="item.activate ? 'sessionselect' : ''">
					<view :class="item.activate ? 'sessionselect' : ''" style="font-weight: bold;"> {{item.sessionname}}
					</view>
					<hr style="margin-top: 1rpx;margin-bottom: 1rpx;">
					<text :class="item.activate ? 'sessionselect' : ''" style="font-size: 0.3rem;">开始时间</text>
					<view :class="item.activate ? 'sessionselect' : ''"> {{item.sessionstarttime}} </view>
					<text :class="item.activate ? 'sessionselect' : ''" style="font-size: 0.3rem;">结束时间</text>
					<view :class="item.activate ? 'sessionselect' : ''"> {{item.sessionendtime}} </view>
					<text :class="item.activate ? 'sessionselect' : ''" style="font-size: 0.3rem;">场次地点</text>
					<view :class="item.activate ? 'sessionselect' : ''"> {{item.sessionlocation}} </view>
				</uni-group>
			</view>
		</view>
		<view style="height: 20rpx;"></view>

		<uni-section class="mb-10" title="价格选择" :sub-title="totalprices">
			<template v-slot:decoration>
				<view class="decoration"></view>
			</template>
		</uni-section>



		<view style="display: flex; flex-wrap: wrap;">
			<view style="width: 250rpx;" v-for="(item,index) in currentactprices" :key="index"
				@click="selectpriceopt(item)">
				<uni-group mode="card" :class="item.activate ? 'priceselect' : ''">
					<view :class="item.activate ? 'priceselect' : ''"> {{item.pricedescription}} </view>
					<view :class="item.activate ? 'priceselect' : ''"> ￥{{item.pricenum}} </view>
				</uni-group>
			</view>
		</view>

		<view style="margin-bottom: 10px;height: 220px;">

		</view>

		<view style="position: fixed;bottom: 0;left: 0;width: 100%;z-index: 999; background-color: white;">
			<uni-section class="mb-10" title="购买份数" :sub-title="'当前剩余' + leftticketsnum + '份'">
				<template v-slot:decoration>
					<view class="decoration"></view>
				</template>
			</uni-section>
			<!-- <input class="input" type="number" :value="quantity" @input="onQuantityChange" /> -->
			<view class="quantity-picker" style="width: 500rpx;text-align: center;">
				<button class="btn minus" :disabled="quantity <= minQuantity" @tap="onMinusTap">-</button>
				<input class="input" type="number" :value="quantity" @input="onQuantityChange" />
				<button class="btn plus" :disabled="quantity >= maxQuantity" @tap="onPlusTap">+</button>
			</view>
			<view class="total-price">总计：{{ totalPrice }}</view>
			<button class="next-btn" @tap="onNextTap">下一步</button>
		</view>

		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="知道了" title="提示" :content="messageText"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				type: 'center',
				msgType: 'success',
				messageText: '这是一条成功提示',
				value: '',

				selectedsession: '',
				selectedprice: '',

				leftticketsnum: 2,

				sessions: [{
						name: "场次1",
						activate: false
					},
					{
						name: "场次2",
						activate: false
					},
					{
						name: "场次3",
						activate: false
					},
					{
						name: "场次4",
						activate: false
					},
					{
						name: "场次5",
						activate: false
					},
				],
				sessionIndex: 0,
				prices: [{
						name: "价格1",
						activate: false
					},
					{
						name: "价格2",
						activate: false
					},
					{
						name: "价格3",
						activate: false
					},
					{
						name: "价格4",
						activate: false
					},
					{
						name: "价格5",
						activate: false
					},
				],
				priceIndex: 0,
				quantity: 1,

				minQuantity: 1,
				maxQuantity: 10,


				ActivityData: {},
				currentactsessions: [],
				currentactprices: []
			};
		},
		computed: {
			venues() {
				// 根据场次和价格获取可选场地列表
				// 省略具体实现
				return ["场地1", "场地2", "场地3"];
			},
			totalPrice() {
				// 根据价格和购买数量计算总价
				// 省略具体实现

				return "¥ " + this.selectedprice * this.quantity;
			},
			totalsessions() {
				return "此活动共有" + this.currentactsessions.length + "场[单次只可购买一场]"
			},
			totalprices() {
				return "此活动共有" + this.currentactprices.length + "种票价";
			}
		},

		onLoad(e) {
			// console.log(e);
			console.log(e.actid);

			// 初始化活动信息
			uni.request({
				url: 'http://localhost:8080/actActivity/' + e.actid,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.data);
					this.ActivityData = res.data.data;
					this.maxQuantity = res.data.data.activityPurchasenumber;

					// 初始化场次信息
					uni.request({
						url: 'http://localhost:8080/actActivity/getAllSessions/' + e.actid,
						method: 'GET',
						data: {},
						success: res => {
							console.log("当前活动的场次信息如下: ");
							// console.log(res.data.data);

							console.log(res.data.data);
							for (let i = 0; i < res.data.data.length; i++) {

								var dateString = res.data.data[i].sessionstartdatetime;
								var date = new Date(dateString);
								var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date
									.getDay()
								];


								let item = {
									sessionid: res.data.data[i].sessionid,
									sessionname: res.data.data[i].sessionname + '【' + weekday +
										'】',
									sessionstarttime: res.data.data[i].sessionstartdatetime,
									sessionendtime: res.data.data[i].sessionenddatetime,
									sessionlocation: res.data.data[i].location,
									activate: false
								}

								this.currentactsessions.push(item);
							}

							// this.currentactsessions = res.data.data;
							// console.log(this.currentactsessions);

							// for (let i = 0; i < this.currentactsessions.length; i++) {
							// 	console.log(this.currentactsessions[i]);

							// 	let item = this.currentactsessions[i].sessionname + ' ' + this
							// 		.currentactsessions[i].sessionstartdatetime;
							// 	console.log(item);
							// }

							// 初始化价格信息
							// 初始化场次信息
							uni.request({
								url: 'http://localhost:8080/actActivity/getAllPrices/' + e
									.actid,
								method: 'GET',
								data: {},
								success: res => {
									console.log("当前活动的价格信息如下: ");
									console.log(res.data.data);
									// this.currentactprices = res.data.data;

									for (let i = 0; i < res.data.data.length; i++) {
										let item = {
											priceid: res.data.data[i].priceid,
											pricenum: res.data.data[i].price,
											pricedescription: res.data.data[i]
												.pricedescription,
											activate: false
										}

										this.currentactprices.push(item);
									}

									uni.request({
										url: 'http://123.56.217.170:8080/actSignupinfo/signupnum/' +
											e.actid,
										method: 'GET',
										data: {},
										success: res => {
											console.log("当前活动的已报名人数:", res
												.data);
											this.leftticketsnum = this
												.ActivityData
												.activitityNumbernum - res
												.data;

											this.maxQuantity = this
												.leftticketsnum < this
												.ActivityData
												.activityPurchasenumber ?
												this.leftticketsnum : this
												.ActivityData
												.activityPurchasenumber;

										},
										fail: () => {},
										complete: () => {}
									});

								},
								fail: () => {},
								complete: () => {}
							});
						},
						fail: () => {},
						complete: () => {}
					});


				},
				fail: () => {},
				complete: () => {}
			});

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

			selectpriceopt(e) {
				// console.log(e.activate);
				for (let i = 0; i < this.currentactprices.length; i++) {
					this.currentactprices[i].activate = false;
				}
				e.activate = true;

				this.selectedprice = e.pricenum;

				console.log(this.selectedsession);
				console.log(this.selectedprice);

			},

			selectsessionopt(e) {
				// console.log("选择了" + e);
				// console.log(e.activate);
				for (let i = 0; i < this.currentactsessions.length; i++) {
					this.currentactsessions[i].activate = false;
				}
				e.activate = true;
				this.selectedsession = e.sessionname;

				console.log(this.selectedsession);
				console.log(this.selectedprice);
			},

			onMinusTap() {
				if (this.quantity > this.minQuantity) {
					this.quantity--;
				}
			},
			onPlusTap() {
				if (this.quantity < this.maxQuantity) {
					this.quantity++;
				}
			},
			onQuantityChange(event) {
				let value = parseInt(event.detail.value);
				if (isNaN(value)) {
					value = this.minQuantity;
				}
				value = Math.min(Math.max(value, this.minQuantity), this.maxQuantity);
				this.$emit("update:quantity", value);
			},


			onSessionChange(event) {
				this.sessionIndex = event.detail.value;
			},
			onPriceChange(event) {
				this.priceIndex = event.detail.value;
			},
			onQuantityChange(event) {
				this.quantity = event.detail.value;
			},
			onNextTap() {

				// 封装订单数据给下一页带去
				let orderdata = {
					actid: this.ActivityData.activityId,
					actpicurl: this.ActivityData.activityPicurl,
					actname: this.ActivityData.activityMaintitle
				}

				// console.log("当前选择场次ID信息");
				for (let i = 0; i < this.currentactsessions.length; i++) {
					if (this.currentactsessions[i].activate) {
						// console.log(this.currentactsessions[i].sessionid);
						orderdata.sessionid = this.currentactsessions[i].sessionid;
						orderdata.sessionname = this.currentactsessions[i].sessionname;
						orderdata.sessionstartdatetime = this.currentactsessions[i].sessionstarttime;
						orderdata.sessionenddatetime = this.currentactsessions[i].sessionendtime;
					}
				}

				for (let i = 0; i < this.currentactprices.length; i++) {
					if (this.currentactprices[i].activate) {
						// console.log(this.currentactprices[i].priceid);
						orderdata.priceid = this.currentactprices[i].priceid;
						orderdata.pricenum = this.currentactprices[i].pricenum;
						orderdata.pricedescription = this.currentactprices[i].pricedescription;
					}
				}

				orderdata.ticketnum = this.quantity;
				orderdata.sumpricecost = this.selectedprice * this.quantity;


				console.log("====================");
				console.log(orderdata);


				// / 点击下一步按钮后的逻辑
				console.log(orderdata.sessionname);
				if (orderdata.sessionname === undefined) {
					// 还未选择场次，不能进入下一步，提示一下

					this.dialogToggle('error', "您还未选择活动场次信息");

				} else {

					if (orderdata.pricenum === undefined) {
						this.dialogToggle('error', "您还未选择活动价格信息");
					} else {
						// 省略具体实现
						uni.navigateTo({
							url: '../ContactPage/ContactPage?data=' + encodeURIComponent(JSON.stringify(
								orderdata)),
							success: res => {
								console.log("打开下单二级页面成功");
							},
							fail: () => {
								console.log("打开下单二级页面失败");
							},
							complete: () => {}
						});
					}
				}



			},
		},
	};
</script>

<style>
	.priceselect {
		background-color: cornflowerblue;
		color: white;
		font-weight: bold;

	}

	.sessionselect {
		background-color: darkorange;
		color: white;
		font-weight: bold;
	}

	.mb-10 {
		margin-bottom: 10px;
	}

	.decoration {
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: limegreen;
	}


	.quantity-picker {
		display: flex;
		align-items: center;
	}

	.btn {
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 16px;
		font-weight: bold;
		color: #f60;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
		margin: 0 5px;
	}

	.btn:disabled {
		color: #ccc;
		background-color: #f5f5f5;
	}

	.input {
		flex: 1;
		height: 30px;
		padding: 0 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
		text-align: center;
	}


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
		margin-bottom: 10px;
	}

	.title {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 20px;
	}

	.form-item {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	/* 	.label {
		width: 80px;
		font-size: 14px;
		color: #333;
	} */

	.picker {
		flex: 1;

		height: 30px;
		padding: 0 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
	}

	.picker-text {
		font-size: 14px;
		color: #333;
	}

	.input {
		flex: 1;
		height: 30px;
		padding: 0 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		background-color: #fff;
	}

	.total-price {
		font-size: 16px;
		color: #f60;
		font-weight: bold;
		margin-top: 10px;
		margin-left: 10px;
	}

	.next-btn {
		margin-bottom: 10px;
		width: 80%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 16px;
		font-weight: bold;
		color: #fff;
		background-color: #f60;
		border-radius: 4px;
		margin-top: 10px;
	}
</style>