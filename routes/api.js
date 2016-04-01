/*api_post.js*/

var Project = require('../models/Project');
var mongoose = require('mongoose');
var imageString; //This will be the converted image!

app.post('/api/project',function (req, res) {
	Project.newProject(req,res, imageString);
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