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

.controller('CubeboardCtrl', function() {
	var socket = new WebSocket('ws://128.193.36.250:1081/1.0/event/get');
	var START = 1401121957000;
	var context = cubism.context()
		.step(1000)
		.size(900);

	var horizon = context.horizon()
		.height(60);

	var dewy = horizon.scale();

	socket.onopen = function() {
		d3.select('#cubeboard')
			.selectAll('.horizon')
			.data([context.metric(
				function(start, stop, step, callback) {
					console.log('tick');
					var events = [];
					socket.send(JSON.stringify({
						expression: 'cs519(value)',
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
				},
				'yomama is fat'
			)])
			.enter()
			.append('div')
			.attr('class', 'horizon')
			.call(horizon);
	};
})

.factory('cubeData', function() {
	return function(context, socket, name) {
		return context.metric(function(start, stop, step, callback) {
			socket.send(JSON.stringify({
				expression: 'cs519(value)',
				start: start,
				stop: stop
			}));
			socket.onmessage = function(message) {
				if (message.data) {
					callback(null, message.data);
				}
			};
		}, name);
	};
});