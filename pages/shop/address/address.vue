<template>
 	<view>
 		<view class="content">
 			<view class="list">
 				<view class="row" v-for="(row,index) in addressList" :key="index" @tap="select(row)">
 					<view class="left">
 						<view class="head">
 							{{row.head}}
 						</view>
 					</view>
 					<view class="center">
 						<view class="name-tel">
 							<view class="name">{{row.name}}</view>
 							<view class="tel">{{row.tel}}</view>
 							<view class="default" v-if="row.isDefault == 1 ">
 								默认
 							</view>
 						</view>
 						<view class="address">
 							{{row.province}} {{row.city}} {{row.district}} {{row.detailed}}
 						</view>
 					</view>
 					<view class="right">
 						<view class="icon iconfont icon-bianji" @tap.stop="edit(row)">

 						</view>
 					</view>
 				</view>
 			</view>
 		</view>
 		<view class="add">
 			<view class="btn" @tap="add">
 				新增地址
 			</view>
 		</view>
 	</view>
 </template>
 <script>
 	import $http from "@/common/api/request.js"
 	import {
 		mapState,
 		mapMutations
 	} from 'vuex'
 	export default {
 		data() {
 			return {
 				userId: 0,
 				isSelect: false,
 			};
 		},
 		computed: {
 			...mapState({
 				addressList: state => state.path.list
 			})
 		},
 		onShow() {

 			uni.getStorage({
 				key: 'delAddress',
 				success: (e) => {
 					let len = this.addressList.length;
 					if (e.data.hasOwnProperty('id')) {
 						for (let i = 0; i < len; i++) {
 							if (this.addressList[i].id == e.data.id) {
 								this.addressList.splice(i, 1);
 								break;
 							}
 						}
 					}
 					uni.removeStorage({
 						key: 'delAddress'
 					})
 				}
 			})
 			uni.getStorage({
 				key: 'saveAddress',
 				success: (e) => {
 					let len = this.addressList.length;
 					if (e.data.hasOwnProperty('id')) {
 						for (let i = 0; i < len; i++) {
 							if (this.addressList[i].id == e.data.id) {
 								this.addressList.splice(i, 1, e.data);
 								break;
 							}
 						}
 					} else {
 						let lastid = this.addressList[len - 1];
 						lastid++;
 						e.data.id = lastid;
 						this.addressList.push(e.data);
 					}
 					uni.removeStorage({
 						key: 'saveAddress'
 					})
 				}
 			})
 		},
 		onLoad(e) {
 			console.log(e);
 			if (e.type == 'select') {
 				this.isSelect = true;
 			}
 			this.userId = e.userId;
 			this.initAddress();
 		},
 		methods: {
 			...mapMutations(['initAddressList']),
 			//初始化（请求收获地址接口）
 			initAddress() {
 				$http.request({
 					url: "/shop/selectAddress",
 					method: "POST",
 					data: {
 						userId: this.userId
 					}
 				}).then((res) => {
 					console.log(res);
 					this.initAddressList(res);
 				}).catch(() => {
 					uni.showToast({
 						title: '请求失败',
 						icon: 'none'
 					})
 				})
 			},
 			edit(row) {
 				uni.setStorage({
 					key: 'address',
 					data: row,
 					success() {
 						uni.navigateTo({
 							url: '/pages/shop/address/edit/edit?type=edit&userId=' + this.userId + ''
 						})
 					}
 				});

 			},
 			add() {
 				uni.navigateTo({
 					url: '/pages/shop/address/edit/edit?type=add&userId=' + this.userId + ''
 				})
 			},
 			select(row) {
 				//是否需要返回地址(从订单确认页跳过来选收货地址)
 				if (!this.isSelect) {
 					return;
 				}
 				uni.setStorage({
 					key: 'selectAddress',
 					data: row,
 					success() {
 						uni.navigateBack();
 					}
 				})
 			}
 		}
 	}
 </script>

 <style lang="scss">
 	view {
 		display: flex;
 	}

 	.icon {
 		font-size: 30upx;
		margin-left: 30upx;
 	}

 	.add {
 		position: fixed;
 		bottom: 0;
 		width: 100%;
 		height: 120upx;
 		justify-content: center;
 		align-items: center;

 		.btn {
 			box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
 			width: 70%;
 			height: 80upx;
 			border-radius: 80upx;
 			background-color: #f06c7a;
 			color: #fff;
 			justify-content: center;
 			align-items: center;

 			.icon {
 				height: 80upx;
 				color: #fff;
 				font-size: 30upx;
 				justify-content: center;
 				align-items: center;
 			}

 			font-size: 30upx;
 		}
 	}

 	.list {
 		flex-wrap: wrap;

 		.row {
 			width: 96%;
 			padding: 20upx 2%;

 			.left {
 				width: 90upx;
 				flex-shrink: 0;
 				align-items: center;

 				.head {
 					width: 70upx;
 					height: 70upx;
 					background: linear-gradient(to right, #ccc, #aaa);
 					color: #fff;
 					justify-content: center;
 					align-items: center;
 					border-radius: 60upx;
 					font-size: 35upx;
 				}
 			}

 			.center {
 				width: 100%;
 				flex-wrap: wrap;

 				.name-tel {
 					width: 100%;
 					align-items: baseline;

 					.name {
 						font-size: 34upx;
 					}

 					.tel {
 						margin-left: 30upx;
 						font-size: 24upx;
 						color: #777;
 					}

 					.default {

 						font-size: 22upx;

 						background-color: #f06c7a;
 						color: #fff;
 						padding: 0 18upx;
 						border-radius: 24upx;
 						margin-left: 20upx;
 					}
 				}

 				.address {
 					width: 100%;
 					font-size: 24upx;
 					align-items: baseline;
 					color: #777;
 				}
 			}

 			.right {
 				flex-shrink: 0;
 				align-items: center;
 				
 				.icon {
					padding-left: 20upx;
 					justify-content: center;
 					align-items: center;
 					width: 80upx;
 					height: 60upx;
 					border-left: solid 1upx #aaa;
 					font-size: 60upx;
 					color: #777;
 				}
 			}
 		}
 	}
 </style>
