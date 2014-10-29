// reservationOpt.js

/**
 * Reservation Operations
 *
 * Set [Member-Reservations]
 * key: "rv:mid:{mid}"
 * value: [{rvid, fname, spname, wname, qname, rname, tp, price}, ...]
 *
 * Set [Member-State-Reservations]
 * key: "rv:mid:{mid}:state:{state}"
 * value: [{rvid, fname, spname, wname, qname, rname, tp, price}, ...]
 *
 * Set [Facility-Reservations]
 * key: "rv:fid:[fid]"
 * value: [{rvid, fname, spname, wname, qname, rname, tp, price}, ...]
 *
 * Hash
 * key: "rv:{rvid}"
 * fields: mid, orid, rid, mzh(cross facility), state("unpaid"/"unused"/"used"), phrase
 *
 */

var Q = require('q');
	redis = require('redis'),	
	redisclient = redis.createClient(),
	uuid = require('node-uuid');

exports.listUnusedByMember = function (mid, callback) {
	redisclient.smembers('rv:mid:' + mid + ':state:unused', function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			callback(null, reply);
		}
	});
}

exports.listByFacility = function (fid, callback) {
	redisclient.smembers('rv:fid:' + fid, function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			callback(null, reply);
		}
	});
}

exports.placeOne = function (reservation, callback) {
	var rvid = uuid.v1();

	var hashObj = new Object();
	hashObj.mid = reservation.mid;
	hashObj.rid = reservation.rid;
	hashObj.state = 'unpaid';

	var reservationPhrase = new Object();
	reservationPhrase.rvid = rvid;
	reservationPhrase.fname = reservation.fname;
	reservationPhrase.spname = reservation.spname;
	reservationPhrase.wname = reservation.wname;
	reservationPhrase.qname = reservation.qname;
	reservationPhrase.rname = reservation.rname;
	reservationPhrase.tp = reservation.tp;
	reservationPhrase.price = reservation.price;
	reservationPhrase.state = 'unpaid';
	var reservationStr = JSON.stringify(reservationPhrase);

	hashObj.phrase = reservationStr;

	var callstack = new Array();
	callstack[0] = Q.ninvoke(redisclient, 'hmset', 'rv:' + rvid, hashObj);
	callstack[1] = Q.ninvoke(redisclient, 'sadd', 'rv:mid:' + reservation.mid, reservationStr);
	callstack[2] = Q.ninvoke(redisclient, 'sadd', 'rv:mid:' + reservation.mid + ':state:unpaid', reservationStr);
	callstack[3] = Q.ninvoke(redisclient, 'sadd', 'rv:fid:' + reservation.fid, reservationStr);

	Q.all(callstack).then(function(data){
		//TODO: should determine by all elements of data[]
		if (true) {
			callback(null, rvid);
		};
	});
}

exports.usedOne = function (rvid, callback) {
	
	redisclient.hgetall('rv:' + rvid, function(err, reply){
		if (!err) {

			var callstack = new Array();
			callstack[0] = Q.ninvoke(redisclient, 'hset', 'rv:' + rvid, 'state', 'used');
			callstack[1] = Q.ninvoke(redisclient, 'smove', 'rv:mid:' + reply.mid + ':state:unused', 
												'rv:mid:' + reply.mid + ':state:used', reply.phrase);

			Q.all(callstack).then(function(data){
				//TODO
				if (true) {
					callback(null, data);
				}
			});
		} else {
			callback(err, null);
		}
	});
}

exports.enableReservation = function (rvid, callback) {
	redisclient.hgetall('rv:' + rvid, function(err, reply){
		if (!err) {
			var callstack = new Array();
			callstack[0] = Q.ninvoke(redisclient, 'hset', 'rv:' + rvid, 'state', 'unused');
			callstack[1] = Q.ninvoke(redisclient, 'smove', 'rv:mid:' + reply.mid + ':state:unpaid', 
												'rv:mid:' + reply.mid + ':state:unused', reply.phrase);

			Q.all(callstack).then(function(data){
				//TODO
				if (true) {
					callback(null, data);
				}
			});
		} else {
			callback(err, null);
		}
	});
}

exports.completeOrid = function(rvid, orid, callback) {
	redisclient.hset('rv:' + rvid, 'orid', orid, function(err, reply){
		if (err) {
			callback(err, null);
		} else {
			callback(null, reply);
		}
	});
}
















