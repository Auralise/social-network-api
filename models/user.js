const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator: {
            validator: function (email) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i.test(email);
            },
            message: "Please provide a valid email address",
        }
    },
    thoughts: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            },
        ],
    },
    friends: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
});

const User = model("user", userSchema);


module.exports = User;