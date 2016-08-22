/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');
var loadnodeversions = require('../app/loadnodeversions');
var nodeversions = {};

    
describe('generator-nodemodule:app', function () {
  before(function (done) {
    loadnodeversions( function( err, nvs ){
      nodeversions = nvs;
      done();
    });
  });
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
        'LICENSE',
        'README.md',
        'Gruntfile.coffee',
        '_src/index.coffee',
        '_src/lib/main.coffee'
      ]);
      assert.noFile([
        '.travis.yml',
        'appveyor.yml',
        '_src/test/main.coffee',
        '_src/lib/redisconnector.coffee',
        'dockertests/run.sh',
        'dockertests/test.sh',
        'dockertests/Dockerfile.0_10',
        'dockertests/Dockerfile.latest',
        'dockertests/Dockerfile.lts'
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
          citesting: true,
          citesting_os: [ "osx" ],
          test_versions: [ "latest", "0.10", "lts" ],
          dockertesting: true,
          dockertest_system: "ubuntu"
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
        '_src/test/main.coffee',
        'dockertests/run.sh',
        'dockertests/test.sh',
        'dockertests/Dockerfile.0_10',
        'dockertests/Dockerfile.latest',
        'dockertests/Dockerfile.lts'
      ]);
      assert.noFile([
        'appveyor.yml',
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
      
      var rgx4 = new RegExp( "os:\n  - osx\n\nlanguage:", "gi" );
      assert.fileContent('.travis.yml', rgx4 );
      
      var rgx5 = new RegExp( "node_js:\n  - node\n  - 0.10\n  - " + nodeversions.lts + "\n\nbefore_script:", "gi" );
      assert.fileContent('.travis.yml', rgx5 );

      assert.fileContent('Gruntfile.coffee', "<%= pkg.version %>" );
      
      assert.fileContent('LICENSE', /Test\sU\.\sDocker/gi );
    });
  });
  
  describe('with dockertesting and alpine', function () {
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
          test_versions: [ "latest", "0.10", "lts" ],
          citesting_os: [ "windows" ],
          dockertest_system: "alpine"
        })
        .on('end', done);
    });

    it('creates files', function () {
      assert.file([
        'package.json',
        '.gitignore',
        '.npmignore',
        'coffeelint.json',
        'appveyor.yml',
        'LICENSE',
        'README.md',
        'Gruntfile.coffee',
        '_src/index.coffee',
        '_src/lib/main.coffee',
        '_src/test/main.coffee',
        'dockertests/run.sh',
        'dockertests/test.sh',
        'dockertests/Dockerfile.0_10',
        'dockertests/Dockerfile.latest',
        'dockertests/Dockerfile.lts'
      ]);
      assert.noFile([
        '.travis.yml',
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

      var rgx2 = new RegExp( "FROM alpine-node:4", "gi" );
      assert.fileContent('dockertests/Dockerfile.lts', rgx2 );

      var rgx3 = new RegExp( "FROM alpine-node:0.10", "gi" );
      assert.fileContent('dockertests/Dockerfile.0_10', rgx3 );
      
      var rgx4 = new RegExp( "environment:\n  matrix:\n    - nodejs_version: \"" + nodeversions.latest + "\"\n    - nodejs_version: \"0.10\"\n    - nodejs_version: \"" + nodeversions.lts + "\"\n\npull_requests:", "gi" );
      assert.fileContent('appveyor.yml', rgx4 );
      
      assert.fileContent('Gruntfile.coffee', "<%= pkg.version %>" );
      
      assert.fileContent('LICENSE', /Test\sU\.\sDocker/gi );
    });
  });
  
});
