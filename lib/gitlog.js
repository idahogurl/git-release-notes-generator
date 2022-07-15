const format = require('./format');
const matchers = require('./matchers');
const spawn = require('child_process').spawnSync;
const util = require('util');

module.exports = function (options) {
  options = options || {};
  const fields = options.fields || format.DEFAULT_FIELDS;
  const delimiter = format.FIELD_DELIMITER;
  const formatString = format.getFormatString(fields, delimiter);
  const pretty = util.format('--pretty=format:%s', formatString);
  const args = ['log', pretty];

  const spawnOpts = {
    encoding: 'utf8',
  };
  if (options.repo) {
    spawnOpts.cwd = options.repo;
  }
  const out = spawn('git', args, spawnOpts);

  if (out.stderr) {
    throw new Error(out.stderr);
  }

  let commits = [];

  if (out.stdout) {
    const lines = out.stdout.split(format.RECORD_DELIMITER);
    lines.forEach(function (line) {
      if (!line) {
        return;
      }
      if (line.charAt(0) === '\n') {
        line = line.substr(1);
      }
      const commit = {};
      const values = line.split(delimiter);
      for (let i = 0, n = fields.length; i < n; i += 1) {
        commit[fields[i]] = values[i];
      }
      commits.push(commit);
    });

    commits = matchers.matchCommits(options.matchers, commits);
  }

  return commits;
};
