// reservation.js
var resourceOpt = require('../models/resourceOpt');
var reservationOpt = require('../models/reservationOpt');
var orderOpt = require('../models/orderOpt');
var memberOpt = require('../models/memberOpt');

function reservationToOrderDes(fname, spname, wname, qname, rname, tp){
	return fname + spname + wname + qname + rname + tp;
}

exports.listunusedbymember = function(req, res) {
	memberOpt.isMember('wechat', req.session.openid, function(err, result){
		if (err) {
			//todo
			res.send('err');
		} else {
			var mid = '';
			mid = result;
			reservationOpt.listUnusedByMember(mid, function(err, result1){
				res.render('reservationlist', { reservations:result1, title:'全部预约单', mid:mid });
			});
		}
	});
}

exports.placeone = function(req, res) {

	var rid = req.body.rid;

	resourceOpt.attemptLockOne(rid, function(err, result){


		var response = new Object();

		if (err) {
			response.err = 'err';
			response.msg = '系统异常,稍候再尝试';
			res.send(response);
		} else if (result[0] === '-1') {
			response.err = 'warning';
			response.msg = result[1];
			res.send(response);
		} else {
			reservationOpt.placeOne(req.body, function(err, result1){
				if (err) {
					response.err = 'err';
					response.msg = '系统异常,稍候再尝试';
					res.send(response);
				} else {
					var rvid = result1; //result1 returns rvid of the reservation just placed
					var des = reservationToOrderDes(req.body.fname, req.body.spname, 
								req.body.wname, req.body.qname, req.body.rname, req.body.tp);

					var orderData = new Object();
					orderData.mid = req.body.mid;
					orderData.type = 'reservation';
					orderData.des = des;
					orderData.generator = rvid;
					orderData.priceTotal = req.body.price;

					orderOpt.generateOne(orderData, function(err, result2){
						if (err) {
							response.err = 'err';
							response.msg = '系统异常,稍候再尝试';
							res.send(response);
						} else {
							//Complete orid to reservation, the result will not affect response, not in one transaction
							reservationOpt.completeOrid(rvid, result2, function(err, result3){
								//do nothing
							});

							response.msg = 'OK';
							response.orid = result2;
							res.send(response); // final success, response {orid}
						}
					});
				}
			});
		}
	});
}