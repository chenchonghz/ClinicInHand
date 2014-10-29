// RESTfacility.js
var facilityOpt = require('../models/facilityOpt');

exports.getall = function(req, res){
	facilityOpt.listAll(function(err, reply){
		if (err) {
			//TODO
			res.send(err);
		} else {
			res.send(reply);
		}
	});
}