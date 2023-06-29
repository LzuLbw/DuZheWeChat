<template>
	<view>
		<video id="myVideo" class="myVideo" :src="videoSrc" v-show="isPlayVideo" :show-fullscreen-btn="showFullscreenBtn" :direction="videoDirection" :show-play-btn="showPlayBtn" @pause="videoPause" @fullscreenchange="viderFullscreen">
			<cover-image class="stopPlayVideoBtn" @click="stopPlayVideo" src="/static/img/close.png"></cover-image>
		</video>
		<view class="content">
			
			<view class="label">
				<view v-for="(label,index) in labelList" :class="{'on':index==labelIndex}" @tap="loadRatings(index)" :key="label.type">
					{{label.name}}({{label.number}})
				</view>
			</view>
			<view class="list">
				<view class="row" v-for="(row,Rindex) in ratingsList" :key="Rindex">
					<view class="left">
						<view class="face">
							<image :src="row.face"></image>
						</view>
					</view>
					<view class="right">
						<view class="name-date">
							<view class="username">
								{{row.username}}
							</view>
							<view class="date">
								{{row.date}}
							</view>
						</view>
						<view class="first">
							<view class="rat">
								{{row.content}}
							</view>
							<view class="img-video">
								<view class="box" v-for="item in row.video" @tap="playVideo(item.path)" :key="item.path">
									<image mode="aspectFill" :src="item.img"></image>
									<view class="playbtn">
										<view class="icon bofang"></view>
									</view>
								</view>
								<view class="box" v-for="item in row.img" @tap="showBigImg(item,row.img)" :key="item">
									<image mode="aspectFill" :src="item"></image>
								</view>
							</view>
						</view>
	
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import $http from "@/common/api/request.js"
	export default {
		data() {
			return {
				goodsId:0,
				labelList:[
					{name:'全部',number:3,type:'all'},
					{name:'好评',number:1,type:'good'},
					{name:'中评',number:0,type:'secondary'},
					{name:'差评',number:2,type:'poor'},
					{name:'有图',number:3,type:'img'},
					{name:'视频',number:2,type:'video'},
				],
				labelIndex:0,
				// ratingsList:[
				// 	{id:1,username:"柳博望",face:"/static/img/face.jpg",date:'2023-05-12',spec:"规格: 1本",grade:"good",
				// 		first:{content:"文字清晰，印刷清楚，好评",
				// 		img:["https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/a897eb84-d742-464f-8524-6648c162d0dcsanti_detail1.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/5f3c36b6-d606-4372-8a0b-00732cc4335dsanti_detail2.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/0e651dd3-3ba5-40da-a65d-4a3e2b5f3330santi_detail3.jpg"],
				// 		video:[{img:"https://ae01.alicdn.com/kf/HTB1AMEBTcfpK1RjSZFOq6y6nFXaK.jpg",path:"https://mp4.vjshi.com/2018-12-28/1083f3db90334f86e3fc3586b4472914.mp4"}]
				// 		},
				// 		append:{date:65,content:"用了一段时间，体验很好，推荐购买",
				// 		img:["https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/a897eb84-d742-464f-8524-6648c162d0dcsanti_detail1.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/5f3c36b6-d606-4372-8a0b-00732cc4335dsanti_detail2.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/0e651dd3-3ba5-40da-a65d-4a3e2b5f3330santi_detail3.jpg"],
				// 		video:[{img:"https://ae01.alicdn.com/kf/HTB1AMEBTcfpK1RjSZFOq6y6nFXaK.jpg",path:"https://mp4.vjshi.com/2017-06-17/ed1d63669bea39f5ef078c4e194291d6.mp4"}]
				// 		}
				// 	},
				// 	{id:2,username:"柳博望",face:"/static/img/face.jpg",date:'2023-05-10',spec:"规格: 2本",grade:"secondary",
				// 		first:{content:"好评，看图",
				// 		img:["https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/a897eb84-d742-464f-8524-6648c162d0dcsanti_detail1.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/5f3c36b6-d606-4372-8a0b-00732cc4335dsanti_detail2.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/0e651dd3-3ba5-40da-a65d-4a3e2b5f3330santi_detail3.jpg"],
				// 		video:[]
				// 		}
				// 	},
				// 	{id:3,username:"柳博望",face:"/static/img/face.jpg",date:'2023-05-09',spec:"规格: 2本",grade:"poor",
				// 		first:{content:"好评，看图",
				// 		img:["https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/a897eb84-d742-464f-8524-6648c162d0dcsanti_detail1.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/5f3c36b6-d606-4372-8a0b-00732cc4335dsanti_detail2.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/0e651dd3-3ba5-40da-a65d-4a3e2b5f3330santi_detail3.jpg"],
				// 		video:[]
				// 		}
				// 	},
				// 	{id:3,username:"柳博望",face:"/static/img/face.jpg",date:'2023-05-01',spec:"规格: 2本",grade:"secondary",
				// 		first:{content:"系统默认好评",
				// 		img:[],
				// 		video:[]
				// 		}
				// 	}
				// ],
				ratingsList:[
					{id:1,
					username:"LBW",
					face:"/static/images/profile.jpg",
					date:'2023-06-01',
					grade:"good",
					content:"质量不错",
					img:["https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/8f487d92-ab76-4678-895e-c460f9cb6e031685082286606_mmexport1685081552078.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/7bb17e29-f410-4142-821d-8c52833f31041685082286943_mmexport1685081498081.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/24e1ec9f-c723-4709-a398-b44af4b790791685082286870_mmexport1685081503058.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/ef2155d2-5ffe-4f47-a3b5-8543cbe39b001685082286780_mmexport1685081504587.jpg"],
					video:[]
					},
					{id:1,
					username:"匿名",
					face:"/static/image/hua.png",
					date:'2023-06-02',
					grade:"good",
					content:"很差劲，印刷不清楚",
					img:["https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/b67a0397-73f3-456e-bf4f-df3c4db9c2311685683204864_mmexport1685081506100.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/84ed4635-48dd-47aa-a880-f7c4e9a764921685683204992_mmexport1685081503058.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/e3ae4cbe-9569-4ca8-9934-0e9fcbc389b91685683205880_mmexport1685081498081.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/1da9c67b-71c8-482d-8100-612c7de936aa1685683205063_mmexport1685081500568.png"],
					video:[{img:"/static/image/shop/ratings/cover.jpg",path:"https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/bcbcb18d-198c-46b2-b2e0-f146ade83cc11685082294479.mp4"}]
					},
					{id:1,
					username:"匿名",
					face:"/static/image/hua.png",
					date:'2023-06-09',
					grade:"good",
					content:"很差劲",
					img:["https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/84ed4635-48dd-47aa-a880-f7c4e9a764921685683204992_mmexport1685081503058.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/e3ae4cbe-9569-4ca8-9934-0e9fcbc389b91685683205880_mmexport1685081498081.jpg","https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/1da9c67b-71c8-482d-8100-612c7de936aa1685683205063_mmexport1685081500568.png"],
					video:[{img:"/static/image/shop/ratings/cover.jpg",path:"https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/bcbcb18d-198c-46b2-b2e0-f146ade83cc11685082294479.mp4"}]
					},
				],
				ratingsImagesList:[],
				videoDirection:0,
				showFullscreenBtn:true,
				showPlayBtn:true,
				isPlayVideo:true,
				videoSrc:''

			};
		},
		onReady: function (res) {
			this.videoContext = uni.createVideoContext('myVideo')
		},
		onLoad(e) {
			console.log(e);
			this.goodsId = e.goodsId;
			this.showGoodsComment(this.goodsId);
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			uni.showToast({ title: '触发上拉加载' });
		},
		methods: {
			loadRatings(index){
				this.labelIndex = index;
				uni.showToast({
					title:"切换评论列表"
				})
				//实际应用中，请求对应类型的评论列表，覆盖this.ratingsList
				/*
				let type = this.labelList[index].type; // 评论类型
				......
				*/
			},
			playVideo(path) {
				this.videoSrc = path;
				// this.isPlayVideo = true;
				this.$nextTick(function() {
					this.videoContext.requestFullScreen({direction:0});
				});
				
			},
			stopPlayVideo(){
				this.videoContext.pause();
			},
			videoPause(){
				// this.isPlayVideo = false;
				this.videoSrc = '';
			}, 
			viderFullscreen(e){
				if(e.detail.fullScreen){
					this.videoContext.play();
				}else{
					this.stopPlayVideo();
				}
			},
			showBigImg(src,srclist){
				uni.previewImage({
					current:src,
					urls: srclist
				});
			},
			showGoodsComment(goodsId){
				$http.request({
					url: "/shop/selectGoodsComment",
					method: "POST",
					data:{
						goodsId:goodsId
					}
				}).then((res) => {
					console.log(res);
					// this.ratingsList = res;
					// this.ratingsList.forEach(v=>{
					// 	this.ratingsImagesList.push(v.imgUrl1);
					// 	this.ratingsImagesList.push(v.imgUrl2);
					// 	this.ratingsImagesList.push(v.imgUrl3);
					// 	this.ratingsImagesList.push(v.imgUrl4);
					// 	this.ratingsImagesList.push(v.imgUrl5);
					// })
					// console.log(this.ratingsImagesList);
					// for(i=0;i<this.ratingsList;i++){
					// 	let ratingsImagesList =[];
					// 	ratingsImagesList.push(this.ratingsList[i].imgUrl1);
					// 	ratingsImagesList.push(this.ratingsList[i].imgUrl2);
					// 	ratingsImagesList.push(this.ratingsList[i].imgUrl3);
					// 	ratingsImagesList.push(this.ratingsList[i].imgUrl4);
					// 	ratingsImagesList.push(this.ratingsList[i].imgUrl5);
					// 	this.ratingsList[i].push(ratingsImagesList);
					// }
					//console.log(this.ratingsList);
				}).catch(() => {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}

.myVideo{
	position: fixed;
	top: 50%;
	right: 100%;
}
.content{
	view{
		display: flex;
	}
	width: 94%;
	padding: 0 3%;
	
	.label{
		width: 100%;
		flex-wrap:wrap;
		view{
			padding: 0 20upx;
			height: 50upx;
			border-radius: 40upx;
			border:solid 1upx #ddd;
			align-items: center;
			color: #555;
			font-size: 26upx;
			background-color: #f9f9f9;
			margin: 10upx 20upx 10upx 0;
			&.on{
				border:solid 1upx #f06c7a;
				color: #f06c7a;
			}
		}
	}
	.list{
		width: 100%;
		flex-wrap: wrap;
		padding: 20upx 0;
		.row{
			width: 100%;
			margin-top: 30upx;
			.left{
				width: 10vw;
				flex-shrink: 0;
				margin-right: 10upx;
				.face{
					width: 100%;
					image{
						width: 10vw;
						height: 10vw;
						border-radius: 100%;
					}
					
				}
			}
			.right{
				width: 100%;
				flex-wrap: wrap;
				.name-date{
					width: 100%;
					justify-content: space-between;
					align-items: baseline;
					.username{
						font-size: 32upx;
						color: #555;
					}
					.date{
						font-size:28upx;
						color: #aaa;
					}
				}
				.spec{
					width: 100%;
					color: #aaa;
					font-size: 26upx;
				}
				.first{
					width: 100%;
					flex-wrap: wrap;
					.rat{
						font-size: 30upx;
					}
					.img-video{
						width: 100%;
						flex-wrap: wrap;
						.box{
							width: calc((84.6vw - 50upx)/4);
							height: calc((84.6vw - 50upx)/4);
							margin: 5upx 5upx;
							position: relative;
							justify-content: center;
							align-items: center;
							image{
								position: absolute;
								width: 100%;
								height: 100%;
								border-radius: 10upx;
							}
							.playbtn{
								position: absolute;
								.icon{
									font-size: 80upx;
									color: rgba(255,255,255,.9)
								}
							}
						}
					}
				}
				
				.append{
					width: 100%;
					flex-wrap: wrap;
					.date{
						width: 100%;
						height: 40upx;
						border-left: 10upx solid #f06c7a;
						padding-left: 10upx;
						align-items: center;
						font-size: 32upx;
						margin: 20upx 0;
					}
					.rat{
						font-size: 30upx;
					}
					.img-video{
						width: 100%;
						flex-wrap: wrap;
						.box{
							width: calc((84.6vw - 10upx - (10upx * 4))/4);
							height: calc((84.6vw - 10upx - (10upx * 4))/4);
							margin: 5upx 5upx;
							position: relative;
							justify-content: center;
							align-items: center;
							image{
								position: absolute;
								width: 100%;
								height: 100%;
								border-radius: 10upx;
							}
							.playbtn{
								position: absolute;
								.icon{
									font-size: 80upx;
									color: rgba(255,255,255,.9);
								}
							}
						}
					}
				}
			}
		}
	}
}
/*
* <view class="list">
				<view class="row">

					<view class="right">
						
						<view class="spec">
							规格：XL
						</view>
						<view class="first">
							<view class="rat">
								好看，可以，不愧是专业的，才拿到手上就研究了半天才装上
							</view>
							<view class="img-video">
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
									<view class="playbtn">
										<view class="icon bofang"></view>
									</view>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
							</view>
						</view>
						<view class="append">
							<view class="date">
								65天后追加
							</view>
							<view class="rat">
								好看，可以，不愧是专业的，才拿到手上就研究了半天才装上
							</view>
							<view class="img-video">
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			* 
			* */
</style>
