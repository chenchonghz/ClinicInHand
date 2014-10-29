// script_initspecialty.js

var specialtyOpt = require('./models/specialtyOpt');
var dummyspecialty = new Object();

dummyspecialty.name = '普内科';
dummyspecialty.fid = '39330dc0-a446-11e3-bcb1-8dfce15b32b1';

specialtyOpt.create(dummyspecialty, function(data){
	console.log(JSON.stringify(data));
	specialtyOpt.listByFacility(dummyspecialty.fid, function(err, reply){
		
		var first = JSON.parse(reply[0]);
		console.log( first.spid );
		console.log( first.name );

		process.exit(0);
	});
});
