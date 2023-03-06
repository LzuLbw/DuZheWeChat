var express = require('express');
var router = express.Router();
var connection = require('../db/sql.js');
const alipaySdk = require('../db/alipay.js')
const { listen } = require('../app.js');
const AlipayFormData = require('alipay-sdk/lib/form').default;

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

router.get('/api/goods/CategoryList', function(req, res, next) {
	let categoryId = req.query.categoryId;
	connection.query("select * from goods_search where categoryId = "+categoryId+"", function(error, results, fields) {
		if (error) throw error;
		res.send({
			code: "0",
			data: results
		});
	});
});

router.get('/api/goods/CatList', function(req, res, next) {
	let catId = req.query.catId;
	connection.query("select * from goods_search where cat_id = "+catId+"", function(error, results, fields) {
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
	let goodsIdList = goodsId.split(",");
	console.log(goodsIdList);
	for (var i = 0; i < goodsIdList.length; i++) {
		connection.query('delete from goods_cart where id = ' + goodsIdList[i] + '',
			function(error, results) {});
	}
	res.send({
		data: {
			success: true
		}
	})
});

//生成订单
router.post("/api/goods/addOrder", function(req, res, next) {
	let userId = req.body.userId;
	let goodsName = req.body.goodsName;
	let goodsPrice = req.body.goodsPrice;
	let goodsNum = req.body.goodsNum;
	
	//生成当前时间
	function getNowTime() {
	    let date = new Date();
	    //年 getFullYear()：四位数字返回年份
	    let year = date.getFullYear();  //getFullYear()代替getYear()
	    //月 getMonth()：0 ~ 11
	    let month = date.getMonth() + 1;
	    //日 getDate()：(1 ~ 31)
	    let day = date.getDate();
	    //时 getHours()：(0 ~ 23)
	    let hour = date.getHours();
	    //分 getMinutes()： (0 ~ 59)
	    let minute = date.getMinutes();
	    //秒 getSeconds()：(0 ~ 59)
	    let second = date.getSeconds();
	    let time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
		return time;
	}
	
	function addZero(s) {
	    return s < 10 ? ('0' + s) : s;
	}
	
	let createTime = getNowTime();
	// 生成订单号
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
		let orderCode = fullYear + month + day + hour + minutes + seconds + (Math.round(Math.random() *
			1000000));
		return orderCode;
	}
	let orderId = orderNumber();
	console.log(orderId);
	connection.query(
		'insert into goods_order (uid,order_id,goods_name,goods_price,goods_num,order_status,create_time) values ("' +
		userId + '","' + orderId + '","' + goodsName + '","' + goodsPrice + '","' + goodsNum + '","1","' + createTime + '")',
		function(error, results, fields) {
			connection.query(
				'select * from goods_order where uid = ' + userId + ' and order_id = ' + orderId + '',
				function(err, result) {
					res.send({
						data: {
							code: 200,
							success: true,
							data: result
						}
					})
				});
		});

});

//修改全部订单状态
router.post('/api/shop/submitOrder', function(req, res, next) {
	//用户id
	let userId = req.body.userId;
	//订单编号
	let orderId = req.body.orderId;
	//购物车中选中的商品
	let shopArr = req.body.shopArr;
	let goodsid = req.body.goodsid;
	let goodsName = req.body.goodsName;
	let goodsUrl = req.body.goodsUrl;
	console.log(goodsUrl);
	let goodsPrice = req.body.goodsPrice;
	let goodsNum = req.body.goodsNum;
	//收货地址
	let receiverName = req.body.name;
	let receiverPhone = req.body.tel;
	let receiverProvince = req.body.province;
	let receiverCity = req.body.city;
	let receiverDistrict = req.body.district;
	let receiverDetail = req.body.detailed;
	let shopArrList = shopArr.split(",");
	let goodsidList = goodsid.split(",");
	let goodsNameList = goodsName.split(",");
	let goodsUrlList = goodsUrl.split(",");
	let goodsPriceList = goodsPrice.split(",");
	let goodsNumList = goodsNum.split(",");
	
	//生成当前时间
	function getNowTime() {
	    let date = new Date();
	    //年 getFullYear()：四位数字返回年份
	    let year = date.getFullYear();  //getFullYear()代替getYear()
	    //月 getMonth()：0 ~ 11
	    let month = date.getMonth() + 1;
	    //日 getDate()：(1 ~ 31)
	    let day = date.getDate();
	    //时 getHours()：(0 ~ 23)
	    let hour = date.getHours();
	    //分 getMinutes()： (0 ~ 59)
	    let minute = date.getMinutes();
	    //秒 getSeconds()：(0 ~ 59)
	    let second = date.getSeconds();
	    let time = year + '-' + addZero(month) + '-' + addZero(day) + ' ' + addZero(hour) + ':' + addZero(minute) + ':' + addZero(second);
		return time;
	}
	
	function addZero(s) {
	    return s < 10 ? ('0' + s) : s;
	}
	
	let payTime = getNowTime();
	console.log(payTime);
	
	connection.query('select * from goods_order where uId = ' + userId + ' and order_id = ' + orderId + '',
		function(error, results) {
			//订单的id
			let id = results[0].id;
			connection.query('update goods_order set receiver_name = "'+receiverName+'",receiver_phone ="'+receiverPhone+'",receiver_province = "'+receiverProvince+'",receiver_city = "'+receiverCity+'",receiver_district = "'+receiverDistrict+'",receiver_detail = "'+receiverDetail+'",pay_time = "'+payTime+'" ,order_status = 2 where id = ' +
				id + '',
				function() {
					shopArrList.forEach(v => {
						console.log(v);
						connection.query('delete from goods_cart where id = ' + v + '',
							function() {

							})
					})
				});
			
		})
	for(var i=0; i< goodsidList.length;i++){
		connection.query('insert into goods_order_item (order_id,goods_id,goods_name,goods_imgUrl,goods_nprice,goods_num) values ("' +
		orderId + '","' + goodsidList[i] + '","' + goodsNameList[i] + '","' + goodsUrlList[i] + '","' + goodsPriceList[i] + '","' + goodsNumList[i] + '")',
			function() {
		
			})
	}
	res.send({
		data: {
			code: 200,
			success: true
		}
	})
})

//支付接口
router.post("/api/shop/payment", function(req, res, next) {
	const formData = new AlipayFormData();
	//订单号
	let orderId = req.body.orderId;
	let orderName = req.body.orderName;
	let price = req.body.price;
	console.log(orderId);
	const bizContent = {
		outTradeNo: orderId, //订单号
		productCode: 'FAST_INSTANT_TRADE_PAY', //写死的
		totalAmount: price, //金额
		subject: orderName //商品名称
	};
	//调用get方法
	formData.setMethod('get'),
		//支付时 的信息
		formData.addField('bizContent', JSON.stringify(bizContent));
	//支付成功或者失败打开的页面
	formData.addField('returnUrl', 'http://www.xuexiluxian.cn/');
	const result = alipaySdk.exec(
		'alipay.trade.page.pay', {}, {
			formData: formData
		},
	);
	result.then(resp => {
		res.send({
			data: {
				code: 200,
				success: true,
				paymentUrl: resp
			}
		})
	})
});

//请求全部订单数据
router.post("/api/shop/selectAllOrders", function(req, res, next) {
	let userId = req.body.userId;
	connection.query('select a.uid,a.receiver_name,a.receiver_phone,a.receiver_province,a.receiver_city,a.receiver_district,a.receiver_detail,a.goods_price,a.order_id,a.order_status,a.create_time,a.pay_time,b.goods_id,b.goods_name,b.goods_imgUrl,b.goods_nprice,b.goods_num from goods_order a join goods_order_item b on a.order_id=b.order_id where a.uid = ' + userId + '',
		function(error, results, fields) {
			if (error) throw error;
			res.send({
				code: "0",
				data: results
			});
		});
});

//请求订单数据
router.post("/api/shop/selectOrders", function(req, res, next) {
	let userId = req.body.userId;
	let orderStatus = req.body.orderStatus;
	connection.query('select a.uid,a.receiver_name,a.receiver_phone,a.receiver_province,a.receiver_city,a.receiver_district,a.receiver_detail,a.goods_price,a.order_id,a.order_status,a.create_time,a.pay_time,b.goods_id,b.goods_name,b.goods_imgUrl,b.goods_nprice,b.goods_num from goods_order a join goods_order_item b on a.order_id=b.order_id where a.uid = ' + userId + ' and a.order_status = '+orderStatus+'',
		function(error, results, fields) {
			if (error) throw error;
			res.send({
				code: "0",
				data: results
			});
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
