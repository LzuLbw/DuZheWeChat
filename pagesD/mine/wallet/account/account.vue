<template>
    <view class="bg-gray-50" style="min-height: 100vh">
        <view class="bg text-white">
            <view class="u-p-t-40 u-p-r-30 u-p-l-30" style="text-align: center;color: rgb(245,205,138); ">
                <view class="u-font-3xl u-m-r-10  font-bold" >
                    10 <text class="u-font-xs">.02</text>  </view>
                <view class="u-font-sm">我的余额(元)</view>
            </view>

        </view>

        <view class="bg-white rounded-sm u-m-l-30 u-m-r-30 overflow-hidden shadow-sm" style="margin-top: -60rpx  ">
            <view class="u-row-between u-p-30">
                <view class="font-bold u-font-xl text-gray-800">默认账户</view>
            </view>

            <view style="border-top: 1rpx solid #f7f7f7">

                <view class="u-flex u-row-between u-m-t-25 u-m-b-25">
                    <view style="flex: 1" class="u-p-l-20">
                        <view class="u-p-20  font-bold"  style="color: rgb(230,191,125)">
                                <text>￥</text>
                                <text class="u-font-3xl">0</text>
                                <text>.02</text>
                        </view>
                        <view class="u-flex  u-row-between text-gray-500 u-p-l-20">
                            <text class="u-font-sm">本金：￥0.02</text>
                            <text class="u-font-sm">赠额：￥0.02</text>
                        </view>

                    </view>
                    <view style="width:270rpx ;text-align: center" >
                        <u-button type="warning" @click="recharge"  :customStyle="customStyle"  size="mini" shape="circle" >
                            充 值
                        </u-button>
                    </view>
                </view>

            </view>

            <view style="border-top: 1rpx solid #f7f7f7">

                <view class="u-flex">
                    <view hover-class="bg-gray-50" class="u-p-t-30 u-p-b-30 " style="border-right: 1rpx solid #f7f7f7;width: 50%;text-align: center">
                        查看明细
                    </view>
                    <view hover-class="bg-gray-50" class="u-p-t-30 u-p-b-30 " style="width: 50%;text-align: center">
                        查看权益
                    </view>
              </view>
            </view>

        </view>

    </view>
</template>

<script>
	export default {
		data() {
			return {
                 customStyle:{
                     width: '160rpx',
                     background:'rgb(219,180,117)'
            }
			}
		},
		methods: {
            recharge(){
                this.$u.route({url: 'pages/self/widget/recharge'})
            }
		}
	}
</script>

<style scoped>
.bg{
    height: 280rpx;
    background:rgb(73,73,73);
}

</style>