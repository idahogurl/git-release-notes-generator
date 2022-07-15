const FORMAT_PLACEHOLDERS = {
  hash: '%H',
  abbrevHash: '%h',
  treeHash: '%T',
  abbrevTreeHash: '%t',
  parentHashes: '%P',
  abbrevParentHashes: '%p',
  authorName: '%an',
  authorEmail: '%ae',
  authorDate: '%aI',
  committerName: '%cn',
  committerEmail: '%ce',
  committerDate: '%cI',
  refNames: '%D',
  encoding: '%e',
  subject: '%s',
  sanitizedSubject: '%f',
  body: '%b',
  commitNotes: '%N',
};

const DEFAULT_FIELDS = ['abbrevHash', 'subject'];

const FIELD_DELIMITER = '\u001F';
const RECORD_DELIMITER = '\u001E';

function getFormatString(fields, fieldDelimiter, recordDelimiter) {
  fields = [].concat(fields || []);
  if (fields.length === 0) {
    fields = DEFAULT_FIELDS;
  }
  fieldDelimiter = fieldDelimiter || FIELD_DELIMITER;
  const format = [];
  fields.forEach(function (field) {
    if (FORMAT_PLACEHOLDERS[field]) {
      if (format.length > 0) {
        format.push(fieldDelimiter);
      }

      format.push(FORMAT_PLACEHOLDERS[field]);
    }
  });
  format.push(recordDelimiter || RECORD_DELIMITER);
  return format.join('');
}

module.exports = {
  getFormatString: getFormatString,
  FIELD_DELIMITER: FIELD_DELIMITER,
  RECORD_DELIMITER: RECORD_DELIMITER,
  DEFAULT_FIELDS: DEFAULT_FIELDS,
  FORMAT_PLACEHOLDERS: FORMAT_PLACEHOLDERS,
};
