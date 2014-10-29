// favorite.js

exports.listbymember = function(req, res) {
	res.render('favoritelist', {title:'我的收藏'});
}

exports.favOne = function(req, res) {
	res.send('OK');
}