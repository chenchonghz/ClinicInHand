// queueOpt.js

/**
 * Queue Operations
 * 
 * Set [window - queues]
 * key: "q:wid:[wid]"
 * value: [{"qid":qid(uuid),"name":name}, ...]
 *
 * Set [type - queues]
 * key: "q:type:[type]"
 * value: [{"qid":qid(uuid),"name":name}, ...]
 *
 * Set [state - queues]
 * key: "q:state:[state]"
 * value: [{"qid":qid(uuid),"name":name}, ...]
 *
 * Hash [Window detail]
 * key: q:[qid]
 * fields: "name", "wid", "spid", "fid", "state"(normal/pause/close/out), "type"(regular/expert), "price"
 */


var Q = require('q');
	redis = require('redis'),	
	redisclient = redis.createClient(),
	uuid = require('node-uuid');

exports.listByWindow = function(wid, callback) {
	redisclient.smembers('q:wid:' + wid, function(err, reply){
		callback(err, reply);
	});
}

exports.listAvailableByWindow = function(wid, callback) {
	redisclient.sinter('q:wid:' + wid, 'q:state:normal', function(err, reply){
		callback(err, reply);
	});
}

exports.create = function(obj, callback) {

	var qid = uuid.v1();
	var callstack = new Array();
	callstack[0] = Q.ninvoke(redisclient, 'hmset', 'q:' + qid, obj);

	var queuePhrase = new Object();
	queuePhrase.qid = qid;
	queuePhrase.name = obj.name;

	callstack[1] = Q.ninvoke(redisclient, 'sadd', 'q:wid:' + obj.wid, JSON.stringify(queuePhrase));

	if (obj.type && obj.type != '') {
		callstack[2] = Q.ninvoke(redisclient, 'sadd', 'q:type:' + obj.type, JSON.stringify(queuePhrase));
	} else {
		callstack[2] = null;
	}

	if (obj.state && obj.state != '') {
		callstack[3] = Q.ninvoke(redisclient, 'sadd', 'q:state:' + obj.state, JSON.stringify(queuePhrase));
	} else {
		callstack[3] = null;
	}

	Q.all(callstack).then(function(data){
		callback(data);
	});
}

