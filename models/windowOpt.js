// windowOpt.js

/**
 * Window Operations
 * 
 * Set [specialty - windows]
 * key: "w:spid:[spid]"
 * value: [{"wid":wid(uuid),"name":name}, ...]
 *
 * Hash [Window detail]
 * key: w:[wid]
 * fields: "name", "spid"
 */


var Q = require('q');
	redis = require('redis'),	
	redisclient = redis.createClient(),
	uuid = require('node-uuid');

exports.listBySpecialty = function(spid, callback) {
	redisclient.smembers('w:spid:' + spid, function(err, reply){
		callback(err, reply);
	});
}

exports.create = function(obj, callback) {

	var wid = uuid.v1();
	var callstack = new Array();
	callstack[0] = Q.ninvoke(redisclient, 'hmset', 'w:' + wid, obj);

	var windowPhrase = new Object();
	windowPhrase.wid = wid;
	windowPhrase.name = obj.name;

	callstack[1] = Q.ninvoke(redisclient, 'sadd', 'w:spid:' + obj.spid, JSON.stringify(windowPhrase));
	Q.all(callstack).then(function(data){
		callback(data);
	});
}