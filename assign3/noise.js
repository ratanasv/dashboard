module.exports = function(seeds, octave) {
	var baseNoise = function(t) {
		var t0 = Math.floor(t)%seeds.length;
		var tp = (t%seeds.length)-t0;
		var t1 = (t0+1)%seeds.length;

		return cg0(tp)*seeds[t0] + cg1(tp)*seeds[t1];
	};

	return function(t) {
		var result = 0.0;
		for (var i=0; i<octave; i++) {
			result += Math.pow(0.5,i)*baseNoise(t*Math.pow(2,i));
		}
		return result;
	} 
};

function cn0(t) {
	return 1.0-3.0*Math.pow(t,2)+2.0*Math.pow(t,3);
}

function cn1(t) {
	return 1.0-cn0(t);
}

function cg0(t) {
	return t-2.0*Math.pow(t,2)+Math.pow(t,3);
}

function cg1(t) {
	return -1.0*Math.pow(t,2)+Math.pow(t,3);
}