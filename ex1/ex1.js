(function alphabet () {

	function C() {
		console.log("OOPS!");
	}

	function E(f) {
		console.log("E");
		F();
		var f = F;
	}

	var A = function() {
		console.log("A");
		B();
	};

	var C;

	function G() {
		console.log("G");

		var H = function() {
			console.log("H");
			I();
		};

		H();
	}

	var D = d;

	function d() {
		console.log("D");
		E();
	}

	function I() {
		console.log("I"); //removed second J();
		J();
	}

	B = function() {
		console.log("B");
		C();
	};

	var F = function() {
		console.log("F");
		G();
	};

	var rest = "KLMNOPQRSTUVWXYZ".split("");
	for (var i=0; i<rest.length; i++) {
		(function(i){
			// define the current function
			window[rest[i]] = function() {
				console.log(rest[i]);
				if (i < (rest.length-1)) {
					//TODO: call the next function
					window[rest[i+1]]();
				}
			};
		})(i);
	}

	var J = function() {
		J = function() {
			console.log("J");
			K();
		};
		J();
	};

	C = function() {
		console.log("C");
		D();
	};


	A();
})();
