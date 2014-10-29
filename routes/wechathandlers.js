//Define weixin handlers here
var wechat = require('wechat'),
	memberOpt = require('../models/memberOpt'),
	appArgs = require('../setting/config');

var API = wechat.API;
var api = new API(appArgs.appID, appArgs.appSecret);

var OAuth = wechat.OAuth;
var oauthapi = new OAuth(appArgs.appID, appArgs.appSecret);//here used as an stateless API object

var List = wechat.List;

List.add('view', [
	["<a href='http://www.baidu.com'>搜索:</a>\n回复{1}", function (info, req, res) {
		res.reply('选择1');
	}],
  	['回复{2}', function (info, req, res) {
    	res.reply('选择2');
  	}],
  	['回复{3}', '选择3']
]);


var accessToken = null;

if ( !api.isAccessTokenValid ) {
	api.getAccessToken(function(err, result) { 
		accessToken = result.access_token; 
		console.log('refresh accessToken = ' + accessToken);
	});
} else {
	// console.log('accessToken = ' + accessToken);
};

api.createMenu(appArgs.menus, function(err, result){
	if (err) {
		console.error(err);
	} else {
		console.log(JSON.stringify(result));
	};
});

function getHandlerByType(handlerType) {
	switch ( handlerType ) {
		case 'text': return textHandler;
		case 'image': return imageHandler;
		case 'voice': return voiceHandler;
		case 'video': return videoHandler;
		case 'location': return locationHandler;
		case 'link': return linkHandler;
		case 'event': return eventHandler;
		default: return textHandler;
	}
}

function textHandler(message, req, res, next) {
	console.log('username = ' + message.FromUserName);
 	console.log('req.weixin = ' + JSON.stringify(message));

 	if (message.Content.toLowerCase() === 'trick') {
 		res.reply([{
 			title:'血常规检验 【收费￥28】',
 			description:'点击进入付款界面',
 			picurl:'http://www.foreverhealth.com/media/FH_Blood-Test-Icon.png',
 			url: 'http://42.121.121.213/toorder/?item=bloodtest'
 		}]);
 	} else {
		// if (message.Content === 'view') {
		// 	res.wait('view');
		// } else {
		// 	res.nowait(message.Content);	
		// }
 		res.reply(message.Content);
 	}

	
	// res.reply([
 //  		{
 //    		title: 'Got Text',
 //    		description: 'Echo:\n' + message.Content,
 //    		picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
 //    		url: 'http://nodeapi.cloudfoundry.com/'
 //  		}
	// ]);

	// memberOpt.isMember('wechat', message.FromUserName, function(result) {
	// 	if (result) {
	// 		res.reply('欢迎老朋友');
	// 	} else {
	// 		// leadToJoin(message.FromUserName, res);
	// 		memberOpt.joinMember('wechat', message.FromUserName);
	// 		res.reply('新朋友，正在变成老朋友...');
	// 	}
	// });

	// if (!memberOpt.isMember()) {
	// 	// sayWelcome(res);
	// 	leadToJoin(message.FromUserName, res);

	// } else {
		// if (message.Content === 'view') {
		// 	res.wait('view');
		
		// } else {
		// 	res.nowait('nowait() fired!');	
		// }
	// }
}

function voiceHandler(message, req, res, next) {
	console.log('username = ' + message.FromUserName);
 	console.log('req.weixin = ' + JSON.stringify(message));

	res.reply(message.Recognition);
}

function videoHandler(message, req, res, next) {
	console.log('username = ' + message.FromUserName);
 	console.log('req.weixin = ' + JSON.stringify(message));

	res.reply('');
}

function imageHandler(message, req, res, next) {
	console.log('username = ' + message.FromUserName);
 	console.log('req.weixin = ' + JSON.stringify(message));

	res.reply('');
}


function locationHandler(message, req, res, next) {
	console.log('username = ' + message.FromUserName);
 	console.log('req.weixin = ' + JSON.stringify(message));
 	
	res.reply('');
}

function linkHandler(message, req, res, next) {
	console.log('username = ' + message.FromUserName);
 	console.log('req.weixin = ' + JSON.stringify(message));

	res.reply('');
}

//eventHandler is just used to handle events posted by weixin server
function eventHandler(message, req, res, next) {
 	
	if (message.Event === 'subscribe') {
		sayWelcome(res);
	} else if (message.Event === 'unsubscribe') {
		
		// unbind weixin to platform and revoke membership when unsubscribe user which means clean all data of the very member
		// add this policy into membership agreement

	} else if (message.Event === 'CLICK') {
		// res.reply([
	 //  		{
	 //    		title: 'Menu clicked',
	 //    		description: message.Event + ' menu [' + message.EventKey + ']',
	 //    		picurl: '',
	 //    		url: ''
	 //  		}
		// ]);
		if (message.EventKey === appArgs.menu_yyhg) {

			memberOpt.isMember('wechat', message.FromUserName, function(err, mid) {
				if (err) {
					// res.reply('Welcome my old friend.\n' + mid);
					// replyMultiTextNPic();
					leadToJoin(message.FromUserName, res);
				} else {
					leadToReg(mid, res);
				}
			});			
		} else if (message.EventKey === appArgs.menu_help) {
			res.reply('有咩帮到你？');
		} else {
			res.reply([
		  		{
		    		title: 'Menu clicked',
		    		description: message.Event + ' menu [' + message.EventKey + ']',
		    		picurl: '',
		    		url: ''
		  		}
			]);
		};
	} else res.reply('');
}

function leadToReg(mid, res) {

	var regEntries = [
						{
							title: '使用说明',
							description: '使用说明使用说明',
							picurl: 'http://42.121.121.213/images/text-x-readme.png',
							url: 'http://42.121.121.213/toregreadme/?mid=' + mid
						},
						{
							title: '查看所有',
							description: '',
							picurl: '',
							url: 'http://42.121.121.213/toregall?mid=' + mid
						},
						{
							title: '复诊预约',
							description: '',
							picurl: '',
							url: 'http://42.121.121.213/toregpast?mid=' + mid
						},
						{
							title: '就近预约',
							description: '',
							picurl: '',
							url: 'http://42.121.121.213/toregaround?mid=' + mid
						},
						{
							title: '导医台',
							description: '',
							picurl: '',
							url: 'http://42.121.121.213/toregproblem?mid=' + mid
						}
					 ];


	replyMultiTextNPic(res, regEntries);
}

function leadToJoin(openID, res) {
	replyTextNPic(res, appArgs.joinmsg);
	var articles = appArgs.joinentriesmsg;
	api.sendNews(openID, articles, function(err, result){
		if (err) {console.error(err)};
	});
}

function sayWelcome(res) {
	replyTextNPic(res, appArgs.welcomemsg);
}

function replyText(res, content) {
	res.reply(content);
}

function replyTextNPic(res, title, content, picurl, url) {
	var msgItem = [
				{
					title: title,
					description: content,
					picurl: picurl,
					url: url
				}
			  ];
	replyTextNPic(res, msgItem);
}

function replyTextNPic(res, item) {
	res.reply(item);
}

function replyMultiTextNPic(res, items) {
	res.reply(items);
}

function replyMusic(res, title, content, musicUrl, hqMusicUrl) {
	res.reply({
		type: "music",
      	content: {
        	title: title,
        	description: content,
        	musicUrl: musicUrl,
        	hqMusicUrl: hqMusicUrl
      	}
    });
}

exports.getByType = getHandlerByType;



