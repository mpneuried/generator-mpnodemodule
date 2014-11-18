'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var GeneratorNodemoduleGenerator = yeoman.generators.Base.extend({
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
      name: 'modulename',
      message: 'The name of this module?',
      default: "modulename"
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
      default: "0.10.0"
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
      this.modulename = props.modulename;
      this.moduledesc = props.moduledesc;
      this.moduleversion = props.moduleversion;
      this.minnodeversion = props.minnodeversion;
      this.addtests = props.addtests;
      this.useredis = props.useredis;
      this.usedocs = props.usedocs;
      var _d = new Date();
      this.todaydate = _d.getFullYear() + "-" + ( _d.getMonth() + 1 ) + "-" + _d.getDate()
      done();
    }.bind(this));
  },

  writing: {
    projectfiles: function() {
      this.template('_package.json', 'package.json');
      this.template('Gruntfile.coffee');
      this.template('README.md');
      this.template('LICENSE');
    },

    configfiles: function () {
      this.src.copy('_gitignore', '.gitignore');
      this.src.copy('_npmignore', '.npmignore');
      this.src.copy('_travis.yml', '.travis.yml');
      this.src.copy('_editorconfig', '.editorconfig');
    },

    app: function() {
      this.dest.mkdir('_src');
      this.dest.mkdir('_src/lib');
      this.template('_src/index.coffee', "_src/index.coffee");
      this.template('_src/lib/_module_skeleton.coffee', "_src/lib/" + this.modulename + ".coffee");
      if (this.useredis) {
        this.template('_src/lib/redisconnector.coffee', "_src/lib/redisconnector.coffee");
      }
      if (this.addtests) {
        this.dest.mkdir('_src/test');
        this.template('_src/test/main.coffee', "_src/test/main.coffee");
      }
    }
  },

  end: function () {
    this.installDependencies( { bower: false, npm: true, skipInstall: ( this.options["skip-install"] || false ) } );
  }
});

module.exports = GeneratorNodemoduleGenerator;
