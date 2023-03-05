<template>
	<view class="mwg-logistics-container">
		<view class="mwg-logistics-order mwg-logistics-card">
			<image class="mwg-logistics-logo" :src="`https://cdn.kuaidi100.com/images/all/56/${info.com}.png`" />
			<view class="" style="flex: 1;">
				<view>
					<text>物流公司：</text>
					<text>{{logisticsConfig.code[info.com]}}</text>
				</view>
				<view>
					<text>快递单号：</text>
					<text>{{info.nu}}</text>
				</view>
			</view>
		</view>
		<view class="mwg-logistics-detail mwg-logistics-card">
			<block v-for="(d,index) of info.data" :key="index">
				<view class="mwg-logistics-detail-item">
					<view class="mwg-logistics-time">
						<view v-if="index==0" class="mwg-logistics-label">{{logisticsConfig.state[info.state]}}</view>
						<view>{{d.ftime}}</view>
					</view>
					<view>{{d.context}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import logisticsConfig from './logistics-config.js'
	export default {
		name: "mwg-logistics",
		data() {
			return {
				logisticsConfig,
				info: {
					"message": "ok",
					"nu": "DPK3***0520",
					"ischeck": "1",
					"com": "debangkuaidi",
					"status": "200",
					"state": "0",
					"data": [{
							"time": "2022-01-25 15:19:10",
							"context": "【贵阳市】已到达 贵州贵阳分拨交付中心",
							"ftime": "2022-01-25 15:19:10",
							"areaCode": "CN520100000000",
							"areaName": "贵州,贵阳市",
							"status": "在途",
							"location": null,
							"areaCenter": null,
							"areaPinYin": null,
							"statusCode": null
						},
						{
							"time": "2022-01-24 03:27:18",
							"context": "【成都市】已离开 四川成都分拨交付中心；发往 贵阳北地区包",
							"ftime": "2022-01-24 03:27:18",
							"areaCode": "CN510100000000",
							"areaName": "四川,成都市",
							"status": "在途",
							"location": null,
							"areaCenter": null,
							"areaPinYin": null,
							"statusCode": null
						},
						{
							"time": "2022-01-24 03:23:02",
							"context": "【成都市】已到达 四川成都分拨交付中心",
							"ftime": "2022-01-24 03:23:02",
							"areaCode": "CN510100000000",
							"areaName": "四川,成都市",
							"status": "在途",
							"location": null,
							"areaCenter": null,
							"areaPinYin": null,
							"statusCode": null
						},
						{
							"time": "2022-01-23 15:46:17",
							"context": "【成都市】四川成都新都区天新公司-操作部（135****1234） 已揽收",
					 	"ftime": "2022-01-23 15:46:17",
							"areaCode": "CN510114000000",
							"areaName": "四川,成都市,新都区",
							"status": "揽收",
							"location": null,
							"areaCenter": null,
							"areaPinYin": null,
							"statusCode": null
						}
					]

				}
			};
		},
		props: {
			// info: {
			// 	// type: Object,
			// 	// default: ()=>{
			// 	// 	return {}
			// 	// }
			// }
		}
	}
</script>

<style lang="less">
	.mwg-logistics-card {
		margin: 4upx 16upx;
		padding: 16upx;
		border-radius: 12upx;
		background-color: #EEEEEE;
		box-sizing: border-box;
	}

	.mwg-logistics-container {
		display: flex;
		width: 100%;
		flex-direction: column;
		box-sizing: border-box;
		padding: 12upx 0;
	}

	.mwg-logistics-order {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
	}

	.mwg-logistics-logo {
		width: 90upx;
		height: 90upx;
		border-radius: 12upx;
		margin-right: 24upx;
	}

	.mwg-logistics-detail {
		padding-left: 64upx;
		color: #777;
		position: relative;

		.mwg-logistics-detail-item {
			margin: 24upx 0;
			position: relative;
			padding: 0;

			&::before {
				content: '';
				display: flex;
				position: absolute;
				left: -32upx;
				top: 12upx;
				bottom: -36upx;
				width: 4upx;
				align-items: flex-start;
				background-color: #D0D0D0;
			}

			&:last-child::before {
				background-color: transparent;
			}

			.mwg-logistics-time {
				position: relative;

				&::before {
					display: flex;
					align-items: center;
					content: '';
					position: absolute;
					top: 8upx;
					left: -38upx;
					width: 16upx;
					height: 16upx;
					border-radius: 50%;
					background-color: #CCCCCC;
				}
			}

			& {
				--last-infomation-color: #00aaff;
			}

			&:first-child {
				color: var(--last-infomation-color);

				&::before,
				.mwg-logistics-time::before {
					background-color: var(--last-infomation-color);
				}

				.mwg-logistics-time::before {
					content: '新';
					width: 48upx;
					height: 48upx;
					left: -56upx;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 10px;
					color: #FFFFFF;
					background-color: var(--last-infomation-color);
				}
			}

			.mwg-logistics-label {
				display: inline-flex;
				padding: 8upx 16upx;
				margin: 8upx;
				background-color: var(--last-infomation-color);
				color: white;
				border-radius: 6upx;
			}
		}
	}
</style>
