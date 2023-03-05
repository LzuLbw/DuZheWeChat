<template>
	<!-- 我的订单 -->
	<view>
		<block v-for="(item,index) in res_data" :key="index">
		<view class="my-order-view"  @click="check(item.transac_status,item._id)">
			<view class="my-order-name">
				<text>读者小站餐饮店</text>
				<text>{{item.transac_status == 'success' ? '已完成' : '待结账'}}</text>
			</view>
			<view class="my-order-number">
				<view>
					<view>
						<text>桌台名称 ：</text>
						<text>{{item.table_number}}</text>
					</view>
					<view class="my-order-time">
						<text>下单时间 ：</text>
						<text>{{item.order_time}}</text>
					</view>
				</view>
				<view class="my-order-price">¥{{item.sett_amount}}</view>
			</view>
		</view>
		</block>
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>

	
	
	
	//价格补0 
	const Price = require('e-commerce_price')
export default{
	
	data() {
		return {
			Price,
			res_data:[{
				transac_status:'none',
				table_number:1,
				order_time:'2021-11-9 20:12',
				sett_amount:'13'
			}]
		}
	},
	methods:{
		
	},
	onLoad() {
		
	}
}
</script>

<style>
page{background-color: #f4f4f4;}
.my-order-view{
	background-color: #FFFFFF;
	border-radius: 10rpx;
	margin: 20rpx;
	padding: 20rpx;
}
.my-order-name{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #e5e5e5;
}
.my-order-name text:nth-child(1){
	font-weight: bold;
}
.my-order-number{
	padding-top: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #999999;
}
.my-order-time{
	padding-top: 20rpx;
}
.my-order-price{
	color: #000000 !important;
	font-weight: bold;
}
</style>
