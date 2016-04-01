/*api_post.js*/

var Project = require('../models/Project');
var mongoose = require('mongoose');

app.post('/api/project',function (req, res) {
	new Project.newProject(req,req);
});

app.get('/api/project',function (req, res) {
	Project.findProject(req,res);
});

app.post('/api/annotations',function (req,res){
	Project.addAnotation(req,res);
});

app.get('/api/annotations',function (req,res){
	Project.findAnotation(req,res);
});

app.post('/api/comments',function (req,res){
	Project.addComment(req,res);
});