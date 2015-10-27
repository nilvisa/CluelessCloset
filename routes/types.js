var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Type = require('../models/Type.js');

/* GET */
router.get('/', function(req, res, next) {
  Type.find({owner : req.user._id}, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* POST */
router.post('/', function(req, res, next) {
  Type.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /id */
router.get('/:id', function(req, res, next) {
  Type.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /:id */
router.put('/:id', function(req, res, next) {
  Type.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /:id */
router.delete('/:id', function(req, res, next) {
  Type.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
