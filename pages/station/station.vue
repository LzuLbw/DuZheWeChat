<template>
	<view>
		<view class="header">
			<view class="tabs">
				<view class="tab">附近小站</view>
			</view>
			<input class="search-input" confirm-type="search" placeholder="搜索门店" type="text" />
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
			<view class="store-box" v-for="item in storeList" :key="item.id">
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
					<view class="distance" @s="getDistance(item.latitude,item.longitude)">距离{{distance}}km</view>
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
			distance: 0,
			open: true,
			storeList:[],
			lng:0,
			lat:0,
			markers: [{
				id:1,
				latitude:36.101722,
				longitude:103.629598,
				title:"读者小站-金城书房",
				iconPath:'/static/location.png',
				width:35,
				height:39
			},{
				id:2,
				latitude:36.08,
				longitude:103.62,
				title:"读者小站（五一菜市场店）",
				iconPath:'/static/location.png',
				width:35,
				height:39
			},{
				id:3,
				latitude:36.09,
				longitude:103.64,
				title:"读者小站-金城书房",
				iconPath:'/static/location.png',
				width:35,
				height:39
			},{
				id:4,
				latitude:36.10,
				longitude:103.61,
				title:"读者小站(中街社区)",
				iconPath:'/static/location.png',
				width:35,
				height:39
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
			}
		})
		
		
	},
	onShow() {
		this.getDateNode();
		this.fetchStoreList();
	},
	mounted() {
		this.distance = this.getDistance(this.lat,this.lng);
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
			const that = this;
			uni.request({
				url:'http://localhost:8080/readerstation/station/list',
				success: (res) => {
				    console.log(res.data.data);
					that.storeList = res.data.rows;
					// res.data.data.forEach(item =>{
					// 	that.lat = item.latitude;
					// 	that.lng = item.longitude;
					// 	that.distance = that.getDistance(that.lat,that.lng);
					// 	console.log(that.distance);
					//})
				}
			})
		},
		makeStoreList(data){
			//let storeList = [];
			
		},
		Rad(d) {
			return d * Math.PI / 180.0; 
		},
			/*
			 计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
			 默认单位km
			*/

			//根据金纬度计算距离
		getDistance(lat1, lng1) {
			var that = this;
			let lat2 = that.latitude;
			let lng2 = that.longitude;
			let rad1 = lat1 * Math.PI / 180.0;
			let rad2 = lat2 * Math.PI / 180.0;
			let a = rad1 - rad2;
			let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
			let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) *
				Math.cos(
					rad2) * Math.pow(
					Math.sin(b / 2), 2)));
			s = s * 6378.137;
			s = Math.round(s * 10000) / 10000;
			s = s.toString();
			s = s.substring(0, s.indexOf('.') + 2);
			return s
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
			width: 348rpx;
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
