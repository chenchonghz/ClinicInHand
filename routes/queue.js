// queue.js
var queueOpt = require('../models/queueOpt');

exports.listavailablebywindow = function(req, res){
	queueOpt.listAvailableByWindow(req.query.wid, function(err, result){
		if (err) {
			//todo
		} else {
			// console.log(result);
			res.render('queueSelect', { queues: result });
		}
	});
}