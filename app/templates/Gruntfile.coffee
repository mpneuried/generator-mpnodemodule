module.exports = ( grunt ) ->
	# Project configuration.
	grunt.initConfig
		pkg: grunt.file.readJSON( "package.json" )
		watch:
			module:
				files: [ "_src/**/*.coffee" ]
				tasks: [ "newer:coffee:base" ]

			module_test:
				files: [ "_src/**/*.coffee" ]
				tasks: [ "newer:coffee:base", "test" ]

		coffee:
			base:
				expand: true
				cwd: "_src",
				src: [ "**/*.coffee" ]
				dest: ""
				ext: ".js"

		clean:
			base:
				src: [ "lib", "test" ]

		includereplace:
			pckg:
				options:
					globals:
						version: "<%%= pkg.version %>"
					prefix: "@@"
					suffix: ""

				files:
					"index.js": [ "index.js" ]

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
						severity_<%= modulename %>: "info"
		<% } %>
		<% if( usedocs ){ %>
		docker:
			serverdocs:
				expand: true
				src: [ "_src/**/*.coffee", "README.md" ]
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
	grunt.loadNpmTasks( "grunt-contrib-watch" )
	grunt.loadNpmTasks( "grunt-contrib-coffee" )
	grunt.loadNpmTasks( "grunt-contrib-clean" )<% if( addtests ){ %>
	grunt.loadNpmTasks( "grunt-mocha-cli" )<% } %>
	grunt.loadNpmTasks( "grunt-include-replace" )<% if( usedocs ){ %>
	grunt.loadNpmTasks( "grunt-docker" )<% } %>
	grunt.loadNpmTasks( "grunt-newer" )

	# ALIAS TASKS
	grunt.registerTask( "default", "build" )<% if( usedocs ){ %>
	grunt.registerTask( "docs", "docker" )<% } %>
	grunt.registerTask( "watcher", [ "watch:module" ] )
	grunt.registerTask( "clear", [ "clean:base" ] )<% if( addtests ){ %>
	grunt.registerTask( "watcher-test", [ "watch:module_test" ] )
	grunt.registerTask( "test", [ "mochacli:main" ] )<% } %>

	# ALIAS SHORTS
	grunt.registerTask( "b", "build" )
	grunt.registerTask( "w", "watcher" )<% if( addtests ){ %>
	grunt.registerTask( "wt", "watcher-test" )
	grunt.registerTask( "t", "test" )<% } %>

	# build the project
	grunt.registerTask( "build", [ "clear", "coffee:base", "includereplace" ] )
	grunt.registerTask( "build-dev", [ "clear", "coffee:base"<% if( usedocs ){ %>, "docs"<% } %><% if( addtests ){ %>, "test"<% } %> ] )

	return
