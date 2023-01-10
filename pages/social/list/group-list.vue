<template>
	<view>
		<view style="padding: 20rpx;">
			<view style="color: darkgrey;font-size: 25rpx;">群聊</view>
			<view class="item-container" v-for="(item,index) in groupList" :key="index">
				<u-row @tap="gotoPage('group', item.group_id)" customStyle="margin-bottom: auto;margin-top:auto;">
				    <u-col span="2">
				         <image class="group-avatar" :src="item.avatar"></image>
				    </u-col>
				    <u-col span="10">
				        <view>{{item.name}}</view>
				    </u-col>
				</u-row>
				<u-line></u-line>
			</view>
			<view class="item-container">
				<u-row customStyle="margin-bottom: 10px">
				    <u-col span="10">
				         <view style="color: darkgrey;font-size: 25rpx;">{{'共'+groupList.length+'个群聊'}}</view>
				    </u-col>
				</u-row>
				<u-line></u-line>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
 	export default{
		computed:{
			...mapGetters(['groupList'])
		},
		data(){
			return{
				
			}
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0){
				uni.navigateTo({
					url:'/pages/social/info/group-edit?action=new'
				})
			}
		},
		methods:{
			gotoPage(where, id){
				uni.navigateTo({
					url:'/pages/social/info/group-info?id='+id
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