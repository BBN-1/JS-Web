const {Schema, model, Types: {ObjectId}} = require('mongoose');


const URL_PATTERN = /^https?:\/\/(.+)/;





const postSchema = new Schema({

    title: {type: String, minlength: [6, 'Title should be at least 6 characters long'] },
    keyword: {type: String, minlength: [6, 'Keyword should be at least 6 characters long']},
    location: {type: String, maxlength: [15, 'Location should be at most 15 characters long']},
    dateOfCreation: {type: String, 
        minlength: [10, 'Date should be at least 10 characters long'],
        maxlength: [10, 'Date should be at most 10 characters long'] },
    image: {type: String, required: true, validate: {
        validator(value) {
            return URL_PATTERN.test(value);
        },
        message: 'Image must be a valid URL'
    }},
    description: {type: String, minlength: [8, 'Title should be at least 8 characters long']},
    author: {type: ObjectId, ref: 'User', required: true},
    votesOnPost: {type: [ObjectId], ref: 'User', default: []},
    rating: {type: Number, default: 0},


});

const Post = model('Post', postSchema);

module.exports = Post;