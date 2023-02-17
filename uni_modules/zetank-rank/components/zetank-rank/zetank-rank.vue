<template>
	<view>
		<view class="contentpaiming">
			<view style="width: 15%;display: flex;justify-content: center;align-items: center;">
				<text>排名</text>
			</view>
			<view style="width: 65%;">
				<view style="display: flex;justify-content: center;align-items: center;">
					昵称
				</view>
			</view>
			<view style="width: 25%;display: flex;justify-content: center;align-items: center;">积分</view>
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
		{{user_scoreList}}
	</view>
</template>

<script>
	import { listUser_score, getUser_score, delUser_score, addUser_score, updateUser_score } from "@/api/readerstation-member/user_score";
	export default {
		name:"zetank-rank",
		data() {
			return {
				user_scoreList:[],
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
			
		},
		
		mounted() {},
		onLoad() {
			
			this.getList()
		},
		methods: {
			/** 查询用户积分列表 */
			    getList() {
					// alert(1)
			      listUser_score().then(response => {
					  // alert(1)
			        this.user_scoreList = response.rows;
			        this.totalCount = response.total;
			      });
			    },
		}
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