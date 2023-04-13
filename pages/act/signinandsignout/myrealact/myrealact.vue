<template>
	<view>
		
		
		<view>
			<view> 活动ID: {{ actid }}</view>
			<view> 活动名: {{ actname }}</view>
			<view> 用户ID: {{ userid }}</view>
			<view> 用户名: {{ username }}</view>
		</view>
		
		<view style="display: flex; justify-content: center; margin-top: 50px;">
			<view class="qrimg">
				<tki-qrcode ref="qrcode" :cid="cid" :val="val" :size="size" :unit="unit" :background="background"
					:foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv"
					:onval="onval" :loadMake="loadMake" :showLoading="showLoading" :loadingText="loadingText"
					@result="qrR" />
			</view>
		</view>
		
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
				// 生成二维码的信息
				cid: '',
				val: "{}",
				size: 200,
				unit: 'rpx',
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				showLoading: true,
				loadingText: '二维码生成中...',
				
				// 生成二维码
				
				actid: 0,
				actname: '',
				userid: 0,
				username: ''
				
			}
		},
		
		onLoad:function(e){
			console.log(e);
			
			let temp = {
				"type": "签到二维码",
				"userid": e.userid,
				"actid": e.actid, // 暂时定死【】释放
				"actname": e.actname,
				"username":e.username,
				"extra": ""
			};
			
			console.log(temp);
			
			this.val = JSON.stringify(temp);
			
			this.actid = e.actid;
			this.actname = e.actname;
			this.userid = e.userid;
			this.username = e.username;
			
			
			
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
