'use strict';

var grunt = require('grunt');
var http = require('http');
var https = require('https');

function get(url, done) {
  var client = http;
  if ((typeof url === 'string' && url.toLowerCase().indexOf('https') === 0) ||
    (typeof url === 'object' && url.port === 443) ||
    (typeof url === 'object' && url.scheme === 'https')) {
    client = https;
    delete url.scheme;
  }
  client.get(url, function(res) {
    var body = '';
    res.on('data', function(chunk) {
      body += chunk;
    }).on('end', function() {
      done(res, body);
    });
  });
}


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.edools_grunt_server = {
  extending_connect: function (test) {
    test.expect(2);

    get({
      hostname: 'localhost',
      port: 9000,
      path: '/fixtures/test.txt'
    }, function (res, body) {
      test.equal(res.statusCode, 200, 'should return 200');
      test.equal(body, 'First test\n', 'body should be a valid JSON');
      test.done();
    });
  },

  default_middleware: function (test) {
    test.expect(3);

    get({
      hostname: 'localhost',
      port: 9000,
      path: '/themes/params',
      headers: {
        accept: 'application/json',
      },
    }, function (res, body) {
      test.equal(res.statusCode, 200, 'should return 200');
      test.ok(body, 'body should be a valid JSON');

      var parsedBody = JSON.parse(body);
      test.deepEqual(parsedBody, grunt.file.readJSON('params.json'), 'should have a school property');

      test.done();
    });
  }
};
