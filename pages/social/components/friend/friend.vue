<template>
	<view>
		<u-index-list :indexList="indexList">
			<view slot="header" class="list">
				<view class="list__item" @tap="gotoPage(0)">
					<view style="position: relative;">
						<u-avatar shape="square" size="40" icon="bell-fill" fontSize="26" randomBgColor colorIndex="18"></u-avatar>
						<u-badge style="position: absolute;top: -10upx;right: -10upx;" :type="'error'" max="99" :value="totalUnread.notice"></u-badge>
					</view>
					<text class="list__item__user-name">通知</text>
				</view>
				<u-line></u-line>
				<view class="list__item" @tap="gotoPage(1)">
					<u-avatar shape="square" size="40" icon="weixin-fill" fontSize="26" randomBgColor colorIndex="9"></u-avatar>
					<text class="list__item__user-name">读友圈</text>
				</view>
				<u-line></u-line>
				<!-- <view class="list__item" @tap="gotoPage(2)">
					<u-avatar shape="square" size="40" icon="qzone-circle-fill" fontSize="26" randomBgColor colorIndex="6"></u-avatar>
					<text class="list__item__user-name">动态</text>
				</view>
				<u-line></u-line> -->
			</view>
			<template v-for="(item, index) in friendListShow">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor v-if="item.length!==0" :text="indexList[index]" :key="index"></u-index-anchor>
				<!-- #endif -->
				<u-index-item :key="index">
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor v-if="item.length!==0" :text="indexList[index]"></u-index-anchor>
					<!-- #endif -->
					<view class="list" v-for="(item1, index1) in item" :key="index1">
						<view class="list__item" @tap="gotoFriendInfo(item1.id)">
							<image class="list__item__avatar" :src="item1.url"></image>
							<text class="list__item__user-name">{{item1.name}}</text>
						</view>
					</view>
				</u-index-item>
				
			</template>
			<view slot="footer" class="u-safe-area-inset--bottom">
				<text class="list__footer">共{{friendList.length}}位好友</text>
			</view>
		</u-index-list>
	</view>
</template>

<script>
	const indexList = () => {
		const indexList = []
		const charCodeOfA = 'A'.charCodeAt(0)
		indexList.push("↑")
		indexList.push("☆")
		for (let i = 0; i < 26; i++) {
			indexList.push(String.fromCharCode(charCodeOfA + i))
		}
		indexList.push('#')
		return indexList
	}
	import {mapGetters} from 'vuex';
	import stringUtil from '@/utils/social/stringUtil.js';
	//import friend from '@/api/social/friend.js';
	import $store from '@/store/modules/social/test.js';
	import { getList } from "@/api/social/friend.js"
	export default {
		data() {
			return {
				indexList: indexList(),
				list:[]
			}
		},
		computed: {
			...mapGetters(['loginUserInfo', 'isSocketOpen','friendListShow','friendList','totalUnread'])
		},
		
		onPullDownRefresh() {
			///重新获取连接websocket
			if(!$store.state.isSocketOpen){
				websocket.initConnect()
			}
			///从新获取消息列表
			$store.dispatch('getNoticeList')
			setTimeout(()=>{
				if($store.state.isSocketOpen){
					uni.showToast({
						icon:'success',
						title:'刷新成功！'
					})
				}
				else{
					uni.showToast({
						icon:'error',
						title:'刷新失败！'
					})
				}
				uni.stopPullDownRefresh()
			},500)
		},
		data() {
			return {
				value: 1,
				indexList: indexList(),
				itemArr:[]
			}
		},
		onLoad() {
			uni.hideTabBar();
			this.list = getList(1);
			console.log(1111);
		},
		created() {
			
			
		},
		methods: {
			gotoFriendInfo(id){
				uni.navigateTo({
					url:'/pages/social/info/friend-info?id='+id
				})
			},
			//去搜索页面
			gotoPage(i){
				switch(i){
					// case 3:
					// uni.navigateTo({
					// 	url:'/pages/social/search/search'
					// })
					// break;
					case 1:
					uni.navigateTo({
						url:'/pages/social/list/group-list'
					}) 
					break;
					case 0:
					uni.navigateTo({
						url:'/pages/social/list/notice-list'
					})
					break;
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.list__item:active{
		background-color: #e8e8e8;
	}
	.list__item{
			padding: 6px 12px;
			align-items: center;
			justify-content: space-between;
		}
    .list__item__avatar{
			height: 40px;
			width: 40px;
			border-radius: 3px;
		}
    .list__item__user-name{
		    align-items: center;
			font-size: 16px;
			margin-left: 2upx;
			color: black;
		}
    .list__footer{
			color: royalblue;
			font-size: 14px;
			text-align: center;
			margin: 15px 0;
		}
	.u-safe-area-inset--bottom{
		height: 150rpx;
		text-align: center;
	}
</style>
