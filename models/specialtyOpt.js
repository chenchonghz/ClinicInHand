// specialty.js
/**
 * Specialty Operations
 * 
 * Set [facility - specialties]
 * key: "sp:fid:[fid]"
 * value: [{"spid":spid(uuid),"name":name}, ...]
 *
 * Hash [Specialty detail]
 * key: sp:[spid]
 * fields: "name", "fid"
 */


var Q = require('q');
	redis = require('redis'),	
	redisclient = redis.createClient(),
	uuid = require('node-uuid');

function addToFacility() {

}

function removeFromFacility() {

}

exports.listByFacility = function(fid, callback) {
	redisclient.smembers('sp:fid:' + fid, function(err, reply){
		callback(err, reply);
	});
}

exports.create = function(obj, callback) {

	var spid = uuid.v1();
	var callstack = new Array();
	callstack[0] = Q.ninvoke(redisclient, 'hmset', 'sp:' + spid, obj);

	var specialtyPhrase = new Object();
	specialtyPhrase.spid = spid;
	specialtyPhrase.name = obj.name;

	callstack[1] = Q.ninvoke(redisclient, 'sadd', 'sp:fid:' + obj.fid, JSON.stringify(specialtyPhrase));
	Q.all(callstack).then(function(data){
		callback(data);
	});
}

exports.addToFacility = addToFacility;

exports.removeFromFacility = removeFromFacility;