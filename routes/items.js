var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/Item.js');

/* GET */
router.get('/', function(req, res, next) {
  Item.find(function (err, users) {
    if (err) return next(err);
    res.json(item);
  });
});

/* POST */
router.post('/', function(req, res, next) {
  Item.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /id */
router.get('/:id', function(req, res, next) {
  Item.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /:id */
router.put('/:id', function(req, res, next) {
  Item.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /:id */
router.delete('/:id', function(req, res, next) {
  Item.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
