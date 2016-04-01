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

ProjectSchema.statics.newProject = function(req, res, imageString){
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

    addIniAnnotation(project, req, imageString);
};

ProjectSchema.methods.addIniAnnotation = function(req, imageString){
    var data = {user: req.body.uName, img: imageString};
    this.annotation.push(data);
};

ProjectSchema.methods.findProject = function(req, res) {
  var project = mongoose.model('Project', ProjectSchema);
}

ProjectSchema.methods.findAnnotation = function(req,res){
    var data = this.annotation[req.body.index];
    if(data != null){
        res.send(data);
    }else{
        res.sendStatus(403);
    }
};

ProjectSchema.methods.findProject = function(req, res) {
  var project = mongoose.model('Project', ProjectSchema);

};

ProjectSchema.methods.addAnnotation = function(req,res, imageString){
    //blabla
};
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

module.exports = {
    model: mongoose.model('Project', ProjectSchema),
    schema: ProjectSchema
};