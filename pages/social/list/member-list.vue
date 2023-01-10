<template>
	<view>
		<view style="padding: 20rpx;">
			<view style="color: darkgrey;font-size: 25rpx;">群成员</view>
			<view class="item-container" v-for="(item,index) in memberList" :key="index">
				<u-row @tap="gotoPage('group', item.id)" customStyle="margin-bottom: auto;margin-top:auto;">
				    <u-col span="2">
				         <image class="group-avatar" :src="item.avatar"></image>
				    </u-col>
				    <u-col span="10">
				        <view>{{item.nickName}}</view>
				    </u-col>
				</u-row>
				<u-line></u-line>
			</view>
			<view class="item-container">
				<u-row customStyle="margin-bottom: 10px">
				    <u-col span="10">
				         <view style="color: darkgrey;font-size: 25rpx;">{{'共'+memberList.length+'个用户'}}</view>
				    </u-col>
				</u-row>
				<u-line></u-line>
			</view>
		
		</view>
	</view>
</template>

<script>
	import userRequest from '@/api/social/user.js';
 	export default{
		data(){
			return{
				groupInfo:{},
				memberList:[],
				groupId:null
			}
		},
		onLoad(options) {
			this.groupId = options.id
			if(this.groupId==null||this.groupId==undefined){
				uni.switchTab({
					url:'/pages/social/social'
				})
			}
			this.getMemberList()
		},
		methods:{
			async getMemberList(){
				let res = await userRequest.groupMember({id:this.groupId})
				this.memberList = res.data
				let res1 = await userRequest.groupInfo({id:this.groupId})
				this.groupInfo = res1.data
			},
			gotoPage(where, id){
				uni.navigateTo({
					url:'/pages/social/info/friend-info?id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item-container:active{
		background-color: #E8E8E8;
	}
	.item-container{
		text-align: center;
		margin-top: 10rpx;
	}
	.group-avatar{
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
	}
		.demo-layout {
	        height: 25px;
	        border-radius: 4px;
	    }
	
	    .bg-purple {
	        background: #CED7E1;
	    }
	
	    .bg-purple-light {
	        background: #e5e9f2;
	    }
	
	    .bg-purple-dark {
	        background: #99a9bf;
	    }
</style>