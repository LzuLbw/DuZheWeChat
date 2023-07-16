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
			<view class="store-box" v-for="item in storeList" :key="item.id">
				<view class="info-area" @click="toDetail(item.id)" >
					<view class="name">{{item.name}}</view>
					<view class="info">{{item.location}}</view>
					<view class="info">{{item.openTime}}</view>
					<!--  #ifndef  MP -->
					<!-- <view class="tag" :style="open ? 'background-color: '#FF0000'' : 'background-color: '#C0C0C0''"> -->
					<view class="tag" :style="{backgroundColor:open?'#FF0000': '#C0C0C0'}">
					{{open? '营业中' : '已关门'}}
					</view>
					 <!-- #endif -->
					<!--  #ifdef  MP -->
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
			markers: []
		}
	},
	onLoad:function(options){
		let that = this;
		uni.getLocation({
			type:'gcj02',
			success(res) {
				const latitude = res.latitude
				const longitude = res.longitude
				console.log(latitude,longitude)
				that.fetchStoreList(longitude, latitude);
				that.setData({
					latitude,
					longitude
				})
			}
		})
		
		
		
	},
	onShow() {
		this.getDateNode();
		
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
		fetchStoreList(longitude, latitude){
			var that = this;
			uni.request({
				url:'http://210.26.122.22:8080/readerstation/list',
				data:{
					x:longitude,
					y:latitude
				},
				success: (res) => {
					var mks = []
					var point = []
					console.log(res.data)
					for (var i = 0; i < res.data.data.length; i++) {
						mks.push({
							id:res.data.data[i].id,
							name:res.data.data[i].name,
							location:res.data.data[i].location,
							latitude:res.data.data[i].latitude,
							longitude:res.data.data[i].longitude,
							openTime:res.data.data[i].openTime,
							phone:res.data.data[i].phone,
							distance:res.data.data[i].distance
						})
					}
					function compare(property) {
					  return function (a, b) {
					    var value1 = a[property];
					    var value2 = b[property];
					    return value1 - value2;
					  }
					}
				
					for (var i = 0; i < res.data.data.length; i++) {
						point.push({
							id:res.data.data[i].id,
							title:res.data.data[i].name,
							latitude:res.data.data[i].latitude,
							longitude:res.data.data[i].longitude,
							iconPath:'../../static/location.png',
							width:30,
							height:30
						})
					}
				that.storeList = mks.sort(compare("distance"))
				that.markers = point
				}
			})
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
