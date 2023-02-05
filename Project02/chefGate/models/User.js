const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "Please enter your name"],
        maxlength: [20]
    },

    lastName: {
        type: String,
        required: true,
        minlength: [3, "Please enter your name"],
        maxlength: [20]
    },

    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, "Please enter your User Name min 4 Characters"],
        maxlength: [20]
    },

    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: [6, "Password is too short..."]
    },
    
    userRole: {
        type: String,
        enum: ["Admin", "User", "Chef"],
        required: true
    },

    profilePicture: {
        type: String,
        required: false 
    },

    socialMedia: {
        type: Map,
        of: String,
        required: false
    },

    recipe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
},
{
    timestamps: true
})
userSchema.methods.verifyPassword = function(password){
    console.log(`${password}  -----  ${this.password}`);
    return bcrypt.compareSync(password, this.password);
}


const User = mongoose.model("User", userSchema);
module.exports = User;