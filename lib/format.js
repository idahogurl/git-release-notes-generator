var FORMAT_PLACEHOLDERS = {
  'hash': '%H',
  'abbrevHash': '%h',
  'treeHash': '%T',
  'abbrevTreeHash': '%t',
  'parentHashes': '%P',
  'abbrevParentHashes': '%p',
  'authorName': '%an',
  'authorEmail': '%ae',
  'authorDate': '%aI',
  'committerName': '%cn',
  'committerEmail': '%ce',
  'committerDate': '%cI',
  'refNames': '%D',
  'encoding': '%e',
  'subject': '%s',
  'sanitizedSubject': '%f',
  'body': '%b',
  'commitNotes': '%N'
}

var DEFAULT_FIELDS = [
  'hash',
  'subject'
];

var DEFAULT_DELMITER = '\u001F';

function getFormatString(fields, delimiter) {
  fields = [].concat(fields || []);
  if (fields.length === 0) {
    fields = DEFAULT_FIELDS
  }
  if (!delimiter) {
    delimiter = DEFAULT_DELMITER;
  }
  var format = [];
  fields.forEach(function (field) {
    if (FORMAT_PLACEHOLDERS[field]) {
      if (format.length > 0) {
        format.push(delimiter);
      }

      format.push(FORMAT_PLACEHOLDERS[field]);
    }
  })
  return format.join('');
}

module.exports = {
  getFormatString: getFormatString,
  DEFAULT_DELIMITER: DEFAULT_DELMITER,
  DEFAULT_FIELDS: DEFAULT_FIELDS,
  FORMAT_PLACEHOLDERS: FORMAT_PLACEHOLDERS
}