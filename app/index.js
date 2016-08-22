'use strict';
var util = require('util');
var _capitalize = require( "lodash/capitalize" );
var _camelCase = require( "lodash/camelCase" );
var _intersection = require( "lodash/intersection" );

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
      name: 'citesting',
      message: 'Add ci testing configurations',
      default: true,
      when: (function( selection ){
        return selection.addtests
      })
    },{
      type: "checkbox",
      name: 'citesting_os',
      message: 'Select the operating systems to generate the ci test configs?',
      choices: [ "linux", "osx", "windows" ],
      default: [ "linux", "osx", "windows" ],
      when: (function( selection ){
        return selection.citesting
      })
    },{
      type: "confirm",
      name: 'dockertesting',
      message: 'Add docker tests to check the module against multiple node versions?',
      default: false,
      when: (function( selection ){
        return selection.addtests
      })
    },{
      type: "radio",
      name: 'dockertest_system',
      message: 'Select the docker test operating system?',
      choices: [ "alpine", "ubuntu" ],
      default: "alpine",
      when: (function( selection ){
        return selection.dockertesting
      })
    },{
      type: "checkbox",
      name: 'dockertest_versions',
      message: 'Select the node versions you want to add?',
      choices: [ "latest", "lts", "0.10", "0.12", "4.2", "4.4", "4.5", "5.0", "5.4", "6.0", "6.1", "6.4" ],
      default: [ "latest", "lts" ],
      when: (function( selection ){
        return selection.dockertesting
      })
    },{
      type: "confirm",
      name: 'useredis',
      message: 'Add redis stubs?',
      default: true
    },{
      type: "confirm",
      name: 'usedocs',
      message: 'Add docker code doc generator?',
      default: false
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
      this.citesting = props.citesting;
      this.citesting_os = props.citesting_os || [];
      this.dockertesting = props.dockertesting;
      this.dockertest_versions = props.dockertest_versions;
      this.dockertest_system = props.dockertest_system;
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
      if( this.citesting ){
        if( _intersection( [ "linux", "osx" ], this.citesting_os ).length ){
          this.template('_travis.yml', '.travis.yml');
        }
        if( this.citesting_os.indexOf( "windows" ) >= 0 ){
          this.template('appveyor.yml', 'appveyor.yml');
        }
      }
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

      if( this.dockertesting ){
        mkdirp('dockertests');
        var _versions = [];
        for (var i = this.dockertest_versions.length - 1; i >= 0; i--) {
          var _dsys = this.dockertest_system;
          var _dversion = this.dockertest_versions[i];
          if( [ "lts", "latest" ].indexOf( _dversion ) >= 0 ){
            if( _dsys == "alpine" ){
              this.template('dockertests/Dockerfile.xxx', "dockertests/Dockerfile." + _dversion, { dockerimage: "alpine-node", dockertag: ( _dversion === "lts" ? "4" : "latest" ) });
            }else{
              this.template('dockertests/Dockerfile.xxx', "dockertests/Dockerfile." + _dversion, { dockerimage: "node", dockertag: ( _dversion === "lts" ? "argon" : "latest" ) });
            }
          } else {
            if( _dsys == "alpine" ){
              this.template('dockertests/Dockerfile.xxx', "dockertests/Dockerfile." + _dversion.replace( ".", "_" ), { dockerimage: "alpine-node", dockertag: _dversion });
            }else{
              this.template('dockertests/Dockerfile.xxx', "dockertests/Dockerfile." + _dversion.replace( ".", "_" ), { dockerimage: "node", dockertag: _dversion });
            }
          }
          _versions.push( 'VERSIONS[' + _versions.length + ']=' + _dversion )
        }
        this.copy('dockertests/test.sh', "dockertests/test.sh" )
        this.template('dockertests/run.sh', "dockertests/run.sh", { modulename: this.modulename, githubuser: this.githubuser, versions: _versions.join( "\n" ) });
      }
      }
    }
  },

  end: function () {
    this.installDependencies( { bower: false, npm: true, skipInstall: ( this.options["skip-install"] || false ) } );
  }
});

module.exports = GeneratorNodemoduleGenerator;
