<template>
	
	<view>
		<view>
			<image class="addimg" src="../../../static/icon/addnote.png" @click="addnote" ></image>
		</view>
		<view :data-index="index"  class="content order-item" @touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd" :style="'right:'+item.right+'px'" v-for="(item,index) in itemList" :key="index">
			<view @click="details(item.id)">
			<view style="font-size: 20px;font-weight: bold;">{{item.title}} </view>
			<view style="font-size: 15px;">{{item.content}}</view>
			<view style="font-size: 14px;">{{item.creatTime}} </view>
			</view>
			<view class="remove" @click="delData(item.id)">删 除</view>
			
		</view>
	</view>
	
	
</template>

<script>
	import $store from '@/store/modules/social';
	
	export default {
		data() {
			return {
					itemList: [],
				 //左滑默认宽度
					delBtnWidth: 120,
					content:'',
					title:'',
					creatTime:''
				
			}
		},
		onLoad:function(){
		 // this.showBook();
		 let userId = $store.state.loginUserInfo.userId
		 uni.request({
		  url:'http://123.56.217.170:8080/note/findUser/' +userId,
		  method:'GET',
		  data: {},
		  success: (res) => {
		   //console.log(res);
		   console.log("===============");
		   console.log(res.data );
		  
		   this.itemList=res.data;
		   
		   console.log("===========>");
		   console.log(this.itemList);
		   
		  },
		 });
		 },
	
		methods: {
			
			details(id){
					uni.navigateTo({
						url: '/pages/study/addnote/addnote?id=' + id,
						success: res => {
							console.log("打开编辑页面成功");
						},
						fail: () => {
							console.log("打开编辑页面失败");
						},
						complete: () => {}
					});
			},
			
			addnote(){
				uni.navigateTo({
					url:'/pages/study/addnote/addnote'
				})
			},
			
			//开始触摸滑动
			drawStart(e) {
				console.log("开始触发");
				var touch = e.touches[0];
				this.startX = touch.clientX;
			},
			//触摸滑动
			drawMove(e) {
				console.log("滑动");
				for (var index in this.itemList) {
					this.$set(this.itemList[index],'right',0);
				}
				var touch = e.touches[0];
				var item = this.itemList[e.currentTarget.dataset.index];
				var disX = this.startX - touch.clientX;
				if (disX >= 20) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
				this.$set(this.itemList[e.currentTarget.dataset.index],'right',disX);
				} else {
					this.$set(this.itemList[e.currentTarget.dataset.index],'right',0);
				}
			},
			//触摸滑动结束
			drawEnd(e) {
				console.log("滑动结束");
				var item = this.itemList[e.currentTarget.dataset.index];
				if (item.right >= this.delBtnWidth / 2) {
					this.$set(this.itemList[e.currentTarget.dataset.index],'right',this.delBtnWidth);
				} else {
					this.$set(this.itemList[e.currentTarget.dataset.index],'right',0);
				}
			},
			delData(id){
				console.log("删除")
				console.log(id+"000000000")
				uni.request({
				 url:'http://123.56.217.170:8080/note/deleteById/'+id,
				 method:'DELETE',
				 data:{},
				 success: (res) => {
					 uni.showModal({
					     title: '提示',
					     content: "确认删除？",
					 	success: function (res) {
					 		if (res.confirm) {
					 			console.log('用户点击确定');
					 		} else if (res.cancel) {
					 			console.log('用户点击取消');
					 		}
					 	}
					 });
				  console.log(res.data);
				  
				 }
				})
				
				// uni.showModal({
				//     title: '提示',
				//     content: "确认删除？",
				// 	success: function (res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定');
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
			}

			
		}
	}
</script>

<style>
	.addimg{
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		bottom: 30rpx;
		right: 20rpx;
		
	}
	.content{
		line-height: 1.5;
		background-color: antiquewhite;
		/* border-radius: 7%; */
		border-radius: 15px 50px 30px 5px;
		width: 95%;
		margin-top: 3%;
		margin-left: 2.5%;
	}
	
		.order-item {
		    width: 100%;
		    display: flex;
		    position: relative;
		}
		
		.remove {
		    width: 40px;
		    height: 100%;
		    background-color: red;
		    color: white;
		    position: absolute;
		    top: 0;
		    right: -60px;
		    display: flex;
		    justify-content: center;
		    align-items: center;
			font-size: 14px;
		}


</style>
