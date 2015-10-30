var format = require('./format');
var matchers = require('./matchers');
var spawn = require('child_process').spawnSync;
var util = require('util');

module.exports = function (options) {
  options = options || {};
	var fields = options.fields || format.DEFAULT_FIELDS;
	var delimiter = format.FIELD_DELIMITER;
	var formatString = format.getFormatString(fields, delimiter);
	var pretty = util.format('--pretty=format:%s', formatString);
	var args = [
		'log',
		pretty
	];

  var spawnOpts = {
    encoding: 'utf8'
  };
  if (options.repo) {
    spawnOpts.cwd = options.repo;
  }
	var out = spawn('git', args, spawnOpts);

	if (out.stderr) {
		throw new Error(out.stderr);
	}

	var commits = [];

	if (out.stdout) {
		var lines = out.stdout.split(format.RECORD_DELIMITER);
		lines.forEach(function (line) {
      if (!line) {
        return;
      }
      if (line.charAt(0) === '\n') {
        line = line.substr(1);
      }
			var commit = {};
			var values = line.split(delimiter);
			for (var i = 0, n = fields.length; i < n; i += 1) {
				commit[fields[i]] = values[i];
			}
			commits.push(commit);
		});

		commits = matchers.matchCommits(options.matchers, commits);
	}

	return commits;
};
