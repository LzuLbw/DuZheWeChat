import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
	  user,
	  cart,
	  path,
	  order,
	  test
	},
	getters,
	state: {
		hasLogin: false,
		userInfo: {},
	},
	mutations: {
		login(state, provider) {

			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
	
	}
})

//购物车
import cart from './modules/shop/cart.js'
//地址管理
import path from './modules/shop/path.js'
//订单管理
import order from './modules/shop/order.js'
// export default new Vuex.Store({
// 	modules:{
// 		cart,
// 		path,
// 		order
// 	}
// })
import test from './modules/social/test.js'
export default store
