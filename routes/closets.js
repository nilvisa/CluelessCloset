var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/Closet.js');

/* GET */
router.get('/', function(req, res, next) {
  Closet.find(function (err, users) {
    if (err) return next(err);
    res.json(closet);
  });
});

/* POST */
router.post('/', function(req, res, next) {
  Closet.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /id */
router.get('/:id', function(req, res, next) {
  Closet.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /:id */
router.put('/:id', function(req, res, next) {
  Closet.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /:id */
router.delete('/:id', function(req, res, next) {
  Closet.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
