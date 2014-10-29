// script_initwindow.js

var windowOpt = require('./models/windowOpt');
var dummywindow = new Object();

dummywindow.name = '普内科1';
dummywindow.spid = '91257030-a447-11e3-946f-9f79eb8b74a7';

windowOpt.create(dummywindow, function(data){
	console.log(JSON.stringify(data));
	windowOpt.listBySpecialty(dummywindow.spid, function(err, reply){
		
		var first = JSON.parse(reply[0]);
		console.log( first.wid );
		console.log( first.name );

		process.exit(0);
	});
});