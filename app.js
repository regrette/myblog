
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testblog');

var Post = require('./routes/post');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


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

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
