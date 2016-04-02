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

/**
 * Add a new project to the db
 */
router.post('/api/project',function (req, res) {
	var projectName = req.body.projectName;
	var userName = req.body.uName;
	var imageString = req.body.imgString;
	Project.newProject(res, projectName, userName, imageString);
});

/**
 * Get a project from the db
 */
router.get('/api/project',function (req, res) {
	
	Project.findProject(req, res);
});

/**
 * add an annotation to the db
 */
router.post('/api/annotation',function (req, res){
	console.log(req.body.blabla);
	Project.addAnnotation(res, req.body.projectName, req.body.uName, req.body.imgString);
});

/**
 * get an annotation from the db
 */
router.get('/api/annotation',function (req,res){
	Project.findAnnotation(req.body.projectName, req.body.uName, req.body.imgString);
});

/**
 * Add a comment ot an annotation
 */
router.post('/api/comments',function (req,res){
	Project.addComment(req,res);
});

module.exports = router;
