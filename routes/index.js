var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGO_URI || 'localhost/redditDB')
var Reddit = db.get('posts');



router.get("/reddit", function (req, res) {
  Reddit.find({}).then(function (posts) {
    res.json(posts)
  })
})

router.post("/reddit", function (req, res) {
  Reddit.insert(req.body).then(function (post) {
    res.json(post)
  })
})


router.post('/reddit/:id', function(req, res){
  Reddit.update({_id: req.params.id},
  { $set: { comments: req.body } })
})

module.exports = router;
