<template>
	<view>
		<view class="contentpaiming">
			<view style="width: 15%;display: flex;justify-content: center;align-items: center;">
				<text>{{title_1}}</text>
			</view>
			<view style="width: 65%;">
				<view style="display: flex;justify-content: center;align-items: center;">
					{{title_2}}
				</view>
			</view>
			<view style="width: 25%;display: flex;justify-content: center;align-items: center;">{{title_3}}</view>
		</view>
		
		<view v-for="(item,index) in rankData":key="index" class="contentpaiming">
			
			<view style="width: 15%;display: flex;justify-content: center;align-items: center;">
				<text v-if="index>2">{{index+1}}</text>
				<text v-if="index==0" style="color: #f0f000;font-weight: bold;">{{index+1}}</text>
				<text v-if="index==1" style="color: #aa0000;font-weight: bold;">{{index+1}}</text>
				<text v-if="index==2" style="color: #55aaff;font-weight: bold;">{{index+1}}</text>
			</view>
			<view style="width: 65%;">
				<view style="display: flex;justify-content: center;align-items: center;" class="u-line-1">
					<!-- <u-avatar :src="item.user.avatar" size="65" style="margin-right: 25rpx;"></u-avatar> -->
					<text style="display: flex;justify-content: center;align-items: center;">{{item.user.nickname}}</text>
				</view>
			</view>
			<view style="width: 25%;display: flex;justify-content: center;align-items: center;"><text>{{item.data}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"zetank-rank",
		data() {
			return {
				
			};
		},
		props:{
			rankData:{
				type:Array,
				default:function(){
					return [
						{user:{
							avatar:'/static/mine/member/head.png',
							nickname:'nihao'
						},
						data:8},
						{user:{
							avatar:'/static/mine/member/head.png',
							nickname:'admin'
						},
						data:6},
						{user:{
							avatar:'/static/mine/member/head.png',
							nickname:'yonghu'
						},
						data:3} 
					]
				}
			},
			title_1:{
				type:String,
				default:"排名"
			},
			title_2:{
				type:String,
				default:"昵称"
			},
			title_3:{
				type:String,
				default:"积分"
			}
		},
	}
</script>

<style>
.contentpaiming{
	
	margin: 10rpx 20rpx;

	padding: 20rpx;
	display: flex;
	justify-content:space-around;
}
</style>