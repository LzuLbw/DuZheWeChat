<template>
	<view class="article-card " @click="onClick">
		<navigator v-if="mode === 'basic'" :url="url" class="article_link clearfix" hover-class="navigator-hover">
			<view class="item_detail">
				<h3 class="line3 dotdot">{{ title }}</h3>
				<view class="item_info">
					<text class="space">{{ author }}</text>
					<text class="space">评论 {{ comment }}</text>
					<text>{{ publishTime }}</text>
				</view>
			</view>
		</navigator>
		<navigator v-if="mode === 'single'" :url="url" class="article_link clearfix middle_mode" hover-class="navigator-hover">
			<view class="item_detail desc">
				<h3 class="line3 dotdot image-margin-right">{{ title }}</h3>
				<view class="item_info">
					<text class="space">{{ author }}</text>
					<text class="space">评论 {{ comment }}</text>
					<text>{{ publishTime }}</text>
				</view>
			</view>
			<view class="list_img_holder">
				<image :src="path"></image>
			</view>
		</navigator>
		<navigator v-if="mode === 'triple'" :url="url" class="article_link clearfix" hover-class="navigator-hover">
			<view class="item_detail">
				<h3 class="line3 dotdot">{{ title }}</h3>
				<view class="list_image">
					<view class="clearfix">
						<view v-for="(item, index) in imageList" :key="index" class="list_img_holder">
							<image :src="item.path"></image>
						</view>
					</view>
				</view>
				<view class="item_info">
					<text class="space">{{ author }}</text>
					<text class="space">评论 {{ comment }}</text>
					<text>{{ publishTime }}</text>
				</view>
			</view>
		</navigator>
		<navigator v-if="mode === 'large'" :url="url" class="article_link clearfix" hover-class="navigator-hover">
			<view class="item_detail">
				<h3 class="line3 dotdot">{{ title }}</h3>
				<view class="list_img_holder_large list_img_holder_large_fix">
					<image :src="path"></image>
				</view>
				<view class="item_info">
					<text class="space">{{ author }}</text>
					<text class="space">评论 {{ comment }}</text>
					<text>{{ publishTime }}</text>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	/**
	 * ArticleCard 图文卡片
	 * @description 卡片视图组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=22
	 * @property {String} title 文章标题
	 * @property {String} author 文章作者名称
	 * @property {String, Number} number 文章评论数
	 * @property {String, Number} publishTime 文章发布时间
	 * @property {Array} imageList 三图图片列表
	 * @property {String} path 图片路径 
	 * @property {String} mode = [basic|single|triple|large] 卡片模式
	 * 	@value basic 基础卡片
	 * 	@value single 单图卡片
	 * 	@value triple 三图卡片
	 *  @value large 大图卡片
	 * @event {Function} click 点击 Card 触发事件
	 * @example <uni-card title="标题文字" thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="额外信息" note="Tips">内容主体，可自定义内容及样式</uni-card>
	 */
	export default {
		name: 'ArticleCard',
		props: {
			url: {
				type: String,
				default: ''
			},//跳转链接
			title: {
				type: String,
				default: ''
			}, // 标题
			author: {
				type: String,
				default: ''
			}, // 作者
			comment: {
				type: [String, Number],
				default: '0'
			}, // 评论数
			publishTime: {
				type: [String, Number],
				default: '1小时前'
			}, // 发布文章的时间
			imageList: {
				type: Array,
				default () {
					return []
				}
			}, //三图图片数组
			// 卡片模式 ， 可选值 basic 基础卡片 ；single 单图卡片 ； triple 三图卡片 ；large 大图卡片
			mode: {
				type: String,
				default: 'basic'
			},
			path: {
				type: String,
				default: ''
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style scoped>
	.article-card {
		/* #ifndef APP-NVUE */
		display: flex;
		flex: 1;
		box-shadow: 0 0 0 rgba(0, 0, 0, 0);
		/* #endif */
		margin: 0px 15px;
		padding: 0;
		background-color: #ffffff;
		position: relative;
		-webkit-transition: all 1s ease-in-out;
		border-bottom: 1px solid rgba(221, 221, 221, 0.6);
	}

	.article-card .article_link {
		display: block;
		position: relative;
		padding: 16px 0px;
		min-height: 42px;
		font-size: 0px;
		text-decoration: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
	}



	.article-card .article_link h3 {
		color: #222;
		font-size: 17px;
		line-height: 21px;
		font-weight: normal;
		overflow: hidden;
	}

	.article-card .article_link:visited h3 {
		color: #aaa;
	}

	.article-card .line3 {
		-webkit-line-clamp: 3;
	}

	.article-card .dotdot {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.article-card .image-margin-right {
		margin-right: 12px;
	}

	.article-card .item_info {
		overflow: hidden;
		font-size: 12px;
		margin-top: 6px;
		color: #999;
	}


	.article-card .list_image {
		margin-top: 6px;
	}

	.article-card .list_image view {
		display: block;
		margin: 0;
		padding: 0;
		list-style-type: none;
		font-size: 0;
		text-align: center;
	}

	.article-card .list_image view view {
		display: inline-block;
		overflow: hidden;
		width: 33.3%;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	.article-card .list_image view view:first-child {
		float: left;
		padding-right: 2px;
	}


	.article-card .list_image view view:last-child {
		float: right;
		padding-left: 2px;
	}

	.article-card .list_img_holder {
		height: 4rem;
		position: relative;
		background: url(//s3b.pstatp.com/growth/mobile_list/image/toutiaoicon_loading_textpage@3x_f7c130ce.png) #efefef no-repeat center center;
		background-size: 50%;
	}

	.article-card .list_img_holder image {
		border: none;
		display: block;
		width: 100%;
		height: 100%;
		-webkit-transition: opacity 300ms ease;
		-moz-transition: opacity ease .3s;
		pointer-events: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		-webkit-user-select: none;
		text-decoration: none;
	}

	.article-card .middle_mode .list_img_holder {
		height: 100%;
		overflow: hidden;
		width: 33%;
		display: inline-block;
		vertical-align: middle;
	}

	.article-card .list_img_holder_large {
		background: url(data:image/gif;base64,R0lGODlh7AA5AIAAAOHh4f///yH5BAEAAAEALAAAAADsADkAAAL/jI+py+0Po5y02ouz3hv4D4YhR2YiWAbnmJrry3bwTNdeRFNwWbeYPeMAh0SAJHd8kYpMZbIZ+0GnUUcP59RQt8/tzeWdTq6PnTYMxaK/l3V6HISYpe6iHKjCt+t2XdyaZcHHVKZnYOg3iNi1Uti4pzgESIYgmXjS8genqTBXQQmJtLBYSTqJmcLJ+DgauOkZKlpq4wh6KpIJ+8ra6aqme2mbR3tHXIzKA7yK28rrE6t6aMpgWcuc7BuMPLstaHwryx1+PN7rLJP9LF7l/Z1A1FCtrXxAD82uvo4iRCpvLjyMzbtp0s6dSZcv4DV+xOCBS2fQn74PuRBO3LeMYio+/wkLdsP28aDBfyOpWaTjpaPHkAxZonQ50F5MmCLfdARYEx+YkiRp1juJro9KhTxf6jR6tBlQohjz2bxZLujClj4vNjVZNCchqNGkJm2XdeZJmUjFOI2qVSPIqmJpkv006OxbuJFwPkw695eiZ1291g2rtGTeu3Ga+Fh67+/UeToHB3bHFHLOhIrRkouI+LHdp0OXVHbcdnFkgbskY3XYmernr3wzewacmutq0bJpy2UbbzZQ0IRJD+W903ZG3UassWastnNfdcB/Ehe+8njpo885Vb9O0Dluvbaxf/QOfrfry9TDJ49uHjz5836vWiWuGXtsu+jZp7Vfv3r86/Mt5+wvvlZ35p2mnnKmWVURbIll9x98vx2I4Ebj0SUUZRP251+EAUq3IH29hZZcc2VtJ2JPHFJoGFjdeLLcYRDuB+BrCk63FXIx/gcifi5mCGOC2w03Ao/vmcheiev9qB10KCq5JCtC4kikby3exySBJx7pG5VNeQhllDc2yNyLxunmoy9CKoPmhb1dCaNiY3LR5pdeWtmYkUnayd+bZsUpp4ajCahmjlViGQmQNdKJlyselshgk3/RmKKeOsLC45S5cWljXJBWuGaWugxmqZdsEuqGipxJ6qmZM/5paqCdohFbrMAgGWuttt6Ka2wFAAA7) #efefef no-repeat center center;
		background-size: 54px;
		overflow: hidden;
		width: 100%;
		position: relative;
		margin-top: 6px;
		min-height: 3.75rem;
	}

	.article-card .list_img_holder_large image {
		border: none;
		display: block;
		width: 100%;
		pointer-events: none;
	}

	.article-card .list_img_holder_large_fix {
		height: 9.5rem;
	}

	.article-card .desc {
		display: inline-block;
		width: 67%;
		vertical-align: middle;
	}

	.space {
		margin-right: 5px;
	}

	.clearfix::after {
		content: "";
		display: block;
		clear: both;
		visibility: hidden;
		height: 0;
		font-size: 0;
	}
</style>
