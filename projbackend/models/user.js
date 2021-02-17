const mongoose = require('mongoose')
const crypto = require('crypto')
const {v4:uuidv4} =  require('uuid');
// import { v1 as uuidv1 } from 'uuid'
// const { set } = require('lodash');
const Schema = mongoose.Schema


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlenght: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlenght: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    //TODO: come back here
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, 
{timestamps: true}
);


userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password
    })


userSchema.methods = {

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto
            .createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema)