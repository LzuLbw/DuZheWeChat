<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
		</view>
		<!-- 退款-模态层弹窗 -->
		<view class="popup service" :class="returnedPurchaseClass" @touchmove.stop.prevent="discard"
			@tap="hideReturnedPurchase">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer">
				<view class="content">
					<image class="popup-image" src="/static/image/shop/returnedpurchase.jpg"></image>
					<view class="popup-text">信誉优秀 享极速到账</view>
					<view class="popup-text-bottom">商品未发货，本次退款尊享未发秒退服务</view>
				</view>
				<view class="btn">
					<view class="button" @tap="doRapidReturnedPurchase()">确认退款￥{{this.sumPrice}}</view>
				</view>
			</view>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<view class="onorder" v-if="list.length==0">
					<image src="/static/image/shop/noorder.png"></image>
					<view class="text">
						没有相关订单
					</view>
				</view>
				<view class="row" v-for="(row,index) in list" :key="index">
					<view class="type">{{typeText[row.order_status]}}</view>
					<view class="order-info">
						<view class="left">
							<image :src="row.goods_imgUrl" @tap="toOrderDetail(row)"></image>
						</view>
						<view class="right">
							<view class="name">
								{{row.goods_name}}
							</view>
							<view class="price-number">
								￥<view class="price">{{row.goods_nprice}}</view>
								x<view class="number">{{row.goods_num}}</view>
							</view>
						</view>

					</view>
					<view class="detail">
						<view class="number">共{{row.goods_num}}件商品</view>
						<view class="sum">合计￥<view class="price">{{row.goods_nprice*row.goods_num}}</view>
						</view>
						<view class="nominal">(含运费 ￥{{row.freight}})</view>
					</view>
					<view class="btns">
						<block v-if="row.order_status=='1'">
							<view class="default" @tap="cancelOrder(row)">取消订单</view>
							<view class="pay" @tap="toPayment(row)">付款</view>
						</block>
						<block v-if="row.order_status=='2'">
							<view class="default" @tap="remindDeliver(row)">提醒发货</view>
							<view class="default" @tap="showReturnedPurchase(row)">退款</view>
						</block>
						<block v-if="row.order_status=='3'">
							<view class="default" @tap="showLogistics(row)">查看物流</view>
							<view class="pay" @tap="confirmReceipt(row)">确认收货</view>
							<view class="pay" @tap="doReturnedPurchase(row)">我要退货</view>
						</block>
						<block v-if="row.order_status=='4'">
							<view class="default" @tap="toRating(row)">评价</view>
							<view class="default" @tap="doBuyAgain(row.goods_id)">再次购买</view>
						</block>
						<block v-if="row.order_status=='7'">
							<view class="default" @tap="doBuyAgain(row.goods_id)">再次购买</view>
						</block>
						<block v-if="row.order_status=='5'">
							<view class="default" @tap="doReturnedPurchaseDetail(row)">查看进度</view>
						</block>
						<block v-if="row.order_status=='6'">
							<view class="default">已取消</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import $http from "@/common/api/request.js"
	import Logger from "qiniu-js/esm/logger";
import { login } from "../../../api/login";
	export default {
		data() {
			return {
				userId: 0,
				headerPosition: "fixed",
				headerTop: "0px",
				// typeText:{
				// 	unpaid:'等待付款',
				// 	back:'等待商家发货',
				// 	unreceived:'商家已发货',
				// 	received:'等待用户评价',
				// 	completed:'交易已完成',
				// 	refunds:'商品退货处理中',
				// 	cancelled:'订单已取消'
				// },
				typeText: {
					1: '等待付款',
					2: '等待商家发货',
					3: '商家已发货',
					4: '等待用户评价',
					5: '商品退货处理中',
					6: '订单已取消',
					7: '交易已完成',
				},
				orderType: ['全部', '待付款', '待发货', '待收货', '待评价', '退换货','已取消','已完成'],
				list: [],
				tabbarIndex: 0,
				returnedPurchaseClass: '' ,//退款弹窗css类，控制开关动画
				sumPrice:0,
				returnedPurchaseOrederId:0,
			};
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			console.log("option: " + JSON.stringify(option));
			this.userId = option.userId;
			let tbIndex = parseInt(option.tbIndex) + 1;
			console.log(this.userId);
			console.log(tbIndex);
			this.getData(tbIndex);
			this.tabbarIndex = tbIndex;
			//兼容H5下排序栏位置
			// #ifdef H5
			let Timer = setInterval(() => {
				let uniHead = document.getElementsByTagName('uni-page-head');
				if (uniHead.length > 0) {
					this.headerTop = uniHead[0].offsetHeight + 'px';
					clearInterval(Timer); //清除定时器
				}
			}, 1);
			// #endif
		},
		onPageScroll(e) {
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
		},
		methods: {
			getData(tbIndex){
				
				$http.request({
					url: "/shop/selectOrders",
					method: "POST",
					data: {
						userId: this.userId,
						orderStatus: tbIndex
					}
				}).then((res) => {
					console.log(res);
					this.list = res;
					console.log(this.list);
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			//服务弹窗
			showReturnedPurchase(row) {
				console.log('show');
				this.sumPrice = row.goods_nprice*row.goods_num;
				this.returnedPurchaseClass = 'show';
				this.returnedPurchaseOrederId = row.order_id;
				console.log(this.returnedPurchaseOrederId);
			},
			//关闭退款弹窗
			hideReturnedPurchase() {
				this.returnedPurchaseClass = 'hide';
				setTimeout(() => {
					this.returnedPurchaseClass = 'none';
				}, 200);
			},
			showType(tbIndex) {
				this.tabbarIndex = tbIndex;
				console.log(this.tabbarIndex); 
				if (tbIndex == 0) {
					$http.request({
						url: "/shop/selectAllOrders",
						method: "POST",
						data: {
							userId: this.userId
						}
					}).then((res) => {
						this.list = res;
						console.log(this.list);
					}).catch(() => {
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						})
					})
				} else {
					$http.request({
						url: "/shop/selectOrders",
						method: "POST",
						data: {
							userId: this.userId,
							orderStatus: tbIndex
						}
					}).then((res) => {
						console.log(res);
						this.list = res;
						console.log(this.list);
					}).catch(() => {
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						})
					})
					console.log(123);
				}
			},
			showLogistics(row) {
				uni.navigateTo({
					url: '/pages/shop/order/logistics'
				})
			},
			remindDeliver(row) {
				uni.showToast({
					title: '已提醒商家发货'
				})
			},
			cancelOrder(row) {
				uni.showModal({
					title: '取消订单',
					content: '确定取消此订单？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.doCancelOrder(row);
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			doCancelOrder(row) {
				// let typeNum = this.list.length;
				// for(let i=0;i<typeNum;i++){
				// 	let list = this.list[i];
				// 	let orderNum = list.length;
				// 	if(orderNum>0 && list[0].order_status==1){
				// 		for(let j=0;j<orderNum;j++){
				// 			if(this.list.order_status == ordersn){
				// 				this.list.order_status = 6;
				// 				break;
				// 			}
				// 		}
				// 	}

				// }
				$http.request({
					url: "/shop/doCancelOrder",
					method: "POST",
					data: {
						userId: this.userId,
						orderId: row.order_id
					}
				}).then((res) => {
					uni.showToast({
						title: "取消成功",
						icon: "none"
					})
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			toPayment(row) {
				//本地模拟订单提交UI效果
				uni.showLoading({
					title: '正在获取订单...'
				})
				let paymentOrder = [];
				paymentOrder.push(row);
				setTimeout(() => {
					uni.setStorage({
						key: 'paymentOrder',
						data: paymentOrder,
						success: () => {
							uni.hideLoading();
							uni.navigateTo({
								url: '/pages/shop/pay/payment/payment?amount=' + row.payment
							})
						}
					})
				}, 500)
			},
			toOrderDetail(item) {
				uni.setStorage({
					key: 'OrderDetail',
					data: item,
					success: () => {
						uni.navigateTo({
							url: '/pages/shop/order/detail'
						})
					}
				})
			},
			doBuyAgain(id) {
				console.log(id);
				console.log(this.userId);
				uni.navigateTo({
					url: '/pages/shop/goods/goods?id= ' + id + '&userId=' + this.userId + ''
				})
			},
			confirmReceipt(row) {
				console.log(row.order_id);
				$http.request({
					url: "/shop/confirmReceipt",
					method: "POST",
					data: {
						userId: this.userId,
						orderId: row.order_id
					}
				}).then((res) => {
					uni.showToast({
						title: "收货成功",
						icon: "none"
					})
					uni.redirectTo({
						url: '/pages/shop/order_list/order_list?tbIndex=2&userId= '+this.userId+''
					})
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			doReturnedPurchase(row) {
				console.log(row.order_id);
				$http.request({
					url: "/shop/doReturnedPurchase",
					method: "POST",
					data: {
						userId: this.userId,
						orderId: row.order_id
					}
				}).then((res) => {
					uni.showToast({
						title: "退货成功",
						icon: "none"
					})
					uni.redirectTo({
						url: '/pages/shop/order_list/order_list?tbIndex=2&userId= '+this.userId+''
					})
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			doRapidReturnedPurchase() {
				$http.request({
					url: "/shop/doReturnedPurchase",
					method: "POST",
					data: {
						userId: this.userId,
						orderId: this.returnedPurchaseOrederId
					}
				}).then((res) => {
					uni.showToast({
						title: "退货成功",
						icon: "none"
					})
					uni.redirectTo({
						url: '/pages/shop/order_list/order_list?tbIndex= '+this.tabbarIndex+'&userId= '+this.userId+''
					})
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			doReturnedPurchaseDetail(row){
				const goodsId = row.goods_id;
				const goodsImgUrl = row.goods_imgUrl;
				const goodsPrice = row.goods_nprice;
				const goodsNum = row.goods_num;
				const orderId = row.order_id;
				const goodsName = row.goods_name;
				uni.navigateTo({
					url:'/pages/shop/order/returnedPurchaseDetail?goodsId='+ goodsId + '&goodsImgUrl='+ goodsImgUrl + '&goodsPrice='+ goodsPrice + '&goodsNum='+ goodsNum +'&orderId='+ orderId +'&goodsName='+goodsName+'&userId='+this.userId+''
				})
				console.log(row);
			},
			toRating(e) {
				const imgUrl = e.goods_imgUrl;
				const goodsId = e.goods_id;
				console.log(e);
				uni.navigateTo({
					url: '/pages/shop/goods/comment/index?imgUrl=' + imgUrl + '&userId=' + this.userId +
						'&goodsId=' + goodsId + ''
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 100%;
			padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 0;
			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 30upx;
				}
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}

				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;

					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}

			.length {
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;

				.text {
					font-size: 30upx;
				}

			}

		}
	}

	.topTabBar {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #f8f8f8;
		height: 80upx;
		display: flex;
		justify-content: space-around;

		.grid {
			width: 20%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #444;
			font-size: 28upx;

			.text {
				height: 76upx;
				display: flex;
				align-items: center;

				&.on {
					color: #f06c7a;
					border-bottom: solid 4upx #f06c7a;
				}
			}

		}
	}

	.order-list {
		margin-top: 80upx;
		padding-top: 20upx;
		width: 100%;

		.list {
			width: 94%;
			margin: 0 auto;

			.onorder {
				width: 100%;
				height: 50vw;
				display: flex;
				justify-content: center;
				align-content: center;
				flex-wrap: wrap;

				image {
					width: 20vw;
					height: 20vw;
					border-radius: 100%;
				}

				.text {
					width: 100%;
					height: 60upx;
					font-size: 28upx;
					color: #444;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.row {
				width: 100%;
				padding: 10upx 20upx;
				border-radius: 10upx;
				background-color: #fff;
				margin-bottom: 20upx;

				.type {
					font-size: 26upx;
					color: #ec652f;
					height: 50upx;
					display: flex;
					align-items: center;
				}

				.order-info {
					width: 100%;
					display: flex;

					.left {
						flex-shrink: 0;
						width: 25vw;
						height: 25vw;

						image {
							width: 25vw;
							height: 25vw;
							border-radius: 10upx;
						}
					}

					.right {
						width: 100%;
						margin-left: 10upx;
						position: relative;

						.name {
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}

						.spec {
							color: #a7a7a7;
							font-size: 22upx;

						}

						.price-number {
							position: absolute;
							bottom: 0;
							width: 100%;
							display: flex;
							justify-content: flex-end;
							font-size: 22upx;
							color: #333;
							display: flex;
							align-items: flex-end;

							.price {
								font-size: 24upx;
								margin-right: 5upx;
							}

						}
					}
				}

				.detail {
					display: flex;
					justify-content: flex-end;
					align-items: flex-end;
					height: 60upx;
					font-size: 26upx;

					.sum {
						padding: 0 8upx;
						display: flex;
						align-items: flex-end;

						.price {
							font-size: 30upx;
						}
					}

				}

				.btns {
					height: 80upx;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					view {
						min-width: 120upx;
						height: 50upx;
						padding: 0 20upx;
						border-radius: 50upx;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 28upx;
						margin-left: 20upx;
					}

					.default {
						border: solid 1upx #ccc;
						color: #666;
					}

					.pay {
						border: solid 1upx #ec652f;
						color: #ec652f;
					}
				}
			}
		}
	}

	.popup-image {
		width: 100%;
		height: 600upx;
		padding-top: 20upx;
		padding-bottom: 20upx;
	}
	.popup-text{
		margin-top: 16upx;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 60upx;
		color: #3c3c3c;
	}
	.popup-text-bottom{
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		font-size: 30upx;
		color: #8b8b8b;
	}
</style>
