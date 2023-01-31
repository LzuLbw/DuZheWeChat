import request from '@/api/social/request.js';

import $store from '@/store/modules/social/test.js';
export default{
	publish(data) {
	  return request({
	    url: 'ry-vue/world/publish',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	articles(data) {
		console.log(data)
	  return request({
	    url: 'ry-vue/world/articles',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	article(data) {
	  return request({
	    url: 'ry-vue/world/article',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	likeArticle(data) {
	  return request({
	    url: 'ry-vue/world/like/article',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	postComment(data) {
		console.log(data)
	  return request({
	    url: 'ry-vue/world/comment/publish',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	likeComment(data) {
	  return request({
	    url: 'ry-vue/world/like/comment',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	comments(data) {
	  return request({
	    url: 'ry-vue/world/comments',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	}
	,
	deleteComment(data) {
	  return request({
	    url: 'ry-vue/world/comment/delete',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	personArticles(data) {
	  return request({
	    url: 'ry-vue/world/person/articles',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	deleteArticle(data) {
	  return request({
	    url: 'ry-vue/world/article/delete',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	},
	changeArticle(data) {
	  return request({
	    url: 'ry-vue/world/article/change',
	    method: 'POST',
	    data,
		header:{
			'content-type': 'application/json',
			'token': $store.state.token
		}
	  });
	}
}