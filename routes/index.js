var express = require('express');
var mongoose = require('mongoose');
var Photo = mongoose.model('Photo');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: './public'});
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
  Photo.create({photoUrl: req.params.photo, photoLibrary: req.params.library}, function(error, results){
    if(error){
      res.send('<h1>Error Retreiving Data</h1>');
    }
    else{
      res.json(results);
    }
  });
});

module.exports = router;
