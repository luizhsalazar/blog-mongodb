const express = require('express');
const routes = express.Router();

let Blog = require('../models/Blog');
let Post = require('../models/Post');
let User = require('../models/User');

// Users routes
routes.route('/users/:email').get(function (req, res) {
	let email = req.params.email;
	console.log(email);
	
	User.find({ email: email }, function (err, user){
		if (err) {
			console.log(err);
			return;
		}
		
		res.json(user);
		console.log(user);
	});
});

routes.route('/users/signup').post(function (req, res) {
	let user = new User(req.body);
	user.save()
	.then(user => {
		res.status(200).json({'user': 'user added successfully'});
	})
	.catch(err => {
		res.status(400).send("unable to save to database");
	});
});

// ------ End User Routes

// Blog Routes
routes.route('/blogs').get(function (req, res) {
	Blog.aggregate([{
		$lookup: {
			from: "posts",
			localField: "_id",
			foreignField: "blog_id",
			as: "posts"
		}
	}]).sort({'posts.date': -1}).exec(function(err, blogPosts) {
		if (err) {
			console.log(err);
		} else {
			res.json(blogPosts);
		}
	});
});

routes.route('/blogs/:id').get(function (req, res) {
	let blog_id = req.params.id;
	
	Blog.findById(blog_id, function (err, blog){
		if (err) {
			console.log(err);
			return;
		}
		
		res.json(blog);
	});
});

routes.route('/blogs/:id/posts').get(function (req, res) {
	let blog_id = req.params.id;
	
	Post.find({ blog_id: blog_id }).sort({'date': -1}).exec(function (err, posts){
		if (err) {
			console.log(err);
			return;
		}
		
		res.json(posts);
		console.log(posts);
	});
});

routes.route('/blogs/:id/posts/:post_id').get(function (req, res) {
	let post_id = req.params.post_id;
	console.log(post_id);
	
	Post.findById(post_id, function (err, post){
		res.json(post);
		console.log(post);
	});
});

routes.route('/blogs').post(function (req, res) {
	let blog = new Blog(req.body);
	
	blog.save()
	.then(blog => {
		res.status(200).json({'blog': 'blog in added successfully'});
	})
	.catch(err => {
		res.status(400).send("unable to save to database");
	});
});

routes.route('/blogs/:id/new-post').post(function (req, res) {
	let post = new Post(req.body);
	
	post.save()
	.then(post => {
		res.status(200).json(post);
	})
	.catch(err => {
		res.status(400).send("unable to save to database");
	});
});

routes.route('/blogs/:id').delete(function (req, res) {
	Blog.findOneAndDelete({_id: req.params.id}, function(err){
		if (err) {
			res.json(err);
		} else {
			res.json('Successfully removed');
		}
	});
});

routes.route('/blogs/:id/posts/:post_id').delete(function (req, res) {
	console.log('remove post');
	
	Post.findOneAndDelete({_id: req.params.post_id}, function(err){
		if (err) {
			res.json(err);
		} else {
			res.json('Successfully removed');
		}
	});
});

module.exports = routes;