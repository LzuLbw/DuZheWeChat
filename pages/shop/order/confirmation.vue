<template>
	<view>
		<view class="orderNumber">
			<view class="">订单编号：</view>
			<view class="">{{orderNumber}}</view>
		</view>
		<!-- 收货地址 -->
		<view class="addr" @tap="selectAddress">
			<view class="icon">
				<image src="/static/image/shop/addricon.png" mode=""></image>
			</view>
			<view class="right">
				<view class="tel-name">
					<view class="name">
						{{path.name}}
					</view>
					<view class="tel">
						{{path.tel}}
					</view>
				</view>
				<view class="addres">
					{{path.province}} {{path.city}} {{path.district}} {{path.detailed}}
				</view>
			</view>
		</view>
		<!-- 购买商品列表 -->
		<view class="buy-list">
			<view class="row" v-for="(row,index) in goodsList" :key="index">
				<view class="goods-info">
					<view class="img">
						<image :src="row.imgUrl"></image>
					</view>
					<view class="info">
						<view class="title">{{row.name}}</view>
						<view class="spec">数量:{{row.goods_num}}</view>
						<view class="price-number">
							<view class="price">￥{{row.nprice*row.goods_num}}</view>
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
					积分 :
				</view>
				<view class="right">
					已扣除{{int}}积分抵扣{{deduction|toFixed}}元
				</view>
			</view>
			<view class="row">
				<view class="left">
					备注 :
				</view>
				<view class="right">
					<input placeholder="选填,备注内容" v-model="note" />
				</view>
			</view>
		</view>
		<!-- 明细 -->
		<view class="detail">
			<view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{goodsPrice|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					运费
				</view>
				<view class="content">
					￥+{{freight|toFixed}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					积分抵扣
				</view>
				<view class="content">
					￥-{{deduction|toFixed}}
				</view>
			</view>
		</view>
		<view class="blck">

		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice|toFixed}}</view>
				</view>
				<view class="btn" @tap="toPay">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	import {
		mapGetters,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				userId: 0,
				buylist: [], //订单列表
				goodsPrice: 0.0, //商品合计价格
				sumPrice: 0.0, //用户付款价格
				freight: 12.00, //运费
				note: '', //备注
				int: 1200, //抵扣积分
				deduction: 0, //抵扣价格
				recinfo: {},
				path: {}
			};
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				orderNumber: state => state.order.orderNumber,
				selectedList: state => state.cart.selectedList
			}),
			...mapGetters(['defaultPath']),
			goodsList() {
				return this.item.map(id => {
					return this.list.find(v => v.id == id);
				})
			}
		},
		onLoad(e) {
			console.log(e);
			this.userId = e.userId;
			this.item = JSON.parse(e.detail);
			$http.request({
				url: "/shop/selectAddress",
				method: "POST",
				data: {
					userId: this.userId
				}
			}).then((res) => {
				this.initAddressList(res);
				console.log(this.defaultPath.length);
				if (this.defaultPath.length) {
					this.path = this.defaultPath[0];
				}
			}).catch(() => {
				uni.showToast({
					title: '请求失败',
					icon: 'none'
				})
			})
		},
		onShow(e) {
			//页面显示时，加载订单信息
			this.goodsPrice = 0;
			//合计
			let len = this.goodsList.length;
			for (let i = 0; i < len; i++) {
				this.goodsPrice = this.goodsPrice + (this.goodsList[i].goods_num * this.goodsList[i].nprice);
			}
			this.deduction = this.int / 100;
			this.sumPrice = this.goodsPrice - this.deduction + this.freight;
			uni.getStorage({
				key: 'selectAddress',
				success: (e) => {
					console.log(e);
					this.path = e.data;
					uni.removeStorage({
						key: 'selectAddress'
					})
				}
			})
		},
		onHide() {

		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();
		},
		filters: {
			toFixed: function(x) {
				return parseFloat(x).toFixed(2);
			}
		},
		methods: {
			...mapMutations(['initAddressList']),
			clearOrder() {
				uni.removeStorage({
					key: 'buylist',
					success: (res) => {
						this.goodsList = [];
						console.log('remove buylist success');
					}
				});
			},
			toPay() {
				//商品列表
				let paymentOrder = [];
				let goodsid = [];
				let goodsName = [];
				let goodsUrl = [];
				let goodsPrice = [];
				let goodsNum = [];
				let len = this.goodsList.length;
				console.log(this.selectedList);
				console.log(this.goodsList);
				for (let i = 0; i < len; i++) {
					paymentOrder.push(this.goodsList[i]);
					goodsid.push(this.goodsList[i].goods_id);
					goodsName.push(this.goodsList[i].name);
					goodsUrl.push(this.goodsList[i].imgUrl);
					goodsPrice.push(this.goodsList[i].nprice);
					goodsNum.push(this.goodsList[i].goods_num);
				}
				console.log(goodsid);
				if (paymentOrder.length == 0) {
					uni.showToast({
						title: '订单信息有误，请重新购买',
						icon: 'none'
					});
					return;
				}
				$http.request({
					url: "/shop/submitOrder",
					method: "POST",
					data: {
						userId: this.userId,
						orderId: this.orderNumber,
						shopArr: this.selectedList,
						goodsid: goodsid,
						goodsName: goodsName,
						goodsUrl: goodsUrl,
						goodsPrice: goodsPrice,
						goodsNum: goodsNum,
						...this.path,
					}
				}).then((res) => {
					console.log(res);
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})

				//本地模拟订单提交UI效果
				uni.showLoading({
					title: '正在提交订单...'
				})
				setTimeout(() => {
					uni.setStorage({
						key: 'paymentOrder',
						data: paymentOrder,
						success: () => {
							uni.hideLoading();
							uni.redirectTo({
								url: "../pay/payment/payment?amount=" + this.sumPrice
							})
						}
					})
				}, 1000)

			},
			//选择收货地址
			selectAddress() {
				console.log(this.userId);
				uni.navigateTo({
					url: '/pages/shop/address/address?type=select&userId=' + this.userId + ''
				})
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
				font-size: 26upx;
				color: #999;

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
