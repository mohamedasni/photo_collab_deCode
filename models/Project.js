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

    // var data = {
    //     user: userName,
    //     img: imageString
    // };
    // project.annotation.push(data);
    // res.send("Project Name: " + project.projectName + " User Name: " + project.user + " Image: " + project.annotation[0].img);
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
        // console.log(pro);
        var anns = pro.annotation;
        anns.push(data);
        this.update({
            _id: projectID
        }, {
            annotation: anns
        }, function(err, num) {
            var index = pro.annotation.length - 1;
            res.send("Project Name: " + pro.projectName + " User Name: " + pro.user + " Image: " + pro.annotation[index].img);
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
    var annID;
    this.findOne({_id: id}, function(err, pro) {
        console.log(pro.annotation[0]._id);
        annID = pro.annotation[index]._id;
        console.log(annID);
    });



    this.findByIdAndUpdate(
        annID,
        {$push: {comments: data}},
        // {safe: true, upsert: true},
        function(err, pro) {
            console.log(annID);
            console.log(pro);

        }
    );


    // this.findOne({
    //         _id: id
    //     }, function(err, pro) {
    //         console.log(pro);
    //         var comments = pro.annotation[index].comments;
    //         var new_id = pro.annotation[index]._id;
    //         console.log(id);
    //         comments.push(data);
    //         this.update({
    //             _id: id
    //         }, {
    //             annotation[annIndex].comments: comments
    //         }, function(err, num) {
    //             console.log(num);
    //             res.json(pro.annotation[index].comments);
    //         });
    // });
};

module.exports = {
    model: mongoose.model('Project', ProjectSchema),
    schema: ProjectSchema
};
