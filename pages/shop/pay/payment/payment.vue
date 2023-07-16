<template>
	<view>
		<view class="block">
			<view class="content">
				<view class="orderinfo">
					<view class="row">
						<view class="nominal">订单名称:</view><view class="text">{{orderName}}</view>
					</view>
					<view class="row">
						<view class="nominal">订单金额:</view><view class="text">{{amount}}元</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				选择支付方式
			</view>
			<view class="content">
				<view class="pay-list">
					<view class="row" @tap="paytype='alipay'">
							<view class="left">
								<image src="/static/image/shop/alipay.png"></image>
							</view>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="paytype=='alipay'" color="#f06c7a" />
							</view>
					</view>
					<view class="row" @tap="paytype='wxpay'">
							<view class="left">
								<image src="/static/image/shop/wxpay.png"></image>
							</view>
							<view class="center">
								微信支付
							</view>
							<view class="right">
								<radio :checked="paytype=='wxpay'" color="#f06c7a" />
							</view>
					</view>
					<view class="row" @tap="paytype='pocketpay'">
							<view class="left">
								<image src="/static/image/shop/quan.png"></image>
							</view>
							<view class="center">
								我的钱包支付
							</view>
							<view class="right">
								<radio :checked="paytype=='pocketpay'" color="#f06c7a" />
							</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="doDeposit">立即支付</view>
			<view class="tis">
				点击立即支付，即代表您同意<view class="terms">
					《条款协议》
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				amount:0,
				orderName:'',
				paytype:'alipay',//支付类型
				
			};
		},
		computed: {
			...mapState({
				orderNumber: state => state.order.orderNumber,
			})
		},
		onLoad(e) {
			this.amount = parseFloat(e.amount).toFixed(2);
			uni.getStorage({
				key:'paymentOrder',
				success: (e) => {
					
					
					if(e.data.length>1){
						this.orderName = '多商品合并支付'
					}else{
						this.orderName = e.data[0].name;
					}
					uni.removeStorage({
						key:'paymentOrder'
					})
				}
			})
		},
		methods:{
			doDeposit(){
				console.log(this.paytype);
				$http.request({
					url: "/shop/payment",
					method: "POST",
					data: {
						orderId:this.orderNumber,
						price:this.amount,
						orderName:this.orderName
					}
				}).then((res) => {
					console.log(res);
					plus.runtime.openURL(res.paymentUrl);
					setTimeout(()=>{
						uni.hideLoading();
						uni.showToast({
							title:'支付成功'
						});
						setTimeout(()=>{
							uni.redirectTo({
								url:'../../pay/success/success?amount='+this.amount
							});
						},300);
					},700)
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
.block{
		width: 94%;
		padding: 0 3% 40upx 3%;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.orderinfo{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 90upx;
					display: flex;
					align-items: center;
					.nominal{
						flex-shrink: 0;
						font-size: 32upx;
						color: #7d7d7d;
					}
					.text{
						width: 70%;
						margin-left: 10upx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size: 32upx;
					}
				}
			}
			.pay-list{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;
					.left{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						align-items: center;
						image{
							width: 80upx;
							height: 80upx;
						}
					}
					.center{
						width: 100%;
						font-size: 30upx;
					}
					.right{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.pay{
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.btn{
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #f06c7a;
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.2);
		}
		.tis{
			margin-top: 10upx;
			width: 100%;
			font-size: 24upx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;
			.terms{
				color: #5a9ef7;
			}
		}
	}
</style>
