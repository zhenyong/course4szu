// function Animal (type, name) {
// 	this.type = type;
// 	this.name = !name ? '是个东西' : name;
// }

// Animal.prototype = {
// 	toString: function () {
// 		return this.type + ' : ' + this.name;
// 	},

// 	eat: function () {
// 		console.log(this.toString() + ' eating');
// 	},

// 	sleep: function () {
// 		console.log(this.toString() + ' sleeping');
// 	}
// }

//seaType 浅水，深水
// function Fish (type, name, seaType) {
// 	// Animal.apply(this, arguments);
// 	Animal.call(this, type, name);// no `seaType` here

// 	this.seaType = seaType;
// }

// Fish.prototype = new Animal();

// Fish.prototype.swim= function () {
// 	console.log(this.toString() + ' swinmming');
// };

// Fish.prototype.blublu= function () {
// 	console.log(this.toString() + ' blublu');
// }

/**
options = {
	init : xxxz //if exist then invoke in sub constructor

	funKey1: fun1,
	funKey2: fun2,
	...
}
*/

var Class = {
	extend: function (base, options) {
		function sub () {
			base.apply(this, arguments);
			if(options.init) {
				options.init.apply(this, arguments);
			}
		}

		function tmp () {};
		tmp.prototype = base.prototype;

		sub.prototype = new tmp();

		for(var p in options) {
			sub.prototype[p] = options[p]
		}

		return sub;
	}
};

// var Fish = Class.extend(Animal, {
// 	init: function (type, name, seaType){
// 		Animal.call(this, type, name);// no `seaType` here

// 		this.seaType = seaType;
// 	}, 
// 	toString: function () {
// 		return Animal.prototype.toString.call(this) + ' in ' + this.seaType + ' sea'; 
// 	},
// 	swim: function () {
// 		console.log(this.toString() + ' swinmming');
// 	},
// 	blublu: function () {
// 		console.log(this.toString() + ' blublu');
// 	}}
// );
// //peter:fish
// var peter = new Fish('bimu', 'peter', 'deep')
// delete peter.name;
// peter.eat();
// peter.swim();


// //moutainType up down 山上的 山下的
// var Pig = Class.extend(Animal, {

// 	init:  function (name, moutainType) {
// 		Animal.call(this, 'pig', name);

// 		this.moutainType = moutainType;
// 	},
// 	toString : function () {
// 		return Animal.prototype.toString.call(this) + ' ' + this.moutainType + ' moutain';
// 	},	
// 	kallkall: function () {
// 		console.log(this.toString() + ' kallkall');
// 	}
// });

// var hele = new Pig('hele', 'up');
// hele.kallkall();
