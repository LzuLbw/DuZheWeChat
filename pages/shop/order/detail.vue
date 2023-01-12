<template>
	<view>
		<view class="orderNumber">
			<view class="">订单编号：</view>
			<view class="">{{orderNumber}}</view>
		</view>
		<!-- 收货地址 -->
		<view class="addr" >
			<view class="icon">
				<image src="/static/image/shop/addricon.png" mode=""></image>
			</view>
			<view class="right">
				<view class="tel-name">
					<view class="name">
						{{receiverName}}
					</view>
					<view class="tel">
						{{receiverPhone}}
					</view>
				</view>
				<view class="addres">
					{{receiverProvince}} {{receiverCity}} {{receiverDistrict}} {{receiverDetail}}
				</view>
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" >
				<view class="goods-info">
					<view class="img">
						<image :src="imgUrl"></image>
					</view>
					<view class="info">
						<view class="title">{{goodsName}}</view>
						<view class="spec">单价:￥{{goodsNprice}}</view>
						<view class="spec">数量:{{goodsNum}}</view>
						<view class="price-number">
							<view class="price">合计￥{{goodsNprice*goodsNum}}</view>
							<view class="number">

							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提示-备注 -->
		<view class="order">
			<view class="row">
				<view class="left">
					订单状态 :
				</view>
				<view class="right">
					<block v-if="orderStatus=='1'"><view >待付款</view></block>
					<block v-if="orderStatus=='2'"><view >待发货</view></block>
					<block v-if="orderStatus=='3'"><view >已发货</view></block>
					<block v-if="orderStatus=='4'"><view >待评价</view></block>
					<block v-if="orderStatus=='5'"><view >退货中</view></block>
					<block v-if="orderStatus=='6'"><view >已取消</view></block>
					<block v-if="orderStatus=='7'"><view >已完成</view></block>
				</view>
			</view>
			<view class="row">
				<view class="left">
					支付状态 :
				</view>
				<view class="right">
					<block v-if="orderStatus=='1'"><view >待付款</view></block>
					<block v-if="orderStatus=='2'"><view >已付款</view></block>
				</view>
			</view>
			<view class="row">
				<view class="left">
					订单单价 :
				</view>
				<view class="right">
					￥{{goodsNprice}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					订单总价 :
				</view>
				<view class="right">
					￥{{goodsNprice*goodsNum}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					优惠金额 :
				</view>
				<view class="right">
					￥0.00
				</view>
			</view>
			<view class="row">
				<view class="left">
					支付金额 :
				</view>
				<view class="right">
					￥{{goodsNprice*goodsNum}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					支付方式 :
				</view>
				<view class="right">
					支付宝支付
				</view>
			</view>
			<view class="row">
				<view class="left">
					快递公司 :
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="row">
				<view class="left">
					快递单号 :
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="row">
				<view class="left">
					创建时间 :
				</view>
				<view class="right">
					{{createTime}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					支付时间 :
				</view>
				<view class="right">
					{{payTime}}
				</view>
			</view>
			<view class="row">
				<view class="left">
					发货时间 :
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="row">
				<view class="left">
					收货时间 :
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="row">
				<view class="left">
					取消时间 :
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="row">
				<view class="left">
					关闭时间 :
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					
				</view>
			</view>
		</view>
		
		<view class="blck">

		</view>
		
	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	export default {
		data() {
			return {
				imgUrl: '',
				orderNumber:'',
				receiverName: '',
				receiverPhone:'',
				receiverProvince: '',
				receiverCity:'',
				receiverDistrict:'',
				receiverDetail:'',
				goodsName:'',
				goodsNum:'',
				goodsNprice:'',
				orderStatus:'',
				createTime:'',
				payTime:'',
			};
		},
		onLoad() {
			uni.getStorage({
				key: 'OrderDetail',
				success: (e) => {
					console.log(e);
					this.orderNumber = e.data.order_id;
					this.imgUrl = e.data.goods_imgUrl;
					this.receiverName = e.data.receiver_name;
					this.receiverPhone = e.data.receiver_phone;
					this.receiverProvince = e.data.receiver_province;
					this.receiverCity = e.data.receiver_city;
					this.receiverDistrict = e.data.receiver_district;
					this.receiverDetail = e.data.receiver_detail;
					this.goodsName = e.data.goods_name;
					this.goodsNum = e.data.goods_num;
					this.goodsNprice = e.data.goods_nprice;
					this.orderStatus = e.data.order_status;
					this.createTime = this.dateFormat(e.data.create_time);
					this.payTime = this.dateFormat(e.data.pay_time);
					console.log(this.createTime);
					console.log(this.payTime);
					uni.removeStorage({
						key:'OrderDetail'
					})
				}
			})
		},
		onShow(e) {
			//页面显示时，加载订单信息
		},
		onHide() {

		},
		onBackPress() {
			//页面后退时候，清除订单信息
			
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			dateFormat:function(time) {
			    var date=new Date(time);
			    var year=date.getFullYear();
			    /* 在日期格式中，月份是从0开始的，因此要加0
			     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
			     * */
			    var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
			    var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
			    var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
			    var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
			    var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
			    // 拼接
			    return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
			}
		}
	}
</script>

<style lang="scss">
	.orderNumber {
		width: 86%;
		padding: 20upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		display: flex;
	}

	.addr {
		width: 86%;
		padding: 20upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;
		display: flex;

		.icon {
			width: 80upx;
			height: 80upx;
			display: flex;
			align-items: center;

			image {
				width: 60upx;
				height: 60upx;
			}
		}

		.tel-name {
			width: 100%;
			display: flex;
			font-size: 32upx;

			.tel {
				margin-left: 40upx;
			}
		}

		.addres {
			width: 100%;
			font-size: 26upx;
			color: #999;
		}
	}

	.buy-list {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 30upx 0;

			.goods-info {
				width: 100%;
				display: flex;

				.img {
					width: 22vw;
					height: 22vw;
					border-radius: 10upx;
					overflow: hidden;
					flex-shrink: 0;
					margin-right: 10upx;

					image {
						width: 22vw;
						height: 22vw;
					}
				}

				.info {
					width: 100%;
					height: 22vw;
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;
					position: relative;

					.title {
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						// text-align: justify;
						overflow: hidden;
					}

					.spec {
						font-size: 22upx;
						background-color: #f3f3f3;
						color: #a7a7a7;
						height: 40upx;
						display: flex;
						align-items: center;
						padding: 0 10upx;
						border-radius: 20upx;
						margin-bottom: 20vw;
					}

					.price-number {
						position: absolute;
						width: 100%;
						bottom: 0upx;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						font-size: 28upx;
						height: 40upx;

						.price {
							color: #f06c7a;
						}

						.number {
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}
		}
	}

	.order {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			margin: 20upx 0;
			height: 40upx;
			display: flex;

			.left {
				font-size: 28upx;
			}

			.right {
				margin-left: 40upx;

				input {
					font-size: 26upx;
					color: #999;
				}
			}
		}
	}

	.blck {
		width: 100%;
		height: 100upx;
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.settlement {
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
				}
			}

			.btn {
				padding: 0 30upx;
				height: 60upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}

	.detail {
		width: 86%;
		padding: 10upx 3%;
		margin: 30upx auto 20upx auto;
		box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
		border-radius: 20upx;

		.row {
			height: 60upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nominal {
				font-size: 28upx;
			}

			.content {
				font-size: 26upx;
				color: #f06c7a;
			}
		}
	}
</style>
