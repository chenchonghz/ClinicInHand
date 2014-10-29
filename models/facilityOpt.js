// facilityOpt.js
/**
 * Facility Operations
 * 
 * Set [All facilities]
 * key: "facilityIDX"
 * value: [{"fid":fid(uuid), "name":name}, ...]
 * 
 * Sets [graded facilities]
 * key: "f:grade:[grade]"
 * value: [{"fid":fid(uuid), "name":name}, ...]
 *
 * Sets [specified facilities]
 * key: "f:type:[type]"
 * value: [{"fid":fid(uuid), "name":name}, ...]
 *
 * Hash [Facility detail]
 * key: f:[fid]
 * fields: "name", "grade"(grade1/grade2/grade3), "addr", "tel", "email", "type"(general/special), "website", "weibo", "weixin", "des"
 */


var Q = require('q');
	redis = require('redis'),	
	redisclient = redis.createClient(),
	uuid = require('node-uuid');

function gradeFacility(fid, from, to, callback) {

}

function moveToGeneral() {
	
}

function moveToSpecial() {
	
}

exports.listAll = function(callback) {

	redisclient.smembers('facilityIDX', function(err, reply){
		callback(err, reply);
	});
}

exports.listSpFacilities = function(callback) {
	redisclient.smembers('f:type:special', function(err, reply){
		callback(err, reply);
	});
}

exports.listGeneralFacilities = function(callback) {
	redisclient.smembers('f:type:general', function(err, reply){
		callback(err, reply);
	});
}

exports.listGradedFacilities = function(grade, callback) {
	redisclient.smembers('f:grade:' + grade, function(err, reply){
		callback(err, reply);
	});
}

exports.create = function(obj, callback) {
	var fid = uuid.v1();

	var callstack = new Array();
	callstack[0] = Q.ninvoke(redisclient, 'hmset', 'f:' + fid, obj);
	
	var facilityPhrase = new Object();
	facilityPhrase.fid = fid;
	facilityPhrase.name = obj.name;

	callstack[1] = Q.ninvoke(redisclient, 'sadd', 'facilityIDX', JSON.stringify(facilityPhrase));

	if (obj.grade && obj.grade != '') {
		callstack[2] = Q.ninvoke(redisclient, 'sadd', 'f:grade:' + obj.grade, JSON.stringify(facilityPhrase));
	} else {
		callstack[2] = null;
	};

	if (obj.type && obj.type != '') {

		callstack[3] = Q.ninvoke(redisclient, 'sadd', 'f:type:' + obj.type, JSON.stringify(facilityPhrase));
	} else {
		callstack[3] = null;
	};

	Q.all(callstack).then(function(data){
		callback(data);
	});
}

exports.revoke = function() {

}

exports.modify = function() {

}

