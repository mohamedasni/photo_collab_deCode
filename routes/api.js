/*api_post.js*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var Project = require('../models/Project').model;
var imageString; //This will be the converted image!

function img_to_base64(imageString){
	imageString.base64('/api/project/photo');
}


router.get('/', function(req, res) {
	res.send("Hello World!");
});

router.post('/api/project',function (req, res) {
	var projectName = req.body.projectName;
	var userName = req.body.uName;
	var imageString = req.body.imgString;
	Project.newProject(res, projectName, userName, imageString);
});

router.get('/api/project',function (req, res) {
	Project.findProject(req, res);
});

router.post('/api/annotation',function (req, res){
	Project.addAnnotation(res, req.body.projectName, req.body.uName, req.body.imgString);
});

router.get('/api/annotation',function (req,res){
	Project.findAnnotation(req.body.projectName, req.body.uName, req.body.imgString);
});

router.post('/api/comments',function (req,res){
	Project.addComment(req,res);
});

module.exports = router;
