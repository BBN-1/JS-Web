const {Schema, model} = require('mongoose');

//TO DO - remove any regex that are not needed

// const NAME_PATTERN = /^[a-zA-Z]+$/;
// const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/
const FULLNAME_PATTERN = /^[A-Z][a-z]+\s[A-Z][a-z]+$/

//TO DO change user model according to exam description
//TO DO add validation
const userSchema = new Schema({
    fullname: {type: String, required: true, validate: {
        validator(value){
            return FULLNAME_PATTERN.test(value)
        },
        message: 'Full name must be in the format "Firstname Lastname" !'
    }},
    username: {type: String, minlength: [5, 'Username should be at least 5 characters long']}, 
    hashedPassword: {type: String, required: true} 
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