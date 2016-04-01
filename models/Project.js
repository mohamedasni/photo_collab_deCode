/**
 * Created by aasni on 2016-04-01.
 */
var mongoose = require("mongoose");



var ProjectSchema = new mongoose.Schema({
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


module.exports = {
    model: mongoose.model('Project', ProjectSchema),
    schema: ProjectSchema
};