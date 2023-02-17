<template>
	<view>
		<view class="contentpaiming">
			<view style="width: 15%;display: flex;justify-content: center;align-items: center;">
				<text>排名</text>
			</view>
			<view style="width: 65%;">
				<view style="display: flex;justify-content: center;align-items: center;">
					昵称
				</view>
			</view>
			<view style="width: 25%;display: flex;justify-content: center;align-items: center;">积分</view>
		</view>
		
		<view v-for="(item,index) in user_scoreList" class="contentpaiming">
			
			<view style="width: 15%;display: flex;justify-content: center;align-items: center;">
				<text v-if="index>2">{{index+1}}</text>
				<text v-if="index==0" style="color: #f0f000;font-weight: bold;">{{index+1}}</text>
				<text v-if="index==1" style="color: #aa0000;font-weight: bold;">{{index+1}}</text>
				<text v-if="index==2" style="color: #55aaff;font-weight: bold;">{{index+1}}</text>
			</view>
			<view style="width: 65%;">
				<view style="display: flex;justify-content: center;align-items: center;" class="u-line-1">
					<text style="display: flex;justify-content: center;align-items: center;">{{item.userId}}</text>
				</view>
			</view>
			<view style="width: 25%;display: flex;justify-content: center;align-items: center;"><text>{{item.totalScore}}</text></view>
		</view>
		    <!-- <view style="padding: 20upx 0;">
		        <zetank-rank :rankData="rankData"></zetank-rank>
		    </view> -->
			<!-- {{user_scoreList}}
			{{form}} -->
	</view>
</template>

<script>
import { listUser_score, getUser_score, delUser_score, addUser_score, updateUser_score } from "@/api/readerstation-member/user_score";
import { getUser } from "@/api/system/user";
	export default {
		name: "Intro",
		components: {},
		data() {
			return {
				form:{},
					user_scoreList:[],
				status: "加载更多",
				joinStatus: 0,
				active: 1,
				teamId: "",
				page: 0,
				limit: 10,
				totalCount: 0,
				memberList: [],
				gameList: [],
				list: [{
						name: '队员排行'
					},
					{
						name: '比赛记录'
					}
				],
				current: 0,
				swiperCurrent: 0,

			};
		},

		mounted() {},
		onLoad() {
			
			this.getList()
			// this.QuserName()
		},
		methods: {
			/** 查询用户积分列表 */
			    getList() {
					let that = this
					// alert(1)
			      listUser_score().then(response => {
					  // alert(1)
			        this.user_scoreList = response.rows;
			        this.totalCount = response.total;
					
					that.QuserName()
					
			      });
				  
			    },
				
			/** 修改操作 */
			    QuserName() {
					this.user_scoreList.forEach(
						function(element){
							alert(element.userId)
							
						}
					)
			    },
		}
	};
</script>

<style>
	/deep/.u-scroll-bar {
		background: red !important;
	}

	.swiper-box {
		height: 75vh;
	}
	
	.contentpaiming{
		
		margin: 10rpx 20rpx;
	
		padding: 20rpx;
		display: flex;
		justify-content:space-around;
	}
</style>
