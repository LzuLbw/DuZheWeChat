<template>
	<view>
		<view class="welcome">
			<text>欢迎来到</text>
			<text>读者小站</text>
		</view>
		<!-- 方块 -->
		<view class="people-view">
			<view class="hello">您好，请选择就餐人数</view>
			<view class="table-num" @click="open">桌号：{{table_number_computed}}</view>
			<!-- 滑动 -->
			<view class="table-num table-scroll">
				<scroll-view scroll-x="true" class="scroll-view_H" :enable-flex="true">
					<view class="table-block">
						<block v-for="(item,index) in people" :key="index">
							<view @click="choice(index,item)" :class="{activetext:index === num}">{{item}}</view>
						</block>
					</view>
				</scroll-view>
			</view>
			<!-- 按钮 -->
			<view class="start-diancan" :class="[num > -1 ? 'start-activ' : '']" @click="start()">开始点餐</view>
		</view>

		<jpSelect ref="jpSelect" :list="list" @checked="checked" :item="item" select="radio" tite="请选择桌号"></jpSelect>




	</view>
</template>

<script>
	//选择器
	import jpSelect from '@/pagesA/components/diancan/jp-select/jp-select.vue';
	

	
	export default {
		components: {
			jpSelect
		},
		
		data() {
			return {
				num: -1,
				people: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				table_number: null,


				item: '',
				list: [{
					id: '01',
					name: '001'
				}, {
					id: '02',
					name: '002'
				},{
					id: '03',
					name: '003'
				},{
					id: '04',
					name: '004'
				}]
			}
		},
		methods: {
			//选择器
			checked(el) {
				this.item = el
				this.table_number = this.item.name
				
				wx.setStorageSync('table_num',this.table_number)
			},
			open(){
				this.$refs.jpSelect.toOpen();
			},


			//选择人数
			choice(index, item) {
				this.num = index
				wx.setStorageSync('number_of_diners', item)
			},
			//开始点餐
			start() {
				if (this.num <= -1 || this.table_number == null) {
					return false
				} else {
					// wx.reLaunch({
					// 	url: '../home-page/page'
					// })
					uni.navigateTo({
						url: '/pages/shop/diancan/index'
					});
				}
			},
			onNavigationBarButtonTap(e) {
				if (e.float == 'right') {
					uni.scanCode({
						onlyFromCamera: true,
						hideAlbum: true,
						success: function(res) {
							console.log(res.result);
							void plus.runtime.openURL(res.result, function() {
							})
						}
					})
				}
			}
			
		},
		computed:{
			table_number_computed(){
				if(this.table_number == undefined){
					return '点击选择桌号'
				}else{
					return this.table_number
				}
			}
		},
		onLoad(e) {
			console.log('in')
			console.log(e)
			if (e.number != undefined) {
				this.table_number = e.number
				wx.setStorageSync('table_num', this.table_number)
				
			} else {
				console.log('1111')
				
				this.$refs.jpSelect.toOpen()

			}

		}
	}
</script>

<style>
	page {
		background-image: url('https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/9e9ef5e7-ca56-4e03-b119-f919f28f88a670641416d2aeecd89c905643c73bb2b1.jpeg');
		background-attachment: fixed;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.welcome {
		color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 270rpx;
	}

	.welcome text {
		display: block;
		font-size: 50rpx;
	}

	.welcome text:nth-child(1) {
		font-family: monospace;
		padding-bottom: 20rpx;
	}

	/* 方块 */
	.people-view {
		background-color: #FFFFFF;
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 100rpx;
		height: 550rpx;
		border-radius: 15rpx;
	}

	.hello {
		height: 80rpx;
		font-size: 35rpx;
		font-weight: bold;
		line-height: 80rpx;
		padding-left: 20rpx;
	}

	.table-num {
		font-size: 30rpx;
		padding-left: 20rpx;
	}

	.table-scroll {
		margin-top: 100rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 75rpx;
	}

	.table-block {
		display: flex;
		align-items: center;
	}

	.table-block view {
		height: 75rpx;
		line-height: 75rpx;
		text-align: center;
		background-color: #f7f8f9;
		margin-right: 25rpx;
		padding: 0 70rpx;
		border-radius: 15rpx;
	}

	/* 按钮 */
	.start-diancan {
		height: 90rpx;
		line-height: 90rpx;
		background-color: #fdf4d7;
		color: #c2c2c2;
		text-align: center;
		margin: 130rpx 20rpx 0 20rpx;
		border-radius: 15rpx;
	}

	/* 点击后加上颜色*/
	.activetext {
		background-color: #f9dd89 !important;
	}

	.start-activ {
		/* background-color: #f6c947 !important; */
		color: #000000 !important;
		background: linear-gradient(to right, #f8da81, #f8d771, #f7d362, #f6cb4a) !important;
	}
</style>
