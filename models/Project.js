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

ProjectSchema.statics.newProject = function(req, res){
    var project = new this({
        projectName: req.body.pName,
        user: req.body.uName
    });

    project.save(function(err){
        if(err){
            if(err.code == 11000){
                //this is if the project already exists error!
                console.log("that project already exists!");
                res.sendStatus(406);
                return;
            }

            //if some other mongo weird error happens!
            res.sendStatus(403);
        }else{
            console.log("project added successfully!");
        }
    });

    addIniAnnotation(project, req);
};

ProjectSchema.methods.addIniAnnotation = function(project, req){
    var data = {user: req.body.uName, img: req.body.img};
    project.annotation.push(data);
};

module.exports = {
    model: mongoose.model('Project', ProjectSchema),
    schema: ProjectSchema
};