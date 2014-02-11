
var mongoose = require('mongoose');
var Post = require('../models/post');

module.exports.controller = function(app) {

    app.get('/', function(req,res) {
        res.redirect('/posts');
    });

    app.get('/posts', function(req,res) {
        var post = Post.find({}).sort([['date', 'descending']]).exec(function(err,posts){
            if(err){
                res.render('index', { title: 'Express' });
            } else {
                res.render('posts/posts', {posts: posts});
            }
        });
    });

    app.post('/posts/new', function(req,res) {
        var post = new Post({title: req.param('title'), content: req.param('content')});
        post.save();
        res.redirect('/posts');
    });

    app.get('/posts/new', function(req,res) {
        res.render('posts/new');
    });

    app.get('/posts/:_id', function(req,res) {
        var post = Post.find({_id: req.param('_id')}).exec(function(err, posts) {
            if(err) {

            } else {
                res.render('posts/post', {posts: posts});
            }
        });
    });
}