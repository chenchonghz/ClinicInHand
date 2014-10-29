// script_initqueue.js
var queueOpt = require('./models/queueOpt');
var dummyqueue = new Object();

dummyqueue.name = '医生甲';
dummyqueue.wid = '0af58530-a448-11e3-9e99-895bdbed2f50';
dummyqueue.spid = '91257030-a447-11e3-946f-9f79eb8b74a7';
dummyqueue.fid = '39330dc0-a446-11e3-bcb1-8dfce15b32b1';
dummyqueue.state = 'normal';
dummyqueue.type = 'expert';
dummyqueue.price = 36.01;

queueOpt.create(dummyqueue, function(data){
	console.log(JSON.stringify(data));
	queueOpt.listByWindow(dummyqueue.wid, function(err, reply){
		
		var first = JSON.parse(reply[0]);
		console.log( first.qid );
		console.log( first.name );

		process.exit(0);
	});
});
//44b4d140-a470-11e3-8ea6-451db170131d