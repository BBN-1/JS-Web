const {Schema, model, Types: {ObjectId}} = require('mongoose');

//TO DO - remove any regex that are not needed

// const NAME_PATTERN = /^[a-zA-Z]+$/;
// const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/
// const FULLNAME_PATTERN = /^[A-Z][a-z]+\s[A-Z][a-z]+$/

//TO DO change user model according to exam description
//TO DO add validation
const userSchema = new Schema({
    username: {type: String, minlength: [4, 'Usernam should be at least 4 characters long']},
    hashedPassword: {type: String, required: true},
    address: {type: String, required: true, maxlength: [20, 'Address should be at most 20 characters long']},
    myPublications: {type: [ObjectId], ref: 'Publication', default: []},
     
});


userSchema.index({username: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;