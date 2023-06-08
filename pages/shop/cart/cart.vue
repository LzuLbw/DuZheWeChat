<template>
	<view>
		<view>
			<uniNavBar title='购物车' :right-text='  isNavBar?"完成":"编辑"   ' fixed='true' status-bar='true'
				@clickRight='  isNavBar = !isNavBar  '></uniNavBar>
		</view>
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="tis" v-if="goodsList.length==0">购物车是空的哦~</view>
			<view class="row" v-for="(row,index) in goodsList" :key="index">
				<!-- 商品 -->
				<view class="carrier">
					<!-- checkbox -->
					<view class="checkbox-box">
						<label class="radio" @tap="selectedItem(index)">
							<radio value="" color="#f06c7a" :checked="row.checked" /><text></text>
						</label>
					</view>
					<!-- 商品信息 -->
					<view class="goods-info" @tap="toGoods(row)">
						<view class="img">
							<image :src="row.imgUrl"></image>
						</view>
						<view class="info">
							<view class="title">{{row.name}}</view>
							<view class="price-number">
								<view class="price">￥{{row.nprice}}</view>
								<template v-if="!isNavBar">
									<view>*{{row.goods_num}}</view>
								</template>
								<template v-else>
									<uniNumberBox :value='row.goods_num' :min="1" @change='changeNumber($event,index,row)'>
									</uniNumberBox>
								</template>

							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 脚部菜单 -->
		<view class="footer">
			<view class="checkbox-box">
				<label class="radio" @tap='checkedAllFn'>
					<radio value="" color='#f06c7a' :checked="checkedAll" />
				</label>
				<view class="text">全选</view>
			</view>
			<template v-if="!isNavBar">
				<view class="settlement">
					<view class="sum">合计:<view class="money">￥{{totalCount.nprice}}</view>
					</view>
					<view class="btn" @tap="toConfirmation()">结算({{totalCount.goods_num}})</view>
				</view>
			</template>
			<template v-else>
				<view class="settlement">
					<view class="btn" style="background-color: black;">移入收藏夹</view>
					<view class="btn" @tap="delGoodsFn">删除</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
	import uniNumberBox from '@/components/uni/uni-number-box/uni-number-box.vue'
	import $http from "@/common/api/request.js"
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				userId:0,
				isNavBar: false,
				headerPosition: "fixed",
				headerTop: null,
				statusTop: null,
				showHeader: true,
				//控制滑动效果
				theIndex: null,
				oldIndex: null,
				isStop: false
			}
		},
		components: {
			uniNumberBox,
			uniNavBar
		},
		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
			this.headerTop = e.scrollTop >= 0 ? null : 0;
			this.statusTop = e.scrollTop >= 0 ? null : -this.statusHeight + 'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(e) {
			this.userId = e.userId;
			console.log(this.userId);
			//兼容H5下结算条位置
			// #ifdef H5
			this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + 'px';
			// #endif
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		onShow() {
			this.getData();
		},
		computed: {
			...mapState({
				goodsList: state => state.cart.list,
				selectedList:state=>state.cart.selectedList
			}),
			...mapGetters(['checkedAll', 'totalCount'])
		},
		methods: {
			...mapActions(['checkedAllFn','delGoodsFn']),
			...mapMutations(['selectedItem','initGetData','initOrder']),
			getData() {
				$http.request({
					url: "/goods/selectCart",
					method:"POST",
					data:{
						userId:this.userId
					}
				}).then((res) => {
					this.initGetData(res);
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			//加入商品 参数 goods:商品数据

			//商品跳转
			toGoods(row) {
				console.log(row);
				uni.navigateTo({
					url: '/pages/shop/goods/goods?id= ' + row.goods_id + '&userId=' + this.userId + ''
				});
			},
			//跳转确认订单页面
			toConfirmation() {
				if( this.selectedList.length === 0 ){
					return uni.showToast({
						title:"请选择商品结算",
						icon:"none"
					})
				}
				let newList = [];
				let goodsName = [];
				let goodsPrice = 0;
				let goodsNum = 0;
				this.goodsList.forEach(item=>{
					this.selectedList.filter(v=>{
						if(item.id == v){
							newList.push(item);
						}
					})
				})
				newList.forEach(v => {
					goodsName.push(v.name);
					goodsNum += parseInt(v.goods_num);
					goodsPrice += v.goods_num * v.nprice;
				})
				console.log(newList);
				$http.request({
					url: "/goods/addOrder",
					method:"POST",
					data:{
						userId:this.userId,
						goodsName:goodsName,
						goodsPrice:goodsPrice,
						goodsNum:goodsNum
					}
				}).then((res) => {
					this.initOrder(res.data[0].order_id);
					console.log(res);
					uni.navigateTo({
						url: '/pages/shop/order/confirmation?userId= '+this.userId+'&detail= '+JSON.stringify(this.selectedList)+''
					})
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			changeNumber(value, index,item) {
				$http.request({
					url: "/goods/updateNumCart",
					method: "POST",
					data: {
						userId:this.userId,
						goodsId:item.goods_id,
						num:value
					}
				}).then((res) => {
					this.goodsList[index].goods_num = value;
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
	page {
		position: relative;
		background-color: #fff;
	}

	.checkbox-box {
		display: flex;
		align-items: center;

		.checkbox {
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx #f06c7a;
			display: flex;
			justify-content: center;
			align-items: center;

			.on {
				width: 25upx;
				height: 25upx;
				border-radius: 100%;
				background-color: #f06c7a;
			}
		}

		.text {
			font-size: 28upx;
			margin-left: 10upx;
		}
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}

	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.title {
			font-size: 36upx;
		}

	}

	.place {

		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}

	.goods-list {
		width: 100%;
		padding: 20upx 0 120upx 0;

		.tis {
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}

		.row {
			width: calc(92%);
			height: calc(22vw + 40upx);
			margin: 20upx auto;

			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;

			.menu {
				.icon {
					color: #fff;
					// font-size: 25upx;
				}

				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}

			.carrier {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}

					100% {
						transform: translateX(-30%);
					}
				}

				@keyframes closeMenu {
					0% {
						transform: translateX(-30%);
					}

					100% {
						transform: translateX(0);
					}
				}

				&.open {
					animation: showMenu 0.25s linear both;
				}

				&.close {
					animation: closeMenu 0.15s linear both;
				}

				background-color: #fff;

				.checkbox-box {
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}

				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;

				.goods-info {
					width: 100%;
					display: flex;
					padding-right: 20upx;

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
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
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
							height: 60upx;

							.price {}

							.number {
								display: flex;
								justify-content: center;
								align-items: flex-end;

								.input {
									width: 60upx;
									height: 60upx;
									margin: 0 10upx;
									background-color: #f3f3f3;

									input {
										width: 60upx;
										height: 60upx;
										display: flex;
										justify-content: center;
										align-items: center;
										text-align: center;
										font-size: 26upx;
									}
								}

								.sub,
								.add {
									width: 45upx;
									height: 45upx;
									background-color: #f3f3f3;
									border-radius: 5upx;

									.icon {
										font-size: 22upx;
										width: 45upx;
										height: 45upx;
										display: flex;
										justify-content: center;
										align-items: center;

									}
								}
							}
						}
					}
				}
			}
		}
	}

	.footer {
		width: 100%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.delBtn {
			border: solid 1upx #f06c7a;
			color: #f06c7a;
			padding: 0 30upx;
			height: 50upx;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.settlement {
			width: 65%;
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
				height: 50upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;

				border-radius: 30upx;
			}
		}
	}
</style>
