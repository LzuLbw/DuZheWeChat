<template>
	<view
		class="wSelect"
		:class="show ? 'active' : ''"
		:style="{
			width: width,
			height: height,
			backgroundColor: bgColor,
			borderRadius: round ? '6rpx' : 'none'
		}"
	>
		<view @click="openSelect" class="pickerSelect">
			<view :style="{ height: height }" v-if="multiple" class="multipleChoice">
				<view
					class="defaultValue"
					:style="{ color: color }"
					v-if="!inputData && multiSelectList.length < 1"
				>
					{{ defaultValue }}
				</view>
				<view class="option" v-if="multiSelectList.length > 0">
					<view class="">{{ multiSelectList[0][valueName] }}</view>
					<image class="img" @click.stop="multiDelete" :src="refreshUrl" mode=""></image>
				</view>
				<view v-if="multiSelectList.length > 1" class="more">{{ multiLength }}</view>
				<input
					:disabled="!filterable"
					:style="{ height: height, paddingRight: '30rpx', fontSize: '28rpx', color: color }"
					@input="inputChange"
					type="text"
					v-model="inputData"
				/>
			</view>
			<input
				v-else
				:disabled="!filterable"
				:style="{ height: height, paddingRight: '30rpx', fontSize: '28rpx', color: color }"
				@input="inputChange"
				:placeholder="defaultValue"
				:placeholder-style="placeholderColor"
				type="text"
				v-model="inputData"
			/>
			<view v-if="!inputData || !showClose" :class="show ? 'arrow-up' : 'arrow'"></view>
			<view class="showClose" v-if="showClose && inputData">
				<image @click.stop="refreshValue" :src="refreshUrl" mode=""></image>
			</view>
			<view
				v-show="show"
				:class="isShow ? 'animation-top' : 'animation-bottom'"
				class="tips"
				:style="{ top: tipsPositon }"
			></view>
		</view>
		<!-- 单选时的下拉框 -->
		<view
			v-if="!multiple"
			:style="{ width: width, color: '#737478' }"
			v-show="show"
			:class="isShow ? 'animation-top' : 'animation-bottom'"
			class="content"
		>
			<view
				class="item"
				:class="value == item[valueName] ? 'choose' : ''"
				v-for="(item, index) in listData"
				:key="index"
				@click="clickSelect(item)"
			>
				{{ item[valueName] }}
			</view>
			<view class="item" v-if="listData.length < 1">无匹配项</view>
		</view>
		<!-- 多选的下拉框 -->
		<view
			v-else
			:style="{ width: width }"
			v-show="show"
			:class="isShow ? 'animation-top' : 'animation-bottom'"
			class="content"
		>
			<view
				class="item"
				:class="multiSelectList.find(res => res[valueName] == item[valueName]) ? 'choose' : ''"
				v-for="(item, index) in listData"
				:key="index"
				@click="multiSelect(item)"
			>
				{{ item[valueName] }}
			</view>
			<view class="item" v-if="listData.length < 1">无匹配项</view>
		</view>
		<view v-if="show" @click="closeContentSelect" class="contentMask"></view>
	</view>
</template>
<script>
export default {
	name: 'wSelect',
	props: {
		//是否多选
		multiple: {
			type: Boolean,
			default: false
		},
		//是否可搜索
		filterable: {
			type: Boolean,
			default: false
		},
		//是否显示关闭按钮
		showClose: {
			type: Boolean,
			default: true
		},
		width: {
			type: String,
			default: '300rpx'
		},
		color: {
			type: String,
			default: '#606266'
		},
		placeholderColor: {
			type: String,
			default: 'color:#bcbec4'
		},
		bgColor: {
			type: String,
			default: '#fff'
		},
		height: {
			type: String,
			default: '60rpx'
		},
		//默认显示的内容
		defaultValue: {
			type: String,
			default: '请选择'
		},
		//显示的内容
		valueName: {
			type: String,
			required: true
		},
		list: {
			type: Array,
			default: () => [],
			required: true
		},
		//双向绑定的值
		value: {
			default: ''
		},
		round: {
			type: Boolean,
			default: true
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(newValueData) {
				if (!this.inputData) {
					this.inputData = newValueData
				}
			}
		}
	},
	data() {
		return {
			show: false,
			isShow: false,
			multiSelectList: [],
			inputData: '',
			listData: this.list,
			refreshUrl:
				'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPjxwYXRoIGQ9Ik0yNCA0NEMzNS4wNDU3IDQ0IDQ0IDM1LjA0NTcgNDQgMjRDNDQgMTIuOTU0MyAzNS4wNDU3IDQgMjQgNEMxMi45NTQzIDQgNCAxMi45NTQzIDQgMjRDNCAzNS4wNDU3IDEyLjk1NDMgNDQgMjQgNDRaIiBmaWxsPSJub25lIiBzdHJva2U9IiM3YzZlNmUiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yOS42NTY5IDE4LjM0MzFMMTguMzQzMiAyOS42NTY4IiBzdHJva2U9IiM3YzZlNmUiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTE4LjM0MzIgMTguMzQzMUwyOS42NTY5IDI5LjY1NjgiIHN0cm9rZT0iIzdjNmU2ZSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4='
		}
	},
	computed: {
		multiLength() {
			const length = this.multiSelectList.length - 1
			return '+' + length
		},
		tipsPositon() {
			let num = this.height.replace('rpx', '')
			let numAdd = Number(num) + Number(10)
			return numAdd + 'rpx'
		}
	},
	methods: {
		openSelect() {
			this.listData = this.list
			if (this.show === true) {
				this.isShow = false
			} else {
				this.isShow = true
			}
			setTimeout(() => {
				this.show = !this.show
			}, 200)
		},
		clickSelect(item) {
			this.$emit('input', item[this.valueName])
			this.inputData = item[this.valueName]
			this.$emit('change', item)
			this.show = false
		},
		inputChange(e) {
			console.log(e.detail.value)
			let value = e.detail.value
			this.$emit('input', value)
			if (value) {
				this.listData = this.listData.filter(item => item[this.valueName].includes(value))
			} else {
				this.listData = this.list
			}
		},
		multiSelect(item) {
			let index = this.multiSelectList.findIndex(res => res[this.valueName] == item[this.valueName])
			if (index > -1) {
				this.multiSelectList.splice(index, 1)
			} else {
				this.multiSelectList.push(item)
			}
			this.inputData = ''
			this.listData = this.list
			this.$emit('input', this.multiSelectList)
			this.$emit('change', item)
		},
		refreshValue() {
			this.$emit('input', '')
			this.inputData = ''
			this.listData = this.list
			this.$emit('change', '')
			this.show = false
		},
		multiDelete() {
			this.multiSelectList.splice(0, 1)
			this.$emit('input', this.multiSelectList)
			if (this.multiSelectList.length < 1) {
				this.show = false
			}
		},
		closeContentSelect() {
			this.isShow = false
			setTimeout(() => {
				this.show = false
			}, 200)
		}
	}
}
</script>
<style lang="scss" scoped>
.wSelect {
	border: 2rpx solid #dcdfe6;
	transition: all 0.5s;

	.pickerSelect {
		border-radius: 6rpx;
		padding: 0 20rpx;
		position: relative;
		transition: all 0.6s;
		display: flex;
		align-items: center;
		input {
			flex: 1;
		}
		.tips {
			position: absolute;
			margin-left: 30rpx;
			width: 0;
			height: 0;
			border-bottom: 12rpx solid #fff;
			border-left: 12rpx solid transparent;
			border-right: 12rpx solid transparent;
			z-index: 1000;
		}
		.showClose {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			right: 14rpx;
			top: 50%;
			transform: translateY(-50%);

			image {
				width: 100%;
				height: 100%;
			}
		}

		.arrow {
			transition: all 0.3s;
			position: absolute;
			top: 44%;
			right: 20rpx;
			border-left: 2rpx solid #999999;
			border-bottom: 2rpx solid #999999;
			height: 16rpx;
			width: 16rpx;
			transform: translateY(-50%) rotate(-45deg);
			-webkit-transform: translateY(-50%) rotate(-45deg);
			border-right: 2rpx solid transparent;
			border-top: 2rpx solid transparent;
			display: inline-block;
		}

		.arrow-up {
			@extend .arrow;
			transform: rotate(-235deg);
		}
		.multipleChoice {
			display: flex;
			align-items: center;
			input {
				flex: 1;
			}
			.defaultValue {
				position: absolute;
				left: 20rpx;
			}
			.option {
				display: flex;
				align-items: center;
				background-color: #f4f4f5;
				border-radius: 10rpx;
				font-size: 24rpx;
				color: #aa93b1;
				padding: 6rpx 12rpx;
				.img {
					margin-left: 4rpx;
					width: 30rpx;
					height: 30rpx;
				}
			}

			.more {
				background-color: #f4f4f5;
				border-radius: 10rpx;
				font-size: 24rpx;
				color: #aa93b1;
				margin-left: 10rpx;
				padding: 6rpx 12rpx;
			}
		}
	}

	.content {
		position: absolute;
		margin-top: 20rpx;
		padding: 20rpx;
		border-radius: 4px;
		background-color: #fff;
		box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
		z-index: 999;
		max-height: 300rpx;
		overflow-y: auto;

		.item {
			padding: 10rpx;
			height: 60rpx;
			line-height: 40rpx;
			margin-bottom: 10rpx;
		}

		.choose {
			background-color: #f5f7fa;
			color: #409eff;
			font-weight: 700;
		}
	}

	.animation-top {
		animation-name: slide-top;
		animation-duration: 0.5s;
		animation-timing-function: ease-out;
		animation-fill-mode: both;
	}
	.animation-bottom {
		animation-name: slide-bottom;
		animation-duration: 0.2s;
		animation-timing-function: ease-out;
		animation-fill-mode: both;
	}

	@keyframes slide-top {
		0% {
			opacity: 0;
			transform: translateY(-20%);
		}

		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@keyframes slide-bottom {
		0% {
			opacity: 1;
			transform: translateY(0);
		}

		100% {
			opacity: 0;
			transform: translateY(-20%);
		}
	}
}
.active {
	border: 2rpx solid #409eff;
}
.contentMask {
	position: fixed;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	z-index: 998;
}
</style>
