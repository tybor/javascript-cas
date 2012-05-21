Expression.prototype.polar = function() {
	var ri = this.realimag();
	var two = new Expression.Integer(2);
	return Expression.List.ComplexPolar([
		ri[0]['^'](two)['+'](ri[1]['^'](two)),
		Global.atan2.default(Expression.Vector([ri[1], ri[0]]))
	]);
};
Expression.prototype.abs = function() {
	console.warn('SLOW?');
	var ri = this.realimag();
	return ri[0]['*'](ri[0])['+'](ri[1]['*'](ri[1]));
};
Expression.prototype.arg = function() {
	console.warn('Slow?');
	var ri = this.realimag();
	return Global.atan2.default(Expression.Vector([ri[1], ri[0]]));
};