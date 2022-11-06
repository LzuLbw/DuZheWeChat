<template>
	
	<view class="">
		<sw-calendar @tapDate="tapDate"></sw-calendar>
		<ss-calendar
		  :checks="checks"
		  @current-month-day="onSignIn"
		  @prev-month-day="onPrev"
		  @next-month-day="onNext"
		/>
	</view>
</template>

<script>
	
	// // 监听data返回的格式
	// const data = {
	//        year: 2019,
	//        month: 11,
	//        date: 18,
	//        type:'today' //today-今天 pre-今天之前 next-今天之后
	// }
	
	// methods :{
	//     tapDate(data){
	//     //根据data.type进行判断用户点击的是哪一天,进行下一步业务操作
	//         console.log(data)
	//     }
	// }
</script>

<style>

</style>
