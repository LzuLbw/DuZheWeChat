<template>
	<div class="test-component">
		<hm-balance-card :options="options"></hm-balance-card>
		
	</div>
	
	
	
	
</template>
<script>
	import {
		getUserProfile
	} from "@/api/system/user"
	import HmBalanceCard from '@/pagesD/mine/components/hm-balance-card/index.vue'
	import {
		listUser_wallet,
		getUser_wallet,
		delUser_wallet,
		addUser_wallet,
		updateUser_wallet
	} from "@/api/readerstation-member/user_wallet";

	export default {

		components: {
			HmBalanceCard
		},
		data() {
			return {
				user: {
					userId: "",
					nickName: "",
					phonenumber: "",
					email: "",
					sex: ""
				},
				form: {
					// userId: 'null',
					// walletIncome: null,
					// walletOutcome: null,
					// balanceFee: 'null',
					// checkSign: null,
					// updateAt: null
				},
				options: {
					layer: 'https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/mine/img_25821_0_0.png',
					info: '余额',
					zhanghaoguanli: 'https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/mine/img_25821_0_2.png',
					bd: '12929.05',
					main: '5326 5149 4497 1577',
					date: '日期',
					word: '12/24',
					cvv: 'CVV',
					num: '235',
					largeIcon: 'https://reader-station.oss-cn-hangzhou.aliyuncs.com/images/mine/img_25821_0_1.png'
				}
			};
		},
		onLoad() {
			this.getUser_info()
		},
		methods: {
			getUser_info() {
				// alert(this.user.nickName)
				getUserProfile().then(response => {
					this.user = response.data
					this.getUser_info_sub(this.user.userId)
				})
			},
			getUser_info_sub(userID) {
				// let that = this
				// alert(this.form)
				getUser_wallet(userID).then(response => {
					let res = response.data
					if(res == null){
						this.form.userId = this.user.userId
						addUser_wallet(this.form).then(response => {
							this.form = response.data;
							this.updatePage()
						});
					}else{
						this.form = response.data;
						this.updatePage()
					}
					// alert(response.status_code)
					
				});
			},
			updatePage() {
				// alert(1)
				this.options.main = this.user.phonenumber
				// alert(this.form.userId)
				this.options.bd = this.form.balanceFee

				// this.saveOrUpdate()
			},



			// onClick: function(e) {
			// 	if (this.form.userId != null) {
			// 		updateUser_wallet(this.form).then(response => {
			// 			this.$modal.msgSuccess("修改成功");
			// 			this.open = false;
			// 			this.getList();
			// 		});
			// 	} else {
			// 		addUser_wallet(this.form).then(response => {
			// 			this.$modal.msgSuccess("新增成功");
			// 			this.open = false;
			// 			this.getList();
			// 		});
			// 	}
			// 	console.log('onClick');
			// }
		}
	};
</script>
<style>
</style>
