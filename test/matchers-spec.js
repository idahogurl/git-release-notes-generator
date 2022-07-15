/* global describe */
/* global it */
const matchers = require('../lib/matchers');
// eslint-disable-next-line no-unused-vars
const should = require('should');

describe('matchers', function () {
  describe('prepareMatchers', function () {
    it('should remove matchers that do not have a fields property', function () {
      const m = [
        {
          regexp: new RegExp('d+'),
        },
        {
          regexp: new RegExp('d+'),
          fields: ['issue'],
        },
      ];

      const prepared = matchers.prepareMatchers(m);
      prepared.length.should.equal(1);
    });

    it('should remove matchers that do not have a regexp RegExp property or a pattern string property', function () {
      const m = [
        {
          pattern: 'd+',
          fields: ['test'],
        },
        {
          regexp: new RegExp('d+'),
          fields: ['issue'],
        },
        {
          fields: ['issue'],
        },
      ];

      const prepared = matchers.prepareMatchers(m);
      prepared.length.should.equal(2);
    });

    it('should generate RegExp objects from a string pattern', function () {
      const m = [
        {
          pattern: 'd+',
          fields: ['issue'],
        },
      ];

      const prepared = matchers.prepareMatchers(m);
      prepared[0].regexp.should.be.instanceOf(RegExp);
    });

    it('should ignore matchers that are not an object', function () {
      const m = [
        {
          pattern: 'd+',
          fields: ['test'],
        },
        'invalid',
      ];

      const prepared = matchers.prepareMatchers(m);
      prepared.length.should.equal(1);
    });

    it('should allow a single matcher', function () {
      const prepared = matchers.prepareMatchers({
        pattern: 's+',
        fields: ['spaces'],
      });
      prepared.should.be.instanceOf(Array);
      prepared.length.should.equal(1);
    });

    it('should return an empty array if nothing is passed in', function () {
      const prepared = matchers.prepareMatchers();
      prepared.should.be.instanceOf(Array);
      prepared.length.should.equal(0);
    });
  });
});
