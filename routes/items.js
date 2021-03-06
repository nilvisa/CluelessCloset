var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Item = require('../models/Item.js');


/* GET */
router.get('/', function(req, res, next) {
  Item.find({owner : req.user._id}, function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* POST */
router.post('/', function(req, res, next) {
  Item.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/upload/:id', function(req, res){
  Item.findByIdAndUpdate(req.params.id, { 
    $set: { 
      'img': req.files.img.name     
     }}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
//   Item.findByIdAndUpdate(req.params.id,
//   {$set: {'img': req.files.name}},
//      function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   res.json({sucess: true});
// });

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
