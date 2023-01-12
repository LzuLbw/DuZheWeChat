import request from '@/api/social/request.js';


export default{
	get(data) {
	  return request({
	    url: 'ry-vue/message/get',
	    method: 'POST',
	    data,
	  });
	}
}
