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
  Blog.find(function (err, businesses){
    if(err){
      console.log(err);
    }
    else {
      res.json(businesses);
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
  
  Post.find({ blog_id: blog_id }, function (err, posts){
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

// blogRoutes.route('/add').post(function (req, res) {
//   let blog = new Blog(req.body);
//   blog.save()
//   .then(blog => {
//     res.status(200).json({'blog': 'blog in added successfully'});
//   })
//   .catch(err => {
//     res.status(400).send("unable to save to database");
//   });
// });

// // Defined edit route
// blogRoutes.route('/edit/:id').get(function (req, res) {
//   let id = req.params.id;
//   Blog.findById(id, function (err, blog){
//     res.json(blog);
//   });
// });

// //  Defined update route
// blogRoutes.route('/update/:id').post(function (req, res) {
//   Blog.findById(req.params.id, function(err, blog) {
//     if (!blog)
//     return next(new Error('Could not load Document'));
//     else {
//       blog.title = req.title;
//       blog.description = req.body.description;

//       blog.save().then(blog => {
//         res.json('Update complete');
//       })
//       .catch(err => {
//         res.status(400).send("unable to update the database");
//       });
//     }
//   });
// });

// // Defined delete | remove | destroy route
// blogRoutes.route('/delete/:id').get(function (req, res) {
//   Blog.findByIdAndRemove({_id: req.params.id}, function(err, blog){
//     if(err) res.json(err);
//     else res.json('Successfully removed');
//   });
// });

module.exports = routes;