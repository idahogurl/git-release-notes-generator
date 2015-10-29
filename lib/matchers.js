var DEFAULT_FIELD = 'subject';

function prepareMatchers(matchers) {
	matchers = [].concat(matchers || []);
	var prepared = [];
	matchers.forEach(function (matcher) {
		if (typeof matcher.pattern === 'string') {
			matcher.regexp = new RegExp(matcher.pattern);
		}
		if ((matcher.regexp instanceof RegExp) && matcher.fields) {
			matcher.fields = [].concat(matcher.fields);
			if (!matcher.sourceField) {
				matcher.sourceField = DEFAULT_FIELD
			}
			prepared.push(matcher);
		}
	});

	return prepared;
}

function matchCommits(matchers, commits) {
	matchers = prepareMatchers(matchers);
	if (matchers.length === 0) {
		return commits;
	}
	var matchedCommits = [];
	commits.forEach(function (commit) {
		var matched = runMatchers(matchers, commit);
		if (matched) {
			matchedCommits.push(matched);
		}
	})
	return matchedCommits;
}

function runMatchers(matchers, commit) {
	var matched = matchers.some(function (matcher) {
		var match = matcher.regexp.exec(commit[matcher.sourceField]);
		if (match) {
			for (var i = 1, n = match.length; i < n; i += 1) {
				var field = matcher.fields[i - 1];
				if (field) {
					commit[field] = match[i]
				}
			}
			return true;
		}
		return false;
	});

	if (matched) {
		return commit;
	}
}

module.exports = {
	matchCommits: matchCommits,
	prepareMatchers: prepareMatchers
};
