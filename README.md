jQuery packaged for use with [node-browserify](https://github.com/substack/node-browserify).

Just add it to your browserify require list and use it!
	
	var $ = require('jquery-browserify')
	$('img[attr$='png']).hide()

If you are using browserify >= 0.4.7 you can map it to 'jquery' for convenience, thanks substack!
	
	app.use(browserify({
    		require : { jquery : 'jquery-browserify' }
	}));

then it's just
	
	var something = require('jquery')