<template>
	 <view class="content" style="background: white;">
	 	<view class="widget_style" >
	 		<input placeholder-class="widget_input_placehold" v-model="title" class="widget_input " :style="style1" :placeholder="placehold" />
	 		<view class="widget_button" :style="style2" @click="onClickSearch">{{buttonText}}</view>
	 	</view>
	<view>
	<view  v-for="(item,index) in searchlist" :key="index">
	 <view style="font-size: 20px;text-align: center;" @click="godetails(item)">{{item.title}}</view>
	 <image v-if="item.img" :src="item.img" style="width: 100%;height: 150px;" @click="godetails(item)"></image>
	 <view style="display: flex;">
	 				 <view style="">{{item.creatTime}}</view>
	 				 <view style="margin-left: 120upx;display: flex">
	 					 <image src="../../../static/icon/viewnum.png" style="width: 30px;height: 20px;margin-right: 5px;margin-top: 5upx;"></image>
	 					 <view>{{item.viewNum}}</view>
	 					 
	 				 </view>
	 </view>
	</view><br/>
	</view></view>
</template>

<script>
	export default{
		data(){
			return{
				content:'',
				style1:'',
				style2:'',
				searchlist:{},
				title:'',
				viewNum:1
			}
		},
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
		methods:{
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
		
			// onClickSearch(){
			// 	this.$emit('onSearch',{text:this.content});
			// },
			// onClickSearch(){
			// 	this.title=uni.getStorageSync("title");
			// 	uni.request({
			// 		url:'http://123.56.217.170:8080/article/findByTitle'
			// 	})
			// },
			onClickSearch() {
			    uni.request({
					url:'http://123.56.217.170:8080/article/findByTitle?title='+this.title,
			         success: (res) => {
			            console.log(res.data);
			                  this.searchlist =res.data;
							  console.log("===",this.searchlist);
							   //console.log(this.itemList[0]);
							  // console.log(this.itemList[0].id);
			        }
			    });
			
			},		
			// onClickSearch(e){
			// 	console.log('title为'+e.title);
			// 	var title=e.title;
			// 	uni.navigateTo({
			// 		url:'/pages/search/search?title='+title,
			// 		success: (res) => {
			// 			console.log("打开成功");
			// 		}
			// 	})
			// },
			
			// onClickSearch(e){
			// 	console.log('title为'+e.title);
			// 	var title=e.title;
			// 	uni.request({
			// 		url:'http://123.56.217.170:8080/article/findByTitle/'+this.title,
			// 		method:'GET',
			// 		data:{},
			// 		success: (res) => {
			// 			console.log("搜索成功");
			// 			console.log(res.data);
			// 			this.searchlist=res.data;
			// 		}
			// 	})
			// },
			
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
	.content{
		width: 100%;
	}
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
</style>
