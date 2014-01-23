function bindScope (func, scope) {
	return function () {
		func.apply(scope, arguments);
	}
}

function Observable () {
	this.map  = {};
}

Observable.prototype = {
	bind: function (event, handler, scope) {
		if(!this.map[event]) {
			this.map[event] = [];
		}
		this.map[event].push({
			fn: handler,
			scope: scope
		});
	},

	fire: function (event, args) {
		var handlers = this.map[event] || [];
		for(var i = 0; i < handlers.length; i++) {
			var handler = handlers[i];
			handler.fn.apply(handler.scope || null, args);
		}
	}


};
