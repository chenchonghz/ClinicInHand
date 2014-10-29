// resource.js
var resourceOpt = require('../models/resourceOpt');

exports.listbyqueue = function(req, res){
	resourceOpt.listByQueue(req.query.qid, function(err, result){
		if (err) {

		} else {
			res.render('resourceSelect', { resources: result, fname:req.query.fname, spname:req.query.spname,
											wname:req.query.wname, qname:req.query.qname });
		}
	});
}