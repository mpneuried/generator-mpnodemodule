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
        'appveyor.yml',
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
        'appveyor.yml',
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

  describe('with dockertesting', function () {
    before(function (done) {  
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(os.tmpdir(), './temp-test'))
        .withOptions({ 'skip-install': true })
        .withPrompts({
          modulename: "test-module3",
          fullname: "Test U. Docker tester",
          useredis: false,
          addtests: true,
          dockertesting: true,
          dockertest_versions: [ "latest", "0.10", "lts" ]
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
        'appveyor.yml',
        'LICENSE',
        'README.md',
        'Gruntfile.coffee',
        '_src/index.coffee',
        '_src/lib/main.coffee',
        '_src/test/main.coffee',
        'dockertests/run.sh',
        'dockertests/Dockerfile.0_10',
        'dockertests/Dockerfile.latest',
        'dockertests/Dockerfile.lts'
      ]);
      assert.noFile([
        '_src/lib/redisconnector.coffee',
        'dockertests/Dockerfile.0_12',
        'dockertests/Dockerfile.4_2',
        'dockertests/Dockerfile.5_0',
        'dockertests/Dockerfile.5_4',
        'dockertests/Dockerfile.6_1'
      ]);
    });
     it('file content', function () {
      var rgx = new RegExp( "# TestModule3", "gi" );
      assert.fileContent('_src/lib/main.coffee', rgx );

      var rgx2 = new RegExp( "FROM node:argon", "gi" );
      assert.fileContent('dockertests/Dockerfile.lts', rgx2 );

      var rgx3 = new RegExp( "FROM node:0.10", "gi" );
      assert.fileContent('dockertests/Dockerfile.0_10', rgx3 );

      assert.fileContent('Gruntfile.coffee', "<%= pkg.version %>" );
      
      assert.fileContent('LICENSE', /Test\sU\.\sDocker/gi );
    });
  });
  
});
