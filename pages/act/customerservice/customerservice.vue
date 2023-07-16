<template>
	<view class="wechat-image">
		<image class="image" :src="wechatImage" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wechatImage: '../../../static/act/customerservice.jpg',
			};
		},

		// onShow() {
		// 	uni.onUserCaptureScreen(function() {
		// 		console.log('用户截屏了')
		// 	});
		// },

		methods: {

		}
	};
</script>

<style scoped lang="scss">
	.wechat-image {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80vh;
	}

	.image {
		width: 500px;
		height: 500px;

		// border-radius: 10%;
		/* 添加圆角效果 */
	}
</style>