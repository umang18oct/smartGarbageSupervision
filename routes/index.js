var express = require('express');
var router = express.Router();
var db;

var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/smartbin', function (err, dab) {
  if (err) throw err
    db = dab;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dustbinTest',function(req,res){
    res.send("Hello world ! reply from umangs's server.");
});

router.get("/update",function(req, res) {
    var n = parseInt(req.query.id);
    var filled = parseFloat(req.query.val);
    db.collection("smartbin").findAndModify(
        {n : n},
        [],
        {$set : {n : n,filled : filled}},
        {upsert : true},
        function(err,obj){
            if(err)return res.sendStatus(500);
            res.send(JSON.stringify(obj,null,4));
        }
    );
});

router.get("/binstatus",function(req, res) {
    db.collection("smartbin").find().toArray(function(err,result){
        res.json(result);
    });
});

module.exports = router;
