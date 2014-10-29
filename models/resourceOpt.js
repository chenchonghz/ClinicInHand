// resourceOpt.js
/**
 * Resource Operations
 *
 * List [queue - resources] (available)
 * key: "r:qid:[qid]"
 * value: [{"rid":rid(uuid), "name":name, "date":date, "start":start, "stop":stop, "price":price, "type":type}, ...]
 * 
 * Set [window - resources] (available)---------------------------------deprecated
 * key: "r:wid:[wid]"
 * value: [{"rid":rid(uuid),"name":name}, ...]
 *
 * Set [specialty - resources] (available)------------------------------deprecated
 * key: "r:spid:[spid]"
 * value: [{"rid":rid(uuid),"name":name}, ...] 
 *
 * Set [facility - resources] (available)-------------------------------deprecated
 * key: "r:fid:[fid]"
 * value: [{"rid":rid(uuid),"name":name}, ...] 
 *
 * Set [state - resources]
 * key: "r:state:[state]"
 * value: [{"rid":rid(uuid), "name":name, "date":date, "start":start, "stop":stop, "price":price, "type":type}, ...]
 *
 * Hash [Resource detail]
 * key: r:[rid]
 * fields: "name", "qid", wid", "spid", "fid", "state"(normal/pause/close/expired/out), "type"(regular/expert), 
 *			"mdid", "date"(type of date), "start"(start time in hour), "stop"(stop time in hour)
 *			"price", "quantity"
 */

var Q = require('q');
	redis = require('redis'),	
	redisclient = redis.createClient(),
	uuid = require('node-uuid');


//TODO
function attemptLockOne(rid, callback) {
	
	redisclient.hmget('r:' + rid, 'state', 'quantity', function(err, reply){
		var callstack = new Array();

		if (err) {
			callback(err, null);
		} else {
			var state = reply[0];
			var quantity = reply[1];
			if (state === 'normal') {

				callstack[0] = Q.ninvoke(redisclient, 'HINCRBY', 'r:' + rid, 'quantity', -1);
				if (quantity == 1 || quantity == '1') {
					callstack[1] = Q.ninvoke(redisclient, 'hset', 'r:' + rid, 'state', 'out');
					// callstack[2] = Q.ninvoke(redisclient, 'smove' );
				}
				Q.all(callstack).then(function(data){
					if (true) {
						callback(null, data);
					};
				});
			} else {
				var data = new Array();
				data[0] = -1;
				data[1] = state;
				callback(null, data); // if state != 'normal' attempt fail even if there is no error
			}
		}
	});
}



//TODO
function unlockOne() {

}

exports.listByQueue = function(qid, callback) {
	redisclient.lrange('r:qid:' + qid, 0, -1, function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			callback(null, reply);
		}
	});
}

exports.create = function(obj, callback) {

	var rid = uuid.v1();
	var callstack = new Array();
	callstack[0] = Q.ninvoke(redisclient, 'hmset', 'r:' + rid, obj);

	var resourcePhrase = new Object();
	resourcePhrase.rid = rid;
	resourcePhrase.name = obj.name;
	resourcePhrase.date = obj.date;
	resourcePhrase.start = obj.start;
	resourcePhrase.stop = obj.stop;
	resourcePhrase.price = obj.price;
	resourcePhrase.type = obj.type;

	callstack[1] = Q.ninvoke(redisclient, 'rpush', 'r:qid:' + obj.qid, JSON.stringify(resourcePhrase));

	if (obj.state && obj.state != '') {
		callstack[2] = Q.ninvoke(redisclient, 'sadd', 'r:state:' + obj.state, JSON.stringify(resourcePhrase));
	} else {
		callstack[2] = null;
	}

	Q.all(callstack).then(function(data){
		callback(data);
	});
}

exports.attemptLockOne = attemptLockOne;

exports.clearResourceByQueue = function(qid, callback){

}

exports.changeResourceState = function(rid, from, to, callback) {

}

exports.decrResourceByQueue = function(qid, callback){

}



