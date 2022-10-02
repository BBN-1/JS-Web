const {Schema, model, Types: {ObjectId}} = require('mongoose');


const URL_PATTERN = /^https?:\/\/(.+)/;



//TODO add validation

const publicationSchema = new Schema({

    title: {type: String, minlength: [6, 'Title should be at least 6 characters long'] },
    paintingTechnique: {type: String, maxlength: [15, 'Painting technique should be at most 15 characters long']},
    certificate: {type: String, enum: { values: ['Yes', 'No'], message: 'Capture "Yes" or "No" here'}, required: true},
    artPicture: {type: String, required: true, validate: {
        validator(value) {
            return URL_PATTERN.test(value);
        },
        message: 'Image must be a valid URL'
    }},
    author: {type: ObjectId, ref: 'User', required: true},
    usersShared: {type: [ObjectId], ref: 'User', default: []},


});

const Publication = model('Publication', publicationSchema);

module.exports = Publication;