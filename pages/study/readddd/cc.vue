<template>
	<view class="page" :style="{'background':global_bg}">
		<view class="read_main_p">
			<p>第1章</p>
		</view>
		<view class="read_content"
			:class="[ziti_type=='mini'?'minipage':ziti_type=='small'?'smalloage':'biggerpage',{'read_content_night':isnight}]">
			<view class="read_main" @click="editread" v-html="nodes">
			</view>
		</view>
		<view class="pagechange flex-around">
			<view class="prev">上一章</view>
			<view class="menu">菜单</view>
			<view class="next">下一章</view>
		</view>
		<!-- 顶部选项 -->
		<view class="top_menu flex-around" v-if="show_edit">
			<!-- <text>分类</text>
			<text>榜单</text>
			<text>精选</text>
			<text>个人中心</text> -->
			<text class="iconfont back" @click="back">返回</text>
		</view>
		<!-- 底部设置 -->
		<view class="bot_edit" v-if="show_edit">
			<!-- 字体设置 -->
			<view class="flex ziti">
				<view>字体</view>
				<view class="ziti_tab flex">
					<view @click="changeziti(item.value,i)" :class="item.checked?'active_ziti':''"
						v-for="(item,i) of ziti_list" :key="i">{{item.name}}</view>
				</view>
			</view>
			<view class="background flex">
				<view>背景</view>
				<view class="bgtabs flex">
					<view class="bg_btn" @click="activebg(item.bg,i)" :style="{'background':item.bg}"
						v-for="(item,i) of bglist" :key='i'>
						<image v-if="item.checked" class="goubg" src="../../../static/logo.png" mode="widthFix">
						</image>
					</view>
					<view class="bg_btn">
						<image class="goubg" @click="changeDay"
							:src="isnight?'/../../static/logo.png':'/../../static/logo.png'" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="bot_tabs flex-around">
				<view>
					<image class="bot_img" src="../../../static/logo.png" mode="aspectFit"></image>
					<view class="bot_val">
						目录
					</view>
				</view>
				<view>
					<image class="bot_img" src="../../../static/logo.png" mode="aspectFit"></image>
					<view class="bot_val">
						最近阅读
					</view>
				</view>
				<view @click="backHome">
					<image class="bot_img" src="../../../static/logo.png" mode="aspectFit"></image>
					<view class="bot_val">
						首页
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bglist: [{
						bg: "#F5F5F5",
						checked: false
					},
					{
						bg: '#dfedd6',
						checked: true
					},
					{
						bg: '#f8ceda',
						checked: false
					},
					{
						bg: '#f3cb9d',
						checked: false
					},
				],
				ziti_type: 'small',
				isnight: false,
				global_bg: '#dfedd6',
				tab_bg: "#dfedd6", //记录切换的背景颜色
				ziti_list: [{
						name: '小',
						checked: false,
						value: 'mini'
					},
					{
						name: '中',
						checked: true,
						value: 'small'
					},
					{
						name: '大',
						checked: false,
						value: 'bigger'
					}
				],
				url:'',
				show_edit: true, //设置
				nodes: `<p>“腿太粗，脖子太短，还有那腰，怎么粗的跟水桶似的！”</p><p>主席台上，穿着黑色西装的小正太小嘴儿嘟起。露出的小虎牙和那闪亮的大眼，让人一看就忍不住心头萌动。奈何说出的话太过毒舌，完全毁掉了他表现出来的绅士形象。</p><p>“我......”台下站着的美女笑脸僵住了，正准备开口说什么，就见小人站起身，走下台来。</p><p>“刚刚果然没有看错，你有一颗牙齿长歪了。”说着，变戏法儿似的从身后掏出一根棒棒糖塞到了女人嘴里。“这下就看不到了！”</p><p>被堵上嘴的美女瞪大了眼，眼睁睁看着小正太又坐了回去。</p><p>“下一个！”响亮的童音响起，小正太旁边站着的人抬手一挥，立刻有人将台下站着的女子带了下去。</p><p>新上场的女人一看见萌宝，便亲昵的喊了一声：“宝宝！”</p><p>坐在太师椅上的小正太甩了甩小短腿，伸出胖乎乎的手指毫不留情地道：“刷掉！”</p><p>美女脸一垮：“我既有胸，又有腰，怎么就不合格了？”</p><p>萌宝竖起的食指晃了晃，奶声奶气地道：“光有身材，没有脑子要来何用！”</p><p>胸前别着号码牌的女子有些摸不着头脑，“我怎么就没脑子了？”</p><p>坐姿端正的小正太一拍桌子，气呼呼地开口：“宝宝是你叫的吗？”</p><p>台下的美女如走马观花一般不停地换，坐在台上的小正太，也由一开始的兴致勃勃，到现在的满脸不耐烦。也因此，从小正太口中说出的话，也让众美女打击越来越深。</p><p>“粉太白，瞧着像鬼一样！”</p><p>“眼线太宽，我的眼里，只剩下你的黑眼珠了！”</p><p>“这张嘴是怎么回事？为什么那么大，都可以放下一颗鹅蛋了！”</p><p>有着“鹅蛋”嘴的女子一听小正太这话，连忙捂着嘴跑了下去。</p><p>“你往前走几步，到台上来！”小正托着下巴看着新上场的女子。</p><p>穿着粉红色连衣裙的女子闻言，嘴角扬起一抹微笑。扭着小蛮腰，信心满满地上前。</p><p>“小少爷！”</p><p>小正太站起身来，身子朝前倾了倾，“阿嚏”一声，捂住了鼻子。</p><p>“你身上喷了什么，怪不得蚊子不敢靠近，敢情都让你给熏没了！”小正太说着，匆匆闪到了一边。</p><p>被小正太嫌弃的女子哭丧着脸，狼狈地跳下了台阶。中途由于走的太急，还差点儿崴了脚。</p><p>小正太抬手扇了扇眼前的空气，再次坐回了太师椅。</p><p>“下一个！”</p><p>豪华的大礼堂里，觥筹交错，婀娜多姿的美女挤满了礼堂。</p><p>这里，是江家小少爷江泽亦的选秀现场。选的不是别人，是他未来的妈咪。</p><p>一周前，江家几房齐聚一堂，对江家如今的掌权人，也就是江小包子的父亲江邵安，给予了无限的关心。当然，是婚事上的。</p><p>年纪轻轻、凭借一己之力统一整个江氏，江邵安成为整个帝都最为神秘的商业王者、真真正正的皇权富贵，手下涉及的产业十个手指头都数不过来。</p><p>身为江家的掌舵者，但认识江邵安的人并不多。一直过着佛系生活的江邵安很少出现在公众视野中，外界只闻其名，不知其人。</p><p>对婚事抗拒的江邵安毫无疑问地拒绝了亲戚们的好意，但小亦亦不同，他倒是很乐意有个妈咪。</p><p>在江家人的支持下，小亦亦展开了轰轰烈烈的妈咪大选。凡是能入他眼的名媛，都会收到一份制作精美的邀请函。收到邀请函的千金们，无不觉得是被天上掉下来的馅饼砸中。而那些没收到的，则纷纷四处打探，看能不能花重金抢到一份。</p><p>按理说，当人后妈这营生，对这些矫情又矜贵的名媛千金们来说，应该没什么吸引力才对。可小亦亦不同，他有个堪称钻石级别的爹地。坐拥亿万身家不说，外形还高大俊逸。</p>`
			};
		},
		onLoad() {
			this.configure() //缓存配置 ，字体背景大小
			let node=this.nodes
			this.nodes=this.nodes.replace(/\<p/gi, '<p class="nodep" ');//正则给img标签增加class
		},
		methods: {
			// backHome(){
			// 	uni.redirectTo({
			// 		url:'../readddd/aa'
			// 	})
			// },
			back() {
				uni.navigateBack({
					delta:1
				})
			},
			
			changeDay() {
				this.isnight = !this.isnight
				uni.setStorageSync('isnight', this.isnight)
				if (this.isnight) {
					this.global_bg = '#1d1d1f' //改背景颜色	
					uni.setStorageSync('global_bg', "#1d1d1f")
					uni.setStorageSync('tab_bg', this.tab_bg)
				} else {
					this.global_bg = this.tab_bg
					console.log(this.tab_bg)
					uni.setStorageSync('global_bg', this.tab_bg)
				}
			},
			editread() {
				this.show_edit = !this.show_edit
			},
			activebg(bg, idx) {
				for (let item of this.bglist) {
					item.checked = false
				}
				this.bglist[idx].checked = true
				this.global_bg = bg
				this.tab_bg = bg //为了记录切换黑夜模式切回
				this.isnight = false
				uni.setStorageSync('isnight', this.isnight)
				uni.setStorageSync('global_bg', bg)
				// this.ziti_type=type
			},
			changeziti(type, idx) {
				for (let item of this.ziti_list) {
					item.checked = false
				}
				this.ziti_list[idx].checked = true
				this.ziti_type = type
				uni.setStorageSync('ziti_type', type)
			},
			configure() {
				console.log(uni.getStorageSync('global_bg'));
				console.log(uni.getStorageSync('ziti_type'));
				console.log(uni.getStorageSync('isnight'));
				if (uni.getStorageSync('global_bg')) {
					this.global_bg = uni.getStorageSync('global_bg')
					this.tab_bg = uni.getStorageSync('tab_bg')
					//拿的同时还需要更改当前的设置
					for (let item of this.bglist) {
						if (item.bg == this.global_bg) {
							item.checked = true
						} else {
							item.checked = false
						}
					}
				}
				if (uni.getStorageSync('ziti_type')) {
					this.ziti_type = uni.getStorageSync('ziti_type')
					for (let item of this.ziti_list) {
						if (item.value == this.ziti_type) {
							item.checked = true
						} else {
							item.checked = false
						}
					}
				}
				if (uni.getStorageSync('isnight')) {
					this.isnight = true
				}
			},
		}
	}
</script>

<style lang="scss">
	page {
		color: #1d1b1b;
	}

	.page {
		// 7e8286
		padding-bottom: 40rpx;

	}

	.minipage {}

	.read_main_p {
		text-align: center;
		padding-top: 30rpx;
		font-size: 42rpx;
	}

	.read_content {
		padding: 0 40rpx;
		font-size: 40rpx;
	}

	.minipage {
		font-size: 36rpx;
	}

	.smallpage {
		font-size: 40rpx;
	}

	.biggerpage {
		font-size: 44rpx;
	}

	.read_content /deep/ p {
		text-indent: 72rpx;
		margin: 20rpx 0;
		color: #1d1b1b;
		font-family: 'PingFang-SC-Regular';
		line-height: 1.8;
	}
	.read_content{
		text-indent: 72rpx;
		margin: 20rpx 0;
		color: #1d1b1b;
		font-family: 'PingFang-SC-Regular';
		line-height: 1.8;
	}
	.read_content .nodep{
		text-indent: 72rpx;
		margin: 20rpx 0;
		color: #1d1b1b;
		font-family: 'PingFang-SC-Regular';
		line-height: 1.8;
	}
	.read_content_night /deep/ p {
		color: #7e8286;
	}
   .read_content_night{
	  	color: #7e8286!important;
   }
	.top_menu {
		background-color: rgba(34, 34, 34, 1);
		height: 90rpx;
		position: fixed;
		width: 100%;
		font-size: 30rpx;
		z-index: 10;
		top: 0;
		color: #fff;
		align-items: center;
	}

	.bot_edit {
		background-color: rgba(34, 34, 34, 1);
		height: 400rpx;
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 10;
		padding: 44rpx 30rpx 30rpx 25rpx;
		color: #FFFFFF;

		.ziti {
			line-height: 60rpx;
			margin-bottom: 44rpx;
		}

		.ziti_tab {
			font-size: 30rpx;
			line-height: 60rpx;
			margin-left: 20rpx;

			view {
				width: 180rpx;
				height: 60rpx;
				margin-left: 20rpx;
				text-align: center;
				border: 1rpx solid #4F4F4F;
				border-radius: 16rpx;
			}

			.active_ziti {
				border: 1rpx solid #FDAA36;
			}
		}

		.background {
			padding-bottom: 44rpx;
			line-height: 60rpx;
			border-bottom: 1rpx solid #4D4D4D;

			.bgtabs {
				margin-left: 44rpx;

				.bg_btn {
					width: 60rpx;
					height: 60rpx;
					margin-right: 55rpx;
					// background-color: #fff;
					border-radius: 50%;
					position: relative;
                    /* #ifdef H5 */
                    .goubg {
                    	position: absolute;
                    	width: 100%;
                    	height: 100%;
                    	top: 0;
                    	left:0;
                    	border-radius: 50%;
                    	border: 4rpx solid #FDAA36
                    }
                    /* #endif */
					
					/* #ifdef MP-WEIXIN */
					.goubg {
						position: absolute;
						width: 90%;
						height: 90%;
						top: 0;
						left:0;
						border-radius: 50%;
						border: 4rpx solid #FDAA36
					}
					/* #endif */
				}
			}
		}
	}

	.bot_tabs {
		text-align: center;
		align-items: center;
		padding-top: 28rpx;
	}

	.bot_img {
		width: 56rpx;
		height: 56rpx;
	}
	.pagechange{
		padding: 40rpx 0;
		view{
		border:1px solid #FFB473;
		color: #FFB473;
		padding:10rpx 50rpx;
		border-radius: 60rpx;
		}
	}
	.pagechange view:last-child{
		background:#FFB473;
		color: #fff;
	}
</style>


