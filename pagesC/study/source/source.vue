<template>
	<view class="index">

		<index-header bgColor="bg-index-header" @headerSwitch="headerSwitch"/>

		<!-- 视频组件 -->
		<cu-video class="video" :video_list="videoList"/>

	</view>
</template>

<script>
	import indexHeader from '@/pagesC/components/index-header.vue';
	import cuVideo from '@/pagesC/components/cu-video.vue';
	export default {
		components: {
			indexHeader,
			cuVideo
		},
		data() {
			return {
				title: 'Hello',
				videoList:[{
					videos:[{
						src:"/static/video/1.mp4" ,
						title:"111",
						
					}]
				
				}]
			}
		},
		onLoad() {
			this.getVideoList();
		},
		onShow() {
			console.log('界面显示')
		},
		methods: {

			getVideoList() {
				uni.request({
					 url: 'http://localhost:8081/video/all',
					// dataType: 'json',
					success: (res) => {
						console.log(res.data);
						for (let item of res.data || []) {
							this.videoList.push({
								id: item.id,
								title:item.title,
								name:item.name,
								// nickname: item.nickname,
								description: item.description,
								// cover_url: item.cover_url,
								src: item.src,
								// dianzan: item.dianzan,
								// pinglun: item.pinglun,
								// zhuanfa: item.zhuanfa,
								// is_dianzan: item.is_dianzan,
								// flag: false
							});
						}

					}
				});
			},
			// // 顶部切换
			// headerSwitch(val){
			// 	// console.log(val);
			// 	this.getVideoList();
			// }
			
			
			
			
		}
		
	}
</script>

<style lang="less">
	.index {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		justify-content: center;
		background-color: #333333;
		height: 100vh;
	}
	.tabbar{
		.action{
			.plus{
				image{
					width: 100upx;
					height: 60upx;
				}
			}
		}
	}
</style>
