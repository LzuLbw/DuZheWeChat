<template>
    <view class="container">
        <view class="nav-list">
            <view class="nav-item" v-for="(item,index) of listBook"  :class="{active:index==viewNavIndex}" @click="handleClickNav(index)" :key="index">{{item.name}}</view>
        </view>
		<view class="list-wrapper">
		    <scroll-view class="list-container" id="list-container"
		        @scroll="handleListScroll"
		        @touchstart="handleTouchScrollView"
		        :scroll-y="true" 
		        :scroll-into-view="'scroll-item-'+clickedNavIndex" 
		        :show-scrollbar="false"
		        :scroll-with-animation="true">
		        <view class="list" v-for="(item,index) of listBook" :key="index" :id="'scroll-item-'+index">
		            <view class="title"><text>《{{item.name}}》笔记</text></view>
		           <view class="item-container">
		                <view class=" content order-item" :data-index="index" v-for="(item,index) of itemList" :key="index">
		                    <view @click="details(item.id)">
		                    <view style="font-size: 17px;color: cornflowerblue;"># {{item.title}} #</view>
		                    <view style="font-size: 15px;">{{item.content}}</view>
		                    <view style="font-size: 14px;">{{item.creatTime}} </view>
		                    </view>
		                    
		                </view>
		            </view>
		        </view>
		    </scroll-view>
		</view>
       
    </view>
</template>

<script>
	import $store from '@/store/modules/social';
export default {
	data(){
		return{
			listBook:[],
			isTouchScrollView: false,
			clickedNavIndex: 0,
			viewNavIndex: 0,
			nodeInfoList: [],
			noteList:[],
			id:1,
			bookId:'',
			allBook:[],
			itemList:[]
		}
	},
	onLoad:function(e){
		let userId = $store.state.loginUserInfo.userId
		
		uni.request({
			url: 'http://123.56.217.170:8080/book/all',
			 success: (res) => {
				 console.log(res.data);
		          this.listBook =res.data;
						  },
					})
	 uni.request({
	  url:'http://localhost:8080/note/findUser/' +userId,
	  method:'GET',
	  data: {},
	  success: (res) => {
	   //console.log(res);
	   console.log("===============");
	   console.log(res.data );
	  
	   this.itemList=res.data;
	   
	   console.log("===========+++++>");
	   console.log(this.itemList);
	   // for(var j=0;j<listBook.length;j++){
	   // for(var i=0;i<this.itemList.length;i++){
		  //  if(this.itemList[i].bookId==this.listBook[j].id){
			 //   console.log(this.itemList[i].bookId+'11111');
		  //  }
		   
	   // }
	   // }
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
		// findAllBook(){
		// 	uni.request({
		// 		url: 'http://123.56.217.170:8080/book/all',
		// 		 success: (res) => {
		// 		    console.log(res.data);
		// 		          this.listBook =res.data;
		// 				  console.log("===",this.listBook);
		// 		},
				
		// 	})
			
		// },
		// findAllNote(){
		// 	for(var i=0;i<this.listBook.length;i++){
		// 		console.log(this.listBook[i].id+'这个是找出来的书本id');
		// 		uni.request({
		// 			url:'http://localhost:8080/note/findById/'+this.listBook[i].id,
		// 			method:'GET',
		// 			data:{},
		// 			success: (res) => {
		// 				console.log(res.data);
		// 				this.noteList=res.data;
		// 				console.log(this.noteList+'0.0.00+++');
		// 			}
		// 		})
		// 	}
		// },
		init(){
		    const query = uni.createSelectorQuery().in(this);
		    query.selectAll('#list-container .list').boundingClientRect(data => {
		        // console.log(data);
		        this.nodeInfoList = data
		    }).exec()
		},
		handleClickNav(nav){
		    if(!this.isTouchScrollView&&this.clickedNavIndex == nav) return;
		    // 锁定联动
		    this.isTouchScrollView = false;
		    // 解决clickedNavIndex相同触发更新失败
		    if(this.clickedNavIndex == nav){
		        this.clickedNavIndex = -1;
		    }
		    this.$nextTick(function(){
		        this.clickedNavIndex = nav;
		        this.viewNavIndex = nav
		    })
		},
		handleListScroll(e){
		    if(!this.isTouchScrollView) return;
		    let scrollTop = this.scrollTop = e.detail.scrollTop;
		    // console.log("scrollTop: " + scrollTop);
		    let currentNavIndex = this.nodeInfoList.map((item,index)=>({index,...item}))
		    .filter(item => item.top <= scrollTop + this.topDistance)
		    .sort((a,b)=>b.top-a.top)[0].index;
		    // console.log(currentNavIndex);
		    this.viewNavIndex = currentNavIndex;
		},
		handleTouchScrollView(){
		    this.isTouchScrollView = true;
		},
	},
	mounted() {
	    this.$nextTick(function(){
	        this.init()
	    })
	}
}
</script>
<style lang="stylus" scoped>

.container
    display flex
    height calc(100vh - var(--window-top))
    .nav-list
        width: 200rpx;
        border-right: 2rpx solid #efefef;
        overflow-y auto
        overflow-x hidden
        display flex
        flex-direction column
        align-items center
        font-size 34rpx
        &::-webkit-scrollbar
            width 0
            height 0
            background transparent
        .nav-item
            width 100%
            padding 25rpx 0
            text-align center
            transition: transform .1s linear;
            &.active
                color: #fb7d34
                transform-origin: center center;
                transform: scale(1.32);
    .list-wrapper
        flex 1
        position relative
        .list-container
            position absolute
            top 0
            left 0
            right 0
            bottom 0
            padding 0 32rpx
            box-sizing border-box
            .title
                height 132rpx
                line-height 132rpx
                text-align center
            .item-container
                display flex
                flex-wrap wrap
                align-items center
                .item
                    width 33.33%
                    text-align center
                    padding-top 21rpx 
                    padding-bottom 31rpx
                    image
                        width 104rpx
                        height 104rpx
                        margin-bottom 28rpx
                    .name
                        font-size 23rpx
                        color #0000008a
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
</style>
