module.exports = function(seeds, octave) {
	var baseNoise = function(t) {
		var i0 = Math.floor(t)%seeds.length;
		var i1 = (i0+1)%seeds.length;
		var tp = t%seeds.length-seeds[i0].x;

		return cn0(tp)*seeds[i0].y + cn1(tp)*seeds[i1].y + 
			cg0(tp)*seeds[i0].slope + cg1(tp)*seeds[i1].slope;
	};

	return function(t) {
		var result = 0.0;
		for (var i=0; i<octave; i++) {
			result += Math.pow(0.5,i)*baseNoise(t*Math.pow(2,i));
		}
		return result;
	}; 
};

function cg0(t) {
	return t-2.0*Math.pow(t,2)+Math.pow(t,3);
}

function cg1(t) {
	return -1.0*Math.pow(t,2)+Math.pow(t,3);
}

function cn0(t) {
	return 1.0-3.0*Math.pow(t,2)+2.0*Math.pow(t,3);
}

function cn1(t) {
	return 1.0-cn0(t);
}

