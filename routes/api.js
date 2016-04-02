/*api_post.js*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var Project = require('../models/Project').model;

router.get('/', function(req, res) {
    res.send("Hello World!");
});

/**
 * Add a new project to the db
 */
router.post('/api/project', function(req, res) {

    var projectName = req.body.projectName;
    var userName = req.body.uName;
	var imgString = req.body.imgString;
	Project.newProject(res, projectName, userName, imgString);
});

/**
 * Delete Project
 */
router.post('/api/project/delete', function(req, res){
    var projectID = req.body.projectID;
    Project.deleteProject(res, projectID);
});

/**
 * Get a project from the db
 */
router.get('/api/project', function(req, res) {
    if (req.query.id) {
        Project.getProjectByID(req, res);
    } else if (req.query.uName) {
        Project.getProjectByUser(req, res);
    } else if (req.query.projectName) {
        Project.getProjectByName(req, res);
    } else {
        Project.getAllProjects(req, res);
    }
});

/**
 * add an annotation to the db
 */
router.post('/api/annotation', function(req, res) {
    var projectID = req.body.projectID;
    var userName = req.body.uName;
<<<<<<< Updated upstream
	// var
	console.log(req.body);
=======
    var imgString = req.body.imgString;
    Project.addAnnotation(res,projectID,userName,imgString);

>>>>>>> Stashed changes
});

/**
 * Delete an annotation
 */
router.post('/api/annotation/delete', function(req, res) {
    var index = req.body.annIndex;
    var projectID = req.body.projectID;
    Project.deleteAnnotation(res, index, projectID);
});

/**
 * get an annotation from the db
 */
router.get('/api/annotation', function(req, res) {
    Project.getAnnotationByID(res, req.query.projectID, req.query.annIndex);
});

/**
 * Add a comment to an annotation
 */
router.post('/api/comments', function(req, res) {
	// Note: if there's no annotations this fails, need to fix that
    Project.addComment(req, res);
});

/**
 * Delete a comment
 */
router.post('/api/comments/delete', function(req, res){
   Project.deleteComment(req, res);
});

module.exports = router;
