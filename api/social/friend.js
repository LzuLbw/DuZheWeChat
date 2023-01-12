import request from '@/api/social/request.js';

import $store from '@/store/modules/social/test.js';
export default{
	getList(data) {
	  return request({
	    url: 'ry-vue/friend/getList',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	edit(data) {
	  return request({
	    url: 'ry-vue/friend/edit',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	}
}
