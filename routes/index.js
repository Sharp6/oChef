var express = require('express');
var router = express.Router();
var gerechtCtrl = require('../controllers/gerecht.server.controller');
var maaltijdCtrl = require('../controllers/maaltijd.server.controller');
var ingredientCtrl = require('../controllers/ingredient.server.controller');
var mainCtrl = require('../controllers/main.server.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  return mainCtrl.list(req,res);
});

// GERECHTEN
router.get('/newGerecht', function(req,res) {
	return gerechtCtrl.newGerecht(req,res);
});

router.post('/newGerecht', function(req,res) {
	return gerechtCtrl.create(req,res);
});

router.get('/api/gerechten', function(req,res) {
	return gerechtCtrl.getGerechten(req,res);
});

// MAALTIJDEN
router.get('/newMaaltijd', function(req,res) {
	return maaltijdCtrl.newMaaltijd(req,res);
}); 

router.post('/newMaaltijd', function(req,res) {
	return maaltijdCtrl.create(req,res);
});

// INGREDIENTEN
/*
router.get('/newIngredient', function(req,res) {
	return ingredientCtrl.newIngredient(req,res);
}); 

router.post('/newIngredient', function(req,res) {
	return ingredientCtrl.create(req,res);
});
*/
router.route('/api/ingredienten')
	.get(function(req,res) {
		return ingredientCtrl.getIngredienten(req,res);
	});

router.route('/ingredienten')
	.get(function(req,res) {
		return ingredientCtrl.renderIngredienten(req,res);
	});

module.exports = router;
