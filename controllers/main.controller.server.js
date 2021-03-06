var mainController = function() {

	var getUser = function(req,res) {
		res.json(req.user);
	}

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
		res.render('wizardContainer', 
		{
			partials: { body: 'login' }
		});
	}

	var renderWizard = function(req,res) {
		res.render('wizardContainer', 
		{
			partials: { body: 'wizard' }
		});
	}

	return {
		getUser: getUser,
		renderUsers: renderUsers,
		renderHome: renderHome,
		renderLogin: renderLogin,
		renderWizard: renderWizard
	}
}

module.exports = mainController;