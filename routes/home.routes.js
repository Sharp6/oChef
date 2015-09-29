var express = require('express');
var router = express.Router();

var mainCtrl = require('../controllers/main.controller.server');

router.route('/')
	.get(function(req,res) {
		return mainCtrl.renderHome(req,res);
	});

module.exports = router;