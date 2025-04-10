var express = require('express');
var router = express.Router();

/**
 * Express router module for handling the home page route.
 * 
 * @module routes/index
 */

 /**
  * GET home page.
  * Renders the index view with a title.
  * 
  * @name GET /
  * @function
  * @memberof module:routes/index
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {Function} next - Express next middleware function.
  */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
