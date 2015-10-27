var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Tag = require('../models/Tag.js');

/* GET */
router.get('/', function(req, res, next) {
  Tag.find({owner : req.user._id}, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* POST */
router.post('/', function(req, res, next) {
  Tag.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /id */
router.get('/:id', function(req, res, next) {
  Tag.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /:id */
router.put('/:id', function(req, res, next) {
  Tag.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /:id */
router.delete('/:id', function(req, res, next) {
  Tag.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
