// orderOpt.js
/**
 * Order Operations
 *
 * Set [All orders]
 * key: "orderIDX"
 * value: [{orid, type, state, priceTotal, priceToPay, pricePaid, des}, ...]
 *
 * List [Member-Topay-Orders]
 * key: "or:mid:{mid}"
 * value: [{orid, type, state, priceTotal, priceToPay, pricePaid, des}, ...]
 *
 * String [Order-if-expired]
 * key: "or:{orid}:alive"
 * value: '1'
 *
 * Set [Member-State-Orders]
 * key: "or:mid:{mid}:state:{state}"
 * value: [{orid, type, state, priceTotal, priceToPay, pricePaid, des}, ...]
 *
 * Hash
 * key: "or:{orid}"
 * fields: mid, type("reservation/prescription/exam/test"), generator, des(description), 
 *			state("unpaid/paid/expired/cancelled"), priceTotal, priceToPay, pricePaid, createTime
 */

var Q = require('q');
	redis = require('redis'),	
	redisclient = redis.createClient(),
	uuid = require('node-uuid');

exports.listTopayByMember = function (mid, callback) {
	redisclient.lrange('or:mid:' + mid, 0, -1, function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			callback(null, reply);
		}
	});
}

exports.getOrder = function(orid, callback) {
	redisclient.hgetall('or:' + orid, function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			callback(null, reply);
		}
	});
}

exports.generateOne = function (order, callback) {
	var mid = order.mid;
	var orid = uuid.v1();

	order.createTime = new Date();
	order.priceToPay = new Number((order.priceTotal * 0.08).toFixed(2));
	order.pricePaid = 0.00;
	order.state = 'unpaid';

	var orderPhrase = new Object();
	orderPhrase.orid = orid;
	orderPhrase.type = order.type;
	orderPhrase.state = 'unpaid';
	orderPhrase.priceTotal = new Number(order.priceTotal);
	orderPhrase.priceToPay = order.priceToPay;
	orderPhrase.pricePaid = order.pricePaid;
	orderPhrase.des = order.des;
	var orderStr = JSON.stringify(orderPhrase);

	var callstack = new Array();
	callstack[0] = Q.ninvoke(redisclient, 'hmset', 'or:' + orid, order);
	callstack[1] = Q.ninvoke(redisclient, 'sadd', 'orderIDX', orderStr);
	callstack[2] = Q.ninvoke(redisclient, 'sadd', 'or:mid:' + mid + ':state:unpaid', orderStr);
	callstack[3] = Q.ninvoke(redisclient, 'rpush', 'or:mid:' + mid, orderStr);
	callstack[4] = Q.ninvoke(redisclient, 'set', 'or:' + orid + ':alive', '1');
	callstack[5] = Q.ninvoke(redisclient, 'expire', 'or:' + orid + ':alive', 30 * 60);

	Q.all(callstack).then(function(data){
		//TODO
		if (true) {
			// data[0] = orid;
			callback(null, orid);
		} 
	});
}

exports.payOrder = function (orid, amount, callback) {

	redisclient.get('or:' + orid + ':alive', function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			if (reply === undefined || reply === null) {
				expireOrder(orid, function(err, result){
					//TODO
					if (err) {
						callback(err, null);
					} else {
						callback(null, 'expired');	
					}
				});
			} else {
				redisclient.hgetall('or:' + orid, function(err, reply){
					if (err) {
						callback(err, null);
					} else {
						var numpriceTotal = new Number(reply.priceTotal);
						var numpriceToPay = new Number(reply.priceToPay);
						var numpricePaid = new Number(reply.pricePaid);

						var orderPhrase = new Object();
						orderPhrase.orid = orid;
						orderPhrase.type = reply.type;
						orderPhrase.state = reply.state;
						orderPhrase.priceTotal = numpriceTotal;
						orderPhrase.priceToPay = numpriceToPay;
						orderPhrase.pricePaid = numpricePaid;
						orderPhrase.des = reply.des;
						var orderStr = JSON.stringify(orderPhrase);

						var orderPhraseNew = new Object();
						orderPhraseNew.orid = orid;
						orderPhraseNew.type = reply.type;
						orderPhraseNew.state = 'paid';
						orderPhraseNew.priceTotal = numpriceTotal;
						orderPhraseNew.priceToPay = numpriceToPay;
						orderPhraseNew.pricePaid = new Number(amount);
						orderPhraseNew.des = reply.des;
						var orderStrNew = JSON.stringify(orderPhraseNew);

						var callstack = new Array();
						callstack[0] = Q.ninvoke(redisclient, 'hmset', 'or:' + orid, 'state', 'paid');
						callstack[1] = Q.ninvoke(redisclient, 'lrem', 'or:mid:' + reply.mid, 0, orderStr);
						callstack[2] = Q.ninvoke(redisclient, 'srem', 'orderIDX', orderStr);
						callstack[3] = Q.ninvoke(redisclient, 'sadd', 'orderIDX', orderStrNew);
						callstack[4] = Q.ninvoke(redisclient, 'srem', 'or:mid:' + reply.mid +':state:unpaid', orderStr);
						callstack[5] = Q.ninvoke(redisclient, 'sadd', 'or:mid:' + reply.mid +':state:paid', orderStrNew);


						Q.all(callstack).then(function(data){
							//TODO
							if (true) {//final pay successfully
								callback(null, data);
							};
						});
					}
				});
			}
		}
	});
}

function expireOrder(orid, callback) {
	//TODO

	// 0 	hmset hash state-->"expired"
	// 1	lrem or:mid:{mid}
	// 2	srem orderIDX
	// 3	sadd orderIDX
	// 4 	srem or:mid:{mid}:state:unpaid
	// 5 	sadd or:mid:{mid}:state:expired

	redisclient.hgetall('or:' + orid, function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			var numpriceTotal = new Number(reply.priceTotal);
			var numpriceToPay = new Number(reply.priceToPay);
			var numpricePaid = new Number(reply.pricePaid);

			var orderPhrase = new Object();
			orderPhrase.orid = orid;
			orderPhrase.type = reply.type;
			orderPhrase.state = reply.state;
			orderPhrase.priceTotal = numpriceTotal;
			orderPhrase.priceToPay = numpriceToPay;
			orderPhrase.pricePaid = numpricePaid;
			orderPhrase.des = reply.des;
			var orderStr = JSON.stringify(orderPhrase);

			var orderPhraseNew = new Object();
			orderPhraseNew.orid = orid;
			orderPhraseNew.type = reply.type;
			orderPhraseNew.state = 'expired';
			orderPhraseNew.priceTotal = numpriceTotal;
			orderPhraseNew.priceToPay = numpriceToPay;
			orderPhraseNew.pricePaid = numpricePaid;
			orderPhraseNew.des = reply.des;
			var orderStrNew = JSON.stringify(orderPhraseNew);

			var callstack = new Array();
			callstack[0] = Q.ninvoke(redisclient, 'hmset', 'or:' + orid, 'state', 'paid');
			callstack[1] = Q.ninvoke(redisclient, 'lrem', 'or:mid:' + reply.mid, 0, orderStr);
			callstack[2] = Q.ninvoke(redisclient, 'srem', 'orderIDX', orderStr);
			callstack[3] = Q.ninvoke(redisclient, 'sadd', 'orderIDX', orderStrNew);
			callstack[4] = Q.ninvoke(redisclient, 'srem', 'or:mid:' + reply.mid +':state:unpaid', orderStr);
			callstack[5] = Q.ninvoke(redisclient, 'sadd', 'or:mid:' + reply.mid +':state:expired', orderStrNew);
			Q.all(callstack).then(function(data){
				//TODO
				if (true) {//final expire successfully
					callback(null, data);
				};
			});
		}
	});
}

exports.ifPayable = function (orid, callback) {

}

exports.expireOrder = expireOrder;















