<!-- videoPlayer.vue //存放视频的组件
下面存放视频的地址可以自己在Apache的服务器上自己存放好视频 -->
<template>
	<!-- <view class="videoPlayer">	
		<video 
		id="myVideo" 
		class="video" 
		:controls="false" 
		:src="'http://192.168.112.1:80/video/'+video.src" 
		:loop="true" 
		:autoplay="autoplay"
		controls
		@click="click"></video>
	</view> -->
	
	<view class="videoPlayer">
		<video 
		id="myVideo" 
		class="video" 
		:controls="false" 
		:src="'http://localhost:8081/video/'+video.src" 
		:loop="true" 
		:autoplay="autoplay"
		controls
		@click="click"></video>
	</view>
</template>

<script>
	var timer=null
	export default {
		props:['video','index'],
		data() {
			return {
				play:false,
				dblClick:false,
				autoplay:false
			};
		},
		mounted(){
			this.videoContext=uni.createVideoContext('myVideo',this)
		},
		methods:{
			click(){
				clearTimeout(timer)
				this.dblClick=!this.dblClick
				timer=setTimeout(()=>{
					if(this.dblClick){ //判断是单击 即为true
						//单击
						if(this.play===false){
							this.playThis()
						}else{
							this.pause()
						}
					}else{
						//双击
						this.$emit('changeClick') //向父组件传递一个事件
					}
					this.dblClick=false //点击后重置状态 重置为false
				},300)
			},
			player(){
				//从头播放视频
				if(this.play===false){
					this.videoContext.seek(0)
					this.videoContext.play()
					this.play=true
				}
			},
			pause(){
				//暂停视频
				if(this.play===true){
					this.videoContext.pause()
					this.play=false
				}
			},
			playThis(){
				//播放当前视频
				if(this.play===false){
					this.videoContext.play()
					this.play=true
				}
			},
			//首个视频自动播放
			atuo(){
				//首个视频自动播放
				if(this.index===0){
					this.autoplay=true
				}
			}
		},
		created() {
			this.atuo()
		}
	}
	
</script>
 
<style>
.videoPlayer{
	height: 100%;
	width:100%;
}
.video{
	height: 100%;
	width:100%;
	z-index: 1;
}
</style>

