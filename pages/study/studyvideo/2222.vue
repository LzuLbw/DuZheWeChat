<template>
	<view class="category">
		<!-- 左侧滑动 -->
		<scroll-view scroll-y="true" class="category-left" :style="'height:' +clentHeight+ 'px;'">
			<view v-for='(item,index) in leftData' :key="index" @tap="changeLeftTab(index,item.id)">
				<view class="left-name" :class=' activeIndex === index ?"left-name-active":"left-item"'>
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 右侧滑动 -->
		<scroll-view scroll-y="true" class="category-right" :style="'height:' +clentHeight+ 'px;'">
			<view class="right-list" v-for="(item,index) in rightData" :key="index">
				<block v-for="(k,i) in item" :key="i">
					<view class="list-title">{{k.name}}</view>
					<view class="right-content">
						<view class="right-item" v-for="(j,idx) in k.children" :key="idx">
							<view class="right-name">{{j.name}}</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
  <!--  <view class="container">
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
       
    </view> -->
</template>

<script>
	import $http from "@/common/api/request.js"
	import $store from '@/store/modules/social';
export default {
	data(){
		return{
			userId:0,
			clentHeight: 0,
			activeIndex: 0,
			//左侧数据
			leftData: [],
			//右侧数据
			rightData: [],
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
	onReady() {
		uni.getSystemInfo({
			success: (res) => {
				this.clentHeight = res.windowHeight - this.getClentHeight();
			}
		})
	},
	onLoad:function(e){
		this.getData();
		let userId = $store.state.loginUserInfo.userId
		// uni.request({
		// 	url: 'http://123.56.217.170:8080/book/all',
		// 	 success: (res) => {
		// 		 console.log(res.data);
		//           this.listBook =res.data;
		// 				  },
		// 			})
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
		getData(id) {
				if (id === (this.activeIndex + 1)) {
					return;
				}
		
				uni.request({
					url: 'http://123.56.217.170:8080/book/all',
				}).then((res) => {
					console.log(res);
					console.log('......')
					let map = new Map();
					let trees = [];
					let arr = res.data[0];
					console.log(arr+',,,,,,')
					for (let v of arr){
					    // set(key,value)方法：	向当前Map对象中添加一个值，返回的Map对象，所以支持链式写法
					    map.set(v.id, v)
					}
					// for (let v of arr){
					//     const pid = v.parent_cid;
					//     if (!map.has(pid)) {
					//         trees.push(v)
					//     }
					//     else {
					//         const parent = map.get(pid)
					//         !(parent.children instanceof Array) && (parent.children = [])
					//         parent.children.push(v)
					//     }
					// }
					let leftData = [];
					let rightData = [];
					trees.forEach(v=>{
						leftData.push({
							id:v.id,
							name:v.name
						})
						//如果点击的id值相同
						if(v.id===(this.activeIndex+1)){
							rightData.push(v.children);
							console.log(v.children);
						}
					})
					this.leftData = leftData;
					this.rightData = rightData;
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			},
			getClentHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if (system === 'ios') {
					return 44 + res.statusBarHeight;
				} else if (system === 'android') {
					return 24 + res.statusBarHeight;
				} else {
					return 0;
				}
			},
			//左侧点击事件
			changeLeftTab(index, id) {
				this.getData(id);
				this.activeIndex = index;
			},
			toCatDetail(Id){
				console.log(Id);
				uni.navigateTo({
					url: '/pages/shop/category/catDetail?catId=' + catId + '&userId=' + this.userId + ''
				})
			}
		},
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
		// init(){
		//     const query = uni.createSelectorQuery().in(this);
		//     query.selectAll('#list-container .list').boundingClientRect(data => {
		//         // console.log(data);
		//         this.nodeInfoList = data
		//     }).exec()
		// },
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
	// mounted() {
	//     this.$nextTick(function(){
	//         this.init()
	//     })
	// }
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
		.category {
			display: flex;
		}
		
		.category-left {
			width: 200rpx;
		}
		
		.left-item {
			border-bottom: 2rpx solid #FFFFFF;
			font-size: 28rpx;
			font-weight: bold;
			background-color: #F7F7F7;
		}
		
		.left-name {
			padding: 30rpx 6rpx;
			text-align: center;
		}
		
		.left-name-active {
			border-left: 8rpx solid #49BDFB;
			background-color: #FFFFFF;
		}
		
		.category-right {
			flex: 1;
			padding-left: 30rpx;
		}
		
		.list-title {
			font-weight: bold;
			padding: 30rpx 0;
		
		}
		
		.right-content {
			display: flex;
			flex-wrap: wrap;
		}
		
		.right-item {
			width: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			align-content: center;
			padding: 10rpx;
		}
		
		.right-name {
			padding: 16rpx 0;
		}
		
		.right-img {
			width: 150rpx;
			height: 150rpx;
		}
</style>
