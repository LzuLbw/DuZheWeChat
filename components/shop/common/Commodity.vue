<template>
	<view class="commodity">
		<view class="commodity-item" v-for="(item,index) in dataList" :key="index" :style=" 'width:' +itemW+';'" @tap="goDetails(item.id
		)">
			<image class="commodity-img" :src="'/static/image'+ (item.imgUrl).substring(8)" mode="" :style=" 'height:' + bigH+';'">
			</image>
			<view class="commodity-content">
				<text class="commodity-name">
					{{item.name}}
				</text>
				<view>
					<text class="new-price">￥{{item.nprice}}</text>
					<text class="old-price">￥{{item.oprice}}</text>
				</view>
				<text class="discount">{{item.discount}}折</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			dataList: Array,
			itemW: {
				type: String,
				default: "375upx",

			},
			bigH: {
				type: String,
				default: "375upx"
			}
		},
		methods: {
			goDetails(id) {
				uni.navigateTo({
					url: '/pages/details/details?id='+id+''
				})
			}
		}
	}
</script>

<style scoped>
	.commodity {
		display: flex;
		flex-wrap: wrap;
	}

	.commodity-item {
		padding-bottom: 20upx;
	}

	.commodity-img {
		width: 100%;
	}

	.commodity-content {
		text-align: center;
	}

	.commodity-name {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #333333;
		word-break: break-all;
		padding: 6upx 20upx;
	}

	.old-price {
		text-decoration: line-through;
		font-size: 24upx;
		color: #999999;
	}

	.discount {
		border-radius: 4upx;
		border: 1px solid #FF3333;
		padding: 2upx 10upx;
		font-size: 20upx;
		color: #FF3333;
	}
</style>
