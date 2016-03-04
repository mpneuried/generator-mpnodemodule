/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');

describe('generator-nodemodule:app', function () {
  describe('default', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompts({
          modulename: "test-module"
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'package.json',
        '.gitignore',
        '.npmignore',
        'coffeelint.json',
        '.travis.yml',
        'LICENSE',
        'README.md',
        'Gruntfile.coffee',
        '_src/index.coffee',
        '_src/lib/main.coffee',
        '_src/lib/redisconnector.coffee',
        '_src/test/main.coffee'
      ]);
    });
     it('file content', function () {
      var rgx = new RegExp( "# TestModule", "gi" );
      assert.fileContent('_src/lib/main.coffee', rgx );
    });
  });

  describe('fullname', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompts({
          modulename: "test-module2",
          fullname: "Test U. User",
          useredis: false,
          addtests: false
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'package.json',
        '.gitignore',
        '.npmignore',
        'coffeelint.json',
        '.travis.yml',
        'LICENSE',
        'README.md',
        'Gruntfile.coffee',
        '_src/index.coffee',
        '_src/lib/main.coffee'
      ]);
      assert.noFile([
        '_src/test/main.coffee',
        '_src/lib/redisconnector.coffee'
      ]);
    });
     it('file content', function () {
      var rgx = new RegExp( "# TestModule2", "gi" );
      assert.fileContent('_src/lib/main.coffee', rgx );

      assert.fileContent('Gruntfile.coffee', "<%= pkg.version %>" );
      
      assert.fileContent('LICENSE', /Test\sU\.\sUser/gi );
    });
  });
  
});
