// script_clearOrders.js

var redis = require('redis'),	
	redisclient = redis.createClient();

redisclient.keys('or*', function(err, reply){
	if (err) {
		console.log(err);
	} else {
		for (var key in reply) {
			console.log('or----deleting key:%s', reply[key]);
			redisclient.del(reply[key]);
		}
	}
});

// redisclient.del('orderIDX');

redisclient.keys('rv*', function(err, reply){
	if (err) {
		console.log(err);
	} else {
		for (var key in reply) {
			console.log('rv----deleting key:%s', reply[key]);
			redisclient.del(reply[key]);
		}
	}
});
