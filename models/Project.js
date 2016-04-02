/**
 * Created by aasni on 2016-04-01.
 */
var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
    projectName: {type: String, required: true, unique: true},
    user: {type: String, required: true},
    annotation: [{
        user: {type: String, required: true},
        comments: [{
            user: {type: String, required: true},
            text: {type: String, required: true}
        }],
        img: {
            type: String,
            required: true,
            notEmpty: true
        }
    }]
});

ProjectSchema.statics.newProject = function(res, projectName, userName, imageString){
    var project = new this({
        projectName: projectName,
        user: userName
    });

    project.save(function(err){
        if(err){
            if(err.code == 11000){
                //this is if the project already exists error!
                console.log("that project already exists!");
                res.sendStatus(406);
            } else {
                //if some other mongo weird error happens!
                res.sendStatus(403);
            }
        }else{
            console.log("project added successfully!");
            var data = {user: userName, img: imageString};
            project.annotation.push(data);
            res.send("Project Name: " + project.projectName + " User Name: " + project.user + " Image: " + project.annotation.img);
        }
    });
};

ProjectSchema.statics.addAnnotation = function(project, userName, imageString){
    var data = {user: userName, img: imageString};
    project.annotation.push(data);
};

ProjectSchema.statics.findProject = function(req, res) {
  var project = mongoose.model('Project', this);
  project.findOne({projectName: req.query.name}, function(err, project) {
    if(project != null){
        res.send(JSON.stringify(project));
    }else{
        res.sendStatus(403);
    }
  });
};

ProjectSchema.methods.findAnnotation = function(req,res){
    var data = this.annotation[req.query.index];
    if(data != null){
        res.send(data);
    }else{
        res.sendStatus(403);
    }
};

ProjectSchema.methods.addAnnotation = function(req,res, imageString){
    //blabla
};

module.exports = {
    model: mongoose.model('Project', ProjectSchema),
    schema: ProjectSchema
};
