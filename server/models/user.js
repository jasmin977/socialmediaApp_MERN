const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },


    FirstName: {
        type: String,  
    },
    LastName: {
        type: String, 
    },
    BirthDate: {
        type: String, 
    },
    Gender: {
        type: String, 
    },
    relationship: {
        type: String, 
    },
    interests: [{
        type: String, 
    }],
  
   
    
    email: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 6
    },
    status: {
        type: Boolean,
        default: false
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    notificationToken: {
        type: String
    },
    
    resetPasswordLink: {
        data: String,
        default: ""
    },
    events: [{
        type: ObjectId,
        ref: "Event"
    }],
    friends: [{
		type: ObjectId,
        ref: "User"
	}],
    deactivate: {  type: Boolean , default: false },

    complete: {  type: Boolean , default: false }

});

//virtual field
userSchema.virtual('password')
    .set(function (password) {
        //create temp var _password
        this._password = password;
        //generate a timestamp
        this.salt = uuidv1();
        // encrypt password
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    })


//methods
userSchema.methods = {

    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return ""
        }
    }
}



module.exports = mongoose.model("User", userSchema);