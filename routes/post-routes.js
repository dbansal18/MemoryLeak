var express = require('express');
var router = express.Router();
const Post = require('./../models/post-model');
const User = require('./../models/user-model');

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

/* GET home page. */
router.get('/', authCheck, (req, res, next) => {
  res.render('addPost', { user: req.user });
});

router.post('/', authCheck, (req, res) => {
    console.log(req.body);
    new Post({
        name: req.body.postName,
        link: req.body.postLink,
        category: req.body.category.toUpperCase(),
        description: req.body.postDescription,
        userid: req.user._id
    }).save().then((post) => {
        req.user.post.push(post._id);
        req.user.save().then(() => {
            res.render('status', {message: 'Saves sucessfully'});
        }).catch((err) => {
            res.render('status', {message: 'Failed to save'})
        })
    })
})

module.exports = router;
