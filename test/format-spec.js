/* global describe */
/* global it */
const format = require('../lib/format');
// eslint-disable-next-line no-unused-vars
const should = require('should');

describe('format', function () {
  describe('getFormatString', function () {
    it('should return a format string for the requested fields and delimiters', function () {
      const str = format.getFormatString(['hash', 'authorName'], '^', '#');

      str.should.equal('%H^%an#');
    });

    it('should ignore fields that do not exist', function () {
      const str = format.getFormatString(['abbrevHash', 'bogus', 'subject'], '*', '|');

      str.should.equal('%h*%s|');
    });

    it('should provide a default delimiter', function () {
      const str = format.getFormatString(['hash', 'authorName']);

      str.should.equal('%H' + format.FIELD_DELIMITER + '%an' + format.RECORD_DELIMITER);
    });

    it('should provide a default list of fields', function () {
      const str1 = format.getFormatString(null, '^');
      const str2 = format.getFormatString(format.DEFAULT_FIELDS, '^');

      str1.should.equal(str2);
    });
  });
});
