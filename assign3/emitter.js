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

function randomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var metricsTree = {
	name: 'root',
	children: [
		{
			name: 'west_coast',
			children: [
				{
					name: 'apache0',
					children: [
						{
							name: 'cpu',
							metricValue: 0.2
						},
						{
							name: 'memory',
							metricValue: 1.0
						},
						{
							name: 'incoming',
							metricValue: 0.7
						}
					]
				},
				{
					name: 'apache1',
					children: [
						{
							name: 'cpu',
							metricValue: 0.8
						},
						{
							name: 'memory',
							metricValue: 0.2
						}
					]
				},
				{
					name: 'nodejs0',
					children: [
						{
							name: 'cpu',
							metricValue: 0.6
						},
						{
							name: 'memory',
							metricValue: 0.4
						},
						{
							name: 'util',
							metricValue: 0.9
						}
					]
				},
				{
					name: 'nodejs1',
					children: [
						{
							name: 'cpu',
							metricValue: 0.6
						},
						{
							name: 'memory',
							metricValue: 0.4
						},
						{
							name: 'util',
							metricValue: 0.9
						}
					]
				},
				{
					name: 'nodejs2',
					children: [
						{
							name: 'cpu',
							metricValue: 0.6
						},
						{
							name: 'memory',
							metricValue: 0.4
						},
						{
							name: 'util',
							metricValue: 0.9
						}
					]
				},
				{
					name: 'nodejs3',
					children: [
						{
							name: 'cpu',
							metricValue: 0.6
						},
						{
							name: 'memory',
							metricValue: 0.4
						},
						{
							name: 'util',
							metricValue: 0.9
						}
					]
				},
				{
					name: 'nodejs4',
					children: [
						{
							name: 'cpu',
							metricValue: 0.2
						},
						{
							name: 'memory',
							metricValue: 0.1
						},
						{
							name: 'util',
							metricValue: 0.2
						},
						{
							name: '200',
							metricValue: 0.2
						},
						{
							name: '300',
							metricValue: 0.8
						}
					]
				},
				{
					name: 'seattle',
					children: [
						{
							name: 'rack0',
							children: [
								{
									name: 'servlet0',
									children: [
										{
											name: 'cpu',
											metricValue: 0.2
										},
										{
											name: 'memory',
											metricValue: 0.5
										}
									]
								},
								{
									name: 'servlet1',
									children: [
										{
											name: 'cpu',
											metricValue: 0.6
										},
										{
											name: 'memory',
											metricValue: 0.5
										}
									]
								}
							]
						},
						{
							name: 'rack1',
							children: [
								{
									name: 'servlet0',
									children: [
										{
											name: 'cpu',
											metricValue: 0.2
										},
										{
											name: 'memory',
											metricValue: 0.5
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			name: 'east_coast',
			children: [
				{
					name: 'apache0',
					children: [
						{
							name: 'cpu',
							metricValue: 0.8
						},
						{
							name: 'memory',
							metricValue: 0.3
						}
					]
				},
				{
					name: 'apache1',
					children: [
						{
							name: 'cpu',
							metricValue: 0.4
						},
						{
							name: 'memory',
							metricValue: 0.1
						}
					]
				},
				{
					name: 'apache2',
					children: [
						{
							name: 'cpu',
							metricValue: 0.1
						},
						{
							name: 'memory',
							metricValue: 0.1
						}
					]
				},
				{
					name: 'apache3',
					children: [
						{
							name: 'cpu',
							metricValue: 0.1
						},
						{
							name: 'memory',
							metricValue: 0.2
						},
						{
							name: 'network',
							metricValue: 1.0
						},
						{
							name: '500',
							metricValue: 0.1
						}
					]
				},
				{
					name: 'apache4',
					children: [
						{
							name: 'cpu',
							metricValue: 0.4
						},
						{
							name: 'memory',
							metricValue: 0.9
						},
						{
							name: 'network',
							metricValue: 0.1
						},
						{
							name: '400',
							metricValue: 0.8
						},
						{
							name: '500',
							metricValue: 0.1
						}
					]
				},
				{
					name: 'new_york',
					children: [
						{
							name: 'api0',
							children: [
								{
									name: 'cpu',
									metricValue: 0.2
								},
								{
									name: 'memory',
									metricValue: 0.2
								},
								{
									name: 'network',
									metricValue: 0.8
								}
							]
						},
						{
							name: 'api1',
							children: [
								{
									name: 'cpu',
									metricValue: 0.1
								},
								{
									name: 'memory',
									metricValue: 0.1
								},
								{
									name: 'network',
									metricValue: 0.1
								}
							]
						},
						{
							name: 'api2',
							children: [
								{
									name: 'cpu',
									metricValue: 0.1
								},
								{
									name: 'memory',
									metricValue: 0.1
								},
								{
									name: 'network',
									metricValue: 0.1
								}
							]
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
		var newValue = value[i] + randomArbitrary(-0.3, 0.3);
		if (newValue < -2.0) {
			newValue += 0.3;
		}
		if (newValue > 2.0) {
			newValue -= 3.0;
		}
		value[i] = newValue;
		var payload = {
			type: metrics[i],
			time: new Date(Date.now()),
			data: {
				value: value[i]
			}
		};
		util.log(JSON.stringify(payload));
		emitter.send(payload);
	}
}, 1000);