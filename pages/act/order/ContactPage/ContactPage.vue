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
			<button class="submit-btn" @click="submitOrder">提交订单</button>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				name: '',
				phone: '',
				resorderdata: {}
			}
		},

		onLoad(orderdata) {
			let orderdatadetail = JSON.parse(decodeURIComponent(orderdata.data));
			console.log(orderdatadetail);
			this.resorderdata = orderdatadetail;
		},

		computed: {
			totalPrice() {
				return this.ticketPrice * this.ticketQuantity
			}
		},
		methods: {
			submitOrder() {
				// 提交订单的逻辑代码
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