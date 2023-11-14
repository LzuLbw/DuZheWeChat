<template>
<view class="content">
 <br/>
     <view class=" " v-for="(item,index) in articleData" :key="index">
      <view style="font-size: 20px;text-align: center;" @click="godetails(item)">{{item.title}}</view>
 	 <image v-if="item.img" :src="item.img" style="width: 100%;height: 150px;" @click="godetails(item)"></image>
 	 <view style="display: flex;">
 		 <view style="">{{item.creatTime}}</view>
 		 <view style="margin-left: 120upx;display: flex">
 			 <image src="https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/icon/viewnum.png" style="width: 30px;height: 20px;margin-right: 5px;margin-top: 5upx;"></image>
 			 <view style="font-size: 20px;">{{item.viewNum}}</view>
 			 <view @click="deleteee(item)" style="margin-left: 150px;">删除</view>
 			 
 		 </view>
 	 </view>
     </view><br/>
 </view>
</template>

<script>
 export default {
  data() {
   return {
    articleData:[],
    articleList:[],
	title:'',
	content:'',
	
    
   }
  },
  onLoad:function(){
   // this.showBook();
   let userId = $store.state.loginUserInfo.userId
   uni.request({
    url:'http://123.56.217.170:8080/collection/findUser/' +userId,
    method:'GET',
    data: {},
    success: (res) => {
     //console.log(res);
     console.log("===============");
     console.log(res.data );
    
     this.articleList=res.data;
     
     console.log("===========>");
     console.log(this.articleList);
     
     for (var i = 0; i < this.articleList.length; i++) {
      this.getData(this.articleList[i].articleId);
     }
     console.log(this.articleData);
     console.log("==========++++==================");
    
    },
   });
   },
  methods:{
   getData(articleId){
    uni.request({
     url:'http://123.56.217.170:8080/article/findById/'+ articleId,
     method:'GET',
     data: {},
     success: (res) => {
      //console.log(res);
      console.log("-------------------aaaaaaaa");
      console.log(res.data );
      this.articleData.push(res.data[0]);
      
     },
    });
   },
   godetails(e){
   	console.log('id为'+e.id);
   	var id=e.id;
   	uni.navigateTo({
   		url:'/pages/study/article_details/article_details?id='+id,
   		success: (res) => {
   			console.log("打开成功");
   		}
   	})
   },
   deleteee(e){
     var id=e.id;
     console.log(id+'000000000000000000');
    uni.request({
     url:'http://123.56.217.170:8080/collection/deleteById/'+id,
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
   },
			gotodetails(id){
				console.log('id为=============='+id);
				// var id=e.id;
				uni.navigateTo({
					url:'/pages/study/articledetails/articledetails?id='+id,
					success: (res) => {
						console.log("打开lll成功");
					}
				})
			},
		
		}
	}
</script>

<style>
	.box{
		margin-top: 15px;
		margin-left: 15px;
		margin-right: 15px;
		display: flex;
		align-items: center;
	}
	.box text{
		margin-left: 50upx;
		font-size: 20px;
	}
@import url('bookdetail.css');

</style>
