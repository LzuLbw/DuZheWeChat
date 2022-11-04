<template>
	<view class="recommend">
		<view class="recommend-item" v-for='(item,index) in dataList' :key='index'>
			<image class="item-big" :src="item.bigurl" mode=""></image>
			<view class="item-small">
				<block v-for='(k,i) in item.data' :key='i'>
					<image class='item-img' :src="k.imgurl1" mode=""></image>
					<image class='item-img' :src="k.imgurl2" mode=""></image>
					<image class='item-img' :src="k.imgurl3" mode=""></image>
				</block>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: {
			dataList: Array
		}
	}
</script>

<style>
	.recommend {
		padding: 20upx;
	}

	.recommend-item {
		display: flex;
		flex-direction: column;
		border-radius: 20upx;
		border: 2upx solid #CCCCCC;
		overflow: hidden;
		margin: 20upx 0;
	}

	.item-big {
		width: 100%;
		height: 300upx;
	}

	.item-small {
		width: 100%;
		height: 240upx;
	}

	.item-img {
		width: 33.3333%;
		height: 240upx;
	}
</style>
