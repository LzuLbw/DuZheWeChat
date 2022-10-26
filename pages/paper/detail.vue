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
			<button class="zhuanfa" type="default" size="default" @click="confirmShare">
				<uni-icons type="redo" size="28px"></uni-icons>
				<uni-popup ref="popupShare" type="share">
					<uni-popup-share title="分享到" @select="select"></uni-popup-share>
				</uni-popup>
			</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
import parser from '@/components/parser/parser.vue';
	export default {
	components: {
		parser
	},
	data() {
		return {
			dzchange: true,
			articleDetail:{},
		}
	},
	onLoad:function(option){
		console.log(option.id);
		this.loadData(parseInt(option.id));
	},
	onShow() {
		
	},
	methods: {
		async loadData(id){
			const that = this;
			await uni.request({
				url:'http://localhost:8080/home/article/getByid/' + id,
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
		confirmShare() {
			this.$refs.popupShare.open()
		},
		select(e) {
			uni.showToast({
				title: `您选择了第${e.index+1}项：${e.item.text}`,
				icon: 'none'
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
