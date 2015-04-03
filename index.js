
var path = require('path');

var through = require('through');
var riftTemplate = require('rift-template');

module.exports = function(file) {
	if (path.extname(file) != '.rtt') {
		return through();
	}

	var input = '';

	function write(buf) {
		input += buf;
	}

	function end() {
		this.queue(
			'module.exports = require(\'rift-template-runtime\').wrap(function(_escape, _include, _helpers, _each) { ' +
				riftTemplate.toFnBodyExpression(input) + ' });'
		);

		this.queue(null);
	}

	return through(write, end);
};
