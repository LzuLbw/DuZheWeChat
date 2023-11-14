<template>
	<view>
		
		<view >
		<!-- 标题 -->
			<view class="uni-form-item uni-column" >
				<input   class="uni-input title" v-model="title" focus placeholder="标题" />
			</view>
		<!-- 线 -->
			<view class="seg_line_box" style="margin-top: 7%;">
				<view class="seg_line"></view>
				<view class="seg_dot"></view>
				<view class="seg_line"></view>
			</view>
		
			<view class="uni-form-item uni-column">
				<textarea class="uni-input " v-model="content" style="margin-top: 8%;margin-left: 15px;" focus placeholder="开始记笔记吧"></textarea>
			</view>
		
			<view class="center">
				<button  type="default" size="mini" plain="true" @click="insert">完成</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//title: 'input',
				focus: false,
				creatTime:'',
				content:'',
				title:'',
				itemList:{}
				// noteData:{
				// 	title:'',
				// 	content:''
				// },
				
			}
		},
		onLoad: function(e) {
			console.log("初始化编辑页面==========================>>>>>>>>>>>>>>>>");
		
			console.log(e);
			console.log(e.id);
			this.id = e.id;
		
			uni.request({
				url: 'http://123.56.217.170:8080/note/findById/' + e.id,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data+'---------------');
		
					this.itemList = res.data;
					console.log(this.itemList);
					this.title = this.itemList[0].title;
					this.content = this.itemList[0].content;
		
		
		
				},
				fail: () => {},
				complete: () => {}
			});
		
		
		},
		
		
		methods: {
			insert(){
				uni.request({
					url:'http://123.56.217.170:8080/note/insert/',
					method: 'POST',
					data: {
						userId:$store.state.loginUserInfo.userId,
						content:this.content,
						title:this.title
						
					},
					dataType:'json',
					success: (res) => {
						if(this.title==' ' || this.content==''){
							uni.showModal({
								content:'空白是提交不了的哦！！',
							})
						}
						else{
							
						uni.showModal({
											content: '确认要提交吗？',
											success: function(res) {
											if (res.confirm) {
												console.log('点击了确认')
													uni.navigateBack({
														delta:1
													})
											} else {
												console.log('点击了取消')
											}
										}
									})
							}
						console.log(res.data);
						this.content='';
						
					}
					
				});
			}
			
		}
	}
</script>

<style>
	.title{
		font-size: 30px;
		font-weight: bold;
		margin-left: 15px;
	}
	.seg_line_box {
		display: flex;
		height: 5rpx;
		justify-content: space-between;
		margin: 5rpx 0;
	}
	.seg_line {
		width: 45%;
		border-bottom: 10rpx solid #e1e1e1;
	}
	
	.seg_dot {
		width: 8%;
		border-bottom: 10rpx dotted #dbdbdb;
	}
	.center {
	     position: fixed;
		 bottom: 20rpx;
		 margin-left: 15px;
	    }
/* 	.four{
		width: 90%;
		height: 50rpx;
		border-style: solid;
		border-color: #faeef0 #d57a83 #faeef0 #faeef0;
	} */
	
</style>
