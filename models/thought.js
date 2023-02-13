const { Schema, model, Types } = require("mongoose");

//Reaction schema definition 
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        required: true,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: v =>  v.toString(),
    }
}, {
    _id: false
}
);

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: v => v.toString()
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        type: [reactionSchema],
        default: [],
        
    }
}, {
    toObject: {getters: true},
    toJSON: {getters: true}
});

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;