var secret_config = require('../config/config');

var config = {

	"collector": "ws://" + secret_config.FOXRIVER_IP + ':' + secret_config.CUBE_COLLECTOR_PORT,

	"offset": -1 * 60 * 60 * 1000,

	"step": 1000
};

var util = require("util"),
	cube = require("cube"), // replace with require("cube")
	options = config;

function createMetricsList(root, prefix) {
	var metricsList = [];
	var childNode = root.children;
	var parentsNames;

	if (!childNode) {
		metricsList.push(prefix);
		return metricsList;
	}


	for (var i=0; i<childNode.length; i++) {
		var child = childNode[i];
		if (prefix === '') {
			parentsNames = child.name;
		} else {
			parentsNames = prefix + '_' + child.name;
		}
		var asdf = createMetricsList(child, parentsNames);
		metricsList = metricsList.concat(asdf);
	}

	return metricsList;
};

var metricsTree = {
	name: 'root',
	children: [
		{
			name: 'west',
			children: [
				{
					name: 'apache0',
					children: [
						{
							name: 'cpu',
							value: 0.2
						},
						{
							name: 'memory',
							value: 1.0
						},
						{
							name: 'incoming',
							value: 0.7
						}
					]
				},
				{
					name: 'apache1',
					children: [
						{
							name: 'cpu',
							value: 0.8
						},
						{
							name: 'memory',
							value: 0.2
						}
					]
				},
				{
					name: 'nodejs0',
					children: [
						{
							name: 'cpu',
							value: 0.6
						},
						{
							name: 'memory',
							value: 0.4
						},
						{
							name: 'util',
							value: 0.9
						}
					]
				},
				{
					name: 'nodejs1',
					children: [
						{
							name: 'cpu',
							value: 0.6
						},
						{
							name: 'memory',
							value: 0.4
						},
						{
							name: 'util',
							value: 0.9
						}
					]
				},
				{
					name: 'nodejs2',
					children: [
						{
							name: 'cpu',
							value: 0.6
						},
						{
							name: 'memory',
							value: 0.4
						},
						{
							name: 'util',
							value: 0.9
						}
					]
				}
			]
		},
		{
			name: 'east',
			children: [
				{
					name: 'apache0',
					children: [
						{
							name: 'cpu',
							value: 0.8
						},
						{
							name: 'memory',
							value: 0.3
						}
					]
				},
				{
					name: 'apache1',
					children: [
						{
							name: 'cpu',
							value: 0.4
						},
						{
							name: 'memory',
							value: 0.1
						}
					]
				}
			]
		}
	]
};


var metrics = createMetricsList(metricsTree, '');

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