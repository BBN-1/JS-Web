const {Schema, model, Types: {ObjectId}} = require('mongoose');


const URL_PATTERN = /^https?:\/\/(.+)/;


const tripSchema = new Schema({

    startPoint: {type: String, minlength: [4, 'Start point should be at least 4 characters long'] },
    endPoint: {type: String, minlength: [4, 'End point should be at least 4 characters long'] },
    date: {type: String, required: true},
    time: {type: String, required: true},
    carImage: {type: String, required: true, validate: {
        validator(value) {
            return URL_PATTERN.test(value);
        },
        message: 'Image must be a valid URL'
    }},
    carBrand: {type: String, minlength: [4, 'Car brand should be at least 4 characters long'] },
    seats: {type: Number, required: true, min: 0, max: 4},
    price: {type: Number, required: true, min: 1, max: 50 },
    description: {type: String, minlength: [10, 'Description should be at least 10 characters long']},
    creator: {type: ObjectId, ref: 'User', required: true},
    buddies: {type: [ObjectId], ref: 'User', default: []},
    

});

const Trip = model('Trip', tripSchema);

module.exports = Trip;