// order.js
var orderOpt = require('../models/orderOpt');
var reservationOpt = require('../models/reservationOpt');
var memberOpt = require('../models/memberOpt');

exports.leadtoone = function(req, res) {
	var action = req.query.action;
	var orid = req.query.orid;
	var itemKey = req.query.item;
	if (itemKey === 'bloodtest') {
		res.render('pushtopay', {title:'收费项目'});
	} else {
		orderOpt.getOrder(orid, function(err, result){
			result.orid = orid;
			if (action === 'pay') {
				res.render('topayone', { order:result, style:'embedded', from:req.query.from });	
			}
		});
	}

	
}

exports.listtopaybymember = function(req, res) {
	memberOpt.isMember('wechat', req.session.openid, function(err, result){
		if (err) {
			//todo
			res.send('err');
		} else {
			var mid = '';
			mid = result;
			orderOpt.listTopayByMember(mid, function(err, result1){
				res.render('orderlist', { orders:result1, title:'待付款', mid:mid });
			});
		}
	});
}

exports.pay = function(req, res) {
	var orid = req.body.orid;
	var amount = req.body.amount;
	var orderType = req.body.orderType;
	var generator = req.body.generator;


	orderOpt.payOrder(orid, amount, function(err, result){
		if (err) {
			res.send('err');
		} else {
			if (result === 'expired') {
				res.send('expired');
			} else {
				//TODO
				if (orderType === 'reservation') {
					reservationOpt.enableReservation(generator, function(err, result1){
						if (err) {
							res.send('err');
						} else {
							res.send(result.concat(result1));
						}
					});
				} 
			}			
		}
	});

}