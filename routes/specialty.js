// speciality.js
var specialityOpt = require('../models/specialtyOpt');

exports.listbyfid = function(req, res){
	specialityOpt.listByFacility(req.query.fid, function(err, result){
		if (err) {
			//todo
		} else {
			// console.log(result);
			res.render('specialtySelect', { specialities: result });
		}
	});
}