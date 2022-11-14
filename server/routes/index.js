var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');

// 设置允许跨域访问该服务
router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Headers', 'mytoken');
	next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.get('/api/goods/id', function(req, res, next) {
	let id = req.query.id;
	connection.query("select * from goods_search where id = " + id + "", function(error, results, fields) {
		if (error) throw error;
		res.send({
			code: "0",
			data: results
		});
	});
});

router.get('/api/goods/list', function(req, res, next) {
	let id = req.query.id;
	connection.query("select * from goods_search ", function(error, results, fields) {
		if (error) throw error;
		res.send({
			code: "0",
			data: results
		});
	});
});

router.get('/api/goods/category', function(req, res, next) {
	connection.query("select * from category_list", function(error, results, fields) {
		if (error) throw error;
		res.send({
			code: "0",
			data: results
		});
	});
});

router.get("/api/goods/search", function(req, res, next) {
	//获取对象的key
	let [goodsName, orderName] = Object.keys(req.query);
	//name参数的值
	let name = req.query.name;
	//orderName的key值
	let order = req.query[orderName];

	connection.query("select * from goods_search where name like '%" + name + "%' order by " + orderName + " " +
		order + "",
		function(error, results, fields) {
			if (error) throw error;
			res.send({
				code: "0",
				data: results
			});
		});
});

//地址选择
router.post("/api/shop/selectAddress", function(req, res, next) {
	let userId = req.body.userId;
	console.log(userId);
	connection.query("select * from goods_address where user_id = " + userId + "",
		function(error, results, fields) {
			if (error) throw error;
			console.log(res);
			res.send({
				code: "0",
				data: results
			});
		});
});

//新增收获地址
router.post("/api/shop/addAddress", function(req, res, next) {
	let userId = req.body.userId;
	let name = req.body.name;
	let head = req.body.head;
	let tel = req.body.tel;
	let province = req.body.province;
	let city = req.body.city;
	let district = req.body.district;
	let detailed = req.body.detailed;
	let isDefault = req.body.isDefault;
	let sqlInsert =
		'insert into goods_address (name,head,tel,province,city,district,detailed,isDefault,user_id) values ("' +
		name + '","' + head + '","' + tel + '","' + province + '","' + city + '","' + district + '","' +
		detailed + '","' + isDefault + '","' + userId + '")'
	connection.query(sqlInsert,
		function(error, results, fields) {
			if (error) throw error;
			res.send({
				data: {
					success: "成功"
				}
			});
		});
});

//修改收货地址
router.post("/api/shop/editAddress", function(req, res, next) {
	let id = req.body.id;
	let userId = req.body.userId;
	let name = req.body.name;
	let head = req.body.head;
	let tel = req.body.tel;
	let province = req.body.province;
	let city = req.body.city;
	let district = req.body.district;
	let detailed = req.body.detailed;
	let isDefault = req.body.isDefault;
	let updateSql =
		'update goods_address set name = ?,head =?,tel = ?,province = ?,city = ?,district = ?,detailed = ?,isDefault = ?,user_id = ? where id = ' +
		id + ''
	connection.query(updateSql, [name, head, tel, province, city, district, detailed, isDefault, userId],
		function(error, results, fields) {
			if (error) throw error;
			res.send({
				data: {
					success: "成功"
				}
			});
		});
});

//获取当前用户购物车列表
router.post("/api/goods/selectCart", function(req, res, next) {
	let userId = req.body.userId;
	connection.query('select * from goods_cart where uid = ' + userId + '',
		function(error, results, fields) {
			if (error) throw error;
			res.send({
				code: "0",
				data: results
			});
		});
});

//修改购物车数据
router.post("/api/goods/updateNumCart", function(req, res, next) {
	let userId = req.body.userId;
	let goodsId = req.body.goodsId;
	let num = req.body.num;
	connection.query('select * from goods_cart where uid = ' + userId + ' and goods_id = ' + goodsId + ' ',
		function(error, results, fields) {
			let goods_num = results[0].goods_num;
			let id = results[0].id;
			connection.query('update goods_cart set goods_num = replace(goods_num, ' + goods_num + ' , ' +
				num + ') where id = ' + id + '',
				function(err, result) {
					if (err) throw error;
					res.json({
						data: {
							success: true
						}
					})
				});
		});
});

//新增购物车数据
router.post("/api/goods/addCart", function(req, res, next) {
	let userId = req.body.userId;
	let goodsId = req.body.goodsId;
	let num = req.body.num;
	console.log(goodsId);
	connection.query('select * from goods_search where id = ' + goodsId + '',
		function(error, results, fields) {
			let name = results[0].name;
			let imgUrl = results[0].imgUrl;
			let nprice = results[0].nprice;
			connection.query('select * from goods_cart where uid = ' + userId + ' and goods_id = ' +
				goodsId + ' ',
				function(err, result, fields) {
					if (result.length > 0) {
						let id = result[0].id;
						let goods_num = result[0].goods_num;
						let newNum = parseInt(goods_num) + parseInt(num);
						connection.query('update goods_cart set goods_num = replace(goods_num, ' +
							goods_num + ' , ' + newNum + ') where id = ' + id + '',
							function(e, r) {
								if (e) throw error;
								res.json({
									data: {
										success: "加入成功"
									}
								})
							});
					} else {
						connection.query(
							'insert into goods_cart (uid,goods_id,name,imgUrl,nprice,goods_num,selected) values ("' +
							userId + '","' + goodsId + '","' + name + '","' + imgUrl + '","' +
							nprice + '","' + num + '","false")',
							function(e, r, fields) {
								if (e) throw error;
								res.json({
									data: {
										success: "加入成功"
									}
								})
							});
					}
				});
		});
});

//删除购物车数据
router.post("/api/goods/deleteCart", function(req, res, next) {
	let goodsId = req.body.goodsId;
	console.log(goodsId);
	for (var i = 0; i < goodsId.length; i++) {
		connection.query('delete from goods_cart where id = ' + goodsId[i] + '',
			function(error, results, fields) {
				if (error) throw error;
				return res.send({
					data: {
						success: true
					}
				})
			});
	}
});

//生成订单
router.post("/api/goods/addOrder", function(req, res, next) {
	let userId = req.body.userId;
	let goodsArr = req.body.arr;
	console.log(goodsArr);
	//生成订单号
	function setTimeDateFmt(s) {
		return s < 10 ? '0' + s : s;
	}

	function orderNumber() {
		const now = new Date();
		let fullYear = now.getFullYear();
		let month = setTimeDateFmt(now.getMonth() + 1);
		let day = setTimeDateFmt(now.getDate());
		let hour = setTimeDateFmt(now.getHours());
		let minutes = setTimeDateFmt(now.getMinutes());
		let seconds = setTimeDateFmt(now.getSeconds());
		let orderCode = fullYear + month + day + hour + minutes + seconds + (Math.round(Math.random()* 1000000));
		return orderCode;
	}
	let goodsName = [];
	let goodsPrice = 0;
	let goodsNum = 0;
	let orderId = orderNumber();
	goodsArr.forEach(v=>{
		goodsName.push(v.name);
		goodsNum += parseInt(v.goods_num);
		goodsPrice += v.goods_num*v.nprice;
	})
	console.log(goodsName);
	console.log(goodsNum);
	console.log(goodsPrice);
	console.log(orderId);
	connection.query(
		'insert into goods_order (uid,order_id,goods_name,goods_price,goods_num,order_status) values ("' +
		userId + '","' + orderId + '","' + goodsName + '","' + goodsPrice + '","' + goodsNum + '","false")',
		function(error, results, fields) {
			if (error) throw error;
			res.send({
				data:{
					code:200,
					success:true,
					data:results
				}
				
			})
		});

});

//请求首页轮播图及推荐图片
router.get('/api/goods/swiper', function(req, res, next) {
	connection.query("select * from goods_swiper", function(error, results, fields) {
		if (error) throw error;
		res.send({
			code: "0",
			data: results
		});
	});
});

module.exports = router;
