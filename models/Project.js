/**
 * Created by aasni on 2016-04-01.
 */
var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true
    },
    annotation: [{
        user: {
            type: String,
            required: true
        },
        comments: [{
            user: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }],
        img: {
            type: String,
            required: true,
            notEmpty: true
        }
    }]
});

ProjectSchema.statics.newProject = function(res, projectName, userName, imageString) {
    var project = new this({
        projectName: projectName,
        user: userName,
        annotation: [{
            user: userName,
            comments: [],
            img: imageString
        }]
    });

    project.save(function(err) {
        if (err) {
            res.send(err);
        } else {
            res.json(project);
        }
    });
};


ProjectSchema.statics.addAnnotation = function(res, projectID, userName, imageString) {
    var data = {
        user: userName,
        comment: [],
        img: imageString
    };
    this.findOne({
        _id: projectID
    }, function(err, pro) {
        var anns = pro.annotation;
        anns.push(data);
        this.update({
            _id: projectID
        }, {
            annotation: anns
        }, function(err, num) {
            if (err) {
                res.send(err);
            } else {
                var index = pro.annotation.length - 1;
                res.send("Project Name: " + pro.projectName + " User Name: " + pro.user + " Image: " + pro.annotation[index].img);
            }
        });
    });
};

ProjectSchema.statics.getAllProjects = function(req, res) {
    var projectIDS = [];
    this.find({}, function(err, pro) {
        if (err) {
            res.send(err);
        } else {
            pro.forEach(function(project) {
                projectIDS.push(project);
            });
            res.json(projectIDS);
        }
    });
};

ProjectSchema.statics.getProjectByName = function(req, res) {
    this.findOne({
        projectName: req.query.projectName
    }, function(err, pro) {
        if (err) {
            res.send(err);
        } else {
            res.json(pro);
        }
    });
};

ProjectSchema.statics.getProjectByID = function(req, res) {
    this.findById(req.query.id, function(err, pro) {
        if (err) {
            res.send(err);
        } else {
            res.json(pro);
        }
    });
};

ProjectSchema.statics.getProjectByUser = function(req, res) {
    this.findOne({
        user: req.query.uName
    }, function(err, pro) {
        if (err) {
            res.send(err);
        } else {
            res.json(pro);
        }
    });
};

/**
 * Gets an annotation from the db using project id and index
 * @param           res       express response object
 * @param  {String} projectID id of the project which has the annotation
 * @param  {int}    annIndex  index of annotation in project's annotation array
 * @return none
 */
ProjectSchema.statics.getAnnotationByID = function(res, projectID, annIndex) {
    var project = mongoose.model('Project', this);
    console.log(projectID);
    project.findById(projectID, function(err, pro) {
        if (err) {
            res.send(err);
        } else {
            res.json(pro.annotation[annIndex]);
        }
    })
};

ProjectSchema.statics.addComment = function(req, res) {
    var data = {
        user: req.body.uName,
        text: req.body.text
    };
    var id = req.body.projectID;
    var index = req.body.annIndex;
    
    this.findOne({
        _id: id
    }, function(err, pro) {
        var ann = pro.annotation[index];
        var com = ann.comments;
        com.push(data);
        this.update({
            _id: id
        },{
            annotation: ann
        }, function(err, num) {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        });
    });
};

module.exports = {
    model: mongoose.model('Project', ProjectSchema),
    schema: ProjectSchema
};
