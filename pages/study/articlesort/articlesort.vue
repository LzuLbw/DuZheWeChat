<template>
	<view class="content" style="background: white;">
	<view class="widget_style" >
		<input @click="sortsearch" placeholder-class="widget_input_placehold" v-model="category" class="widget_input " :style="style1" :placeholder="placehold" />
		<view class="widget_button" :style="style2" @click="onClickSearch">{{buttonText}}</view>
	</view>
	<view class="box" v-for="(item,index) in sortList " :key="index">
		<!-- <image style="width: 90px;height: 80px;" v-if="item.img" :src="item.img" @click="gotoolist(item)"> -->
		<image v-if="item.img" :src="item.img" style="width: 90px;height: 80px;"   @click="gotoolist(item)" >
		</image>
		
		<view > <text>{{item.category}}</text></view>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				content:'',
				style1:'',
				style2:'',
				searchlist:{},
				sortList:{},
				category:''
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
		onLoad() {
			this.showsort();
			
		},
		methods:{
			onClickSearch(){
				this.$emit('onSearch',{text:this.content});
			},
			// gotoolist(){
			// 	uni.navigateTo({
			// 		url:'/pages/articlesortlist/articlesortlist'
			// 	})
			// },
			gotoolist(e){
				console.log('id为'+e.id);
				var id=e.id;
				uni.navigateTo({
					url:'/pages/study/articlesortlist/articlesortlist?id='+id,
					success: (res) => {
						console.log("打开成功");
					}
				})
			},
			sortsearch(){
				var category=this.sortList.category;
				uni.navigateTo({
					url:"/pages/study/sortsearch/sortsearch?category="+category,
					success: (res) => {
						console.log("搜索成功");
						
					}
					
				})
				
			},
			showsort(){
				uni.request({
					url:'http://123.56.217.170:8080/classify/all',
					success: (res) => {
					    console.log(res.data);
					          this.sortList =res.data;
							  console.log("===",this.sortList);
					}
				})
			}
		
			
		}
	}
</script>

<style>
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
	.box{
		margin-top: 15px;
		margin-left: 15px;
		margin-right: 15px;
		display: flex;
		align-items: center;
	}
	.box text{
		margin-left: 50upx;
		font-size: 20px;
	}
</style>
