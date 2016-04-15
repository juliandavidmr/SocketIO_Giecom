'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/db_usuario');
const dir = '../www/';


/**
 * [get description]
 * @param  {[type]} '/'           [description]
 * @param  {[type]} function(req, res,          next [description]
 * @return {[type]}               [description]
 */
router.get('/', function(req, res, next) {
  res.send("/ de usuario");
});

module.exports = router;
