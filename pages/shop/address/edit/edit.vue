<template>
	<view class='my-add-path'>

		<view class='path-item'>
			<view>收 件 人</view>
			<input type="text" value="" placeholder="收件人姓名" v-model="pathObj.name" @blur="headName" />
		</view>

		<view class='path-item'>
			<view>手 机 号</view>
			<input type="text" value="" placeholder="11位手机号" v-model="pathObj.tel" />
		</view>

		<view class='path-item'>
			<view>所在地址</view>
			<view @tap='showCityPicker'>{{ pathCity }} > </view>
			<mpvue-city-picker ref="mpvueCityPicker" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>

		<view class='path-item'>
			<view>详细地址</view>
			<input type="text" value="" placeholder="5到60个字符" v-model="pathObj.detailed" />
		</view>

		<view class='path-item'>
			<view>设为默认地址</view>
			<radio-group name="" @change="radioChange">
				<label class="radio">
					<radio color="#FF3333" :checked="pathObj.isDefault == 1 ? true:false" /><text></text>
				</label>
			</radio-group>
		</view>
		<!-- <view class="del" v-if="editType=='edit'" @tap="del">
			<view class="btn">
				删除收货地址
			</view>
		</view> -->

	</view>
</template>

<script>
	import $http from '@/common/api/request.js'
	import mpvueCityPicker from '@/components/shop/mpvue-citypicker/mpvueCityPicker.vue'
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				userId: "",
				pickerValueDefault: [0, 0, 1],
				head: "",
				editType: "",
				pathObj: {
					id: "",
					name: "", //收货人
					tel: "", //收货人电话
					province: "", //省
					city: "", //市
					district: "", //区
					detailed: "", //收货人详细地址
					isDefault: false //默认地址
				},
				i: -1,
				//是否修改的状态
				isStatus: false
			}
		},
		computed: {
			pathCity() {
				if (this.pathObj.province) {
					return `${this.pathObj.province}-${this.pathObj.city}-${this.pathObj.district}`
				} else {
					return '请选择';
				}
			}
		},
		onLoad(e) {
			this.userId = e.userId;
			this.editType = e.type;
			if (e.type == 'edit') {
				uni.getStorage({
					key: 'address',
					success: (e) => {
						console.log(e);
						this.pathObj.id = e.data.id;
						this.pathObj.name = e.data.name;
						this.pathObj.tel = e.data.tel;
						this.pathObj.detailed = e.data.detailed;
						this.pathObj.isDefault = e.data.isDefault;
						this.pathObj.province = e.data.province;
						this.pathObj.city = e.data.city;
						this.pathObj.district = e.data.district;
						this.head = e.data.head;
						this.userId = e.data.user_id;
					}
				})
			}
		},
		components: {
			mpvueCityPicker
		},
		//页面生命周期
		onNavigationBarButtonTap() {
			let data={"name":this.pathObj.name,"head":this.pathObj.name.substr(0,1),"tel":this.pathObj.tel,"detailed":this.pathObj.detailed,"province":this.pathObj.province,"city":this.pathObj.city,"district":this.pathObj.district,"isDefault":this.pathObj.isDefault}
			if (this.editType == 'edit') {
				//修改
				$http.request({
					url: "/shop/editAddress",
					method: "POST",
					header: {
						token: true
					},
					data: {
						head: this.head,
						userId: this.userId,
						...this.pathObj
					}
				}).then((res) => {

					uni.setStorage({
						key:'saveAddress',
						data:data,
						success() {
							uni.navigateBack();
						}
					})

				}).catch(() => {

				})
				uni.navigateBack({
					delta: 1
				})
			} else {
				//新增
				$http.request({
					url: "/shop/addAddress",
					method: "POST",
					header: {
						token: true
					},
					data: {
						head: this.head,
						userId: this.userId,
						...this.pathObj
					}
				}).then((res) => {

					this.createPathFn(this.pathObj);
					uni.navigateBack({
						delta: 1
					})

				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			}
		},
		methods: {
			...mapActions(["createPathFn", 'updatePathFn']),
			showCityPicker() {
				this.$refs.mpvueCityPicker.show();
			},
			onConfirm(e) {
				let arr = e.label.split("-");
				this.pathObj.province = arr[0];
				this.pathObj.city = arr[1];
				this.pathObj.district = arr[2];
			},
			radioChange() {
				this.pathObj.isDefault = this.pathObj.isDefault == 1 ? true : false;
				this.pathObj.isDefault = !this.pathObj.isDefault;
			},
			headName() {
				this.head = this.pathObj.name.substr(0, 1);
				console.log(this.head);
			},
			del() {
				uni.showModal({
					title: '删除提示',
					content: '你将删除这个收货地址',
					success: (res) => {
						if (res.confirm) {
							uni.setStorage({
								key: 'delAddress',
								data: {
									id: this.id
								},
								success() {
									uni.navigateBack();
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
		}
	}
</script>

<style scoped>
	.my-add-path {
		padding-left: 20rpx;
	}

	.path-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0;
		width: 100%;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.path-item input {
		flex: 1;
		text-align: left;
		padding-left: 10rpx;
	}

	.del {
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
			font-size: 30upx;
		}
	}
</style>
