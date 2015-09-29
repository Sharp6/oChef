exports.renderHome = function(req,res) {
	res.render('container', 
		{
			partials: { body: 'home' }
		});
}