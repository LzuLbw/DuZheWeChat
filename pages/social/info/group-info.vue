<template>
	<view>
		<view class="top">
			<image class="background" style="width: 100%;" mode="aspectFill" src="/static/social/img/bg-lake.jpg"></image>
			<image class="avatar" @tap="preViewImage(groupInfo.avatar)" :src="groupInfo.avatar"></image>
			<view v-if="loginUserInfo.userId==groupInfo.ownerId" class="btn" @tap="gotoPage('edit')">编辑群聊</view>
		</view>
		<view class="middle">
			<view class="name-container">
				<text selectable="true" class="name">{{groupInfo.name}}</text>
				<!-- <image class="icon" :src="personInfo.gender===1?'../../static/icon/gender-male.png':'../../static/icon/gender-female.png'"></image> -->
			</view>
			<view class="mail-container">
				<!-- <image class="icon" src="../../static/icon/mail.png"></image>
				<text selectable="true">{{personInfo.email}}</text> -->
				<image class="icon" src="/static/social/icon/calendar.png"></image>
				<text>{{showTime(groupInfo.createTime)}}</text>
			</view>
			<view class="text">群成员</view>
			<view class="mail-container" @tap="gotoPage('member')">
				<u-avatar-group
				            :urls="urls"
				            size="35"
				            gap="0.4">
				</u-avatar-group>
			</view>
			<view class="text">
				<text selectable="true">{{'群简介\n'+groupInfo.introduction}}</text>
			</view>
		</view>

		<view class="bottom">
			<view @tap="gotoChat()" v-if="isMember" class="btn">发消息</view>
			<view @tap="joinGroup()" v-if="!isMember" class="btn">入群聊</view>
			<view v-if="loginUserInfo.userId==groupInfo.ownerId" class="btn" @click="deleteGroup()">解散群聊</view>
			<view v-if="isMember&&loginUserInfo.userId!=groupInfo.ownerId" class="btn" @click="exitGroup()">退出群聊</view>
		</view>
		
		
	</view>
</template>

<script>
	import userRequest from '@/api/social/user.js';
	import timeUtil from '@/utils/social/timeUtil.js';
	import {mapGetters} from 'vuex';
	import $store from '@/store/modules/social';
	export default{
		computed:{
			...mapGetters(['loginUserInfo','groupList','sessionList'])
		},
		data(){
			return{
				groupInfo:{},
				show : false,
				popupData: {
					overlay: true,
					mode: 'center',
					borderRadius: '',
					closeable: true,
					closeOnClickOverlay: true
				},
				message: '',
				notation: '',
				urls:[],
				isMember:false
			}
		},
		onLoad(options) {
			let id = options.id;
			this.getGroupInfo(id)
		},
		methods:{
			//解散群聊
			deleteGroup(){
				let id =  this.groupInfo.id
					//console.log(id+"11111111");
					let that = this
					uni.showModal({
						cancelText:'取消',
						confirmText:'退出',
						title:'确认退出当前读友圈吗',
						success(res) {
							if(res.confirm){
								that.postDelete(id)
							}
							//console.log(id)
						}
					})
				},
				async postDelete(id){
					//console.log(id)
					let res = await userRequest.deleteGroup({
						id:id,
					})
					uni.showToast({
						title:'已退出',
						icon:'success'
					})
					$store.dispatch('getGroupList')
					uni.navigateBack({
						url:"/pages/social/list/group-list"
					})
				},
			
			
			//退出群聊
			exitGroup(){
				let groupId  =  this.groupInfo.id
				let userId = this.loginUserInfo.userId
					// console.log(id+"11111111")
					// console.log(userId)
					let that = this
					uni.showModal({
						cancelText:'取消',
						confirmText:'退出',
						title:'确认退出当前读友圈吗',
						success(res) {
							if(res.confirm){
								that.postDelete(groupId,userId)
							}
							//console.log(id)
						}
					})
			},	
				async postDelete(groupId,userId){
					console.log(groupId,userId)
					let res = await userRequest.exitGroup({
						groupId:groupId,
						userId:userId
					})
					uni.showToast({
						title:'已退出',
						icon:'success'
					})
					$store.dispatch('getGroupList')
					uni.navigateBack({
						url:"/pages/social/components/chat/chatlist"
					})
				},
			
			gotoChat(){
				//console.log(this.personInfo)
				if(!this.isMember){
					return
				}
				//console.log(this.sessionList)
				for(let i=0;i<this.sessionList.length;i++){
					if(this.sessionList[i].sessionId==this.groupInfo.id)
					{
						$store.state.chattingGroupInfo = this.sessionList[i]
						uni.navigateTo({
							url:'/pages/social/components/chat/group-chat'
						})
						break
					}
				}
			},
			joinGroup(){
				///构造websocket消息
				let m = {
					 userId : this.loginUserInfo.userId,
					 groupId : this.groupInfo.id
				}
				let msg = {
					 type: 'join-group',
					 data: m
				}
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
					fail(res) {
						uni.showToast({
							icon:'error',
							title:'发送失败'
						})
					},
					success() {
						uni.navigateBack();
					}
				})
			},
			showTime(time){
				return timeUtil.getFormatTime(time)
			},
			async getGroupInfo(id){
				let res = await userRequest.groupInfo({id:id})
				let res1 = await userRequest.groupMember({id:id})
				//console.log(res,res1)
				this.groupInfo = res.data;
				let users = res1.data
				this.urls = []
				for(let i=0;i<users.length;i++){
					this.urls.push(users[i].avatar)
				}
				for(let i=0;i<this.groupList.length;i++){
					if(this.groupList[i].group_id===this.groupInfo.id){
						this.isMember = true
						break
					}
				}
			},
			gotoPage(i){
				switch(i){
					case 'edit':
					//console.log(this.groupInfo)
					$store.state.editingGroupInfo = this.groupInfo
					uni.navigateTo({
						url:'/pages/social/info/group-edit?action=edit'
					})
					break;
					case 'member':
					uni.navigateTo({
						url:'/pages/social/list/member-list?id='+this.groupInfo.id
					})
					break;
				}
			},
			change(e){
				//console.log(this.message)
			},
			openMethod(){
				//console.log('打开了')
			},
			preViewImage(url){
				uni.previewImage({
					urls:[url]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		//background-color: #e2e2e2;
	}
	.top{
		position: relative;
		height: 500rpx;
		.background{
			// z-index: -1;
			height: 400rpx;
		}
		.avatar{
			border-radius: 50%;
			width: 150rpx;
			height: 150rpx;
			position: absolute;
			bottom: 0;
			left: 50rpx;
		}
		.btn{
			position: absolute;
			bottom: 15rpx;
			right: 50rpx;
			background-color: royalblue;
			padding: 15rpx;
			color: white;
			border-radius: 8rpx;
			font-weight: 600;
		}
		.btn:active{
			background-color: royalblue;
		}
	}
	
	.middle{
		padding: 50rpx;
		.name-container{
			display: flex;
			.name{
				font-weight: 900;
				font-size: 35rpx;
			}
			.icon{
				margin-left: 5rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}
		.mail-container{
			margin-top: 20rpx;
			display: flex;
			.icon{
				margin-left: 5rpx;
				width: 40rpx;
				height: 40rpx;
				margin-right: 5rpx;
			}
			text{
				font-weight: 500;
				font-size: 25rpx;
				margin-right: 30rpx;
			}
		}
		.text{
			margin-top: 30rpx;
			color: grey;
			letter-spacing: 1rpx;
			// font-size: 35rpx;
		}
	}
	.bottom{
		position: absolute;
		padding: 50rpx;
		display: flex;
		width: 100%;
		bottom: 0;
		.btn{
			background-color: royalblue;
			width: 40%;
			height: 70rpx;
			color: #fff;
			font-weight: 900;
			text-align: center;
			line-height: 70rpx;
			margin-right: 7%;
			border-radius: 35rpx;
		}
	}
	.u-popup-slot {
		padding: 50rpx;
		width: 200px;
		height: 150px;
		justify-content: center;
		align-items: center;
		display: block;
	}
</style>