<template>
	<view>
		<swiper class="swiper" vertical :interval="interval" :duration="duration" @animationfinish="animationfinish">
			<swiper-item v-for="(item,index) in videoList">
				<view class="swiper-item uni-bg-red">
		<view class="">
			<video :list="videoList" :id="'myVideo'+index" class="video-box" :src="presentVideo.videoUrl" autoplay :controls="false" :show-center-play-btn="true" :show-play-btn="false"
							:show-fullscreen-btn="false"></video>
		</view>
		</view>
		</swiper-item>
		</swiper>
		
		
		<!-- <view class="button-box">
			<image src="../../../static/icon/向左.png" @click="previousVideo"></image>
			<image src="../../../static/icon/向右.png" @click="nextVidedo"></image>
			<image src="../../../static/icon/studyupload.png" @click="uploadVidedo"></image>
		</view> -->
		
	<view class="demo-act">
			<view class="item">
				<text>显示评论</text>
				<switch :checked="showPop" @change="onShowPopup">
				</switch>
				<image style="width: 60rpx;height: 60rpx;" src="../../../static/icon/studyupload.png" @click="uploadVidedo"></image>
				
			</view>
			<!-- <view class="item">
				<text>点击背景可否关闭(maskClick)</text>
				<switch v-model="maskClick" @change="onMaskClick"/>
			</view> -->
			
			<!-- <button @click="showPopupFrom('bottom')">从底部弹出</button>
			<button @click="showPopupFrom('left')">从左侧弹出</button>
			<button @click="showPopupFrom('right')">从右侧弹出</button>
			<button @click="showPopupFrom('top')">从上方弹出</button> -->
		</view>
		
		<hqs-popup title="向下滑动关闭" :from="popFrom" :mask-click="maskClick"
			v-model="showPop">
				<view>
					<!-- 是评论的大部分呀 -->
					<view class="hb-comment">
						<!-- 阅读数下边那条线-end -->
						<!-- 评论主体-start -->
						<view class="comment-list" v-if="commentData.length != 0">
							<!-- 评论主体-顶部数量及发表评论按钮-start -->
							<view class="comment-num">
								<view>共 {{commentData.length}} 条评论</view>
								<view class="add-btn">
									<button type="primary" size="mini" @click="commentInput">发表评论</button>
								</view>
							</view>
							<!-- 评论主体-顶部数量及发表评论按钮-end -->
							<!-- 评论列表-start -->
							<view class="comment-box" v-for="(item, index) in commentData" :key="index" >
								<view class="comment-box-item">
									<view>
										<image :src="'http://123.256.217.170:8008' || emptyAvatar" mode="aspectFill" class="avatar"></image>
									</view>
									<view class="comment-main">
										<!-- 父评论体-start -->
										<view class="comment-main-top">
											<view class="nick-name-box">
												<view class="comLogo com1" v-if="index == 0">沙发</view>
												<view class="comLogo com2" v-if="index == 1">板凳</view>
												<view class="comLogo com3" v-if="index == 2">地板</view>
												<view class="comLogo com4" v-if="index > 2">{{index + 1}}楼</view>
												<view class="nick-name">{{item.nickName}}</view>
												
											</view>
											<!-- <view class="zan-box" @click="like(item.id)">
												<span :class="item.hasLike ? 'isLike' : 'notLike'">{{item.likeNum == 0 ? '抢首赞' : item.likeNum}}</span>
												<img style="width: 14px; height: 14px;" v-if="!item.hasLike"
													src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAApVJREFUWEfFlz9oFEEUxr93SWEhFkIaBUljo4WgATEaiI0GwVLBQg2EzLd3hSBqLI2lRgWLY+ftSSQgggoWNv5pImLUwjQBg1goqCCIIBqwueSeTLg7Ln9Mcmdub7vdnZnvN9+8fe+toMWXtFgfDQGMjo52zM7OHgMwIyLTg4ODk41upG4A7/0OEbkPYGdFVEQuOOeuNQJRN4CqBvGw+3dm9kZEBsrCPSRf1gvRCIAFETPrjqLodZIkY2Z2SkQmnHMHUgMgOQ8fx3FvJpMZB/CDZEfqACEgi8XidwA/SW5uKkCN2AzJTYscmCTZ1VQA7/2AiNwSkefOuYNBLEmSnJnlATwgebypAKr6CMBRANdJng9i3vu8iORE5Mrc3NyTlQDM7HMul/tYO2bNX0GhUDhRKpXumtlvAPuiKJouOzBuZr117HyBU6sCqOpeAH0AhssiwyQvVwTjOO5va2s7vRaAGtCrJC+GOVUAVb1UTjDVDLd4URHJOuf8WsSWG5MkSbeZTYR3lc+4CpAkyUpWht3fI/m+UfEwL5/Pb2xvb59ZFkBV5zNchazsSBBeYPn/ABQKhZ5SqfQCwBTJXYuPoOkAqnoGwE0Ad0ieTB3Ae39bRPoBDJEcSR1AVd8C2CMifc65p6kCmJkkSfIHwAYAW0h+SxVAVXcDmDSzL1EUbasEc20eaGoQVuoIgMckj6QOoKo3AJwFMEJyqBUAIegOAegnOdYKgK8AtmYyma7aLjqVGPDebxeRDwB+AeggWUzVAVV1ABTAK5L7l+0HVPUTgM7Q7VQGhPJZe99oHagpw4dJPvsXQPixONeoyErzRGTKzB7W9hFLjiA8iOO4M7iw3hDZbLbq6pIeY73F6l1v1Zas3gXrHf8XhhNvMGSmtPYAAAAASUVORK5CYII=" />
												<img style="width: 14px; height: 14px;" v-else
													src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfVJREFUWEfFl79LHEEUx7/vclr4g51TLFQQW9FNDFhFBDvjtcF0gXSp5eYuWJlUAW9NIP9BIFUEOxFtTKF2FrezKFgkkEBS3h4SAtHbJ6vu5W5d1F3cm20WZt+b7+e9mTfzlqD5Ic36SATw+OPJQP2ft+ABJwQ+VFIcJA0kEYBpVfcAehKIMqHoFISVBCI2wOS76mi9g76HxTLwZiqybzcuRGwAc7WWB/NGWIhBu440ZlIHmFitLRPzm+tC9EtJY1gjAP9VMtelEQC2kuJR6gCm5X4BsBAWImDdluJZqgBjH/4MZr3TYzB6IoRWmHnzJgDK0g+1KL4128SqgnD9x432yn5NSfE88L0VYPx9rS/jYR6EJTCPJxQNu60oKV77gw2Ai/Ly1/ZKRElx8c20XL4n0ZZpgvkbAKbl7gCYDax0ALREmjJAo2SbM9A+AKLPqmC8aNkD4bVOMwPEKNlFUdYGkAE9rUhjSxvA2YOOoaPF7t+6AH4qKUauHURt3AObSoq8NgAGyo4UJW0ABH5py9wnbQAAppq76HYfRLXOXmPg4BWdasoA7yuZm47sB0zL9Vvt0TQvI/bqc06pfzsS4KHlWgwUUgKwmWjdKRhvI1q5/0P+T8dZ9jILTjH31X9PlKuNKzppXxDMFeV/a0eUVPSuftoBzgHKR/ohZwAugwAAAABJRU5ErkJggg==" />
											</view> -->
										</view>
										<view class="comment-main-content">
											{{item.content.length > 60 ? item.content.slice(0, 59) : item.content}}
											<span v-if="item.content.length > 60">
												{{item.hasShowMore ? item.content.slice(59) : '...'}}
												<span class="foot-btn" @click="showMore(item.id)">
													{{item.hasShowMore ? '收起' : '展开'}}
												</span>
											</span>
										</view>
										<view class="comment-main-foot">
											<view class="foot-time">{{item.creatTime}}</view>
											<view class="foot-btn" @click="reply(item.nickName,item.nickName,item.id)">回复</view>
											<view class="foot-btn"  @click="confirmDelete(item.id)">删除</view>
										</view>
										<!-- 父评论体-end -->
										<!-- 子评论列表-start -->
										<view class="comment-sub-box">
											<view class="comment-sub-item" v-for="each in item.children">
												<view>
													<image :src="each.avatarUrl || emptyAvatar" mode="aspectFill" class="avatar">
													</image>
												</view>
												<view class="comment-main">
											<!-- 		<view class="sub-comment-main-top">
														<view class="nick-name">{{each.nickName}}</view>
														<view class="zan-box" @click="like(each.id)">
															<span :class="each.hasLike ? 'isLike' : 'notLike'">{{each.likeNum == 0 ? '抢首赞' : each.likeNum}}</span>
															<img style="width: 14px; height: 14px;" v-if="!each.hasLike"
																src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAApVJREFUWEfFlz9oFEEUxr93SWEhFkIaBUljo4WgATEaiI0GwVLBQg2EzLd3hSBqLI2lRgWLY+ftSSQgggoWNv5pImLUwjQBg1goqCCIIBqwueSeTLg7Ln9Mcmdub7vdnZnvN9+8fe+toMWXtFgfDQGMjo52zM7OHgMwIyLTg4ODk41upG4A7/0OEbkPYGdFVEQuOOeuNQJRN4CqBvGw+3dm9kZEBsrCPSRf1gvRCIAFETPrjqLodZIkY2Z2SkQmnHMHUgMgOQ8fx3FvJpMZB/CDZEfqACEgi8XidwA/SW5uKkCN2AzJTYscmCTZ1VQA7/2AiNwSkefOuYNBLEmSnJnlATwgebypAKr6CMBRANdJng9i3vu8iORE5Mrc3NyTlQDM7HMul/tYO2bNX0GhUDhRKpXumtlvAPuiKJouOzBuZr117HyBU6sCqOpeAH0AhssiwyQvVwTjOO5va2s7vRaAGtCrJC+GOVUAVb1UTjDVDLd4URHJOuf8WsSWG5MkSbeZTYR3lc+4CpAkyUpWht3fI/m+UfEwL5/Pb2xvb59ZFkBV5zNchazsSBBeYPn/ABQKhZ5SqfQCwBTJXYuPoOkAqnoGwE0Ad0ieTB3Ae39bRPoBDJEcSR1AVd8C2CMifc65p6kCmJkkSfIHwAYAW0h+SxVAVXcDmDSzL1EUbasEc20eaGoQVuoIgMckj6QOoKo3AJwFMEJyqBUAIegOAegnOdYKgK8AtmYyma7aLjqVGPDebxeRDwB+AeggWUzVAVV1ABTAK5L7l+0HVPUTgM7Q7VQGhPJZe99oHagpw4dJPvsXQPixONeoyErzRGTKzB7W9hFLjiA8iOO4M7iw3hDZbLbq6pIeY73F6l1v1Zas3gXrHf8XhhNvMGSmtPYAAAAASUVORK5CYII=" />
															<img style="width: 14px; height: 14px;" v-else
																src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfVJREFUWEfFl79LHEEUx7/vclr4g51TLFQQW9FNDFhFBDvjtcF0gXSp5eYuWJlUAW9NIP9BIFUEOxFtTKF2FrezKFgkkEBS3h4SAtHbJ6vu5W5d1F3cm20WZt+b7+e9mTfzlqD5Ic36SATw+OPJQP2ft+ABJwQ+VFIcJA0kEYBpVfcAehKIMqHoFISVBCI2wOS76mi9g76HxTLwZiqybzcuRGwAc7WWB/NGWIhBu440ZlIHmFitLRPzm+tC9EtJY1gjAP9VMtelEQC2kuJR6gCm5X4BsBAWImDdluJZqgBjH/4MZr3TYzB6IoRWmHnzJgDK0g+1KL4128SqgnD9x432yn5NSfE88L0VYPx9rS/jYR6EJTCPJxQNu60oKV77gw2Ai/Ly1/ZKRElx8c20XL4n0ZZpgvkbAKbl7gCYDax0ALREmjJAo2SbM9A+AKLPqmC8aNkD4bVOMwPEKNlFUdYGkAE9rUhjSxvA2YOOoaPF7t+6AH4qKUauHURt3AObSoq8NgAGyo4UJW0ABH5py9wnbQAAppq76HYfRLXOXmPg4BWdasoA7yuZm47sB0zL9Vvt0TQvI/bqc06pfzsS4KHlWgwUUgKwmWjdKRhvI1q5/0P+T8dZ9jILTjH31X9PlKuNKzppXxDMFeV/a0eUVPSuftoBzgHKR/ohZwAugwAAAABJRU5ErkJggg==" />
														</view>
													</view> -->
													<!-- <view class="comment-main-content">
														{{each.content.length > 60 ? each.content.slice(0, 59) : each.content}}
														<span v-if="each.content.length > 60">
															{{each.hasShowMore ? each.content.slice(59) : '...'}}
															<span class="foot-btn" @click="showMore(each.id)">
																{{each.hasShowMore ? '收起' : '展开'}}
															</span>
														</span>
													</view> -->
													<view class="comment-main-foot">
														<view class="foot-time">{{item.creatTime}}</view>
														<view class="foot-btn" @click="reply(item.nickName,item.nickName,item.userId)">
															回复</view>
														<view class="foot-btn"  @click="confirmDelete(item.id)">删除
														</view>
													</view>
												</view>
											</view>
										</view>
										<!-- 子评论列表-end -->
									</view>
								</view>
							</view>
							<!-- 评论列表-end -->
						</view>
						<!-- 评论主体-end -->
						<!-- 无评论-start -->
						<view class="comment-none" v-else >
							暂无评论，<span @click="commentInput" style="color: #007AFF;">抢沙发</span>
						</view>
						<!-- 无评论-end -->
						<!-- 新增评论-start -->
						<view class="comment-submit-box" v-if="submit" @click="closeInput">
							<!-- 下边的click.stop.prevent用于让上边的click不传下去，以防点到下边的空白处触发closeInput方法 -->
							<view class="comment-add" @click.stop.prevent="stopPrevent" :style="'bottom:' + KeyboardHeight + 'px'">
								<view class="comment-submit">
									<view class="btn-click cancel" @click="closeInput">取消</view>
									<view>
										<view class="replayTag" v-show="showTag">
											<view>回复在 {{pUser}} 的评论下</view>
											<view @click="tagClose" class="replyTagClose">×</view>
										</view>
									</view>
									<view>
										<view class="btn-click" @click="to_push(videoId)"  >发布</view>
									</view>
								</view>
								<textarea class="textarea" v-model="commentReq.content" :placeholder="placeholder" :adjust-position="false" :show-confirm-bar="false"
									@blur="blur" @focus="focusOn" :focus="focus" maxlength="800"></textarea>
							</view>
						</view>
						<!-- 新增评论-end -->
					</view>
					
				</view>
				<template v-slot:bottom v-if="popFrom == 'top'">
					<view style="padding: 10px; color: #999;">
						从上方弹窗时，如果内容较长，建议使用bottom插槽，可用于上滑关闭操作。
					</view>
				</template>	
			</hqs-popup>
		
	</view>
</template>

<script>
	import $store from '@/store/modules/social';
	export default {
		data() {
			return {
				current: 0,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				isKeep: false, //收藏
				"emptyAvatar": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABF5JREFUWEfFl11oHFUUx//nbmKwxdJ9qFL7YPEhRJC2gljjF60WG0WsoNkWfSnZ7Jy7FVPF0AoKpmBFqyIG3Jk7G1iIQXHbBz+KbbGtRfBbMe2LseKjiVDoiqIhwZ0jV3fb3cnM7kQCuU+7M+ec/+9+nHPPEJZ50DLrY1EApVJp9fz8/BYRuZ2INgDYWJvAWRE5R0RnZmZmPh4ZGZlPOrFEAMVi8e4gCPYSUZ+IXGGFgiCYIaJpKyQi1yql1orIFgAXARxRSvm5XO67diBtAYwxRQCDAE4RUUkpdWxwcNCKLBiu665TSj0kIpqIbgTgMzO3gmgJYIz5CMB9AIaZ+bXGQMVi8RoRuZeI/lZKHc1ms3/U34+Pj6+cnZ3dC+AggGPMfH8cRCyAMUZqThlmPlwPUCgU0qlUyq7Kww1BrbjHzPsahYwx/QDK9hkzR2pFPjTGnAWwIexkjOkRkRIR3Rozo5Miskdr/VMIxE7mHDPXD+2l1wsA6nseBMHmfD7/dSjQOwB2tTlYC/bddd1blFJfARhj5lyjfxNA7bSfitpz3/d3iYgFaDuUUjeHM8AY8zSAV5VS9+RyudP1IE0Axpj3Aaxk5m1hFc/zPiWiO9uq/2dwiJn3h22NMScB/MnMOxYAjI6Orurq6rpgU0hrXYpw/hFAd0KAD5n5wbCt7/t7ROT1ubm5NUNDQ7/b95dWwHXd7Uqp452dnVcPDAxciACwDlclAbAFynGcdRGr2EtEnwdB0JfP5080ARhjDhLRbY7jbI0SMcZUAKxOAgDgN2ZOx8SxGfEiMz/bBOD7/lgQBCu01o/GOH4PYFNCgElmvinK1vf9X2xxchzHVtfLW2CMOQpgipmHYwBeBtBUaOJgRKSgtX48Js63AH5l5geaADzPe1cpddFxnHyM42YAXyZYAXt+epn557iVFJHzWuudYYDnlFJ9juPcESfi+35JRHa3gdjPzIfibIwxNtPe0Fq/EAZ4hIhcZl4T5+y67nql1CcA1kfZENFnrSZQ6ycqItKvtT4SBthIRJMdHR092WzW5nzk8H1/WEReiQHY4TjOB3G+nuf9qyEim7TW9r65fAjL5fKVlUrlPICXmPnNFquwWym1oFBZ+yAItubz+TMtAJ4gon3pdLo7k8nMNgHYP7ZeE5EWkbuYeaYx0NjY2HXValUDeApAV4zIJIADzPxe+H2hULg+lUp9U6sBl3qLprugXC6nKpXKF0R02nGcZ2wQ3/e3ichOEckQ0aoEWQDbsgF4a3p6eqLeH3qeN0FE3el0ujeTyVTrcaKuY1uIjIg8CaCfiLYnEW1hY4WPi8gEgMeY+e1G27iGxHYxtptZynGYmTPhgK1asqWEiBRfcAjDdMaYpYCIFW8LUMuM54nIsb3/YvbDXskiYtuzA6382n4X1CDWAnCSgNSFa98ETakcWbwWMytjzAoAPUEQ3JBKpXrs75r/VLVanVJK/VC7Uf9KGjfRCiQN9n/slh3gHz9i4jC+FVL5AAAAAElFTkSuQmCC",
				commentData: [],
				placeholder: "请输入评论",
				commentReq: {
					parent_comment_id: null, // 评论父id
					content: null // 评论内容
				},
				pUser: null, // 标签-回复人
				showTag: false, // 标签展示与否
				focus: false, // 输入框自动聚焦
				submit: false, // 弹出评论
				KeyboardHeight: 0 ,// 键盘高度
				
				areaShow:false,
				areaTxt:'',
				alist: {},
				commentData:{},
				id: 1,
				commentList:{},
				content:'',
				creatTime:'',
				articleId:1,
				curCommentId:'',
				tmpCommentData:[],
				placeholder:"友善是交流的起点",
				isShowComment:false,
				refresh:"",
				
				videoSources: [],
				presentVideo: {},
				index: 0,
				
				
				showPop: false,
				popFrom: 'bottom',
				list: new Array(20).fill(0),
				maskClick: true,
				videoList:'',
				videoId:1,
			 videoUrl:''
			}
		},  // [0,1,2,3,4,5,6,7,8,9,10,11,12]
		
		 onLoad:function(videoId) {
			 // this.saveVideoId(videoId);
			//  let videoList=1;
			// let  videoId='1';
			// let videoUrl='';
			// this.videoId=e.Id;
			console.log(this.videoId+'1212121212');
			// uni.request({
			// 				url:'http://localhost:8080/videocomment/findList/'+this.videoId,
			// 				method:'GET',
			// 				data: {},
			// 				success: (res) => {
			// 		//console.log(res);	
			// 				//console.log("==================>");
			// 				//console.log(res.data);
			// 				this.commentData=res.data;
			// 	},
			// });
			
			 uni.request({
			 	url: "http://123.56.217.170:8080/video/getVideo",
			 		method: "GET",
				success: (res) => {
					console.log(res.data);
					console.log("--------------------");
					this.videoList = res.data.data.videos;
					console.log(this.videoList);
					console.log("--------------------");
					
					this.videoSources = this.videoList;
					this.setPresentVideo(this.videoList)
				}
			 	})
				this.saveVideoId(this.videoId) ;
				
				 
			// let result = await uni.request({
			// 	url: "http://localhost:8080/video/getVideo",
			// 	method: "GET"
			// })
			// let videoList = result.data.data.videos
			// this.videoSources = videoList
			// this.setPresentVideo(videoList)
		},
		created() {
			this.playVideo();
		},
		methods: {
			playVideo() {
				this.index = (this.index + 1) % this.videoSources.length
				this.presentVideo = this.videoSources[this.index]
				this.saveVideoId(this.presentVideo.videoId)
				// let _this = this;
				// let currentId = 'myVideo' + this.current; // 获取当前视频id
				// this.videoContent = uni.createVideoContext(currentId, _this).play();
				// 获取视频列表
				let trailer = this.videoList;
				trailer.forEach((item, index) => { // 获取json对象并遍历, 停止非当前视频
					if (presentVideo.videoUrl != null && presentVideo.videoUrl!= "") {
						let temp = 'myVideo' + index;
						if (temp != currentId) {
							// 暂停其余视频
							uni.createVideoContext(temp, _this).pause(); //暂停视频播放事件
						}
					}
			
				})
			
			},
			animationfinish(e) {
				this.current = e.detail.current;
				this.playVideo()
			},
			
			to_push(videoId){
				
				this.videoId=videoId;
				console.log('这是当前视频的id'+this.videoId);
				uni.request({
					url:'http://123.56.217.170:8080/videoStudy/getVideo/'+this.videoId,
					method:'GET',
					data: {},
					success: (res) => {
						//console.log(res);
						// console.log(res.data );
						// this.alist=res.data;
					},
				});
			
					uni.request({
						url:'http://localhost:8080/videocomment/insert/',
						method: 'POST',
						data: {
							// creatTime:this.year,
							content:this.commentReq.content.trim(),
							videoId:this.videoId,
							userId:$store.state.loginUserInfo.userId
							// creatTime:this.da.yearTime,
							
						},
						dataType:'json',
						success: (res) => {
							console.log(res.data);
							this.content='';
							
						}
						
					});
				this.closeInput();
				},
				// 回复评论.
				reply(pUser, reUser, parent_comment_id) {
					this.pUser = pUser;
					// this.pUser="王xx",
					// this.reUser="zzz",
					this.commentReq.parent_comment_id = parent_comment_id;
					//console.log(parent_comment_id+'cxcxcxcxcxc');
					console.log(pUser,reUser,parent_comment_id)
					 if (reUser) {
						this.commentReq.content = '@' + reUser + ' ';
					 } else {
					 	//this.commentReq.content = '';
					 }
					this.showTag = true;
					this.commentInput();
				},
			// 没用的方法，但不要删
			stopPrevent() {},
			// 输入框失去焦点
			blur() {
				this.focus = false;
			},
			// 输入框聚焦
			focusOn() {
				// this.$emit('focusOn');
				this.focus=true;
			},
			// 标签关闭
			tagClose() {
				this.showTag = false;
				this.pUser = null;
				this.commentReq.pId = null;
			},
			// 输入评论
			commentInput(e) {
				// TODO 调起键盘方法
				this.submit = true;
				setTimeout(() => {
					this.focus = true;
				}, 50)
			},
			// 关闭输入评论
			closeInput() {
				this.focus = false;
				this.submit = false;
			},
			delete(id){
				
					},
			// 删除评论前确认
			confirmDelete(id) {
				// var that = this;
				console.log(id)
				uni.showModal({
					title: '提示',
					// content: that.deleteTip,
					confirmText: '确认删除',
					success:function(res){
						if(res.confirm){
							uni.request({
									url:'http://123.56.217.170:8080/videocomment/deleteById/'+id,
									method: 'DELETE',
									data: {},
									success: (res) => {
										console.log(res.data);
										this.content='';
									}
								});
						}
						
					}
					});
					},
			
			
			onShowPopup(e) {
						this.showPop = e.detail.value
					},
					onMaskClick(e) {
						this.maskClick = e.detail.value
					},
					showPopupFrom(from) {
						this.popFrom = from
						this.showPop = true
					},
			
			//给定一个视频集合，从视频集合中随机抽取一个视频
			setPresentVideo(videoList) {
				this.videoList=videoList;
				let randomIndex = Math.floor(Math.random() * videoList.length)
				this.presentVideo = videoList[randomIndex]
				this.index = randomIndex;
				this.saveVideoId(this.presentVideo.videoId)
			},
			uploadVidedo(){
				uni.navigateTo({
					url:'/pages/study/stuuploadvideo/stuuploadvideo'
				})
			},
			//下一个视频
			nextVidedo() {
				this.index = (this.index + 1) % this.videoSources.length
				this.presentVideo = this.videoSources[this.index]
				this.saveVideoId(this.presentVideo.videoId)
			},
			//上一个视频
			previousVideo() {
				if (this.index === 0) {
					this.index = this.videoSources.length - 1
				} else {
					this.index--
				}
				this.presentVideo = this.videoSources[this.index]
				this.saveVideoId(this.presentVideo.videoId)
			},
			//跳转到评论页
			skipComment() {
				uni.navigateTo({
					url: "/pages/comment/comment"
				})
			},
			//存储videoId到全局变量
			saveVideoId(videoId) {
				this.videoId=videoId;
				console.log(this.videoId+"这是查找的id");
				getApp().globalData.videoId = videoId
				uni.request({
					url:'http://123.56.217.170:8080/videocomment/findList/'+this.videoId,
								// url:'http://localhost:8080/videocomment/findList/'+this.videoId,
								method:'GET',
								data: {},
								success: (res) => {
								//console.log("==================>");
								console.log(this.videoId)
								console.log(res)
								console.log(res.data+'查出来的对应视频的id的评论');
								console.log("........")
								this.commentData=res.data;
					},
				});
			}
		},
		// async onLoad() {
		// 	let result = await uni.request({
		// 		url: "http://localhost:8080/video/getVideo",
		// 		method: "GET"
		// 	})
		// 	let videoList = result.data.data.videos
		// 	this.videoSources = videoList
		// 	this.setPresentVideo(videoList)
		// }
	}
</script>

<style lang="scss">
	.swiper {
		position: relative;
		width: 100%;
		//去除tabbar高度
		height: calc(100vh - 120rpx);
	
		.swiper-item {
			.info {
				z-index: 1;
				position: absolute;
				bottom: 60upx;
				color: white;
				text-indent: 1em;
				font-size: 30upx;
			}
	
			.audio {
				position: absolute;
				bottom: 20upx;
				z-index: 1;
				text-indent: 1em;
				color: white;
				font-size: 30upx;
				display: flex;
				width: 100%;
				flex-direction: row;
				justify-content: space-between;
				align-items: flex-end;
				@-webkit-keyframes move {
					0% {
						left: 100vw;
					}
	
					100% {
						left: -50vw;
					}
				}
	
				@-moz-keyframes move {
					0% {
						left: 100vw;
					}
	
					100% {
						left: -50vw;
					}
				}
	
				@-ms-keyframes move {
					0% {
						left: 100vw;
					}
	
					100% {
						left: -50vw;
					}
				}
	
				@keyframes move {
					0% {
						left: 100vw;
					}
	
					100% {
						left: -50vw;
					}
				}
				.text-group{
					position: relative;
					width: 50vw;
					height: 40upx;
				
					overflow: hidden;
					.text {
						position: absolute;
						top: 0upx;
						white-space: nowrap;
						/*文本不会换行，文本会在在同一行上继续*/
						-webkit-animation: 10s move infinite;
						-moz-animation: 10s move infinite;
						-ms-animation: 10s move infinite;
						animation: 10s move infinite;
						width: 50vw;
						left: 100vw;
					
					}
				}
				
	
				.icon {
					width: 60upx;
					height: 60upx;
					border-radius: 60upx;
					animation: turn 3s linear infinite;
					margin-right: 5vw;
					border: 10upx solid white;
				}
	
				/* 
				      turn : 定义的动画名称
				      1s : 动画时间
				      linear : 动画以何种运行轨迹完成一个周期
				      infinite :规定动画应该无限次播放
				     */
				@keyframes turn {
					0% {
						-webkit-transform: rotate(0deg);
					}
	
					25% {
						-webkit-transform: rotate(90deg);
					}
	
					50% {
						-webkit-transform: rotate(180deg);
					}
	
					75% {
						-webkit-transform: rotate(270deg);
					}
	
					100% {
						-webkit-transform: rotate(360deg);
					}
				}
			}
	
			.video {
				width: 100%;
				z-index: 0;
				height: calc(100vh - 120rpx);
			}
	
			.buttons {
				display: flex;
				flex-direction: column;
				position: absolute;
				right: 5vw;
				bottom: 12vh;
				color: white;
				text-align: center;
				justify-content: center;
				z-index: 1;
				.header_group{
					margin-bottom: 50upx;
					height: 90upx;
					width: 90upx;
					position: relative;
					.header{
						border: 2px solid white;
						margin: 0 auto;
						border-radius:90upx;
						height: 90upx;
						width: 90upx;
					}
					.add{
						position: absolute;
						bottom: -30upx;
						margin: 0 auto;
						right: 0upx;
						background-color: #f15b6c;
						left: 0upx;
						width: 50upx;
						height: 50upx;
						font-size: 50upx;
						line-height: 50upx;
						border-radius:50upx;
					}
				}
				
				.button {
					text-align: center;
					font-size: 25upx;
	
					.icon {
						margin: 20upx;
						width: 60upx;
					}
				}
			}
	
		}
	
	}
	
	
	
	
	.title{
			margin: auto;
			text-align: center;
			font-size: 30px;
		}
		.author{
			font-size: 15px;
			margin-left: 200px;
		}
		.content{
			font-size: 20px;
			font-family: "宋体";
			line-height: 1.5;
		}
		.seg_line_box {
			display: flex;
			height: 5rpx;
			justify-content: space-between;
			margin: 5rpx 0;
		}
		
		.seg_line {
			width: 45%;
			border-bottom: 10rpx solid #e1e1e1;
		}
		
		.seg_dot {
			width: 8%;
			border-bottom: 10rpx dotted #dbdbdb;
		}
	.hb-comment {
			padding: 10rpx;
		}
	
		.top-read {
			font-size: 28rpx;
			padding-left: 10rpx;
			color: #999999;
		}
	
		.seg_line_box {
			display: flex;
			height: 5rpx;
			justify-content: space-between;
			margin: 5rpx 0;
		}
	
		.seg_line {
			width: 45%;
			border-bottom: 1rpx solid #e1e1e1;
		}
	
		.seg_dot {
			width: 8%;
			border-bottom: 5rpx dotted #dbdbdb;
		}
	
		.comment-num {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 50rpx 0;
			
		}
	
		.comment-box {
			padding: 10rpx 0;
		}
	
		.comment-box-item {
			display: flex;
		}
	
		.comment-main {
			padding-left: 20rpx;
		}
	
		.comment-main-top {
			width: 600rpx;
			padding-top: 6rpx;
			display: flex;
			justify-content: space-between;
		}
	
		.sub-comment-main-top {
			width: 510rpx;
			padding-top: 6rpx;
			display: flex;
			justify-content: space-between;
		}
	
		.avatar {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
		}
	
		.nick-name-box {
			display: flex;
			align-items: center;
		}
	
		.comLogo {
			margin-right: 18rpx;
			font-size: 22rpx;
			border-radius: 10rpx;
			padding: 5rpx 15rpx;
			color: #FFFFFF;
		}
	
		.com1 {
			background-color: #d218b1;
		}
	
		.com2 {
			background-color: #f19c0b;
		}
	
		.com3 {
			background-color: #c8da85;
		}
	
		.com4 {
			background-color: #bfd0da;
		}
	
		.nick-name {
			color: #2d8cf0;
		}
	
		.isLike {
			font-size: 28rpx;
			padding-right: 10rpx;
			color: #2d8cf0;
		}
	
		.notLike {
			font-size: 28rpx;
			padding-right: 10rpx;
			color: #999999;
		}
	
		.comment-main-content {
			padding: 10rpx 10rpx 10rpx 0;
		}
	
		.comment-main-foot {
			display: flex;
			font-size: 22rpx;
		}
	
		.replayTag {
			color: #909399;
			margin-bottom: 5px;
			border: 1px solid #c8c9cc;
			background-color: #f4f4f5;
			border-radius: 3px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 16rpx;
			padding: 5px 10px;
		}
	
		.replyTagClose {
			font-size: 20px;
			line-height: 12px;
			padding: 0 0 2px 5px;
		}
	
		.foot-btn {
			padding-left: 10rpx;
			color: #007AFF;
		}
	
		.comment-sub-box {
			padding: 20rpx 0;
		}
	
		.comment-sub-item {
			display: flex;
		}
	
		.comment-none {
			padding: 20rpx;
			width: 100%;
			text-align: center;
			color: #999999;
		}
	
		.comment-submit-box {
			position: fixed;
			display: flex;
			align-items: flex-end;
			z-index: 9900;
			left: 0;
			top: var(--window-top);
			bottom: 0;
			background-color: rgba($color: #000000, $alpha: 0.5);
			width: 100%;
		}
	
		.comment-add {
			position: fixed;
			background-color: #FFFFFF;
			width: 100%;
			padding: 5rpx;
			border: 1px solid #ddd;
			transition: .3s;
			-webkit-transition: .3s;
		}
	
		.btn-click {
			color: #007AFF;
			font-size: 28rpx;
			padding: 10rpx;
		}
	
		.cancel {
			color: #606266;
		}
	
		.textarea {
			height: 100px;
			padding: 16rpx;
			width: 100%;
		}
	
		.comment-submit {
			padding: 5rpx 20rpx 0 20rpx;
			border-bottom: 1px dashed #ddd;
			width: calc(100% - 40rpx);
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	
	
.list-item {
	padding: 15px;
	border-bottom: 1px solid #eee;
}
.demo-act {
	padding: 15px;
	button {
		margin-top: 15px;
	}
	.item {
		margin-top: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		switch {
			
		}
	}
}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 950rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.video-box {
		width: 100%;
		height: 1350rpx;
	}

	.button-box {
		width: 100%;
		height: 150rpx;
		margin-top: 6rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.button-box image {
		width: 15%;
		height: 125rpx;
		margin: 0 15px;
	}
	
	.title{
			margin: auto;
			text-align: center;
			font-size: 30px;
		}
		.author{
			font-size: 15px;
			margin-left: 200px;
		}
		.content{
			font-size: 20px;
			font-family: "宋体";
			line-height: 1.5;
		}
		.seg_line_box {
			display: flex;
			height: 5rpx;
			justify-content: space-between;
			margin: 5rpx 0;
		}
		
		.seg_line {
			width: 45%;
			border-bottom: 10rpx solid #e1e1e1;
		}
		
		.seg_dot {
			width: 8%;
			border-bottom: 10rpx dotted #dbdbdb;
		}
	.hb-comment {
			padding: 10rpx;
		}
	
		.top-read {
			font-size: 28rpx;
			padding-left: 10rpx;
			color: #999999;
		}
	
		.seg_line_box {
			display: flex;
			height: 5rpx;
			justify-content: space-between;
			margin: 5rpx 0;
		}
	
		.seg_line {
			width: 45%;
			border-bottom: 1rpx solid #e1e1e1;
		}
	
		.seg_dot {
			width: 8%;
			border-bottom: 5rpx dotted #dbdbdb;
		}
	
		.comment-num {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 50rpx 0;
			
		}
	
		.comment-box {
			padding: 10rpx 0;
		}
	
		.comment-box-item {
			display: flex;
		}
	
		.comment-main {
			padding-left: 20rpx;
		}
	
		.comment-main-top {
			width: 600rpx;
			padding-top: 6rpx;
			display: flex;
			justify-content: space-between;
		}
	
		.sub-comment-main-top {
			width: 510rpx;
			padding-top: 6rpx;
			display: flex;
			justify-content: space-between;
		}
	
		.avatar {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
		}
	
		.nick-name-box {
			display: flex;
			align-items: center;
		}
	
		.comLogo {
			margin-right: 18rpx;
			font-size: 22rpx;
			border-radius: 10rpx;
			padding: 5rpx 15rpx;
			color: #FFFFFF;
		}
	
		.com1 {
			background-color: #d218b1;
		}
	
		.com2 {
			background-color: #f19c0b;
		}
	
		.com3 {
			background-color: #c8da85;
		}
	
		.com4 {
			background-color: #bfd0da;
		}
	
		.nick-name {
			color: #2d8cf0;
		}
	
		.isLike {
			font-size: 28rpx;
			padding-right: 10rpx;
			color: #2d8cf0;
		}
	
		.notLike {
			font-size: 28rpx;
			padding-right: 10rpx;
			color: #999999;
		}
	
		.comment-main-content {
			padding: 10rpx 10rpx 10rpx 0;
		}
	
		.comment-main-foot {
			display: flex;
			font-size: 22rpx;
		}
	
		.replayTag {
			color: #909399;
			margin-bottom: 5px;
			border: 1px solid #c8c9cc;
			background-color: #f4f4f5;
			border-radius: 3px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 16rpx;
			padding: 5px 10px;
		}
	
		.replyTagClose {
			font-size: 20px;
			line-height: 12px;
			padding: 0 0 2px 5px;
		}
	
		.foot-btn {
			padding-left: 10rpx;
			color: #007AFF;
		}
	
		.comment-sub-box {
			padding: 20rpx 0;
		}
	
		.comment-sub-item {
			display: flex;
		}
	
		.comment-none {
			padding: 20rpx;
			width: 100%;
			text-align: center;
			color: #999999;
		}
	
		.comment-submit-box {
			position: fixed;
			display: flex;
			align-items: flex-end;
			z-index: 9900;
			left: 0;
			top: var(--window-top);
			bottom: 0;
			background-color: rgba($color: #000000, $alpha: 0.5);
			width: 100%;
		}
	
		.comment-add {
			position: fixed;
			background-color: #FFFFFF;
			width: 100%;
			padding: 5rpx;
			border: 1px solid #ddd;
			transition: .3s;
			-webkit-transition: .3s;
		}
	
		.btn-click {
			color: #007AFF;
			font-size: 28rpx;
			padding: 10rpx;
		}
	
		.cancel {
			color: #606266;
		}
	
		.textarea {
			height: 100px;
			padding: 16rpx;
			width: 100%;
		}
	
		.comment-submit {
			padding: 5rpx 20rpx 0 20rpx;
			border-bottom: 1px dashed #ddd;
			width: calc(100% - 40rpx);
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	
</style>
