<template>
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
		<swiper-item v-for='(item,index) in dataList' :key = 'index'>
			<view class="swiper-item">
				<image class='swiper-img' :src="item.swiperUrl" mode=""></image>
			</view>

		</swiper-item>
		<!-- <swiper-item>
			<view class="swiper-item">
				<image class="swiper-img" src="../../static/image/the_wandering_earth.jpg" mode=""></image>
			</view>

		</swiper-item>
		<swiper-item>
			<view class="swiper-item">
				<image class="swiper-img" src="../../static/image/tb_forest.jpg" mode=""></image> 
			</view>

		</swiper-item> -->

	</swiper>
</template>

<script>
	export default{
		props:{
			dataList:Array
		}
	}
</script>

<style>
.swiper-item{
	width: 100%;
	height: 400upx;
}
.swiper-img{
	width: 100%;
	height: 400upx;
}
</style>
