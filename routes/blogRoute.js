const express = require('express');

const blog_routes = express();

blog_routes.set('view engine','ejs');
blog_routes.set('views','/views');

blog_routes.use(express.static('public'));

const blogController = require('../controllers/blogController');

blog_routes.get('/',blogController.loadBlog);

blog_routes.get('./post/:id', blogController.loadPost);

blog_routes.post('/add-comment', blogController.addComment);


module.exports = blog_routes;


