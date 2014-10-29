// script_initresource.js

var resourceOpt = require('./models/resourceOpt');
var dummyResource = new Object();

dummyResource.name = '某医生';
dummyResource.qid = '44b4d140-a470-11e3-8ea6-451db170131d';
dummyResource.wid = '0af58530-a448-11e3-9e99-895bdbed2f50';
dummyResource.spid = '91257030-a447-11e3-946f-9f79eb8b74a7';
dummyResource.fid = '39330dc0-a446-11e3-bcb1-8dfce15b32b1';
dummyResource.state = 'normal';
dummyResource.type = 'regular';
dummyResource.price = 48.02;
dummyResource.quantity = 20;
dummyResource.mdid = 'MD-A';
var dummydate = new Date();
dummydate.setDate(dummydate.getDate() + 3);
dummydate.setHours(8, 0, 0);
dummyResource.date = dummydate;
var dummystart = new Date() ;
dummystart.setDate(dummystart.getDate() + 3);
dummystart.setHours(8, 0, 0);
dummyResource.start = dummystart;
var dummystop = new Date();
dummystop.setDate(dummystop.getDate() + 3);
dummystop.setHours(11, 0, 0);
dummyResource.stop = dummystop;


resourceOpt.create(dummyResource, function(data){
	console.log(JSON.stringify(data));
	resourceOpt.listByQueue(dummyResource.qid, function(err, reply){
		
		var first = JSON.parse(reply[0]);
		console.log( first.rid );
		console.log( first.name );
		var d1 = new Date(first.date);
		console.log( d1.toString() );
		var d2 = new Date(first.start);
		console.log( d2.toString() );
		var d3 = new Date(first.stop);
		console.log( d3.toString() );

		process.exit(0);
	});
});