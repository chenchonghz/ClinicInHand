
/*
 * GET home page.
 */

// var wechat = require('wechat'),
// 	appArgs = require('../setting/config'),
// 	OAuth = wechat.OAuth,
// 	memberOpt = require('../models/memberOpt');
var memberOpt = require('../models/memberOpt');

exports.index = function(req, res){
	res.render('index', { title: '微挂号', openid: req.session.openid, userinfo: req.session.userinfo });
};







