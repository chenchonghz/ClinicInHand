//Preset all app-level parameters
var APPID = 'wx47767b33f5581cc8';
var APPSECRET = 'd240aec7e6895ef16eddda8fd29d00c0';

var PRIVATE_TOKEN = 'wondershs';

var HOME_URL = 'http://42.121.121.213';
var REG_ALL_URL = 'http://42.121.121.213/toReg';

var MENU_KEY_YYGH = 'MENU_YYGH';
var MENU_KEY_HELP = 'MENU_HELP';
var MENU = {
    			"button": [
	    			{
			            "type": "click", 
			            "name": "预约挂号", 
			            "key": MENU_KEY_YYGH
	        		}, 
	        		{
	            		"name": "工具箱", 
	            		"sub_button": [
	                		{
			                    "type": "view", 
			                    "name": "我的预约单", 
			                    "url": "http://42.121.121.213/listreservation/unused"
	                		}, 
	                		{
			                    "type": "view", 
			                    "name": "待付款", 
			                    "url": "http://42.121.121.213/listorder/topay"
	                		}, 
	                		{
			                    "type": "view", 
			                    "name": "药品/检验/检查",
			                    "url": "http://42.121.121.213/myvouchers/"
	                		},
	                		{
			                    "type": "view", 
			                    "name": "查报告", 
			                    "url": "http://42.121.121.213/myreports"
	                		},
	                		{
			                    "type": "view", 
			                    "name": "就诊评价", 
			                    "url": "http://42.121.121.213/torate"
	                		}
	                	]
	             	},
	        		{
	            		"name": "会员中心", 
	            		"sub_button": [
	                		{
			                    "type": "view", 
			                    "name": "个人资料", 
			                    "url": "http://42.121.121.213/tomemberprofile"
	                		}, 
			                {
			                    "type": "view", 
			                    "name": "微就诊卡", 
			                    "url": "http://42.121.121.213/tomembercard"
			                }, 
			                {
			                    "type": "view", 
			                    "name": "我的收藏", 
			                    "url": "http://42.121.121.213/myfavorite"
			                }, 
			                {
			                    "type": "click", 
			                    "name": "帮助", 
			                    "key": MENU_KEY_HELP
			                }, 
			                {
			                    "type": "view", 
			                    "name": "退出会员", 
			                    "url": "http://42.121.121.213/toquit"
			                }
	            		]
	        		}
    			]
    		};

var MSG_WELCOME = [
				{
					title: 'Welcome',
					description: 'We are waiting for you to join us and enjoy our medicare service.',
					picurl: 'http://pic.sucaiw.com/up_files/out_pics/f0dbc6a1a6/sucaiw-07xtkdyl39330hao.jpg',
					url: 'http://42.121.121.213:8001/blog'
				}
			  ];
var MSG_JOIN = [
				{
					title: '加入会员',
					description: '还不是会员吧？加入即可享受在线预约、排队提醒、院内助手、一站式付费等便捷信息服务，帮您免去所有窗口排队。',
					picurl: 'http://www.qianhuaweb.com/data/attachement/jpg/site2/20091103/00e04c4647390c59c28b07.jpg',
					url: 'http://42.121.121.213'
				}
			  ];
var MSG_JOIN_ENTRIES = [
						{
							title: '在线加入',
							description: '',
							picurl: 'http://swhs1973.com/wp-content/uploads/2012/11/JoinUs.gif',
							url: 'http://42.121.121.213/tojoin'
						},
						{
							title: '演示帮助',
							description: '还不是会员吧？加入即可享受在线预约、排队提醒、院内助手、一站式付费等便捷信息服务，帮您免去所有窗口排队。', 
							picurl: 'http://t2.ftcdn.net/jpg/00/54/78/65/400_F_54786589_iu6guaA2AoJzyqUUPoAUw1SwzTlPjyRH.jpg', 
							url: 'http://42.121.121.213:8001/blog/?page_id=271'
						}
			  		 ];
var MSG_REG_ENTRIES = [
						{
							title: '使用说明',
							description: '使用说明使用说明',
							picurl: 'http://42.121.121.213/images/text-x-readme.png',
							url: 'http://42.121.121.213/toregreadme'
						},
						{
							title: '查看所有',
							description: '',
							picurl: '',
							url: 'http://42.121.121.213/toregall'
						},
						{
							title: '复诊预约',
							description: '',
							picurl: '',
							url: 'http://42.121.121.213/toregpast'
						},
						{
							title: '就近预约',
							description: '',
							picurl: '',
							url: 'http://42.121.121.213/toregaround'
						},
						{
							title: '导医台',
							description: '',
							picurl: '',
							url: 'http://42.121.121.213/toregproblem'
						},
						{
							title: '搜索',
							description: '',
							picurl: '',
							url: 'http://42.121.121.213/toregsearch'
						}
					 ];

exports.appID = APPID;
exports.appSecret = APPSECRET;
exports.privateToken = PRIVATE_TOKEN;
exports.menu_yyhg = MENU_KEY_YYGH;
exports.menu_help = MENU_KEY_HELP;
exports.menus = MENU;
exports.homeurl = HOME_URL;
exports.welcomemsg = MSG_WELCOME;
exports.joinmsg = MSG_JOIN;
exports.joinentriesmsg = MSG_JOIN_ENTRIES;
exports.regentriesmsg = MSG_REG_ENTRIES;