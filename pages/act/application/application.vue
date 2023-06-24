<template>
	<view>
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<u-notice-bar :text="text1" color="#ffffff" bgColor="#f56c6c"></u-notice-bar>
			</view>
		</view>
		<!-- 申请发布活动页面 -->

		<view class="mainmain">

			<!-- 活动主标题 -->
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动主标题：</text>
				<u--input prefixIcon="star-fill" placeholder="请输入活动主标题" border="surround" v-model="maintitlevalue"
					@change="change" clearable>
				</u--input>
			</view>

			<!-- 活动副标题 -->
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动副标题：</text>
				<u--input prefixIcon="tags-fill" placeholder="请输入活动副标题" border="surround" v-model="subtitlevalue"
					@change="change" clearable>
				</u--input>
			</view>

			<!-- 活动类型 -->

			<view style="display: flex;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动类型：</text>
				<view style="margin-left: 12px;margin-top: 8px;">
					<u-radio-group v-model="radiovalue1" placement="row" @change="groupChange">
						<u-radio activeColor="green" :customStyle="{marginLeft: '15px'}"
							v-for="(item, index) in radiolist1" :key="index" :label="item.name" :name="item.name"
							@change="radioChange">
						</u-radio>
					</u-radio-group>
				</view>
			</view>

			<!-- 活动介绍【详情】 -->

			<view style="display: flex;justify-content: center;margin: 10px;">
				<text style="margin-top: 8px;margin-right: 10px;">活动详情：</text>
				<u--textarea v-model="value2" placeholder="请输入活动详情介绍" count autoHeight></u--textarea>
			</view>

			<!-- 活动企业名称 -->
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动企业名称：</text>
				<u--input prefixIcon="home-fill" placeholder="请输入活动企业名称" border="surround" v-model="enterprisevalue"
					@change="change" clearable>
				</u--input>
			</view>

			<!-- 活动报名开始时间 -->

			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">报名开始时间：</text>
				<uni-datetime-picker type="datetime" v-model="datetimesingleRegistrationStartTime"
					@change="changeLog" />
			</view>

			<!-- 活动报名结束时间 -->

			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">报名结束时间：</text>
				<uni-datetime-picker type="datetime" v-model="datetimesingleRegistrationEndTime" @change="changeLog" />
			</view>

			<!-- 活动进行开始时间 -->

			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动开始时间：</text>
				<uni-datetime-picker type="datetime" v-model="datetimesingleStartTime" @change="changeLog" />
			</view>

			<!-- 活动进行结束时间 -->

			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动结束时间：</text>
				<uni-datetime-picker type="datetime" v-model="datetimesingleEndTime" @change="changeLog" />
			</view>

			<!-- 活动海报上传 -->
			<view style="display: flex;justify-content: center;height: 80px;margin: 10px;">
				<text style="margin-top: 8px;">活动海报图片：</text>
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="1" :previewFullImage="true" deletable uploadText="活动海报"></u-upload>
			</view>


			<!-- 活动人数 -->
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动人数：</text>
				<u--input prefixIcon="plus-people-fill" placeholder="请输入活动人数上限" border="surround" v-model="peoplemax"
					@change="change" clearable>
				</u--input>
			</view>

			<!-- 活动发起人 -->
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动发起人：</text>
				<u--input prefixIcon="account-fill" placeholder="请输入活动发起人姓名" border="surround" v-model="sponsor"
					@change="change" clearable>
				</u--input>
			</view>

			<!-- 活动发起人联系方式 -->
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">发起人联系方式：</text>
				<u--input prefixIcon="phone-fill" placeholder="请输入活动发起人联系方式" border="surround" v-model="sponsorContact"
					@change="change" clearable>
				</u--input>
			</view>

			<!-- 活动详细举办地点 -->
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动详细举办地点：</text>
				<u--input prefixIcon="map-fill" placeholder="请输入活动详细举办地点" border="surround" v-model="realplace"
					@change="change" clearable>
				</u--input>

				<!--  -->
			</view>

			<!-- 活动注意事项 -->

			<view style="display: flex;justify-content: center;margin: 10px;">
				<text style="margin-top: 8px;margin-right: 10px;">活动注意事项：</text>
				<u--textarea v-model="matters" placeholder="请输入活动注意事项" count autoHeight></u--textarea>
			</view>

			<!-- 			活动附件【难点】
			<view style="display: flex;justify-content: center;height: 80px;margin: 10px;">
				<text style="margin-top: 8px;">活动附件：</text><br />
				<uni-file-picker limit="5" file-mediatype="all" title="最多选择5个文件"></uni-file-picker>
				https://blog.csdn.net/weixin_57844432/article/details/126757467

			</view> -->

			<!-- 活动归属小站 -->
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动归属小站：</text>
				<uni-data-select v-model="belongtostation" :localdata="range" @change="change"></uni-data-select>
			</view>


			<!-- 			活动归属小站
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动归属小站：</text>
				<u--input placeholder="请输入活动地点" border="surround" v-model="belongtostation" @change="change" clearable>
				</u--input>
			</view> -->


			<!-- 活动举办省市 -->
			<!-- 			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动举办省市：</text>
				<u--input placeholder="请输入举办省市" border="surround" v-model="city" @change="change" clearable>
				</u--input>
			</view> -->

			<!-- 			
			<view style="display: flex;justify-content: left;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动举办省市：</text>
				<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<text style="background-color:darkmagenta; color: aliceblue;">点击选择</text>
				</pick-regions>
			</view>
			
			<view style="display: flex;justify-content: left;height: 35px;margin: 10px;">
				<text style="margin-top: 100px;">当前选择省市区为: {{regionName}}</text>
			</view> -->

			<view style="display: flex;justify-content: left;height: 50px;margin: 10px;">
				<view style="margin-bottom: 10px;">
					<view style="display: flex;justify-content: left">
						<text>活动举办省市：</text>
						<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
							<text style="background-color:darkmagenta; color: aliceblue;">点击选择</text>
						</pick-regions>
					</view>
					<view style="margin: 15px;"></view>
					<view style="margin-top: 10px;margin-bottom: 10px">
						<text style="margin-top: 100px;">当前选择省市区为: {{regionName}}</text>
					</view>
				</view>
			</view>
			<!-- 票价信息 -->

			<view style="display: flex;justify-content: left;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动是否收费：</text>
				<text v-if="!chargevalue" style="margin-top: 8px;margin-right: 8px;">免费</text>
				<view style="margin-top: 4px;">
					<u-switch v-model="chargevalue" @change="chargechange"></u-switch>
				</view>
				<text v-if="chargevalue" style="margin-top: 8px; margin-left: 8px;">收费</text>
			</view>

			<!-- 如果收费，添加票价信息 -->
			<view v-if="chargevalue" style="display: flex;justify-content: left;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">编辑各类票价：</text>
				<view style="margin-top: 6px;">
					<u-button text="新增票价种类" size="mini" type="warning" style="color: aliceblue;"
						@click="addDomain"></u-button>
				</view>

			</view>

			<view v-if="chargevalue" style="margin: 10px;">

				<!-- 票价们 -->
				<view v-for="(domain, index) in domains" style="height: 250rpx;display: flex; flex-wrap: wrap;">
					<view style="width: 100%;display: flex;">
						<text>票价 {{index}}</text>

						<u-button text="删除" size="mini" style="width: 40rpx;" @click="removeDomain(domain)"></u-button>
					</view>

					<view style="width: 100%">
						<u--input placeholder="请输入金额" type="digit" border="surround" v-model="domain.value"></u--input>
					</view>

					<view style="width: 100%;">
						<u--input placeholder="请输入票种描述" border="surround" v-model="domain.desc"></u--input>
					</view>

				</view>

			</view>

			<!-- 单人限购数量 -->
			<view style="display: flex;justify-content: left;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">单人限购数量：</text>
				<u-number-box v-model="ticketvalue" @change="valChange" :min="1" :max="20"></u-number-box>
			</view>



			<!-- 场次信息 -->
			<view style="display: flex;justify-content: left;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动场次：</text>
				<text v-if="!sessionvalue" style="margin-top: 8px;margin-right: 8px;">单场次</text>
				<view style="margin-top: 4px;">
					<u-switch v-model="sessionvalue" @change="sessionchange"></u-switch>
				</view>
				<text v-if="sessionvalue" style="margin-top: 8px; margin-left: 8px;">多场次</text>
			</view>

			<!-- 如果单场次，添加唯一场的信息 -->
			<!-- 如果多场次，添加场次信息 -->
			<view v-if="!sessionvalue"
				style="display: flex;justify-content: left;height: 220rpx;margin: 10px; flex-wrap: wrap;">


				<view style="margin-bottom: 20rpx;">
					<text style="margin-top: 8px;">编辑单场次：</text>
					<text>场次 0</text>
				</view>

				<view>
					<uni-datetime-picker v-model="singlesessioninfo.value" type="datetimerange" rangeSeparator="至" />
					<view style="width: 100%;margin-top: 10rpx;">
						<u--input placeholder="请输入此场次举办地点" border="surround"
							v-model="singlesessioninfo.location"></u--input>
					</view>
				</view>

			</view>

			<!-- 如果多场次，添加场次信息 -->
			<view v-if="sessionvalue" style="display: flex;justify-content: left;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">编辑多场次：</text>

				<view style="margin-top: 6px;">
					<u-button text="新增场次信息" size="mini" type="warning" @click="addsessiondomain"></u-button>
				</view>

			</view>

			<view v-if="sessionvalue" style="margin: 10px;">

				<!-- 场次们 -->
				<view v-for="(sessiondomain, index) in sessionsdomains"
					style="height: 270rpx;display: flex;flex-wrap: wrap;">
					<text>场次 {{index }}</text>
					<u-button text="删除" size="mini" style="width: 20rpx;"
						@click="removesessionDomain(sessiondomain)"></u-button>

					<view>
						<uni-datetime-picker v-model="sessiondomain.value" type="datetimerange" rangeSeparator="至" />
						<view style="width: 100%;margin-top: 10rpx;">
							<u--input placeholder="请输入此场次举办地点" border="surround"
								v-model="sessiondomain.location"></u--input>
						</view>
					</view>

				</view>

			</view>


			<!-- <u-button text="提交申请" @click="submit('dynamicForm')"></u-button> -->

			<!-- 			<button class="button popup-success" @click="testform"><text
					class="button-text success-text">提交申请</text></button>
					
			<view style="height: 100rpx;"></view> -->

			<button class="button popup-success" @click="dialogToggle('success')"><text
					class="button-text success-text">提交申请</text></button>

			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog :type="msgType" cancelText="取消" confirmText="确认" title="请仔细检查信息" content="确定立即申请吗？"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>

			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>



			<view style="margin-bottom: 15px;height: 10px;"> <text></text> </view>

		</view>


	</view>
</template>

<script>
	// import * as qiniu from 'qiniu-js';
	import $store from '@/store/modules/social/test.js';
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	
	import axios from 'axios'
	
	export default {
		components: {
			pickRegions
		},
		data() {
			return {

				singlesessioninfo: {
					value: '',
					location: '',
				},

				// 单人限购数量
				ticketvalue: 0,

				// 票价信息:
				domains: [],

				// 场次信息【单场次】
				// 场次信息【多场次】
				sessionsdomains: [],

				region: [],
				defaultRegion: ['甘肃省', '兰州市', '榆中县'],
				defaultRegionCode: '620123',

				range: [],

				uid: 0,
				uname: '',

				msgType: 'success',
				messageText: '申请成功',


				text1: '当前版本暂不支持附件文件类型上传, 如需上传，请联系管理员',


				// 活动主标题
				maintitlevalue: "",
				// 活动副标题
				subtitlevalue: "",
				radiolist1: [{
						name: '线上活动',
						disabled: false
					},
					{
						name: '线下活动',
						disabled: false
					}
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				radiovalue1: '线上活动',

				// 活动描述
				value2: '',
				// 公司名
				enterprisevalue: '',

				// 四个时间
				datetimesingleRegistrationStartTime: '',
				datetimesingleRegistrationEndTime: '',
				datetimesingleStartTime: '',
				datetimesingleEndTime: '',

				fileList1: [],
				fileList2: [],
				picurl: "",
				peoplemax: "",
				sponsor: "",
				sponsorContact: "",
				realplace: "",
				place: "",
				matters: "",

				belongtostation: "",
				city: "",
				stations: [],


				// 活动是否收费
				chargevalue: false,
				// 活动是否多场次
				sessionvalue: false,

			}
		},

		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			},


		},

		onLoad() {



			this.$store.dispatch('GetInfo').then(res => {
				console.log("当前正在申请发布活动的用户名：", res.user.nickName);
				this.uname = res.user.nickName;
				console.log("当前正在申请发布活动的用户的ID为", res.user.userId);
				this.uid = res.user.userId;
			});

			// 初始化小站列表
			console.log("当前所有已有小站名单: ");
			uni.request({
				url: 'http://123.56.217.170:8080/actActivity/belongto/station',
				method: 'GET',
				data: {},
				success: res => {
					// console.log(res.data);
					console.log(res.data.data);

					this.stations = res.data.data;

					for (let i = 0; i < this.stations.length; i++) {
						console.log(this.stations[i]);

						// 放入准备好的range数组
						let item = {
							value: this.stations[i],
							text: this.stations[i]
						};
						this.range.push(item);
					}

					console.log(this.range);
				},
				fail: () => {},
				complete: () => {}
			});


		},

		onShow() {
			console.log(uni.$u.config.v);
		},


		methods: {


			testform() {
				console.log("场次信息: ====================");
				console.log(this.sessionsdomains);
				console.log("价格信息: ====================");
				console.log(this.domains);
				console.log(this.chargevalue ? "收费活动" : "免费活动");
				console.log(this.sessionvalue ? "多场次活动" : "单场次活动");

				console.log("单场次活动信息: ========================");
				console.log(this.singlesessioninfo);
			},

			addsessiondomain() {
				this.sessionsdomains.push({
					value: '',
					location: this.realplace,
					key: Date.now()
				});
			},

			removesessionDomain(item) {
				var index = this.sessionsdomains.indexOf(item);
				if (index != -1) {
					this.sessionsdomains.splice(index, 1)
				}

				// 如果场次已经减到1场了，开关自动跳到单场次
				if (this.sessionsdomains.length == 1) {
					this.sessionvalue = false;

					// 并且自动把当前多场次剩下那场赋给单场次信息
					this.singlesessioninfo.value = this.sessionsdomains[0].value;
					this.singlesessioninfo.location = this.sessionsdomains[0].location;

				}
			},

			removeDomain(item) {
				var index = this.domains.indexOf(item);
				if (index != -1) {
					this.domains.splice(index, 1)
				}

				if (this.domains.length == 0) { // 如果价格信息都已经删完了，说明是个免费活动，开关自己跳回去
					this.chargevalue = false;
				}
			},

			valChange(e) {
				console.log(e.value);
				this.ticketvalue = e.value;
			},

			addDomain() {
				this.domains.push({
					value: '',
					desc: '',
					key: Date.now()
				});
			},

			// 是否多场次开关变化
			sessionchange() {
				console.log(this.sessionvalue);

				// 从单场次开到多场次时，如果单场次有信息，直接拿过来作为多场次的第一个
				this.sessionsdomains.length = 0;
				if (this.singlesessioninfo.value != '') {
					this.sessionsdomains.push({
						value: this.singlesessioninfo.value,
						location: this.singlesessioninfo.location,
						key: Date.now()
					});
				}

			},

			// 是否收费开关变化
			chargechange(e) {
				// console.log(e);
				console.log(this.chargevalue);
			},


			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region;
				console.log(region);
				// this.city = region;

				var res = "";
				for (let i = 0; i < region.length; i++) {
					console.log(region[i].name);
					res += region[i].name;
					res += " ";
				}

				console.log(res);
				this.city = res;
			},


			submit() {
				// console.log("点击了提交按钮");
				// console.log(this.maintitlevalue);
				// console.log(this.subtitlevalue);

				// console.log(this.radiovalue1);
				// console.log(this.value2);

				// console.log(this.enterprisevalue);

				// console.log(this.datetimesingleRegistrationStartTime);
				// console.log(this.datetimesingleRegistrationEndTime);
				// console.log(this.datetimesingleStartTime);
				// console.log(this.datetimesingleEndTime);

				// console.log(this.picurl);
				// console.log(this.peoplemax);
				// console.log(this.sponsor);

				// console.log(this.sponsorContact);

				// console.log(this.place);

				// console.log(this.matters);
				let activityCharge = this.chargevalue ? 1 : 0;
				let activityMultiplesessions = this.sessionvalue ? 1 : 0;

				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/user/activity',
					method: 'POST',
					data: {
						"activityId": null,
						"activityMaintitle": this.maintitlevalue,
						"activitySubtitle": this.subtitlevalue,
						"activityType": this.radiovalue1,
						"activityDesc": this.value2,
						"activityEnterprise": this.enterprisevalue,
						"activityStatus": 0,
						"activityRegistrationstarttime": this.datetimesingleRegistrationStartTime,
						"activityRegistrationendtime": this.datetimesingleRegistrationEndTime,
						"activityStarttime": this.datetimesingleStartTime,
						"activityEndtime": this.datetimesingleEndTime,
						"activityPicurl": this.picurl,
						"activitityNumbernum": this.peoplemax,
						"activitySponsor": this.sponsor,
						"activitySponsorcontact": this.sponsorContact,
						"activityPlace": this.realplace,
						"activityReviewstatus": 0,
						"activityMatters": this.matters,
						"activityAttachment": "当前版本暂不支持手机端上传附件，请联系管理员",
						"activityAttribution": this.uid,
						"activityAttrusername": this.uname,
						"activityBelongtostation": this.belongtostation,
						"activityCity": this.city,
						"activityPurchasenumber": this.ticketvalue,
						"activityCharge": activityCharge,
						"activityMultiplesessions": activityMultiplesessions

					},
					success: res => {
						console.log(res.data);

						let actid = res.data;

						// 这里拿到的数据是返回的活动ID, 我们接着根据这个id 为此活动添加价格信息和场次信息
						// 如果是收费活动才调用这个方法:
						if (this.chargevalue) {
							this.addpriceitem(actid)
						}

						// 单场次多场次活动都要调用此方法进行场次新增
						this.addsessionitem(actid);

					},
					fail: () => {},
					complete: () => {}
				});

			},


			// 请求添加价格信息的方法【活动是收费时才进行调用】
			addpriceitem(actid) {

				console.log(this.domains)
				if (!this.chargevalue) {
					console.log("这是一个免费活动")
				} else {
					console.log("这是一个收费活动, 票价种类信息如下: ")
					// console.log(this.domains)

					var postdata = [];

					for (let i = 0; i < this.domains.length; i++) {
						let item = {
							"actid": actid,
							"price": this.domains[i].value,
							"pricedescription": this.domains[i].desc
						};

						postdata.push(item)
					}

					console.log(postdata);
					// axios.post("http://123.56.217.170:8080/actActivity/addPriceitem", postdata).then(res => {
					// 	console.log(res);
					// })
					
					uni.request({
						url: 'http://123.56.217.170:8080/actActivity/addPriceitem',
						method: 'POST',
						data: {
							postdata
						},
						success: res => {
							console.log(res);
						},
						fail: () => {},
						complete: () => {}
					});
					

					// axios.post("http://123.56.217.170:8080/actActivity/addPriceitem", postdata).then(res => {

					// })
				}
			},

			// 请求添加场次信息的方法
			addsessionitem(actid) {
				if (this.sessionvalue) {
					console.log("这是一个多场次活动");

					var postsessiondata = [];
					// console.log(this.sessionsdomains)

					for (let i = 0; i < this.sessionsdomains.length; i++) {
						let item = {
							"actid": actid,
							"sessionname": "场次" + i,
							"sessionstartdatetime": this.sessionsdomains[i].value[0],
							"sessionenddatetime": this.sessionsdomains[i].value[1],
							"location": this.sessionsdomains[i].location
						}
						postsessiondata.push(item)
					}
					console.log(postsessiondata);
					
					uni.request({
						url: 'http://123.56.217.170:8080/actActivity/addSessionItem',
						method: 'POST',
						data: {
							postsessiondata
						},
						success: res => {
							console.log(res);
						},
						fail: () => {},
						complete: () => {}
					});

					// axios.post("http://123.56.217.170:8080/actActivity/addSessionItem", postdata).then(res => {
					// 	console.log(res)
					// })

				} else {
					console.log("这是一个单场次活动")

					var postsessiondata = [];
					console.log(this.singlesessioninfo.value[0])
					console.log(this.singlesessioninfo.value[1])

					let item = {
						"actid": actid,
						"sessionname": "场次1",
						"sessionstartdatetime": this.singlesessioninfo.value[0],
						"sessionenddatetime": this.singlesessioninfo.value[1],
						"location": this.singlesessioninfo.location
					}

					postsessiondata.push(item);

					// uni.request({
					// 	url: 'http://123.56.217.170:8080/actActivity/addSessionItem',
					// 	method: 'POST',
					// 	data: {
					// 		postsessiondata
					// 	},
					// 	success: res => {
					// 		console.log(res)
					// 	},
					// 	fail: () => {},
					// 	complete: () => {}
					// });

					// axios.post("http://123.56.217.170:8080/actActivity/addSessionItem", postsessiondata).then(res => {
					// 	console.log(res)
					// })
					
					uni.request({
						url: 'http://123.56.217.170:8080/actActivity/addSessionItem',
						method: 'POST',
						data: {
							postsessiondata
						},
						success: res => {
							console.log(res);
						},
						fail: () => {},
						complete: () => {}
					});

				}
			},

			dialogConfirm() {
				console.log('点击确认');
				this.submit();
				this.messageText = `申请成功！^_^`
				this.$refs.message.open()
			},
			dialogClose() {
				console.log('点击关闭')
			},

			change(e) {
				// console.log('change', e);
			},
			groupChange(n) {
				// console.log('groupChange', n);
			},
			radioChange(n) {
				// console.log('radioChange', n);
			},
			changeLog(e) {
				console.log('change事件:', e);
			},

			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://123.56.217.170:8080/common/upload',
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {

							console.log(res);
							url = JSON.parse(res.data).fileName;

							// console.log(eval(res.data));

							console.log("要存的url为：" + url);
							this.picurl = url;

							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			dialogToggle(type) {
				this.msgType = type
				this.$refs.alertDialog.open()
			},
		}
	}
</script>

<style lang="scss">
	@mixin flex {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	@mixin height {
		/* #ifndef APP-NVUE */
		height: 100%;
		/* #endif */
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
	}

	.box {
		@include flex;
	}

	.button {
		@include flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		height: 35px;
		margin: 0 5px;
		border-radius: 5px;
	}

	.example-body {
		background-color: #fff;
		padding: 10px 0;
	}

	.button-text {
		color: #fff;
		font-size: 12px;
	}

	.popup-content {
		@include flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		height: 50px;
		background-color: #fff;
	}

	.popup-height {
		@include height;
		width: 200px;
	}

	.text {
		font-size: 12px;
		color: #333;
	}

	.popup-success {
		color: #fff;
		background-color: #e1f3d8;
	}

	.popup-warn {
		color: #fff;
		background-color: #faecd8;
	}

	.popup-error {
		color: #fff;
		background-color: #fde2e2;
	}

	.popup-info {
		color: #fff;
		background-color: #f2f6fc;
	}

	.success-text {
		color: #09bb07;
	}

	.warn-text {
		color: #e6a23c;
	}

	.error-text {
		color: #f56c6c;
	}

	.info-text {
		color: #909399;
	}

	.dialog,
	.share {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.dialog-box {
		padding: 10px;
	}

	.dialog .button,
	.share .button {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		margin: 0;
		margin-top: 10px;
		padding: 3px 0;
		flex: 1;
	}

	.dialog-text {
		font-size: 14px;
		color: #333;
	}


	.mainmain {
		margin: 10px;
	}

	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>