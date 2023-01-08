<template>
	<view class="detail" >
		<view class="detail-title" >
			{{articleDetail.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header-content">
				<view class="detail-author">{{articleDetail.author}}</view>				
			<view class="detail-info">
				<text>{{articleDetail.createTime}}</text>
				<text>阅读量 {{articleDetail.count}}</text>
			</view>
			</view>
		</view>
		<view class="detail-content">
			<parser :html="articleDetail.content"></parser>
		</view>
		<view class="detail-bottom_icons">
			<button class="dianzan" type="default" size="default" @click="change">
				<uni-icons type="hand-up" size="28px" v-show="dzchange"></uni-icons>
				<uni-icons type="hand-up-filled" size="28px" color="#ED9121" v-show="!dzchange"></uni-icons>
			</button>
			<!-- #ifndef MP -->
			<button class="zhuanfa" type="default" size="default" @click="handleShareImg(articleDetail)">
				<uni-icons type="redo" size="28px"></uni-icons>
			</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
import parser from '@/components/parser/parser.vue';
import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
const uniShare = new UniShare();
export default {
	onBackPress({from}) {
	    console.log(from);
	    if(from=='backbutton'){
	        this.$nextTick(function(){
	            uniShare.hide()
	        })
	        return uniShare.isShow;
	    }
	},
	components: {
		parser
	},
	data() {
		return {
			dzchange: true,
			articleDetail:{},
			curRoute:{},
		}
	},
	onLoad:function(option){
		console.log(option.id);
		this.loadData(parseInt(option.id));
		this.curRoute = this.$mp.page.route
	},
	methods: {
		async loadData(id){
			const that = this;
			await uni.request({
				url:'http://123.56.217.170:8080/article/' + id,
				method:'GET',
				success: (res) => {
					console.log(res.data);
					that.articleDetail = res.data.data;
				}
			})
		},
		onShareAppMessage(){
		} ,
		change(){
			if(this.dzchange = !this.dzchange){
				uni.showToast({
					title:"取消点赞",
					icon:"success"
				})
				}else{
				uni.showToast({
					title:"点赞成功",
					icon:"success"
				})
				}
		},
		handleShareImg(e) {
		    uniShare.show({
		        content: { //公共的分享参数配置  类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
		            type: 0,
		            href: 'http://localhost:8081/#' + this.curRoute,
		            title: e.title,
		            imageUrl: e.imageUrl
		        },
		        menus: [{
		                "img": "/static/app-plus/sharemenu/wechatfriend.png",
		                "text": "微信好友",
		                "share": { //当前项的分享参数配置。可覆盖公共的配置如下：分享到微信小程序，配置了type=5
		                    "provider": "weixin",
		                    "scene": "WXSceneSession"
		                }
		            },
		            {
		                "img": "/static/app-plus/sharemenu/wechatmoments.png",
		                "text": "微信朋友圈",
		                "share": {
		                    "provider": "weixin",
		                    "scene": "WXSceneTimeline"
		                }
		            },
		            {
		                "img": "/static/app-plus/sharemenu/mp_weixin.png",
		                "text": "微信小程序",
		                "share": {
		                    provider: "weixin",
		                    scene: "WXSceneSession",
		                    type: 5,
		                    miniProgram: {
		                        id: '123',
		                        path: '/pages/list/detail',
		                        webUrl: '/#/pages/list/detail',
		                        type: 0
		                    },
		                }
		            },
		            {
		                "img": "/static/app-plus/sharemenu/weibo.png",
		                "text": "微博",
		                "share": {
		                    "provider": "sinaweibo"
		                }
		            },
		            {
		                "img": "/static/app-plus/sharemenu/qq.png",
		                "text": "QQ",
		                "share": {
		                    "provider": "qq"
		                }
		            },
		            {
		                "img": "/static/app-plus/sharemenu/copyurl.png",
		                "text": "复制",
		                "share": "copyurl"
		            },
		            {
		                "img": "/static/app-plus/sharemenu/more.png",
		                "text": "更多",
		                "share": "shareSystem"
		            }
		        ],
		        cancelText: "取消分享",
		    }, e => { //callback
		        console.log(uniShare.isShow);
		        console.log(e);
		    })
		                
	}
	}
};
</script>

<style lang="scss">
	.detail{
		padding: 40rpx 32rpx;
		background: #fff;
	}
	.detail-title{
		font-size: 44rpx;
		color: #262626;
		line-height: 70rpx;
		font-weight: bold;
	}
	.picture{
		display: flex;
		margin-right: 30rpx;
	}
	.detail-header{
		margin-top: 32rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.detail-header-content{
			width: 100%;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
			.detail-author{
				font-size: 30rpx;
				color: #333;
			}
			.detail-info{
				margin-top: 32rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				text{
					margin-right: 10px;
					font-size: 30rpx;
					color: #999;
				}
			}
		}
	}
	.detail-content{
		overflow-y: auto;
		bored:1px red solid;
		margin-top: 56rpx;
		overflow: hidden;
		color: #262626;
		font-size: 40rpx;
		
	}
	.detail-bottom_icons{
		margin-top: 56rpx;
		display: flex;
		flex-shrink: 0;
		padding: 0px 10px;
		.dianzan{
			width:200rpx;
			border-radius: 25px;
			border: 1px solid #ccc
		}
		.zhuanfa{
			width: 200rpx;
			border-radius: 25px;
			border: 1px solid #ccc
		}
		
	}
</style>
