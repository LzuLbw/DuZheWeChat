<template>
	<!-- <button @click="print">打印所有活动信息</button> -->
	<!-- 全部活动卡片渲染 -->
	<view>
		<!-- 组合条件查询 -->
		<view style="display: flex;margin-top: 10px;margin-right: 10px;">
			<w-select style="margin-left: 20rpx;" v-model='chooseValue1' defaultValue="活动地点" :list='list1'
				valueName='content' @change='change1'>
			</w-select>
			<w-select style="margin-left: 20rpx;" v-model='chooseValue2' defaultValue="活动状态" :list='list2'
				valueName='content' @change='change2'>
			</w-select>
			<w-select style="margin-left: 20rpx;" v-model='chooseValue3' defaultValue="活动发起人" :list='list3'
				valueName='content' @change='change3'>
			</w-select>

		</view>

		<view style="margin-top: 5px;margin-left: 5px;margin-right: 5px;">
			<u-gap height="20" bgColor="#00aaff"></u-gap>
		</view>



		<view v-for="(item,index) in AllActivityData">

			<view @click="opendetail(item.activityId)" :data-activityid="item.activityId">

				<uni-card :cover="AllActivityData[index].activityPicUrl">

					<view>
						<text class="uni-body">{{item.activityMaintitle}}</text><br>
						<text class="uni-body">{{item.activitySubtitle}}</text>
					</view>

				</uni-card>

			</view>

		</view>

		<u-back-top :scroll-top="scrollTop"></u-back-top>

		<view style="height: 10px;"></view>
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


				AllActivityData: [],
				scrollTop: 0,
				chooseValue1: "",
				chooseValue2: "",
				chooseValue3: "",

				//活动地点数据
				list1: [{
					id: 1,
					content: '线上'
				}, {
					id: 2,
					content: '线下'
				}],

				//活动状态数据
				list2: [{
						id: 1,
						content: '未开始'
					}, {
						id: 2,
						content: '报名中'
					},
					{
						id: 3,
						content: '进行中'
					},
					{
						id: 4,
						content: '已结束'
					}
				],

				//活动发起人数据
				list3: [{
					id: 1,
					content: '读者公司'
				}, {
					id: 2,
					content: '用户发起'
				}],

			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			
		},
		onLoad() {
			console.log("当前所在位置：全部活动页面");
			console.log("当前登录用户id=", getApp().globalData.uid);
			
			console.log("当前登录用户昵称=", getApp().globalData.name);

			//获取全部活动数据
			uni.request({
				url: 'http://localhost:8080/actActivity',
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.data);
					this.AllActivityData = res.data.data;
				},
				fail: () => {},
				complete: () => {}
			});

		},
		methods: {


			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			messageToggle(type) {
				this.msgType = type
				this.messageText = `这是一条${type}消息提示`
				this.$refs.message.open()
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				console.log('点击确认')
				this.messageText = `点击确认了 ${this.msgType} 窗口`
				this.$refs.message.open()
			},
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			dialogClose() {
				console.log('点击关闭')
			},
			dialogInputConfirm(val) {
				uni.showLoading({
					title: '3秒后会关闭'
				})

				setTimeout(() => {
					uni.hideLoading()
					console.log(val)
					this.value = val
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 3000)
			},
			shareToggle() {
				this.$refs.share.open()
			},



			// 保留 别动
			change1(e) {
				console.log('活动地点', this.chooseValue1);
				console.log('活动状态', this.chooseValue2);
				console.log('活动发起人', this.chooseValue3);

				uni.request({
					url: 'http://localhost:8080/actActivity/condition/',
					method: 'POST',
					data: {

						"place": this.chooseValue1,
						"status": this.chooseValue2,
						"sponsor": this.chooseValue3

					},
					success: res => {
						console.log(res.data);
						this.AllActivityData = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});


			},
			change2(e) {
				console.log('活动地点', this.chooseValue1);
				console.log('活动状态', this.chooseValue2);
				console.log('活动发起人', this.chooseValue3);

				uni.request({
					url: 'http://localhost:8080/actActivity/condition/',
					method: 'POST',
					data: {

						"place": this.chooseValue1,
						"status": this.chooseValue2,
						"sponsor": this.chooseValue3

					},
					success: res => {
						console.log(res.data);
						this.AllActivityData = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			change3(e) {
				console.log('活动地点', this.chooseValue1);
				console.log('活动状态', this.chooseValue2);
				console.log('活动发起人', this.chooseValue3);

				uni.request({
					url: 'http://localhost:8080/actActivity/condition/',
					method: 'POST',
					data: {

						"place": this.chooseValue1,
						"status": this.chooseValue2,
						"sponsor": this.chooseValue3

					},
					success: res => {
						console.log(res.data);
						this.AllActivityData = res.data.data;
					},
					fail: () => {},
					complete: () => {}
				});
			},


			// change(e) {
			// 	console.log("e:", e);
			// },

			print() {
				console.log(this.AllActivityData);
			},
			opendetail(id) {
				console.log("点击查看活动ID为" + id + "的活动详情");
				uni.navigateTo({
					url: 'detail/detail?activityid=' + id,
					success: res => {
						console.log("打开成功,id = ", id);
					},
					fail: () => {
						console.log("打开详情页失败");
					},
					complete: () => {}
				});
			}
		},
		onNavigationBarButtonTap(e) {
			console.log("点击了我的活动按钮");
			uni.navigateTo({
				url: 'myact/myact',
				success: res => {
					console.log("打开我的活动成功");
				},
				fail: () => {
					console.log("打开我的活动失败");
				},
				complete: () => {}
			});
		}
	}
</script>

<style lang="scss" scoped>
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.box {
		@include flex;
	}

	.button {
		@include flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.example-body {
		background-color: #fff;
		padding: 10px 0;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.popup-warn {
		color: #fff;
		background-color: #faecd8;
	}

	.popup-error {
		color: #fff;
		background-color: #fde2e2;
	}

	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}

	.success-text {
		color: #09bb07;
	}

	.warn-text {
		color: #e6a23c;
	}

	.error-text {
		color: #f56c6c;
	}

	.info-text {
		color: #909399;
	}

	.dialog,
	.share {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.dialog-box {
		padding: 10px;
	}

	.dialog .button,
	.share .button {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		margin: 0;
		margin-top: 10px;
		padding: 3px 0;
		flex: 1;
	}

	.dialog-text {
		font-size: 14px;
		color: #333;
	}



	.example-body {
		padding: 10px;
	}
</style>
