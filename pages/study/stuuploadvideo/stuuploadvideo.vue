<template>
	<view>
		<view class="add_picture">
			<label class="title">上传视频</label><br>
			<!-- <view class="many_photo" v-show="addVideo" @click="test">
				<image src="../../../static/icon/img_add.png"></image>
			</view> -->
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
				:maxCount="1" accept="video" deletable uploadText="视频"></u-upload>
			<view class="video-box" v-show="showVideo">
				<image src="../../../static/icon/img_close.png" @click="DelImg" class="close-img" style="height: 36rpx;">
				</image>
				<video :src="src" style="video"></video>
			</view>
			<view>
				<textarea  v-model="description" placeholder="请输入简介"></textarea>
			</view>
		</view>
		<button class="sub-button" @click="subVieo">提交</button>
	</view>
</template>

<script>
	import $store from '@/store/modules/social';
	
	export default {
		data() {
			return {
				src: '',
				showVideo: false,
				addVideo: true,
				fileList1: [],
				picurl: "",
				description:"",
				video_url:''
			}
		},
		onLoad:function(){
			let userId = $store.state.loginUserInfo.userId
			console.log(userId+"++1111110000...")
			
			
		},
		methods: {
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://123.56.217.170:8080/common/upload',
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							
							console.log(res);
							url = JSON.parse(res.data).fileName;
							
							// console.log(eval(res.data));
			
							console.log("要存的url为：" + url);
							this.picurl = url;
			
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			
			
			
			
			//点击上传视频
			test: function() {
				var self = this;
				console.log("123123");
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: function(res) {
						console.log("进来了");
						uni.uploadFile({
							url: 'http://123.56.217.170:8080/video/upload', //接口地址
							filePath: res.tempFilePath,
							name: 'file',
							
							success: (uploadFileRes) => {
								self.showVideo = true
								self.addVideo = false
								console.log('1张', uploadFileRes);
								self.src = uploadFileRes.data
							},
						});
					}
				});
			},
			//右上角删除视频
			DelImg() {
				this.src = '',
					this.showVideo = false,
					this.addVideo = true
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			
			subVieo(){
				let url = this.picurl
				console.log(url+'............');
				console.log("0.0.0.0");
				if (url) {
					uni.request({
						url: "http://localhost:8080/video/insert",
						method: "POST",
							data: {
								video_url: url,
								userId:$store.state.loginUserInfo.userId,
								description:this.description,
							},
							
						success: (res) => {
							console.log("只此昂了");
							console.log(res.data);
							
							if (res.data!=null) {
								uni.showToast({
									title: '添加成功',
									//将值设置为 success 或者直接不用写icon这个参数
									icon: 'success',
									//显示持续时间为 2秒
									duration: 2000
								})
								// uni.navigateBack({
								// 	delta:1
								// })
								setTimeout(()=>{
									this.back();
								},2000)
								this.DelImg()
							} else {
								uni.showToast({
									title: '上传失败',
									//将值设置为 success 或者直接不用写icon这个参数
									icon: 'error',
									//显示持续时间为 2秒
									duration: 2000
								})
							}
						}
					})
			}
			else {
				uni.showToast({
					title: '请上传视频',
					//将值设置为 success 或者直接不用写icon这个参数
					icon: 'error',
					//显示持续时间为 2秒
					duration: 2000
				})
			}
			},
			// async subVieo() {
			// 	let url = this.picurl
			// 	console.log(url+'............');
			// 	console.log("0.0.0.0");
			// 	if (url) {
			// 		uni.request({
			// 			url: "http://123.56.217.170:8080/video/addVideo",
			// 			method: "POST",
			// 				data: {
			// 					videoUrl: url
			// 				},
							
			// 			success: (res) => {
			// 				console.log("只此昂了");
			// 				console.log(res.data[0]+'0.0.0.0.00.');
			// 			}
			// 		})
			// 		// let result = await uni.request({
			// 		// 	url: "http://123.56.217.170:8080/video/addVideo",
			// 		// 	method: "POST",
			// 		// 	data: {
			// 		// 		videoUrl: url
			// 		// 	}
			// 		// })
			// 		let result = res.data
			// 		console.log(result+"111111");
			// 		if (result.success) {
			// 			uni.showToast({
			// 				title: '添加成功',
			// 				//将值设置为 success 或者直接不用写icon这个参数
			// 				icon: 'success',
			// 				//显示持续时间为 2秒
			// 				duration: 2000
			// 			})
			// 			this.DelImg()
			// 		} else {
			// 			uni.showToast({
			// 				title: '上传失败',
			// 				//将值设置为 success 或者直接不用写icon这个参数
			// 				icon: 'error',
			// 				//显示持续时间为 2秒
			// 				duration: 2000
			// 			})
			// 		}
			// 		console.log(result);

			// 	} else {
			// 		uni.showToast({
			// 			title: '请上传视频',
			// 			//将值设置为 success 或者直接不用写icon这个参数
			// 			icon: 'error',
			// 			//显示持续时间为 2秒
			// 			duration: 2000
			// 		})
			// 	}

			// }
		}
	}
</script>

<style>
	/deep/uni-video {
		margin-top: 20rpx;
		margin-left: 5%;

	}

	.add_picture {
		width: 100%;
		height: 500rpx;
		background-color: #f8faf7;
		margin-top: 5rpx;
	}



	.many_photo {
		border: #8a8a8a 0.1rpx dashed;
		width: 300rpx;
		height: 300rpx;
		border-radius: 8rpx;
		margin: 30rpx;
	}

	.many_photo>image {
		width: 100rpx;
		height: 100rpx;
		margin: 30% 30%;
	}

	.video-box {
		width: 400rpx;
		height: 300rpx;
		border: #8a8a8a 0.1rpx solid;
		border-radius: 8rpx;
		margin: 45rpx 100rpx;
	}

	.video-box>video {
		width: 400rpx;
		height: 250rpx;
	}

	.video-box>image {
		display: block;
		height: 36rpx;
		width: 36rpx;
		margin-left: 351rpx;
		margin-bottom: 10rpx;
	}

	.sub-button {
		width: 500rpx;
		height: 70rpx;
		margin: 84rpx 120rpx;
		background-color: #66b94d;
		color: #f5fef2;
		line-height: 70rpx;
	}
</style>
