<template>
<view class="content">
 <view class="box" v-for="(item,index) in bookData " :key="index">
  <image style="width: 90px;height: 80px;;" v-if="item.img" :src="item.img" @click="gotodetails(item.id)">
  </image>
  <view > <text>{{item.name}}</text></view>
  <button type="primary" size="mini" style="background-color: red;font-size: 10upx;margin-right: 5upx;" @click="deleteee(item)">移除</button>
  
 </view>
 </view>
</template>

<script>
	import $store from '@/store/modules/social';
 export default {
  data() {
   return {
    bookData:[],
    bookList:[],
    //bookId:1
    
   }
  },
  onLoad:function(){
   // this.showBook();
   let userId = $store.state.loginUserInfo.userId
   uni.request({
    url:'http://123.56.217.170:8080/shell/findUser/' +userId,
    method:'GET',
    data: {},
    success: (res) => {
     //console.log(res);
     console.log("===============");
     console.log(res.data );
    
     this.bookList=res.data;
     
     console.log("===========>");
     console.log(this.bookList);
     
     for (var i = 0; i < this.bookList.length; i++) {
      this.getData(this.bookList[i].bookId);
     }
     console.log(this.bookData);
     console.log("==========++++==================");
    
    },
   });
   },
  methods:{
   getData(bookId){
    uni.request({
     url:'http://123.56.217.170:8080/book/findById/'+ bookId,
     method:'GET',
     data: {},
     success: (res) => {
      //console.log(res);
      console.log("-------------------aaaaaaaa");
      console.log(res.data );
      this.bookData.push(res.data[0]);
      
     },
    });
   },
   deleteee(e){
     var id=e.id;
     console.log(id+'000000000000000000');
    uni.request({
     url:'http://123.56.217.170:8080/shell/deleteById/'+id,
     method:'DELETE',
     data:{},
     success: (res) => {
      console.log(res.data);
      
     }
    })
   },
			gotodetails(id){
				console.log('id为=============='+id);
				// var id=e.id;
				uni.navigateTo({
					url:'/pages/study/bookdetails/bookdetails?id='+id,
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
