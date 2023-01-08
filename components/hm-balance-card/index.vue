<template>
  <div class="hm-balance-card">
    <div class="box">
      <image class="layer" :src="options.layer" />
      <div class="hd">
        <text class="info">{{ options.info }}</text>
        <div class="wrap">
          <!-- <div class="empty" /> -->
          <image class="zhanghaoguanli" :src="options.zhanghaoguanli"  ></image>
		  <text class="cvv" @click="handleRecharge">充值</text>
        </div>
		
      </div>
	  
      <text class="bd">¥{{ options.bd }}</text>
      <text class="main">{{ options.main }}</text>
      <div class="ft">
        <div class="block">
          <text class="date">{{ options.date }}</text>
          <text class="word">{{ options.word }}</text>
        </div>
        <div class="group">
          <text class="cvv">{{ options.cvv }}</text>
          <text class="num">{{ options.num }}</text>
        </div>
		
		
		
        <!-- <image class="largeIcon" :src="options.largeIcon" /> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HmBalanceCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-balance-card'
    },
    options: {
      type: Object,
      default: function() {
        return {
		settingurl:'/pages/mine/wallet/voucher_center_/voucher_center_',
          layer:
            './images/img_25821_0_0.png',
          info: '信用卡余额',
          zhanghaoguanli:
            './images/img_25821_0_2.png',
          bd: '12929.05',
          main: '5326 5149 4497 1577',
          date: '日期',
          word: '12/24',
          cvv: 'CVV',
          num: '235',
          largeIcon:
            './images/img_25821_0_1.png'
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
	  routerItem(url){
	  	this.$tab.navigateTo(url)
	  	
	  },
	  handleRecharge() {
	    this.$tab.navigateTo('voucher_center_/voucher_center_')
	  }
  }
};
</script>
<style>
@import './index.response.css';
</style>
