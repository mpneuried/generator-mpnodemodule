'use strict';
var util = require('util');
var _capitalize = require( "lodash/capitalize" );
var _camelCase = require( "lodash/camelCase" );

var path = require('path');
var mkdirp = require( 'mkdirp' );
var yeoman = require('yeoman-generator');

var yosay = require('yosay');

var GeneratorNodemoduleGenerator = require('yeoman-generator').Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wondrous GeneratorNodemodule generator!'
    ));

    var prompts = [{
      name: 'githubuser',
      message: 'The github username?',
      default: "username"
    },{
      name: 'fullname',
      message: 'You full name for licence info? If not defined the githubuser will be used',
      default: ""
    },{
      name: 'modulename',
      message: 'The name of this module?',
      default: process.cwd().split(path.sep).pop()
    },{
      name: 'moduledesc',
      message: 'The description of this module?',
      default: "Module description"
    },{
      name: 'moduleversion',
      message: 'The initial version of this module?',
      default: "0.0.1"
    },{
      name: 'minnodeversion',
      message: 'The minimal node version',
      default: ">= 4.0.0"
    },{
      type: "confirm",
      name: 'addtests',
      message: 'Add mocha test skeleton?',
      default: true
    },{
      type: "confirm",
      name: 'useredis',
      message: 'Add redis stubs?',
      default: true
    },{
      type: "confirm",
      name: 'usedocs',
      message: 'Add docker code doc generator?',
      default: true
    }];
    this.prompt(prompts, function (props) {
      this.githubuser = props.githubuser;
      this.fullname = props.fullname.length ? props.fullname : props.githubuser;
      this.modulename = props.modulename;
      this.classname = _capitalize(_camelCase( this.modulename ));
      this.moduledesc = props.moduledesc;
      this.moduleversion = props.moduleversion;
      this.minnodeversion = props.minnodeversion;
      this.addtests = props.addtests;
      this.useredis = props.useredis;
      this.usedocs = props.usedocs;
      var _d = new Date();
      this.todaydate = _d.getFullYear() + "-" + ( _d.getMonth() + 1 ) + "-" + _d.getDate();
      this.todayyear = _d.getFullYear();
      done();
    }.bind(this));
  },

  writing: {
    projectfiles: function() {
      this.template('_package.json', 'package.json');
      this.template('Gruntfile.coffee');
      this.template('_travis.yml', '.travis.yml');
      this.template('README.md');
      this.template('LICENSE');
    },

    configfiles: function () {
      this.copy('_gitignore', '.gitignore');
      this.copy('_npmignore', '.npmignore');
      this.copy('_editorconfig', '.editorconfig');
      this.copy('coffeelint.json', 'coffeelint.json');
    },

    app: function() {
      mkdirp('_src');
      mkdirp('_src/lib');
      this.template('_src/index.coffee', "_src/index.coffee");
      this.template('_src/lib/main.coffee', "_src/lib/main.coffee");
      if (this.useredis) {
        this.template('_src/lib/redisconnector.coffee', "_src/lib/redisconnector.coffee");
      }
      if (this.addtests) {
        mkdirp('_src/test');
        this.template('_src/test/main.coffee', "_src/test/main.coffee");
      }
    }
  },

  end: function () {
    this.installDependencies( { bower: false, npm: true, skipInstall: ( this.options["skip-install"] || false ) } );
  }
});

module.exports = GeneratorNodemoduleGenerator;
