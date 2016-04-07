module.exports = (grunt) ->
	# Project configuration.
	grunt.initConfig
		pkg: grunt.file.readJSON('package.json')
		watch:
			module:
				files: ["_src/**/*.coffee"]
				tasks: [ "newer:coffee:changed" ]
			
		coffee:
			base:
				expand: true
				cwd: '_src',
				src: ["**/*.coffee"]
				dest: ''
				ext: '.js'

		clean:
			base:
				src: [ "lib", "test" ]

		includereplace:
			pckg:
				options:
					globals:
						version: '<%%= pkg.version %>'
					prefix: "@@"
					suffix: ''

				files:
					"index.js": ["index.js"]

		<% if( addtests ){ %>
		mochacli:
			options:
				require: [ "should" ]
				reporter: "spec"
				bail: false
				timeout: 3000
				slow: 3

			main:
				src: [ "test/main.js" ]
				options:
					env:
						severity_heartbeat: "debug"
		<% } %>
		<% if( usedocs ){ %>
		docker:
			serverdocs:
				expand: true
				src: ["_src/**/*.coffee", "README.md"]
				dest: "_docs/"
				options:
					onlyUpdated: false
					colourScheme: "autumn"
					ignoreHidden: false
					sidebarState: true
					exclude: false
					lineNums: true
					js: []
					css: []
					extras: []
		<% } %>

	# Load npm modules
	grunt.loadNpmTasks "grunt-watch"
	grunt.loadNpmTasks "grunt-newer"
	grunt.loadNpmTasks "grunt-contrib-coffee"
	grunt.loadNpmTasks "grunt-contrib-clean"<% if( addtests ){ %>
	grunt.loadNpmTasks "grunt-mocha-cli"<% } %>
	grunt.loadNpmTasks "grunt-include-replace"<% if( usedocs ){ %>
	grunt.loadNpmTasks "grunt-docker"<% } %>

	# ALIAS TASKS
	grunt.registerTask "default", "build"<% if( usedocs ){ %>
	grunt.registerTask "docs", "docker"<% } %>
	grunt.registerTask "clear", [ "clean:base" ]<% if( addtests ){ %>
	grunt.registerTask "test", [ "mochacli:main" ]<% } %>

	# build the project
	grunt.registerTask "build", [ "clear", "coffee:base", "includereplace" ]
	grunt.registerTask "build-dev", [ "clear", "coffee:base"<% if( usedocs ){ %>, "docs"<% } %><% if( addtests ){ %>, "test"<% } %> ]
