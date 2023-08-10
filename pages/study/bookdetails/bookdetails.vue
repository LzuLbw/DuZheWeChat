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
			<!-- 阅读数下边那条线-start -->
			<view class="seg_line_box">
				<view class="seg_line"></view>
				<view class="seg_dot"></view>
				<view class="seg_line"></view>
			</view>
			
			<view>
			<view style="color: black; margin-top: 0%;font-size: 20px">当前评分：{{sum()}}</view>
			  <view class="flex" style="margin:200rpx;">
			    <block v-for="(item,index) in scoreArray" :key='index' ><!-- 遍历评分列表 -->
			      <!-- 设置触摸事件和点击事件为同一个方法,否则点击却不滑动的话,不触发事件 -->
			      <view class='starLen' @touchmove='changeScore'  @tap='changeScore' >
			        <!-- 使用三目运算符来动态变化显示的是哪张图片,score是js中的分数,index是scoreArray的下标 -->
			        <!-- src部分可以这样写 src="{{score>index?'../../images/fullStar.png':'../../images/nullStar.png'}}"  ，这样可以在js文件把fullStarUrl和nullStarUrl去掉 -->
			        <image class='star' mode="aspectFill" :src="score>index?fullStarUrl:nullStarUrl" style="width: 60rpx; height: 60rpx;"/>    
			      </view>
				  <!-- src="{{score>index?'../../../static/icon/fullstar.png':'../../../static/icon/notfullstar.png'}}" -->
			    </block>
				<!-- 显示当前评分 -->
			    <!-- <view class='scoreContent' style="color: black;">当前评分：{{sum()}}</view><!-- 显示当前评分 --> 
			  </view>
			 </view>
			 
			 <!-- 是评论的大部分呀 -->
			 <view class="hb-comment">
			 
			 	<!-- 阅读数-end -->
			 	<!-- 阅读数下边那条线-start -->
			 	<!-- <view class="seg_line_box">
			 		<view class="seg_line"></view>
			 		<view class="seg_dot"></view>
			 		<view class="seg_line"></view>
			 	</view> -->
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
			 					<image :src="'http://123.56.217.170:8080'+item.avatar|| emptyAvatar" mode="aspectFill" class="avatar"></image>
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
			 								<view class="comment-main-content">
			 									{{each.content.length > 60 ? each.content.slice(0, 59) : each.content}}
			 									<span v-if="each.content.length > 60">
			 										{{each.hasShowMore ? each.content.slice(59) : '...'}}
			 										<span class="foot-btn" @click="showMore(each.id)">
			 											{{each.hasShowMore ? '收起' : '展开'}}
			 										</span>
			 									</span>
			 								</view>
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
			 					<view class="btn-click" @click="to_push"  >发布</view>
			 				</view>
			 			</view>
			 			<textarea class="textarea" v-model="commentReq.content" :placeholder="placeholder" :adjust-position="false" :show-confirm-bar="false"
			 				@blur="blur" @focus="focusOn" :focus="focus" maxlength="800"></textarea>
			 		</view>
			 	</view>
			 	<!-- 新增评论-end -->
			 </view>
			 
			<view class="btn-wrap">
				<button class="joinshelf" @click="addshell(item.id)">加入书架</button>
				<button class="startread" @click="gotoread(item.id)">开始阅读</button>
				<button class="styyyy" @tap="gotooo(item.id)">我的书架</button>
				<button class="" @tap="gotonote(item.id)">笔记</button>
				
				
			</view>
			
		</view>
		
		
		
		
	</view>
</template>

<script>
	import $store from '@/store/modules/social';
	
export default {

	data() {
		return {
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
			bookId:1,
			curCommentId:'',
			tmpCommentData:[],
			placeholder:"友善是交流的起点",
			isShowComment:false,
			refresh:"",
			
			
			fullStarUrl: '../../../static/icon/fullstar.png', //满星图片
			        nullStarUrl: '../../../static/icon/notfullstar.png', //空星图片
			        score: 0, //评价分数
			        scoreArray: [1, 2, 3, 4, 5], //分为1-5个评分层次
			        scoreText: ['1星', '2星', '3星', '4星', '5星'], //评分列表
			        scoreContent: '' ,//文字显示评分情况
				scoreList:{},
				bookData:{},
				score:'',
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
	onLoad:function(e){
		this.id=e.id;
		uni.request({
						url:'http://localhost:8080/bookcomment/findList/'+this.id,
						method:'GET',
						data: {},
						success: (res) => {
				//console.log(res);	
						//console.log("==================>");
						//console.log(res.data);
						this.commentData=res.data;
			},
		});
		
		this.allscore();
		this.sum();
		console.log(getApp())
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
	
	// onLoad(e) {
	// 	//this.sum();
	// 	this.allscore();
	// 	console.log('+++++++++++++++++++++++++++');
	// 	console.log(getApp())
	// 	this.show(e);
	// 	let fid = e.fictionid;
	// 	this.fictionid = fid;
	// 	uni.setNavigationBarTitle({
	// 		title:e.title
	// 	});
	// 	if(!(fid == undefined)){
	// 			this.getOneBook(fid);
	// 	}
	
	// },
	methods: {
		TextScsnn(){
			if(this.commentReq.content){
							     uni.request({
							      url:'http://localhost:8080/scanText',
							      method:'POST',
							      data:{
							       text:this.commentReq.content
							      },
							      success:res =>{
							       console.log(res,"res")
							       if(res.data.state == "block"){
							        uni.showToast({
							         icon:'error',
							         title:'检测到不合法内容'
							        })
									this.closeInput();
							       }else{
							        this.commentReq.pId = null
							        this.commentReq.content = ''
							        this.commentData.push(res.data);
							        uni.showToast({
							        	icon:'success'
							        })
							        this.closeInput();
							       }
							      },
							     })
							    }
		},
		to_push(e){
			
			this.bookId=e.id;
			//console.log('这是书本的刚吓出来的id'+this.id);
			uni.request({
				url:'http://localhost:8080/book/findById/'+this.id,
				method:'GET',
				data: {},
				success: (res) => {
					//console.log(res);
					// console.log(res.data );
					// this.alist=res.data;
				},
			});
		if(this.TextScsnn()==true){
			uni.request({
				url:'http://localhost:8080/bookcomment/insert/',
				method: 'POST',
				data: {
					// creatTime:this.year,
					content:this.commentReq.content.trim(),
					bookId:this.id,
					userId:$store.state.loginUserInfo.userId
					// creatTime:this.da.yearTime,
					
				},
				dataType:'json',
				success: (res) => {
					console.log(res.data);
					this.content='';
					
				}
				
			});
		}else{
				uni.request({
					url:'http://localhost:8080/bookcomment/insert/',
					method: 'POST',
					data: {
						// creatTime:this.year,
						content:this.commentReq.content.trim(),
						bookId:this.id,
						userId:$store.state.loginUserInfo.userId
						// creatTime:this.da.yearTime,
						
					},
					dataType:'json',
					success: (res) => {
						console.log(res.data);
						this.content='';
						
					}
					
				});
			}
				
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
								url:'http://localhost:8080/bookcomment/deleteById/'+id,
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
		
		
		
		 changeScore: function(e) {
		       console.log(e)//控制台触摸事件信息
		       var that = this;
		       var num = 0;//临时数字,动态确定要传入的分数
		       var touchX = e.touches[0].pageX;//获取当前触摸点X坐标
		       var starMinX = 110;//最左边第一颗星的X坐标,假设距离页面距离为110,距离左边的距离是多少
		       var starWidth = 30;//星星图标的宽度,假设15(已在wxss文件中设置".star")
		       var starLen = 5;//星星之间的距离假设为5(已在wxss文件中设置".starLen")
		       var starMaxX = starWidth * 5 + starLen * 4+starMinX;//最右侧星星最右侧的X坐标,需要加上5个星星的宽度和4个星星间距
		       if (touchX > starMinX && touchX < starMaxX) {//点击及触摸的初始位置在星星所在空间之内
		       //使用Math.ceil()方法取得当前触摸位置X坐标相对于(星星+星星间距)之比的整数,确定当前点击的是第几个星星
		         num = Math.ceil((touchX - starMinX) / (starWidth + starLen));
				 uni.request({
				 	url:'http://123.56.217.170:8080/score/insert/',
				 	method: 'POST',
				 	data: {
				 		bookId:this.id,
				 		score:num,
				 	},
				 	dataType:'json',
				 	success: (res) => {
				 				console.log("成功");
				 				console.log(this.score+'danq');
				 			},
				 		
				 })
		         if (num != that.score) {//如果当前得分不等于刚设置的值,才赋值,因为touchmove方法刷新率很高,这样做可以节省点资源
		             that.score = num,
		             that.scoreContent=that.scoreText[num - 1]
		         }
		       } else if (touchX < starMinX) {//如果点击或触摸位置在第一颗星星左边,则恢复默认值,否则第一颗星星会一直存在
		           that.score = 0,
		           that.scoreContent =''
		       }
		     },
		sum () {
			this.allscore();
				let score=0;
				// let average=0;
				for(var i=0;i<this.scoreList.length;i++){
					console.log(this.scoreList[i].score+'zheshicashisssss');
					score=score+this.scoreList[i].score;
						}
				//	console.log(score+'这是总分呀');
					//console.log(score/(i)+'这是评价分');
					return parseFloat(score/(i)).toFixed(1);
				
	
		    },
			gotonote(id){
				this.id=id;
				console.log(this.id+'nnnnn');
				uni.navigateTo({
					url:'/pages/study/note/note?id='+this.id,
				});
				// uni.request({
				// 	url:'http://123.56.217.170:8080/shell/all/',
				// 	method:'GET',
				// 	data: {},
				// 	success: (res) => {
				// 		//console.log(res);
				// 		console.log(res.data );
				// 		this.booklist=res.data;
				// 	},
				// });
			},
		gotooo(id){
			this.id=id;
			console.log(this.id+'qqqqqqq');
			uni.navigateTo({
				url:'/pages/study/articleshell/articleshell?id='+this.id,
			});
			uni.request({
				url:'http://123.56.217.170:8080/shell/all/',
				method:'GET',
				data: {},
				success: (res) => {
					//console.log(res);
					//console.log(res.data );
					this.booklist=res.data;
				},
			});
		},
		allscore(){
					uni.request({
						url:'http://123.56.217.170:8080/score/findBookScore/'+this.id,
						method: 'GET',
						data: {},
						success: (res) => {
						    console.log(res.data);
						          this.scoreList =res.data;
								  console.log("===*****=====",this.scoreList);
								   //console.log(this.itemList[0]);
								  // console.log(this.itemList[0].id);
								//  console.log(this.scoreList.length+'这个是数据的长度');
						},
					
						
					});
					
					
				},
		submitScore(){
				if(this.score=='' || this.score < 0 || this.score > 10){
					uni.showModal({
						title:'请输入有效评分',
					});
				}else{
					uni.request({
						url:'http://123.56.217.170:8080/score/insert/',
						method: 'POST',
						data: {
							bookId:this.id,
							//userId:$store.state.loginUserInfo.userId,
							score:this.score,
						},
						// console.log(getApp().globalData.uid);
						// console.log(getApp().globalData.name);
						dataType:'json',
						
						success: (res) => {
									console.log("成功");
									this.sum();
									console.log(this.score+'danq');
										this.score=''
								},
							
					})
				}
				// this.allscore();
				// this.sum();
				// uni.request({
				// 	url:'http://123.56.217.170:8080/score/findBookScore/'+this.id,
				// 	method: 'GET',
				// 	data: {},
				// 	success: (res) => {
				// 	    console.log(res.data);
				// 	          this.scoreList =res.data;
				// 			  console.log("===*****=====",this.scoreList);
							   //console.log(this.itemList[0]);
							  // console.log(this.itemList[0].id);
							//  console.log(this.scoreList.length+'这个是数据的长度');
							 //  let score=0;
							 //  let average=0;
							 //  for(var i=0;i<this.scoreList.length;i++){
							 //  	console.log(this.scoreList[i].score+'zheshicashisssss');
							 //  	score=score+this.scoreList[i].score;
							 //  	//console.log(score+'zheshifenshu');
								// console.log(score+'这是总分呀');
							 //  	return this.score;
							 //   average=this.score/(i+1);
							 //   console.log(average+'这是评价分');
							 //  //return average;
							 //  }
				// 	},
					
				// });
				
				// let count=0;
				// let score=0;
				// let average=0;
				// //console.log(this.scoreList.length+'shujudechangu');
				// for(var i=0;i<this.scoreList.length;i++){
				// 	console.log(this.scoreList.score[i]+'zheshicashisssss');
				// 	score=score+this.scoreList[i];
				// 	//console.log(score+'zheshifenshu');
				// 	count++;
				// 	return this.score;
				//  average=this.score/this.count;
				//  console.log(average+'这是评价分');
				// //return average;
				// }
				},
		
		show(e){
				console.log(e);
				this.id=e.id;
				uni.request({
						url:'http://123.56.217.170:8080/book/findById/'+this.id,
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
				
				url:'http://123.56.217.170:8080/shell/insert/',
				method: 'POST',
				data: {
					bookId:this.id,
					userId:$store.state.loginUserInfo.userId,
				},
				// console.log(getApp().globalData.uid);
				// console.log(getApp().globalData.name);
				dataType:'json',
				success: (res) => {
					
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
				}
			});
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

<style lang="less" scoped>
@import url('bookdetail.css');
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
		margin-top: -110px;
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
		padding: 20rpx 0;
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
		//background-color: rgba($color: #000000, $alpha: 0.5);
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
	.starLen{
	  margin-right: 10rpx;
	  display: inline-block;
	}
	 
	.star{
	  width:60rpx;
	  height:60rpx;
	}
	 
	.scoreContent{
	  margin-left: 0rpx;
	  display: inline-block;
	  color: #fff;
	}
</style>