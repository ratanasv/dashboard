angular.module('cs519Assign3.cubeboard', [
	'templates-app',
	'cs519Assign3.util',
	'ui.router'
])

.config(function($stateProvider) {
	$stateProvider.state('dashboard.cubeboard', {
		url: '/cubeboard',
		views: {
			'cubeboard': {
				controller: 'CubeboardCtrl',
				templateUrl: 'dashboard/cubeboard/cubeboard.html'
			}
		}
	});
})

.controller('CubeboardCtrl', function($scope, initFetchMetric, metricsList) {
	var context = cubism.context()
		.step(1000)
		.size(900);

	var horizon = context.horizon()
		.height(60);

	var fetchMetric = initFetchMetric(context);

	var data = metricsList.map(fetchMetric);


	d3.select('#cubeboard')
		.selectAll('.horizon')
		.data(data)
		.enter()
		.append('div')
		.attr('class', 'horizon')
		.call(horizon);

})

.factory('initFetchMetric', function() {
	return function initFetchMetric(context) {
		return function fetchMetric(metricName) {
			var socket = new WebSocket('ws://128.193.36.250:1081/1.0/event/get');
			var socketReady = false;
			socket.onopen = function() {
				socketReady = true;
			};
			return context.metric(function(start, stop, step, callback) {
				var events = [];
				function fetchMetricWhenReady() {
					if (socketReady) {
						socket.send(JSON.stringify({
							expression: metricName + '(value)',
							start: start,
							stop: stop
						}));
						socket.onmessage = function(message) {
							var payload;
							payload = JSON.parse(message.data);
							if (message.data === 'null') { //end of transmission
								callback(null, events);
							} else {
								events.push(payload.data.value);
							}
						};
					} else {
						setTimeout(function() {
							fetchMetricWhenReady();
						}, 200);
					}				
				}
				fetchMetricWhenReady();
			}, metricName);
		};
	};
})

.factory('metricsList', function(mockData, createMetricsList) {
	return createMetricsList(mockData, '');
})

.factory('createMetricsList', function() {
	return function createMetricsList(root, prefix) {
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
});