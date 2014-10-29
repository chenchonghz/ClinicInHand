// window.js
var windowOpt = require('../models/windowOpt');

exports.listbyspid = function(req, res){

	windowOpt.listBySpecialty(req.query.spid, function(err, result){
		if (err) {
			//todo
		} else {
			// console.log(result);
			res.render('windowSelect', { windows: result });
		}
	});
}