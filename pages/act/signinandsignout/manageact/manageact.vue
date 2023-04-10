<template>
	<view>
		这是签到人员【赋予了签到签退权限的用户的活动列表】看到的页面，即可以进行扫码的页面
		
		<button @click="scan">点击扫码</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			scan(){
				// 只允许通过相机扫码
				uni.scanCode({
					onlyFromCamera: true,
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						
						let obj = JSON.parse(res.result);
						console.log(obj.type);
						console.log(obj.userid);
						console.log(obj.actid);
						console.log(obj.extra);
					}
				});
			}
		}
	}
</script>

<style>

</style>
