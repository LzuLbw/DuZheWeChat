<template>
	
	    <view class="content" style="background-color: #f1f1f1;"> 
		<!-- 搜索栏 -->
			<view class="widget_style" >
				<input @click="search" placeholder-class="widget_input_placehold" v-model="content" class="widget_input " :style="style1" :placeholder="placehold" />
				<view class="widget_button" :style="style2" @click="onClickSearch">{{buttonText}}</view>
			</view>
			<br/>
			<!-- 顶部按钮 -->
			 <view style="display: flex;">
				 <view>
				<image @click="gotosort" src="../../../static/icon/study_sort.png" style="width: 60upx;height: 60upx;margin-left: 20px;"></image>
				<view style="margin-left: 20px;">分类</view>
				</view>
				<view>
				<image @click="gotoshell" src="../../../static/icon/study_shell.png" style="width: 60upx;height: 60upx;margin-left: 40px;"></image>
				<view style="margin-left: 40px;">书架</view>
				</view>
				<view>
				<image @click="gotonote" src="../../../static/icon/note.png" style="width: 60upx;height: 60upx;margin-left: 40px;"></image>
				<view style="margin-left: 40px;">笔记</view>
				</view>
				<view>
				<image @click="gotocollection" src="../../../static/icon/collection.png" style="width: 60upx;height: 60upx;margin-left: 40px;"></image>
				<view style="margin-left: 40px;">收藏</view>
				</view>
			<!-- 	<view>
				<image @click="gotovideo" src="../../../static/icon/video.png" style="width: 60upx;height: 60upx;margin-left: 40px;"></image>
				<view style="margin-left: 40px;">视频</view>
				</view> -->
			</view>
		<br/>
		
		<view v-for="(item,index) in itemList" :key="index">
			<view @click="godetails(item)" >
				<uni-card :cover="itemList[index].img">
					<view>
						<text class="uni-body" style="font-size: 17px;">《{{item.title}}》</text><br>
						<text class="uni-body">{{item.creatTime}}</text>
						<image class="uni-body" src="../../../static/icon/viewnummmm.png" style="width: 30px;height: 20px;margin-left: 170px;"></image>
						<text class="uni-body">{{item.viewNum}}</text>
					</view>
				</uni-card>
			</view>
		</view>
		
           <!-- <view class=" "  v-for="(item,index) in itemList" :key="index">
             <view style="font-size: 20px;text-align: center;" @click="godetails(item)">{{item.title}}</view>
			 <image v-if="item.img" :src="item.img" style="width: 100%;height: 150px;" @click="godetails(item)"></image>
			 <view style="display: flex;">
				 <view style="">{{item.creatTime}}</view>
				 <view style="margin-left: 120upx;display: flex">
					 <image src="../../../static/icon/viewnummmm.png" style="width: 30px;height: 20px;margin-right: 5px;margin-top: 5upx;"></image>
					 <view style="font-size: 20px;">{{item.viewNum}}</view>
				 </view>
			 </view>
            </view><br/> -->
	    </view>
		
</template>

<script>
	import $store from '@/store/modules/social';
import { ssrContextKey } from "vue";
	
	// import articleList from '@/components/articleList/articleList.vue'
	 //import luanqingsearch from '@/components/luanqing-search/luanqing-search.vue'
	
	export default {
		data() {
			return {
				currentuid:0,
				alist:[],
				collect: false, //判断是否已收藏
				usercollectionstatus: false, //用户收藏状态
				options: [
				 {
					icon: 'star',
					text: '收藏',
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}],
               itemList: [],
			   content:'',
			   style1:'',
			   style2:'',
			   searchlist:{},
			   title:''
			}
		},
		// components: {
		// 	luanqingsearch
		// },
		props:{
			width:{
				type:Number,
				default:75
			},
			placehold:{
				type:String,
				default:'请输入内容'
			},
			buttonText:{
				type:String,
				default:'搜索'
			}
		},
		created() {
			// 编织设置动态宽度
			this.style1 = 'min-width:calc('+this.width+'vw);';
			this.style2 = 'min-width:calc('+(this.width / 5)+'vw);';
		},
		destroyed() {
			
		},
		// onLoad:function(e){
		// 		console.log(getApp().globalData.uid);
		// 		console.log(getApp().globalData.name);
				 
		// 	    this.getList();
		// 	//初始化收藏按钮状态
		// 	uni.request({
		// 		url: 'http://123.56.217.170:8080/collection/' + this.id ,
		// 		method: 'GET',
		// 		data: {},
		// 		success: res => {
		// 			console.log("当前活动的收藏状态为" + res.data);
		// 			this.usercollectionstatus = res.data;
			
		// 			if (this.usercollectionstatus) {
		// 				this.options[1].icon = "star-filled";
		// 				this.options[1].text = "已收藏";
		// 			} else {
		// 				this.options[1].icon = "star";
		// 				this.options[1].text = "收藏";
		// 			}
		// 		},
		// 		fail: () => {},
		// 		complete: () => {}
		// 	});
		// },
		// onLoad() {
		
		// 	console.log(getApp().globalData.uid);
		// 	console.log(getApp().globalData.name);
			 
		//     this.getList();
		// },
		onLoad:function(e){
			this.$store.dispatch('GetInfo').then(res=>{
				let userId = $store.state.loginUserInfo.userId
					console.log(userId+'u用户登录的id');
					console.log(getApp().globalData.uid);
						console.log(getApp().globalData.name);
					    this.getList();
						uni.request({
							url:'http://123.56.217.170:8080/collection/findUser/'+userId,
							method:'GET',
							data:{},
							success: res => {
								console.log(res.data)
								this.usercollectionstatus=res.data;
								console.log(this.usercollectionstatus);
								if (this.usercollectionstatus) {
									this.options[0].icon = "star-filled";
									this.options[0].text = "已收藏";
								} else {
									this.options[0].icon = "star";
									this.options[0].text = "收藏";
								}
							},
							fail() {},
							complete() {}
						});
				
				})
				},
			
	
		methods:{	
			onclick(e){
				if(e.content.text=="收藏"){
					uni.showToast({
						title:'收藏成功',
						icon:'none'
					})
					uni.request({
						url:'http://123.56.217.170:8080/collection/insert/',
						method: 'POST',
						data: {
							articleId:this.id,
							userId:$store.state.loginUserInfo.userId,
						},
						dataType:'json',
						success: (res) => {
							console.log(res.data);
							this.usercollectionstatus=true;
							this.options[0].icon="star-filled";
							this.options[0].text = "已收藏";
						}
					})
					
				}
				
			},
			changeImg(id){
				this.id=id;
								console.log(id+'查询出文章的id');
								//收藏
								if (this.collect == false) {
									uni.request({
										url:'http://123.56.217.170:8080/collection/insert/',
										method:'POST',
										data: {
											articleId:this.id,
											userId:$store.state.loginUserInfo.userId,
										},
										dataType:'json',
										success: (res) => {
											uni.request({
												url:'http://123.56.217.170:8080/collection/all/',
												method:'GET',
												data:{},
												success: (res) => {
													console.log(res.data);
													this.alist=res.data;
													for(var i=0;i<this.alist.length;i++){
														if(this.alist[i].articleId==this.id){
															console.log(this.alist[i].articleId+'0.0.0.0.');
															this.collect = true;
																uni.showToast({
																		icon: 'success',
																		title: '收藏成功'
																		})
														}
													}
												},
											})
										}
									});
								
									// this.$api.appPlateForm('POST', 'example/collection', params, function(res) {
									// 	if (res.code == 200) {
									// 		that.collect = true;
									// 		uni.showToast({
									// 			icon: 'success',
									// 			title: '收藏成功'
									// 		})
									// 	}
									// }, function(err) {
									// 	uni.showToast({
									// 		icon: 'none',
									// 		title: err.msg
									// 	})
									// });
								} else {
									//取消收藏
									this.$api.appPlateForm('POST', 'example/collectDel', params, function(res) {
										if (res.code == 200) {
											that.collect = false;
											uni.showToast({
												icon: 'none',
												title: '取消成功'
											})
										}
									}, function(err) {
										uni.showToast({
											icon: 'none',
											title: err.msg
										})
									});
								}
			},
         getList() {
            uni.request({
                 url: 'http://123.56.217.170:8080/article/all',
                 success: (res) => {
                    console.log(res.data);
                          this.itemList =res.data;
						  console.log("===",this.itemList);
						  
						   //console.log(this.itemList[0]);
						  // console.log(this.itemList[0].id);
                }
            });

        },	
		gotosort(){
			uni.navigateTo({
				url:'/pages/study/articlesort/articlesort'
			})
		},
		gotoshell(){
			uni.navigateTo({
				url:'/pages/study/articleshell/articleshell'
			})
		},
		gotonote(){
			uni.navigateTo({
				url:'/pages/study/allnote/text'
			})
		},
		gotocollection(){
			uni.navigateTo({
				url:'/pages/study/collection/collection'
			})
		},
		gotovideo(){
			uni.navigateTo({
				url:'/pages/study/studyvideo/studyvideo'
			})
		},
		godetails(e){
			console.log('id为'+e.id);
			var id=e.id;
			uni.navigateTo({
				url:'/pages/study/article_details/article_details?id='+id,
				success: (res) => {
					console.log("打开成功");
				}
			})
		},
		search(){
			var title=this.itemList.title;
			uni.navigateTo({
				url:"/pages/study/search/search?title="+title,
				success: (res) => {
					console.log("搜索成功");
					
				}
				
			})
			
		},
		addcollection(id){
			this.id=id;
				console.log(id+"文章id");
				uni.request({
					
					url:'http://123.56.217.170:8080/collection/insert/',
					method: 'POST',
					data: {
						articleId:this.id,
						userId:$store.state.loginUserInfo.userId,
					},
					dataType:'json',
					success: (res) => {
				
						uni.showModal({
							content:'成功加入',
							showCancel:false,
							success:function(res){
								if(res.confirm){
									console.log("成功加入");
								}else if(res.cancel){
									console.log("没有加入");
								}
								
							}
						})
					}
				});
		},
		onClickSearch(){
			this.$emit('onSearch',{text:this.content});
		},
	

	  }
	}
</script>
<style>
	.box{
		width: 100%;
		height: 210px;
		padding: 10px;
		border: 1px solid black;
		margin-top: 5px;
	}
	
	/* 搜索 */
	.widget_style{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.widget_input{
		min-width: 320rpx;
		height: 55rpx;
		background-color: #fff;
		border: 2rpx solid #FF6600;
		border-radius: 10rpx;
		padding-left: 12rpx;
		padding-right: 12rpx;
		font-size: 24rpx;
		border-top-right-radius: 0rpx;
		border-top-left-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 0rpx;
	}
	.widget_input_placehold{
		color: #BBB;
	}
	.widget_button{
		color: #fff;
		height: 52rpx;
		font-size: 25rpx;
		padding: 5rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top-right-radius: 10rpx;
		border-top-left-radius: 0rpx;
		border-bottom-left-radius: 0rpx;
		border-bottom-right-radius: 10rpx;
		background-color: #FF6600;
	}
	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>
