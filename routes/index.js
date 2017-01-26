var express = require('express');
var mongoose = require('mongoose');
var Photo = mongoose.model('Photo');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Open Photo' });
});

router.get('/api/:library', function(req, res, next){
  Photo.find({photoLibrary: req.params.library}, function(error, results){
    if(error){
      res.send('<h1>Error Retreiving Data</h1>');
    }
    else{
      res.json(results);
    }
  });
});

router.get('/api/upload/:library/:photo', function(req, res, next){
  var photoId = Math.floor((Math.random() * 1000000000000) + 1);
  Photo.create({photoUrl: photoId, photoLibrary: req.params.library}, function(error, results){
    if(error){
      res.send('<h1>Error Retreiving Data</h1>');
    }
    else{
      res.json(results);
    }
  });
});

module.exports = router;
