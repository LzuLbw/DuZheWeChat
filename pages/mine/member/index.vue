<template>
	<view class="page_content">
		<image class="logo" src="/static/mine/member/head.png"></image>

		<swiper @change="swiperChange" previous-margin="50px" next-margin="50px" class="swiper" :indicator-dots="false"
		 :autoplay="false" :interval="3000" :duration="1000" :current="bigIdx">

			<template v-for="(vip, i) in vips">
				<swiper-item :key="'vip_'+i">
					<view :class="['swiper-item',bigIdx === i ? 'big' : 'small']" :style="{background:vip.bg,'box-shadow':vip.shadow}">
						<image class="img" src="/static/mine/member/icon_vip.png"></image>
						<text class="title">{{levelrow.level}}{{vip.title}}</text>
						<text class="sub_title">{{vip.subTitle}}{{user_score.usableScore}}</text>
					</view>
				</swiper-item>
			</template>

		</swiper>

		<view class="title_line">
			<text class="title">我的任务</text>
			<text class="more">查看更多</text>
		</view>

		<scroll-view class="slider" scroll-x="true">
			<template v-for="(task,i) in taskList" v-if="task.status == 0">
				<view :key="'task_'+i" class="s_item">
					<view class="content">
						<image :src="task.thumbUrl" class="img"></image>
						<text class="name">{{task.name}}</text>
						<text class="desc">奖励{{task.score}}积分</text>
						<text class="btn" @click="routerItem(task.pageUrl)" >去完成</text>
					</view>
				</view>
			</template>
		</scroll-view>

		<view class="title_line">
			<text class="title">我的会员</text>
			<text class="more">查看更多</text>
		</view>

		<view class="welfare">
			<template v-for="(info,i) in welfare">
				<view class="item" :key="'welfare_'+i">
					<view class="border">
						<image class="img" :src="info.icon" @click="routerItem(info.url)"></image>
					</view>
					<text class="txt" @click="routerItem(info.url)">{{info.name}}</text>
					<!-- <text class="btn" @click="routerItem(info.url)" >去完成</text> -->
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import { getUserProfile } from "@/api/system/user"
import { getMemberProfile } from '../../../api/system/user'
import { listUser_score, getUser_score, delUser_score, addUser_score, updateUser_score } from "@/api/readerstation-member/user_score";
import { listTask, getTask, delTask, addTask, updateTask } from "@/api/readerstation-member/task";
import { listLevelscoremap, getLevelscoremap, delLevelscoremap, addLevelscoremap, updateLevelscoremap } from "@/api/readerstation-member/levelscoremap";
import { forever } from "request";
	export default {
		data() {
			return {
				i:0,
				// 总条数
				total: 0,
				ss: '',
				// 用户会员等级
				level: '',
				user: {
				  userId:"",
				  nickName: "",
				  phonenumber: "",
				  email: "",
				  sex: ""
				},
				// 查询参数
				      queryParams: {
				        pageNum: 1,
				        pageSize: 10,
				        level: null,
				        totalScore: null,
				        updateAt: null
				      },
				//该用户对应等级行
				levelrow: {},
				// 用户等级积分映射表格数据
				levelscoremapList: [],
				user_score: {
				  userId:"",
				  level: "",
				  totalScore: "",
				  usableScore: "",
				  createAt: "",
				  updateAt: "",
				  deleted: ""
				},
				title: 'Hello',
				bigIdx: 1,
				vips: [{
					bg: 'linear-gradient(94deg,rgba(150,147,168,1),rgba(150,147,164,1))',
					shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
					title: '会员',
					subTitle: '当前积分:',
					
				}, {
					bg: 'linear-gradient(94deg,rgba(192,160,105,1),rgba(233,213,172,1))',
					shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
					title: '会员',
					subTitle: '当前积分:'
				}, {
					bg: 'linear-gradient(94deg,rgba(150,147,168,1),rgba(150,147,164,1))',
					shadow: '0px 3px 12px 0px rgba(195,164,110,0.23)',
					title: '会员',
					subTitle: '当前积分:'
				}],
				taskImgList:[],
				taskList:[],	
				tasks: [{
						icon: '/static/mine/member/icon_signin.png',
						name: '连续7天签到',
						desc: '积分：'
					},
					{
						icon: '/static/mine/member/icon_profile.png',
						name: '完善个人信息',
						desc: '积分：'
					},
					{
						icon: '/static/mine/member/icon_friend.png',
						name: '邀请好友参加',
						desc: '积分：'
					}
				],
				welfare: [{
						icon: '/static/mine/member/icon_evaluate.png',
						name: '我的钱包',
						url:  '/pages/mine/wallet/index'
					},
					{
						icon: '/static/mine/member/icon_gift.png',
						name: '积分兑换',
						url:  '/pages/mine/member/exchange/index'
					},
					{
						icon: '/static/mine/member/icon_score.png',
						name: '积分排行',
						url:  '/pages/mine/member/integral/ranklist'
					},
					{
						icon: '/static/mine/member/icon_other.png',
						name: '其他功能',
						url:  '/pages/wallet/index'
					}
				]

			}
		},
		onLoad() {
		  this.getScore_info()
		  this.getTask_info()
		},
		computed: {
		  avatar() {
		    return this.$store.state.user.avatar
		  },
		  // windowHeight() {
		  //   return uni.getSystemInfoSync().windowHeight - 50
		  // }
		},
		methods: {
			//进入页面得到用户信息
		  getScore_info() {
		    getUserProfile().then(response => {
		      this.user = response.data
			  this.getScore_info_sub(this.user.userId)
		    })
		  },
		  //通过用户id得到用户积分表
		  getScore_info_sub(userID){
			  getUser_score(userID).then(response => {
			    this.user_score = response.data
				this.getLevel()
				// alert(this.user_score.totalScore)
				// this.ss = 'nihao';
				// this.getList()
			  })
		  },
		  /** 查询用户等级积分映射列表,用总积分得到等级 */
		  getLevel(){
			  this.ss = '11';
			  listLevelscoremap().then(response => {
			           this.levelscoremapList = response.rows;
			           this.total = response.total;
					   this.i = 0;
					   if(this.user_score.totalScore > this.levelscoremapList[this.total-1].totalScore){
					   			// alert('积分已达上限')
								getLevelscoremap(this.total-1).then(response => {
										this.levelrow = response.data
									});
								return
					   }
						while(this.i < this.total){
							if(this.user_score.totalScore < this.levelscoremapList[this.i].totalScore){
								getLevelscoremap(this.i).then(response => {
								        this.levelrow = response.data
								      });
								break;
							}
							 this.i++;
					  }
					  
			   });
		  },
		  //查询表格得到任务信息列表
		  getTask_info(){
			    listTask().then(response => {
			         this.taskList = response.rows;
					 this.taskList.forEach(
						function(element){
							element.thumbUrl = element.thumbUrl.slice(8);
							element.thumbUrl = "/static/uploadPath" + element.thumbUrl
						}
					 )
			         this.total = response.total;
			     });
			},
			routerItem(url){
				this.$tab.navigateTo(url)
				
			},
			swiperChange(e) {
				this.bigIdx = e.detail.current
			},
			
			getMember() {
			  getMemberProfile().then(response => {
			    this.member = response.data
			  })
			},
		  },
		}
		
		
	
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-color: white;
	}
</style>
<style lang="scss" scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}

	.page_content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.header {
		padding-top: var(--status-bar-height);
		width: 95%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 10px;
		margin-right: 10px;

		.btn {
			width: 27px;
			height: 27px;
		}

		.title {
			font-size: 18px;
			font-weight: 500;
			color: rgba(43, 43, 43, 1);
			line-height: 41px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.logo {
		margin-top: 10px;
		width: 300px;
		height: 100px;
	}

	.swiper {
		width: 100%;
		margin-top: 10px;

		.swiper-item {
			border-radius: 16px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-left: 10px;
			margin-right: 10px;
		}

		.big {
			margin-top: 0;

			.img {
				margin-top: 15px;
				width: 40px;
				height: 40px;
			}

			.title {
				font-size: 25px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 41px;
			}

			.sub_title {
				font-size: 11px;
				font-weight: 300;
				color: rgba(255, 255, 255, 1);
				line-height: 41px;
			}
		}

		.small {
			margin-top: 14px;
			height: 75%;

			// transition: all 0.3s;
			.img {
				margin-top: 5px;
				width: 25px;
				height: 25px;
			}

			.title {
				font-size: 15px;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 31px;
			}

			.sub_title {
				font-size: 7px;
				font-weight: 300;
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	.title_line {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.title {
			margin-left: 20px;
			font-size: 18px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 41px;
		}

		.more {
			margin-right: 20px;
			font-size: 10px;
			font-weight: 300;
			color: rgba(153, 153, 153, 1);
			line-height: 41px;
		}
	}

	.slider {
		white-space: nowrap;
		width: 100%;

		.s_item {
			display: inline-block;
			width: 35%;
			margin-left: 20px;
			margin-bottom: 10px;

			.content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-radius: 8px;
				background: white;
				margin-top: 5px;
				box-shadow: 0px 2px 6px 0px rgba(103, 103, 103, 0.2);

				.img {
					margin-top: 5px;
					width: 103px;
					height: 105px;
				}

				.name {
					margin-top: 0px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					line-height: 21px;
				}

				.desc {
					font-size: 10px;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
					line-height: 21px;
				}

				.btn {
					width: 80px;
					height: 30px;
					margin-bottom: 10px;
					background: linear-gradient(94deg, rgba(192, 160, 105, 1), rgba(233, 213, 172, 1));
					box-shadow: 0px 9px 28px 0px rgba(195, 164, 110, 0.23);
					border-radius: 29px;
					font-size: 12px;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					line-height: 21px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.welfare {
		width: 92%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 1px 21px 0px rgba(103, 103, 103, 0.2);
		border-radius: 10px;
		margin-bottom: 10px;

		.item {
			padding: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.border {
				margin-top: 5px;
				border: 2px solid #c9ac7a;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.img {
					width: 40px;
					height: 40px;
				}
			}

			.txt {
				margin-top: 5px;
				font-size: 10px;
				font-weight: 300;
				color: rgba(153, 153, 153, 1);
			}
		}
	}
</style>
