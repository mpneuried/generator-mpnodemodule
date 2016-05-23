# # <%= classname %>
<% if( useredis ){ %>
# ### extends [RedisConnector](./redisconnector.coffee.html)
<% }else{ %>
# ### extends [NPM:MPBasic](https://cdn.rawgit.com/mpneuried/mpbaisc/master/_docs/index.coffee.html)
<% } %>
#
# ### Exports: *Class*
#
# Main Module
#
<% if( useredis ){ %>
# **internal modules**
# [Redisconnector](./redisconnector.coffee.html)
Redisconnector = require( "./redisconnector" )
<% } %>
class <%= classname %> extends <% if( useredis ){ %>Redisconnector<% }else{ %>require( "mpbasic" )()<% } %>

	# ## defaults
	defaults: =>
		@extend super,
			# **<%= classname %>.foo** *Number* This is a example default option
			foo: 23
			# **<%= classname %>.bar** *String* This is a example default option
			bar: "Buzz"

	###
	## constructor
	###
	constructor: ( options ) ->
		super
		<% if( useredis ){ %>
		# wrap start method to only be active until the connection is established
		@start = @_waitUntil( @_start, "connected" )
		<% } %>

		@start()<% if( useredis ){ %>
		@connect()<% } %>

		return

	<% if( useredis ){ %>_<% } %>start: =>
		@debug( "START" )
		return

#export this class
module.exports = <%= classname %>
