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


<!-- 			活动举办省市
			<view style="display: flex;justify-content: center;height: 35px;margin: 10px;">
				<text style="margin-top: 8px;">活动举办省市：</text>
				<u--input placeholder="请输入举办省市" border="surround" v-model="city" @change="change" clearable>
				</u--input>
			</view> -->
			
			
			
			<view style="margin-bottom: 20px;">
				<view style="display: flex;">
					<text>活动举办省市：</text>
					<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
						<text style="background-color:darkmagenta; color: aliceblue;">点击选择</text>
					</pick-regions>
				</view>
				<view style="margin-top: 10px;margin-bottom: 10px">
					<text style="margin-top: 100px;">当前选择省市区为: {{regionName}}</text>
				</view>
			</view>


			<!-- <u-button text="提交申请" @click="submit('dynamicForm')"></u-button> -->

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

	export default {
		data() {
			return {
				
				region: [],
				defaultRegion: ['甘肃省', '兰州市', '榆中县'],
				defaultRegionCode: '620123',
				regionName: "",

				contentAck: '当前活动的审核状态',
				range: [],

				activitydata: {},

				actid: 0,

				msgType: 'success',
				messageText: '申请成功',


				text1: '当前版本暂不支持附件文件类型上传, 如需上传，请联系管理员',
				maintitlevalue: "",
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

				value2: '',
				enterprisevalue: '',
				datetimesingleRegistrationStartTime: '',
				datetimesingleRegistrationEndTime: '',
				datetimesingleStartTime: '',
				datetimesingleEndTime: '',

				fileList1: [],
				picurl: "",
				peoplemax: "",
				sponsor: "",
				sponsorContact: "",
				place: "",
				matters: "",
				belongtostation: "",
				city: "",
				stations: []
			}
		},
		
		computed: {
		},

		onLoad: function(e) {
			console.log("初始化编辑活动申请页面==========================>>>>>>>>>>>>>>>>");

			console.log(e);
			console.log(e.actid);
			this.actid = e.actid;

			// 'http://localhost:8080/actActivity/' + this.Activityid
			uni.request({
				url: 'http://123.56.217.170:8080/actActivity/' + e.actid,
				method: 'GET',
				data: {},
				success: res => {
					console.log(res.data.data);
					

					this.activitydata = res.data.data;
					this.regionName = this.activitydata.activityCity;

					this.belongtostation = this.activitydata.activityBelongtostation;
					this.city = this.activitydata.activityCity;

					this.maintitlevalue = this.activitydata.activityMaintitle;
					this.subtitlevalue = this.activitydata.activitySubtitle;

					this.radiovalue1 = this.activitydata.activityType;
					this.value2 = this.activitydata.activityDesc;

					this.enterprisevalue = this.activitydata.activityEnterprise;
					this.datetimesingleRegistrationStartTime = this.activitydata
						.activityRegistrationstarttime;
					this.datetimesingleRegistrationEndTime = this.activitydata.activityRegistrationendtime;
					this.datetimesingleStartTime = this.activitydata.activityStarttime;
					this.datetimesingleEndTime = this.activitydata.activityEndtime;

					this.picurl = this.activitydata.activityPicurl;

					let listurl = {
						url: this.picurl
					}

					this.fileList1.push(listurl);

					this.peoplemax = this.activitydata.activitityNumbernum;
					this.sponsor = this.activitydata.activitySponsor;
					this.sponsorContact = this.activitydata.activitySponsorcontact;
					this.realplace = this.activitydata.activityPlace;

					this.matters = this.activitydata.activityMatters;
					
					



					if (this.activitydata.activityReviewstatus == 1) {

						this.contentAck = "当前活动已通过审核，再次申请需要重新经过审核，确定提交吗？";
					} else if (this.activitydata.activityReviewstatus == 0) {

						this.contentAck = "确认信息无误了吗？"
					} else if (this.activitydata.activityReviewstatus == 2) {
						this.contentAck = "确认信息无误了吗？"

					}



				},
				fail: () => {},
				complete: () => {}
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

		methods: {
			
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
				this.regionName = res;
				this.city = res;
			},
			
			
			submit(ref) {
				// console.log("点击了提交按钮");

				console.log(this.maintitlevalue);
				console.log(this.subtitlevalue);

				console.log(this.radiovalue1);
				console.log(this.value2);

				console.log(this.enterprisevalue);

				console.log(this.datetimesingleRegistrationStartTime);
				console.log(this.datetimesingleRegistrationEndTime);
				console.log(this.datetimesingleStartTime);
				console.log(this.datetimesingleEndTime);

				console.log(this.picurl);
				console.log(this.peoplemax);
				console.log(this.sponsor);

				console.log(this.sponsorContact);

				console.log(this.place);

				console.log(this.matters);

				console.log("=====================");
				console.log(this.actid);

				uni.request({
					url: 'http://123.56.217.170:8080/actActivity/activity',
					method: 'PUT',
					data: {
						"activityId": this.actid,
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
						"activityPicUrl": this.activitydata.activityPicUrl,
						"activitityNumbernum": this.peoplemax,
						"activitySponsor": this.sponsor,
						"activitySponsorcontact": this.sponsorContact,
						"activityReviewstatus": 0,
						"activityPlace": this.realplace,
						"activityMatters": this.matters,
						"activityAttachment": "当前版本暂不支持手机端上传附件，请联系管理员",
						"activityAttribution": this.uid,
						"activityAttrusername": this.uname,
						"activityBelongtostation": this.belongtostation,
						"activityCity": this.city,
					},
					success: res => {
						console.log(res.data);
					},
					fail: () => {},
					complete: () => {}
				});

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
						url: 'http://123.56.217.170/dev-api/common/upload',
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
							this.activitydata.activityPicUrl = url;

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
