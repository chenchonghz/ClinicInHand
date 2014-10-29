
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	security = require('./routes/security'),
	http = require('http'),
	path = require('path'),
	wechat = require('wechat'),
	appArgs = require('./setting/config'),
	wechatHandlers = require('./routes/wechathandlers'),
	facility_REST = require('./routes/RESTfacility'),
	facility = require('./routes/facility'),
	speciality = require('./routes/specialty'),
	windowrt = require('./routes/window'),
	queue = require('./routes/queue'),
	resource = require('./routes/resource'),
	order = require('./routes/order'),
	reservation = require('./routes/reservation');
	// RedisStore = require('connect-redis')(express);  

var registration = require('./routes/registration');
var voucher = require('./routes/voucher');
var report = require('./routes/report');
var member = require('./routes/member');
var favorite = require('./routes/favorite');
var comment = require('./routes/comment');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.query()); // Or app.use(express.query());
app.use(express.cookieParser());
app.use(express.session({secret: 'keyboard cat', 
						 cookie: {maxAge: 300000}
						 // store: new RedisStore({ host: '127.0.0.1', port: '6379'})
						})
		);

// app.use('/wechat', wechat(appArgs.privateToken, function (req, res, next) {
//   // 微信输入信息都在req.weixin上
//   var message = req.weixin;

//   console.log('username = ' + message.FromUserName);
//   console.log('req.weixin = ' + JSON.stringify(message));

//   api.getUser(message.FromUserName, function(err, result){
//   	console.log(JSON.stringify(result));
//   });

//   if (message.FromUserName === 'diaosi') {
//     // 回复屌丝(普通回复)
//     res.reply('hehe');
//   } else if (message.FromUserName === 'text') {
//     //你也可以这样回复text类型的信息
//     res.reply({
//       content: 'text object',
//       type: 'text'
//     });
//   } else if (message.FromUserName === 'hehe') {
//     // 回复一段音乐
//     res.reply({
//       type: "music",
//       content: {
//         title: "来段音乐吧",
//         description: "一无所有",
//         musicUrl: "http://mp3.com/xx.mp3",
//         hqMusicUrl: "http://mp3.com/xx.mp3"
//       }
//     });
//   } else {
//     // 回复高富帅(图文回复)
//     res.reply([
//       {
//         title: '你来我家接我吧',
//         description: '这是女神与高富帅之间的对话',
//         picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
//         url: 'http://nodeapi.cloudfoundry.com/'
//       }
//     ]);
//   }
// }));

app.use('/wechat', wechat(appArgs.privateToken)
	.text(wechatHandlers.getByType('text'))
	.image(wechatHandlers.getByType('image'))
	.voice(wechatHandlers.getByType('voice'))
	.video(wechatHandlers.getByType('video'))
	.location(wechatHandlers.getByType('location'))
	.link(wechatHandlers.getByType('link'))
	.event(wechatHandlers.getByType('event'))
	.middlewarify()
);


app.use(security.auth);
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  console.log('env = ' + app.get('env'));
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/unauth', security.unauth);

app.get('/toregall', registration.toRegAll);
app.get('/toregpast', registration.toRegPast);
app.get('/toregaround', registration.toRegAround);
app.get('/toregproblem', registration.toRegProblem);
app.get('/toregsearch', registration.toRegSearch);
app.get('/toregreadme', registration.toRegReadme);

app.get('/tojoin', member.toJoin);
app.get('/tomemberprofile', member.toMemberProfile);
app.get('/tomembercard', member.toMemberCard);
app.get('/toquit', member.toQuit);

app.get('/facility/api/getall', facility_REST.getall);
app.get('/facility/listall', facility.listall);
app.get('/specialty/list', speciality.listbyfid);
app.get('/window/list', windowrt.listbyspid);
app.get('/queue/list', queue.listavailablebywindow);
app.get('/resource/list', resource.listbyqueue);

app.get('/myfavorite', favorite.listbymember);

app.get('/torate', comment.torate);

app.get('/toorder', order.leadtoone);
app.get('/listorder/topay', order.listtopaybymember);
app.get('/listreservation/unused', reservation.listunusedbymember);
app.get('/myvouchers', voucher.myvouchers);
app.get('/myreports', report.myreports);

app.post('/join', member.join);
app.post('/quit', member.commitQuit);
app.post('/payorder', order.pay);
app.post('/reserve', reservation.placeone);
app.post('/favorite', favorite.favOne);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
