/*api_post.js*/
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
var Project = require('../models/Project').model;
var multer = require('multer');
var fs = require('fs');

router.get('/', function(req, res) {
    res.send("Hello World!");
});

/**
 * Add a new project to the db
 */
router.post('/api/project', multer({ dest: './uploads/'}).single('image'), function(req, res) {
    var projectName = req.body.projectName;
    var userName = req.body.uName;
	fs.readFile(req.file.path, 'binary', function(err, original_data){
	    var b64 = "<img alt=\"Embedded Image\" src=\"data:image/png;base64, " + new Buffer(original_data, 'binary').toString('base64') + "\" />";
	    Project.newProject(res, projectName, userName, b64);
	});
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
    Project.addAnnotation(res, req.body.projectID, req.body.uName, req.body.imgString);
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

module.exports = router;
