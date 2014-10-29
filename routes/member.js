// member.js
var memberOpt = require('../models/memberOpt');

exports.toJoin = function(req, res){
	memberOpt.isMember('wechat', req.session.openid, function(err, mid){
		if (err) {
			res.render('tojoin', { title: '微挂号', openid: req.session.openid, userinfo: req.session.userinfo });
		} else {
			res.redirect('/tomemberprofile/?mid=' + mid);
		}
	});	
};

exports.join = function(req, res){
	if (memberOpt.validateMemberData("wechat", req.body.openid, req.body)) {
		memberOpt.joinMember("wechat", req.body.openid, req.body, function(result){
			// console.log('-----index---join\n%s', JSON.stringify(result));
			res.send(result);
		});
	} else {
		res.send('invalid data');
	}
};

exports.toMemberProfile = function(req, res) {
	
	var mid = req.query.mid;
	var openid = req.session.openid;

	if (mid && mid != '') {
		memberOpt.getMembership(mid, function(err, membership){
			res.render('memberProfile', {title:'会员资料', member:membership, wechatuser:req.session.userinfo} );
		});
	} else {
		memberOpt.isMember('wechat', openid, function(err, memberid){
			if (err) {
				res.render('tojoin', { title: '微挂号', openid: openid, userinfo:req.session.userinfo });
			} else {
				memberOpt.getMembership(memberid, function(err, membership1){
					console.log(membership1);
					res.render('memberProfile', {title:'会员资料', member:membership1, wechatuser:req.session.userinfo});
				});
			}
		});	
	}
};

exports.toMemberCard = function(req, res) {
	var mid = req.query.mid;
	var openid = req.session.openid;
	console.log('headimgurl of openid[%s]=[%s]', openid, req.session.userinfo.headimgurl);

	if (mid && mid != '') {
		// var encryptedmid = '';
		// var tailstr = mid.substring(mid.length - 4);
		// encryptedmid = mid.substring(0, mid.length - 4).replace(/[a-zA-Z0-9]/g, '#') + tailstr;
		// console.log(encryptedmid);
		memberOpt.getMembership(mid, function(err, membership){
			res.render('memberCard', {title:'微就诊卡', member:membership, encryptedmid:mid.substring(mid.length - 4), 
				wechatuser:req.session.userinfo} );
		});
	} else {
		memberOpt.isMember('wechat', openid, function(err, memberid){
			if (err) {
				res.render('tojoin', { title: '微挂号', openid: openid, userinfo:req.session.userinfo });
			} else {

				// var encryptedmid = '';
				// var tailstr = memberid.substring(memberid.length - 4);
				// encryptedmid = memberid.substring(0, memberid.length - 4).replace(/[a-zA-Z0-9]/g, '#') + tailstr;
				// console.log(encryptedmid);
				memberOpt.getMembership(memberid, function(err, membership){
					res.render('memberCard', {title:'微就诊卡', member:membership, 
						encryptedmid:memberid.substring(memberid.length - 4), wechatuser:req.session.userinfo});
				});
			}
		});	
	}
}

exports.toQuit = function(req, res){
	memberOpt.isMember('wechat', req.session.openid, function(err, mid){
		if (err) {
			res.render('tojoin', { title: '微挂号', openid: req.session.openid, userinfo: req.session.userinfo });
		} else {
			memberOpt.getMembership(mid, function(err, membership){
				res.render('memberquit', {title:'退出会员', member:membership, wechatuser:req.session.userinfo});
			});
		}
	});	
}

exports.commitQuit = function(req, res){
	res.send('DONE');
}





