// facility.js
var facilityOpt = require('../models/facilityOpt');

exports.listall = function(req, res){
	facilityOpt.listAll(function(err, result){
		if (err) {
			//todo
		} else {
			// console.log(result);
			res.render('facilitySelect', { facilities: result });
		}
	});
}