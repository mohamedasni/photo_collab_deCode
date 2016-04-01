/*api_post.js*/
var express = require('express');
var router = express.Router();
var Project = require('../models/Project');
var mongoose = require('mongoose');
var path = require('path');
var imageString; //This will be the converted image!
function img_to_base64(imageString){
	imageString.base64('/api/project/photo');
}


router.get('/', function(req, res) {
	res.send("Hello World!");
});

router.post('/api/project',function (req, res) {
	Project.newProject(req,res, imageString);
});

router.get('/api/project',function (req, res) {
	Project.findProject(req,res);
});

router.post('/api/annotations',function (req,res){
	Project.addAnnotation(req,res, imageString);
});

router.get('/api/annotations',function (req,res){
	Project.findAnnotation(req,res);
});

router.post('/api/comments',function (req,res){
	Project.addComment(req,res);
});

module.exports = router;