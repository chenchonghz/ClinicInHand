//Define function for Member Service Logic
//Member date model defined here


/*
 * Redis model
 *
 * Strings
 *		key = s:{source}|id:{id}	value = {mid}
 * Sets [all member list]
 * key: "memberIDX"
 * value: [mid, ... ]
 * Hashes
 *  	key: "m:{mid}"
 *		value: mid, realname, gender, birthday, IDType, IDCode, IDPic, phone, email, level
 * 
 *
 *
 *
 * level: 'N' means normal, 'V' means VIP (has ID photo verified)
 *
 *
 */

var Q = require('q');
	redis = require('redis'),	
	redisclient = redis.createClient(),
	uuid = require('node-uuid');

redisclient.on("error", function (err) {
	console.log("Error " + err);
});

function isMember(source, id, callback) {
	redisclient.get('s:' + source + '|id:' + id, function(err, reply){
		if (reply == 'nil' || reply == null || reply == undefined) {
			 callback(true, null);
		} else {
			callback(false, reply);
		}
	});
}

function joinMember(source, id, memberObj, callback) {

	var mid = uuid.v1();
	Q.all([Q.ninvoke(redisclient, 'set', 's:' + source + '|id:' + id, mid), 
		   Q.ninvoke(redisclient, 'sadd', 'memberIDX', mid),
		   Q.ninvoke(redisclient, 'hmset', 'm:' + mid, 
		   												'mid', mid,
		   												'realname', memberObj.realname,
		   												'gender', memberObj.gender,
		   												'IDType', 'IDCard',
		   												'IDCode', memberObj.IDCode,
		   												'IDPic', '',
		   												'phone', memberObj.mobile,
		   												'email', memberObj.email,
		   												'level', 'N'
		   												)])
	 .then(function (data) {
	 	// console.log('---------joinMember data\n' + JSON.stringify(data));
	 	callback(data);
	 });
}

function quitMember(source, id) {
	//TODO
}

function upgradeToVIP(mid, callback) {
	redisclient.hset('m:' + mid, 'level', 'V', function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			callback(null, reply);
		}
	});
}

function getMemID(source, id, callback) {
	redisclient.get('s:' + source + '|id:' + id, function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			callback(null, reply);
		}
	});
}

function getMembership(mid, callback){
	redisclient.hgetall('m:' + mid, function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			callback(null, reply);
		}
	});
}

//TODO
function validateMemberData(source, id, data) {

	return true;
}

//TODO
function verifyMember(source, id, callback){
	callback('pass'); //or deny
}

exports.validateMemberData = validateMemberData;
exports.isMember = isMember;
exports.joinMember = joinMember;
exports.getMemID = getMemID;
exports.getMembership = getMembership;
