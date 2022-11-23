<template>
	<view>
		<view class="header">
			<view class="tabs">
				<view class="tab">附近小站</view>
			</view>
			<input class="search-input" confirm-type="search" placeholder="搜索门店" type="text" @click="nearSearch"/>
		</view>
		<view class="store-map">
			<map id="map"
			 ref="map"
			style="width: 100%; height:652rpx" 
			:latitude="latitude" 
			:longitude="longitude" 
			:markers="markers" 
			show-location="true">
			<image class="current-icon" src="../../static/icon/current-icon.png" @click="goToCurrentLocation"></image>
			</map>
		</view>
		<view class="collapse-area">
		</view>
		<scroll-view class="store-list" style="height: calc(100vh - ( collapse ? 180 : 700)rpx);" scroll-y>
			<view class="store-box" v-for="item in storeList" :key="item.id" v-if="item.distance <= 5.00">
				<view class="info-area" @click="toDetail(item.id)" >
					<view class="name">{{item.name}}</view>
					<view class="info">{{item.location}}</view>
					<view class="info">{{item.openTime}}</view>
					<!--  #ifndef  MP-WEIXIN  -->
					<view class="tag" :style="open ? 'background-color: #FF0000' : 'background-color: #C0C0C0'">
					{{open? '营业中' : '已关门'}}
					</view>
					 <!-- #endif -->
					<!--  #ifdef  MP-WEIXIN -->
					<view class="tag" style="{{open ? 'background-color: #FF0000' : 'background-color: #C0C0C0'}}">
					{{open? '营业中' : '已关门'}}
					</view>
					 <!-- #endif -->
				</view>
				<view class="location-area">
					<view class="distance">距离{{item.distance}}km</view>
					<view class="action-area">
						<image class="location" src="../../static/icon/tolocation.png" @click="openGuide(item.longitude,item.latitude)"></image>
						<image class="phone" src="../../static/icon/phone.png" @click="callPhone(item.phone)"></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>



export default {
	data() {
		return {
			latitude: 0,
			longitude: 0,
			distances:[],
			open: true,
			storeList:[],
			markers: [{
				id:1,
				title:'读者小站-金城书房',
				longitude:103.623215,
				latitude:36.096003,
				iconPath:'../../static/location.png',
				width:'20rpx',
				height:'20rpx'
			},{
				id:2,
				title:'读者小站-金城书房',
				longitude:103.625845,
				latitude:36.085497,
				iconPath:'../../static/location.png',
				width:'20rpx',
				height:'20rpx'
			},{
				id:3,
				title:'读者小站（五一菜市场店）',
				longitude:103.636068,
				latitude:36.091437,
				iconPath:'../../static/location.png',
				width:'20rpx',
				height:'20rpx'
			},{
				id:4,
				title:'读者小站（中街社区）',
				longitude:103.605208,
				latitude:36.099493,
				iconPath:'../../static/location.png',
				width:'20rpx',
				height:'20rpx'
			}]
		}
	},
	onLoad:function(options){
		let that = this;
		uni.getLocation({
			type:'gcj02',
			success(res) {
				const latitude = res.latitude
				const longitude = res.longitude
				that.setData({
					latitude,
					longitude
				})
				that.getViennaList(latitude,longitude)
			}
		})
		
		
	},
	onShow() {
		this.getDateNode();
		this.fetchStoreList();
	},
	mounted() {
	},
	methods: {
		setData:function(obj){    
		let that = this;    
		let keys = [];    
		let val,data;    
		Object.keys(obj).forEach(function(key){    
		 keys = key.split('.');    
		 val = obj[key];    
		 data = that.$data;    
		 keys.forEach(function(key2,index){    
		     if(index+1 == keys.length){    
		         that.$set(data,key2,val);    
		     }else{    
		         if(!data[key2]){    
		            that.$set(data,key2,{});    
		         }    
		     }    
		     data = data[key2];    
		 })    
		});    
		},
		goToCurrentLocation(){
			uni.createMapContext("map",this).moveToLocation({
				latitude:this.latitude,
				longitude:this.longitude
			})
		},
		fetchStoreList(){
			var that = this;
			uni.request({
				url:'http://192.168.96.227:8080/readerstation/station/list',
				success: (res) => {
				    console.log(res.data.rows);
					//that.storeList = res.data.rows
					console.log(res.data.rows.length)
					var mks = []
					for (var i = 0; i < res.data.rows.length; i++) {
						mks.push({
							id:res.data.rows[i].id,
							name:res.data.rows[i].name,
							location:res.data.rows[i].location,
							latitude:res.data.rows[i].latitude,
							longitude:res.data.rows[i].longitude,
							openTime:res.data.rows[i].openTime,
							phone:res.data.rows[i].phone,
							distance:''
						})
					}
				console.log(mks)
				that.distanceCalculation(mks)
				}
			})
		},
		//根据金纬度计算距离
		distanceCalculation(mks) {
			var that = this;
			let lat2 = that.latitude;
			let lng2 = that.longitude;
			console.log(that.latitude,that.longitude);
			let dis = [];
			for(var i = 0; i < mks.length; i++){
				let lat1 = mks[i].latitude;
				let lng1 = mks[i].longitude;
				let rad1 = lat1 * Math.PI / 180.0;
				let rad2 = lat2 * Math.PI / 180.0;
				let a = rad1 - rad2;
				let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(
					rad2) * Math.pow(
					Math.sin(b / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				s = s.toString();
				s = s.substring(0, s.indexOf('.') + 2);
				mks[i].distance = s
			}
			function compare(property) {
			  return function (a, b) {
			    var value1 = a[property];
			    var value2 = b[property];
			    return value1 - value2;
			  }
			}
			console.log(mks)
			that.storeList = mks.sort(compare("distance"))
		},
		callPhone(phone)	{
			uni.makePhoneCall({
				phoneNumber:phone
			})
		},
		openGuide(longitude,latitude){
			const lat = latitude
			const log = longitude
			uni.openLocation({
				latitude:lat,
				longitude:log,
				success:function(){
					console.log('success')
				}
			})
		},
		getViennaList(lat,lng){
			 //获取商家位置
			 let that = this
			 var form = {
				 latitude,
				 longitude
			 }
			 form.latitude = lat
			 form.longitude = lng
			 that.qqmapsdk.search({
				//关键字改成所需商家名称
				keyword: "读者小站",
				//自身经纬度对象
				location: that.form,
				distance: '5000',
				success: (res) =>{
				  for (var i = 0; i < res.data.length; i++) {
					that.markers.push({ // 获取返回结果，放到mks数组中
					  title: res.data[i].title,
					  id: res.data[i].id,
					  latitude: res.data[i].location.lat,
					  longitude: res.data[i].location.lng,
					})
				  }
				},
				fail: (err) => {
				  uni.showToast({
					   title: '无法获取商店位置!',
					   icon:'error',
					   duration:1500
				  });
				}
			 })
		},
		getDateNode(){
			let that = this;
		    var dateHours = new Date().getHours();
		    if(dateHours >= 10 && dateHours <20){
		        this.open = true
		    }else{
		        this.open = false
		    }
		},
		toDetail(id){
			uni.navigateTo({
				url:'/pages/station/station-detail?id=' + id,
			})
		},
		nearSearch(){
			let that = this
			uni.chooseLocation({
				success: function (res) {
					that.latitude = res.latitude
					that.longitude = res.longitude
					that.distanceCalculation(that.storeList)
				}
			})
		}
	}
}
</script>

<style lang="scss">
	.header{
		width: 100%;
		box-sizing: border-box;
		padding: 0 25rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 70rpx;
		.tabs{
			display: flex;
			.tab{
				font-size: 30rpx;
				margin-right: 20rpx;
				color: #000000;
				font-weight: bold;
			}
		}
		.search-input{
			width: 200rpx;
			height: 58rpx;
			background-color: #f5f5f5;
			border-radius: 29rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			color: #d1d1d1;
		}
	}
	.store-map{
		width: 100%;
		height: 520rpx;
		.current-icon{
			width: 50rpx;
			height: 50rpx;
			position: absolute;
			right: 18rpx;
			bottom: 35rpx;
		}
	}
	.collapse-area{
		width: 100%;
		height: 50rpx;
		padding: 100rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 25rpx;
		margin-bottom: -70rpx;
		color: #808A87;		
	}
	.store-list{
		width: 100%;
		box-sizing: border-box;
		height: calc(100vh - 700rpx);
		background-color: #f8f8f8;
		.store-box{
			background-color: #ffffff;
			padding: 25rpx;
			margin: 14rpx 25rpx;
			display: flex;
			align-items: center;
			.info-area{
				flex: 1;
				border-right: 1px solid #eeeeee;
				.name{
					font-size: 28rpx;
					font-weight: bold;
					margin-bottom: 12rpx;
				}
				.info{
					font-size: 20rpx;
					color: #808A87;
					margin-bottom: 12rpx;
				}
				.tag{
					display: inline-block;
					background-color: #FF0000;
					font-size: 18rpx;
					color: #fff;
					padding: 6rpx;
				}
			}
			.location-area{
				width: 112rpx;
				margin-left: 25rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.distance{
					font-size: 20rpx;
					color: #808A87;
					margin-bottom: 35rpx;
				}
				.action-area{
					width: 112rpx;
					display: flex;
					justify-content: space-around;
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
			}
		}
	}
</style>
