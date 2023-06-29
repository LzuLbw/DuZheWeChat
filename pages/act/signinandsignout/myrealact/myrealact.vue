<template>
	<view>

		<uni-notice-bar show-icon :text="currentTime" />

		<view style="height: 30rpx;"></view>

		<view style="text-align: center;">

			<image :src="resorderdata.activity_picurl" style="width: 550rpx;height: 350rpx"></image><br>

			<view style="display: flex; justify-content: center; margin-top: 50px;">
				<view class="qrimg">
					<tki-qrcode ref="qrcode" :cid="cid" :val="val" :size="size" :unit="unit" :background="background"
						:foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv"
						:onval="onval" :loadMake="loadMake" :showLoading="showLoading" :loadingText="loadingText"
						@result="qrR" />
				</view>
			</view>
			<view style="height: 30rpx;"></view>

			<uni-group mode="card">
				<view style="margin: 20rpx;"> <text>活动ID:</text> {{ actid }}</view>
				<view style="margin: 20rpx;"> <text>活动名:</text> {{ actname }}</view>
				<view style="margin: 20rpx;"> <text>用户ID:</text> {{ userid }}</view>
				<view style="margin: 20rpx;"> <text>用户名:</text> {{ username }}</view>
				<view style="margin: 20rpx;"> <text>场次时间:</text> {{ resorderdata.SessionStartDatetime }}</view>
			</uni-group>

			
		</view>
		
		<view style="height: 20rpx;"></view>


	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {

		components: {
			tkiQrcode
		},

		data() {
			return {

				// 当前实时时间
				currentTime: '',


				// 生成二维码的信息
				cid: '',
				val: "{}",
				size: 300,
				unit: 'rpx',
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '../../../../static/icon/act.png', // 二维码图标
				iconsize: 80, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				showLoading: true,
				loadingText: '二维码生成中...',

				// 生成二维码

				actid: 0,
				actname: '',
				userid: 0,
				username: '',
				resorderdata: {}

			}
		},

		onShow() {

		},

		mounted() {
			// 每秒更新时间
			setInterval(() => {
				const now = new Date()
				const options = {
					hour12: false,
					timeZone: 'Asia/Shanghai'
				}
				this.currentTime = "当前时间: " + now.toLocaleTimeString('en-US', options)
			}, 1000)
		},

		onLoad: function(e) {

			let orderdatadetail = JSON.parse(decodeURIComponent(e.data));
			// console.log(orderdatadetail);
			this.resorderdata = orderdatadetail;

			console.log("=======================");
			console.log(this.resorderdata);

			// this.icon = this.resorderdata.activity_picurl;

			this.actid = this.resorderdata.actid;
			this.actname = this.resorderdata.activity_maintitle;
			this.userid = this.resorderdata.userid;
			this.username = this.resorderdata.username;

			let temp = {
				"type": "签到二维码",
				"userid": parseInt(this.userid),
				"actid": parseInt(this.actid), // 暂时定死【】释放
				"actname": this.actname,
				"username": this.username,
				"extra": ""
			};

			// console.log(temp);

			this.val = JSON.stringify(temp);

			console.log("=========");
			console.log(this.val);

		},

		methods: {

			qrR(res) {
				console.log(res);
			},

		}
	}
</script>

<style>

</style>