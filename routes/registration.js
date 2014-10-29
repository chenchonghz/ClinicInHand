// registration.js
var memberOpt = require('../models/memberOpt');

exports.toRegAll = function(req, res){
	var mid = req.query.mid;
	memberOpt.getMembership(req.query.mid, function(err, membership){
		res.render('toreg', {title:'微挂号', mid:mid, member:membership, wechatuser:req.session.userinfo} );
	});
};

exports.toRegPast = function(req, res){
	res.render('toregpast', {title:'复诊预约'});
};

exports.toRegAround = function(req, res){
	res.render('toregaround', {title:'周边医院'});
};

exports.toRegProblem = function(req, res){
	res.render('toregproblem', {title:'导医台'});
};

exports.toRegSearch = function(req, res){
	res.render('toregsearch');
};

exports.toRegReadme = function(req, res){
	res.render('toregreadme', {title:'预约教程'});
};