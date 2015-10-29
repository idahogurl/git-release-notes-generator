/* global describe */
/* global it */
var format = require('../lib/format');
var should = require('should');

describe('format', function () {
  describe('getFormatString', function () {
    it('should return a format string for the requested fields and delimiter', function () {
      var str = format.getFormatString(['hash', 'authorName'], '^');
      str.should.equal('%H^%an');
    });

    it('should ignore fields that do not exist', function () {
      var str = format.getFormatString(['abbrevHash', 'bogus', 'subject'], '*');
      str.should.equal('%h*%s');
    });

    it('should provide a default delimiter', function () {
      var str = format.getFormatString(['hash', 'authorName']);
      str.should.equal('%H' + format.DEFAULT_DELIMITER + '%an');
    });

    it('should provide a default list of fields', function () {
      var str1 = format.getFormatString(null, '^');
      var str2 = format.getFormatString(format.DEFAULT_FIELDS, '^');
      str1.should.equal(str2);
    });
  });
});