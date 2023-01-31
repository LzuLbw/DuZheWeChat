<template>
	<view class="page-fill" >
		<view class="book-wrap" v-for="(item,index) in bookData" :key="index">
			<view  class="book-item"  >
				<image class="book-img" v-if="item.img" :src="item.img"></image>
				<!-- <himg  class="book-img" :src="item.img" v-if="item.img" errorSrc="https://images-cdn.shimo.im/H4AX9SIW6W4xGH0M/noimg.jpg__thumbnail"></himg> -->
				<view class="book-info" >
					<view class="book-title">标题：{{item.name}}</view>
					<!-- <view class="book-desp">分类：{{item.classify}}</view> -->
					<!-- <view class="book-desp">状态：{{bookData.fstatus}}</view> -->
					<view class="book-desp">作者：{{item.author}}</view>
					<!-- <view class="book-desp">字数：{{bookData.wordNumber}}</view> -->
				</view>
			</view>

			<view class="line-wrap"><view class="line"></view></view>

			<!-- 简介 -->
			<view class="book-other" >
				<view class="text-title">书籍简介</view>
				<text class="bookdesc" space="nbsp" >
					{{item.description}}</text>
				
			</view>
			<view class="line-wrap"><view class="line"></view></view>
			<!-- 最新章节 -->
			<!-- <view class="book-other">
				<view class="text-title">最新章节</view>
				<view class="bookdesc redtext">
					{{newchapter}} 
				</view>
			</view> -->
			<view class="line-wrap"><view class="line"></view></view>
			<!-- 目录 -->
			<view class="book-other" v-if="clist.length>0">
				<view class="text-title">书籍目录</view>
				
				<scroll-view scroll-y="true" class="scroll-Y">
					<view v-for="(item,index ) in clist" :key="index">
					<view class="scroll-view-item" @tap="gotoreadChapter(item)">
						<view class="item-text">{{item.chapterTitle}}</view>
						<!-- <image src="../../static/img/you.png" class="you"></image> -->
					</view>
					<view class="line-wrap"><view class="line"></view></view>
					 </view> 
				</scroll-view>
			</view>
			<!-- <uni-loading  :status="status" :contentText="contentText" v-else></uni-loading> -->
			
			<!-- 底部固定的按钮 -->
			<view class="btn-wrap">
				<button class="joinshelf" @click="addshell(item.id)">加入书架</button>
				<button class="startread" @click="gotoread(item.id)">开始阅读</button>
				<button class="styyyy" @tap="gotooo(item.id)">我的书架</button>
				
			</view>
			
		</view>
		
	</view>
</template>

<script>
export default {

	data() {
		return {
			bookData:{},
			clist:[],
			fictionid:'',
			newchapter:'',
			indexurl:'',
			userId:'',
			status:'loading',
			contentText: {
				contentdown: '查看更多',
				contentrefresh: '正在读取书籍目录...',
				contentnomore: '目录加载失败...'
			}
		};
	},
	onLoad(e) {
		console.log(getApp().globalData.uid);
		console.log(getApp().globalData.name);
		this.show(e);
		let fid = e.fictionid;
		this.fictionid = fid;
		uni.setNavigationBarTitle({
			title:e.title
		});
		if(!(fid == undefined)){
				this.getOneBook(fid);
		}
	
	},
	methods: {
		gotooo(id){
			this.id=id;
			console.log(this.id+'qqqqqqq');
			// uni.switchTab({
			// 	url:'/pages/study/articleshell/articleshell?id='+this.id,
			// });
			uni.navigateTo({
				url:'/pages/study/articleshell/articleshell?id='+this.id,
			});
			uni.request({
				url:'http://localhost:8080/shell/all/',
				method:'GET',
				data: {},
				success: (res) => {
					//console.log(res);
					console.log(res.data );
					this.booklist=res.data;
				},
			});
		},
		show(e){
				console.log(e);
				this.id=e.id;
				uni.request({
						url:'http://localhost:8080/book/findById/'+this.id,
						method:'GET',
						data: {},
						success: (res) => {
				//console.log(res);
						console.log(res.data );
						this.bookData=res.data;
			},
		});
		},
		addshell(id){
			this.id=id;
			console.log(id+"书本id");
			uni.request({
				
				url:'http://localhost:8080/shell/insert/',
				method: 'POST',
				data: {
					bookId:this.id,
					userId:getApp().globalData.uid,
				},
				// console.log(getApp().globalData.uid);
				// console.log(getApp().globalData.name);
				dataType:'json',
				success: (res) => {
					console.log(res.data);
					console.log("成功");
				}
			});
			uni.showModal({
				content:'成功加入书架',
				showCancel:false,
				success:function(res){
					if(res.confirm){
						console.log("成功加入");
					}else if(res.cancel){
						console.log("没有加入");
					}
					
				}
			})
			// uni.switchTab({
			// 	url:'/pages/articleshell/articleshell?id='+id,
			// 	success: (res) => {
			// 		console.log("成功");
					
			// 	}
			// })
		// 	uni.request({
		// 		url:'http://localhost:8080/shell/insert/'+id,
		// 		method: 'POST',
		// 		data: {
		// 			bookId:this.id,
		// 		},
		// 		success: (res) => {
		// 			console.log("成功加入")
					
		// 		}
		// })
		},
		gotoreadChapter(e){
			
			uni.navigateTo({
				url:'../readbook/readbook?fictionid='+this.fictionid+'&chapter_url='+e.chapterUrl+'&indexurl='+this.indexurl+"&corder="+e.corder
			})
			
		},
		//获取缓存书籍的章节
		getcachebookcorder(){
			var me =this;
			var order = 1;
			var cachemap = uni.getStorageSync("cachebookchapter");
			if(cachemap == "" || cachemap == null || cachemap==undefined){
				cachemap=[];
			}
			if(cachemap.length == 0)return order;
			for(let i=0; i<cachemap.length;i++){
				if(cachemap[i].key == me.fictionid){
					order = cachemap[i].value;
					break;
				}
			}
			return order;
			
		},
		//加入书架的操作
		joinshelf(){
			var me = this;
			var mysjbook =  uni.getStorageSync("mybooklist");
			 
			if(mysjbook == null || mysjbook =="" || mysjbook == undefined){
				mysjbook = [];
				mysjbook.push(me.bookData);
				
				uni.setStorageSync("mybooklist",mysjbook);
				uni.showToast({
					title:'加入成功！'
				});	
				return;
			}
			var fid = me.bookData.id;
			var isexist = false;
			//判断是否添加过
			for(let i = 0;i<mysjbook.length;i++){
				let cid = mysjbook[i].id;
				if(fid == cid){
					isexist = true;
					uni.showToast({
						title:'本书已在书架中！'
					});	
					return;
				}
			}
			if(!isexist){
				mysjbook.push(me.bookData);
				uni.showToast({
					title:'添加成功！'
				});	
			}
			uni.setStorageSync("mybooklist",mysjbook);
			console.log(mysjbook);
		},
		gotoread(id){
			console.log(id+'..............');
			// var me =this;
			// if(me.clist.length==0)return; // 等于0说明正在加载，正在加载不能加入书架。 
			uni.navigateTo({
				// url:'/pages/readbook/reada?id='+this.id,
				url:'/pages/study/readddd/readddd?id='+this.id,
				success: (res) => {
					console.log("打开成功");
				}
			})
			// let ccorder = this.getcachebookcorder();
			// //console.log("缓存的章节=="+ccorder);
			// if(ccorder!=1){
			// 	let itemindex = ccorder-1;
			// 	let curl = this.clist[itemindex].chapterUrl;
			// 	uni.navigateTo({
			// 		url:'../read/read?fictionid='+me.fictionid+'&chapter_url='+curl+'&indexurl='+this.indexurl+"&corder="+itemindex
			// 	})
			// }else{
			// 	uni.navigateTo({
			// 		url:'../read/read?fictionid='+me.fictionid+'&chapter_url='+me.clist[0].chapterUrl+'&indexurl='+me.indexurl+"&corder=1"
			// 	})
			// }
			
		},
		getOneBook(fictionid){
			var me = this;
			var url = me.websiteUrl + "getbookinfo";
			
			me.webhttp(url,{fictionid}).then(res=>{
				 
				if(res.code == 200){
					me.bookData = res.bookData;
					console.info(me.bookData);
					me.indexurl =  me.bookData.fictionUrl
					me.getBookChapter(me.indexurl);
				}
			});
		},
		//获取书籍的章节列表，如果获取完成缓存下来，要不然真的很伤
		getBookChapter(indexurl){
			var me = this;
			var url = me.websiteUrl + 'getchapterlist';
			 
			me.webhttp(url,{indexurl}).then(res=>{
			 
				if(res.code == 200){
					if(me.clist.length == 0){
						me.status = "nomore";
					}
					me.clist = res.chapterlist;
					let cleng = me.clist.length-1;
					me.newchapter = me.clist[cleng].chapterTitle;
				}
			});
		}
	}
};
</script>

<style>
@import url('bookdetail.css');
</style>