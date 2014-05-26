var secret_config = require('../config/config');

var config = {

	"collector": "ws://" + secret_config.FOXRIVER_IP + ':' + secret_config.CUBE_COLLECTOR_PORT,

	"offset": -1 * 60 * 60 * 1000,

	"step": 1000
};

var util = require("util"),
	cube = require("cube"), // replace with require("cube")
	options = config;
var metrics = [
	'ord_apache_0_cpu', 'ord_apache_0_mem', 'ord_apache_0_incoming', 
	'ord_apache_1_cpu', 'ord_apache_1_mem',
	'ord_apache_2_cpu', 'ord_apache_2_mem', 'ord_apache_2_incoming',
	'pdx_apache_0_cpu', 'pdx_apache_0_mem', 'pdx_apache_0_incoming', 
	'pdx_nodejs_0_cpu', 'pdx_nodejs_0_mem', 'pdx_nodejs_0_incoming', 'pdx_nodejs_0_outgoing',
	'pdx_nodejs_1_cpu', 'pdx_nodejs_1_mem', 'pdx_nodejs_1_incoming', 'pdx_nodejs_1_outgoing'
];

util.log("starting emitter");
var emitter = cube.emitter(options["collector"]);

var start = Date.now() + options["offset"],
	stop = Date.now(),
	step = options["step"],
	value = [];

for (var i=0; i<metrics.length; i++) {
	value.push(0.0);
}

setInterval(function() {
	for (var i=0; i<metrics.length; i++) {
		var payload = {
			type: metrics[i],
			time: new Date(Date.now()),
			data: {
				value: value[i] += Math.random() - .5
			}
		};
		util.log(JSON.stringify(payload));
		emitter.send(payload);
	}
}, 1000);