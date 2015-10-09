var mainController = function() {
	var renderHome = function(req,res) {
		res.render('container', 
			{
				partials: { body: 'home' }
			});
	}

	var renderUsers = function(req,res) {
		res.render('container', 
		{
			partials: { body: 'users'},
			user: req.user
		});
	}	

	var renderLogin = function(req,res) {
		res.render('container', 
		{
			partials: { body: 'login' }
		});
	}

	return {
		renderUsers: renderUsers,
		renderHome: renderHome,
		renderLogin: renderLogin
	}
}

module.exports = mainController;