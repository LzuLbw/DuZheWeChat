<template>
	<view>
		<view class="top">
			<image class="background" style="width: 100%;" mode="aspectFill" @tap="preViewImage(personInfo.background)" src="/static/social/img/duzhe.jpg"></image>
			<image class="avatar" @tap="preViewImage(personInfo.avatar)" :src="personInfo.avatar"></image>
			<view v-show="isFriend" @tap="show1 = true" class="btn">修改备注</view>
		</view>
		<view class="middle">
			<view class="name-container">
				<text selectable="true" class="name">{{personInfo.nickName}}</text>
				<image class="icon" :src="personInfo.gender===1?'/static/social/icon/gender-male.png':'/static/social/icon/gender-female.png'"></image>
			</view>
			<view v-if="isFriend" class="name-container">
				备注:
				<text selectable="true" class="name">{{personInfo.notation}}</text>
			</view>
			<view class="mail-container">
				<image class="icon" src="/static/social/icon/mail.png"></image>
				<text selectable="true">{{personInfo.email}}</text>
				<image class="icon" src="/static/social/icon/calendar.png"></image>
				<text>{{personInfo.birthday}}</text>
			</view>
			<view class="text">
				个人简介：
				<text selectable="true">{{personInfo.introduction}}</text>
			</view>
		</view>

		<view class="bottom">
			<view class="btn" @tap="gotoChat()" v-show="isFriend">发消息</view>
			<view  v-show="!isFriend" class="btn" @tap="show=true">加好友</view>
			<view @tap="gotoPage('space')" class="btn">进空间</view>
		</view>
		
		<u-popup
			customStyle="border-radius: 20rpx;"
			:safeAreaInsetBottom="true"
			:safeAreaInsetTop="true"
			:mode="popupData.mode"
			:show="show"
			:round="popupData.round"
			:overlay="popupData.overlay"
			:borderRadius="popupData.borderRadius"
			:closeable="popupData.closeable"
			:closeOnClickOverlay="popupData.closeOnClickOverlay"
			@close="show = false"
			@open="openMethod"
		>
			<view
				class="u-popup-slot"
				:style="{
					width: ['bottom', 'top'].includes(popupData.mode) ? '750rpx' : '200px',
					marginTop: ['left', 'right'].includes(popupData.mode) ? '480rpx' : '0',
				}"
			>
			  <u-input
			    placeholder="验证信息"
			    border="surround"
			    v-model="message"
			    @change="change"
				customStyle="width: 90%;margin-top:10rpx;"
			  ></u-input>
			  <u-input
			    placeholder="设置备注"
			    border="surround"
			    v-model="notation"
			    @change="change"
			  				customStyle="width: 90%;margin-top:20rpx;"
			  ></u-input>
				<u-button
					type="success"
					text="发送"
					customStyle="width: 200rpx;margin-top:30rpx;"
					@click="sendApply()"
				></u-button>
			</view>
		</u-popup>
		
		<u-popup
			customStyle="border-radius: 20rpx;"
			:safeAreaInsetBottom="true"
			:safeAreaInsetTop="true"
			:mode="popupData.mode"
			:show="show1"
			:round="popupData.round"
			:overlay="popupData.overlay"
			:borderRadius="popupData.borderRadius"
			:closeable="popupData.closeable"
			:closeOnClickOverlay="popupData.closeOnClickOverlay"
			@close="show1 = false"
			@open="openMethod"
		>
			<view
				class="u-popup-slot"
				:style="{
					width: ['bottom', 'top'].includes(popupData.mode) ? '750rpx' : '200px',
					marginTop: ['left', 'right'].includes(popupData.mode) ? '480rpx' : '0',
				}"
			>
			  <u-input
			    placeholder="设置备注"
			    border="surround"
			    v-model="notation1"
			    @change="change"
			  	customStyle="width: 90%;margin-top:20rpx;"
			  ></u-input>
				<u-button
					type="success"
					text="确定"
					customStyle="width: 200rpx;margin-top:30rpx;"
					@click="edit()"
				></u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import userRequest from '@/api/social/user.js';
	import friendRequest from '@/api/social/friend.js';
	import {mapGetters} from 'vuex';
	import $store from '@/store/modules/social/test.js';
	export default{
		computed:{
			...mapGetters(['friendList','loginUserInfo','sessionList'])
		},
		data(){
			return{
				personInfo:{},
				show : false,
				show1 : false,
				popupData: {
					overlay: true,
					mode: 'center',
					borderRadius: '',
					closeable: true,
					closeOnClickOverlay: true
				},
				message: '',
				notation: '',
				isFriend:false, 
				notation1:'',
				friendId:0
			}
		},
		onLoad(options){
			let id = options.id;
			this.getPersonInfo(id)
		},
		methods:{
			gotoChat(){
				//console.log(this.personInfo)
				if(!this.isFriend){
					return
				}
				//console.log(this.sessionList)
				for(let i=0;i<this.sessionList.length;i++){
					if(this.sessionList[i].chattingUserId==this.personInfo.userId)
					{
						$store.state.chattingUserInfo = this.sessionList[i]
						uni.navigateTo({
							url:'/pages/social/components/chat/person-chat'
						})
						break
					}
				}
			},
			///发送好友申请
			sendApply(){
				if(this.notation.trim()===''){
					uni.showToast({
						title:'备注不允许为空',
						icon:'none'
					})
					return
				}
				if(this.notation.trim().length>10||this.message.trim().length>10){
					uni.showToast({
						title:'备注/验证信息不要超过10个字',
						icon:'none'
					})
					return
				}
				///构造websocket消息
				let m = {
					 senderId : this.loginUserInfo.userId,
					 senderName : this.loginUserInfo.nickName,
					 receiverId : this.personInfo.userId,
					 notation: this.notation.trim(),
					 applyMessage: this.message.trim()
				}
				let msg = {
					 type: 'person-apply',
					 data: m
				}
				let _this = this
				uni.sendSocketMessage({
					data: JSON.stringify(msg),
					fail(res) {
						uni.showToast({
							icon:'error',
							title:'发送失败'
						})
					},
					success() {
						uni.showToast({
							icon:'success',
							title:'发送成功'
						})
						_this.show = false
					}
				})
			},
			gotoPage(where){
				if(where==='space'){
					uni.navigateTo({
						url:'/pages/social/components/moment/person-world?id='+this.personInfo.userId
					})
					return
				}
			},
			async edit(){
				if(this.notation1===''){
					uni.showToast({
						icon:'none',
						title:'请填写备注'
					})
					return 
				}
				let res = await friendRequest.edit({
					id:this.friendId,
					notation: this.notation1.trim()
				})
				//console.log(res)
				$store.dispatch('getFriendList');
				uni.showToast({
					icon:'success',
					title:'修改成功！'
				})
				this.show1 = false;
				this.getPersonInfo(this.personInfo.userId)
			},
			async getPersonInfo(id){
				let res = await userRequest.info({userId:id});
				// console.log(res)
				this.personInfo = res.data;
				this.checkIfFrend(id);
			},
			checkIfFrend(id){
				for(let i=0;i<this.friendList.length;i++){
					if(this.friendList[i].friend_id==id){
						this.isFriend = true;
						this.friendId = this.friendList[i].id;
						this.personInfo.notation = this.friendList[i].notation;
						this.notation1 = this.personInfo.notation
						break;
					}
				}
			},
			toEit(){
				uni.navigateTo({
					url:'/pages/socail/info/person-edit'
				})
			},
			change(e){
				//console.log(e)
			},
			openMethod(){
				if(this.personInfo.userId==this.loginUserInfo.userId){
					uni.showToast({
						title:'不允许添加自己为好友',
						icon:'none'
					})
					this.show = false
					return
				}
				this.notation = this.personInfo.nickName
				this.message = '你好!我是'+this.loginUserInfo.nickName
				console.log('打开了窗口')
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