<template>
	<view class="">
		<Commodity :dataList="dataList" itemW="250upx" bigH="220upx"></Commodity>
	</view>
</template>

<script>
	import Commodity from "../common/Commodity.vue"
	export default {
		props:{
			dataList:Array
		},
		components: {
			Commodity
		}
	}
</script>

<style>
</style>
