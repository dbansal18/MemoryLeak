const router = require('express').Router();
const passport = require('passport');
const Post = require('./../models/post-model');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.set('views', __dirname+'../views');
app.set('view engine' , 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('/views'));

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

// auth login
router.get('/login', (req, res) => {
	if(req.user){
		res.redirect('/auth/profile');
    } else {
        res.redirect('/auth/google');
    }
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/'); 
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/auth/profile');
});


router.get('/profile', authCheck, (req, res) => {
    Post.find({userid: req.user._id}).then((posts) => {
        res.render('profile', {user: req.user, posts: posts})
    })
});

module.exports = router;