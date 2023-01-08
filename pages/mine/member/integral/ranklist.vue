<template>
	<view>
		    <view style="padding: 20upx 0;">
		        <zetank-rank :rankData="rankData"></zetank-rank>
		    </view>
	</view>
</template>

<script>

	export default {
		name: "Intro",
		components: {},
		data() {
			return {
				status: "加载更多",
				joinStatus: 0,
				active: 1,
				teamId: "",
				page: 0,
				limit: 10,
				totalCount: 0,
				memberList: [],
				gameList: [],
				list: [{
						name: '队员排行'
					},
					{
						name: '比赛记录'
					}
				],
				current: 0,
				swiperCurrent: 0,

			};
		},

		mounted() {},
		onLoad() {
			
		},
		methods: {
			
		}
	};
</script>

<style>
	/deep/.u-scroll-bar {
		background: red !important;
	}

	.swiper-box {
		height: 75vh;
	}
</style>
