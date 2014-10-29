// security.js
var wechat = require('wechat'),
	appArgs = require('../setting/config'),
	OAuth = wechat.OAuth;
var API = wechat.API;

var api = new API(appArgs.appID, appArgs.appSecret);
var oauthapi = new OAuth(appArgs.appID, appArgs.appSecret);

exports.unauth = function(req, res) {
	res.render('unauth', { title: '未授权' });
};

exports.auth = function (req, res, next) {

	// console.log(req.query.mid);


	// temp for ignore robot
	if (req.path == '/blog/') {
		res.redirect("http://%s:8001%s", req.host, req.url);
		// res.send('done');return;
	}
	
	
	// console.log('security-------req.url = ' + req.url);

	if (req.session.openid || req.url == '/unauth') {
		console.log('Found openid in session, ignore this if you are visiting /unauth');
		next();
	} else if (req.query.code && req.query.code != '') {

		// user from weixin
		console.log('Found code[%s] in request\nGetting accessToken', req.query.code);
		oauthapi.getAccessToken(req.query.code, function(err, result) {

			if (err) {
				console.error(err);
				res.redirect('/unauth');
			} else {
				req.session.openid = result.openid;

				// weixin's official bug? 
				// seems no need for user's permission to invoke the [getUser] API
				api.getUser(req.session.openid, function(err, result){
					// console.log(JSON.stringify(result));
					req.session.userinfo = result;
					next();
				});
			}
		})
	} else {
		// redirect to weixin oauth url
		// console.log('req.originalUrl = %s', req.originalUrl);
		res.redirect(oauthapi.getAuthorizeURL(appArgs.homeurl + req.originalUrl, 'STATE', 'snsapi_base'));
	}
};